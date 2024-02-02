# app.py
import gevent.monkey
gevent.monkey.patch_all()

from flask import Flask, request, jsonify, abort, url_for, session, redirect
from flask_socketio import SocketIO
from flask_cors import CORS

from authlib.integrations.flask_client import OAuth

import cProfile
import pstats

from dotenv import load_dotenv
load_dotenv()

import requests


import pandas as pd
import numpy as np
import requests
from requests.exceptions import HTTPError
import os
import json
import time
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
import traceback
import base64


import random
import string

from models import Record, db, init_db

# Launch
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app,supports_credentials=True)
user_sids = {}

load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['PREFERRED_URL_SCHEME'] = 'https'


# Auth
LICHESS_HOST = os.getenv("LICHESS_HOST", "https://lichess.org")
app.secret_key = os.getenv("SECRET_KEY")
app.config['LICHESS_CLIENT_ID'] =  os.getenv("LICHESS_CLIENT_ID")
app.config['LICHESS_AUTHORIZE_URL'] = f"{LICHESS_HOST}/oauth"
app.config['LICHESS_ACCESS_TOKEN_URL'] = f"{LICHESS_HOST}/api/token"

oauth = OAuth(app)
oauth.register('lichess', client_kwargs={"code_challenge_method": "S256"})

# Use SQLite for local development and PostgreSQL for production
if os.getenv('FLASK_ENV') == 'development':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL').replace("postgres://", "postgresql://", 1)
init_db(app)  # Initialize the SQLAlchemy instance with the Flask app

# Use localhost for local development and production URL for production
if os.getenv('FLASK_ENV') == 'development':
    app.config['FRONTEND_URL'] = 'http://localhost:3000' 
    app.config['URI_SCHEME'] = 'http'
else:
    app.config['FRONTEND_URL'] = 'https://chessstamps.app'     
    app.config['URI_SCHEME'] = 'https' 

###
# Functions and routes
###

# Profile 
def profile_route(f):
    def profiled(*args, **kwargs):
        profiler = cProfile.Profile()
        try:
            profiler.enable()
            result = f(*args, **kwargs)
            profiler.disable()
            return result
        finally:
            stats = pstats.Stats(profiler).sort_stats('cumulative')
            stats.print_stats()
    return profiled

# Unique URL
def generate_url_key(length=9):
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))

# Parse lichess games API response - data comes in newline-delimited JSON
def response_parser(s):
    lines = s.strip().split('\n')

    # Extract key-value pairs
    data = {}
    for line in lines:
        if line.startswith('['):
            key = line.split(' "')[0][1:]
            value = line.split(' "')[1].rstrip('"]')
            data[key] = value
    return data

# Generate base statistics 
def generate_base_statistics(df):

    # Begin generating stats

    # Credit openings with children
    df['player_white_with_children'] = df['player_white']
    df['player_black_with_children'] = df['player_black']

    def credit_parents(df):
        white_sums = {}
        black_sums = {}
        
        # Filter out rows where both player_white and player_black are 0
        df_filtered = df[(df['player_white'] > 0) | (df['player_black'] > 0)]

        for index, row in df_filtered.iterrows():
            parents = eval(row['parents'])
            for parent in parents:
                white_sums[parent] = white_sums.get(parent, 0) + row['player_white']
                black_sums[parent] = black_sums.get(parent, 0) + row['player_black']

        df['player_white_with_children'] += df['name'].map(white_sums).fillna(0)
        df['player_black_with_children'] += df['name'].map(black_sums).fillna(0)

        return df

    df = credit_parents(df)

    # Clean and analyze
    df['player_total'] = df['player_white'] + df['player_black']
    df['player_total_with_children'] = df['player_white_with_children'] + df['player_black_with_children']
    df['all_pct'] = df['games'] / df['games'].sum()
    df['player_pct'] = df['player_total'] / df['player_total'].sum()
    df['player_pct_with_children'] = df['player_total_with_children'] / df['player_total_with_children'].sum()
    df['white_pct'] = np.where(df['player_white'].sum() != 0, df['player_white'] / df['player_white'].sum(), 0)
    df['white_pct_with_children'] = np.where(df['player_white_with_children'].sum() != 0, df['player_white_with_children'] / df['player_white_with_children'].sum(), 0)
    df['black_pct'] = np.where(df['player_black'].sum() != 0, df['player_black'] / df['player_black'].sum(), 0)
    df['black_pct_with_children'] = np.where(df['player_black_with_children'].sum() != 0, df['player_black_with_children'] / df['player_black_with_children'].sum(), 0)

    # Ratios and handle division by zero
    df['ratio_white'] = np.where(df['all_pct'] == 0, 0, df['white_pct_with_children'] / df['all_pct'])
    df['ratio_black'] = np.where(df['all_pct'] == 0, 0, df['black_pct_with_children'] / df['all_pct'])

    df['popularity_rank'] = df.sort_values(by='all_pct', ascending=False).reset_index().index + 1

    # Uncomment to save the base file for selected usernames
    """
    if username.lower() in stored_usernames:
        print('saving base file')
        df.to_csv("assets/" + username.lower() +".tsv", sep="\t", index=False)
    """  

    return(df)

def check_if_key_exists(url_key):
    if url_key != 'none':
        print('loading from db', flush=True)
        with app.app_context():
            record = Record.query.filter_by(url_key=url_key).first()
            if record is None:
                # Raise error
                print('record not found!', flush=True)
                abort(400, description="Record not found")
            else:
                print('record found!', flush=True)
                loaded_username = record.username
                loaded_timeframe = record.timeframe
                df = pd.read_json(record.data)
                return loaded_username, loaded_timeframe, df

def check_if_username_is_stored(username,timeframe,defaultusername='khg002',stored_usernames=[]):
  # Load stored file if username is in stored_usernames
    # This was an early local file implementation before the DB was added
    if username.lower() in stored_usernames:
        print('loading stored file', flush=True)
        df = pd.read_csv("assets/" + username.lower() + ".tsv", sep="\t")
        #df = generate_base_statistics(df,username,stored_usernames)
        return df

    # Load default file if no username is specified
    # For dev purposes until added Magnus data
    elif username == None or username == defaultusername:
        # Load default file
        base_file = "assets/base_file.tsv"
        df = pd.read_csv(base_file, sep="\t")
        return df



# Get user data
def get_user_data(username,timestamp_to_use,token,streamed_response=[]):

    """
    This script uses the Lichess API to export the games of a user
    Documentation at: https://lichess.org/api#tag/Games/operation/apiGamesUser

    It counts the number of games played with each opening
    And joins it to the overall database of openings with their counts

    """
  
    # Main Lichess API call if other attempts have failed


    print(f'querying lichess api for {username}...')

    # Get user data
    max_games = 70000
    
    # Read the lichessToken
    load_dotenv()
    if os.getenv("AUTH_METHOD") == 'oauth':
        lichessToken = token

    # Fallback to single user auth instead of OAuth for local testing
    else: 
        lichessToken = os.getenv("lichessToken")

    # First request is to get the number of games
    # We need to determine the number of games played since the timestamp so we can estimate completion
    # This isn't perfect, but we will assume that the user plays at the same rate since account inception        
    headers = {"Content-Type": "application/x-ndjson"}
    if lichessToken != 'none' and lichessToken != 'null' and lichessToken:
        headers["Authorization"] = f"Bearer {lichessToken}"

    url = f"https://lichess.org/api/user/{username}"   

    try:
        response = requests.get(url,headers=headers)
        response.raise_for_status()
    except HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}", flush=True)
        traceback.print_exc() 
        abort(400, description="Username not found")
    except Exception as err:
        print(f"An error occurred: {err}", flush=True)
        traceback.print_exc()  
        abort(500, description="An unexpected error occurred")

    d = json.loads(response.content.decode('utf-8'))
    total_games = sum(d['perfs'][game_type]['games'] for game_type in ['bullet', 'blitz', 'rapid', 'classical'])

    user_created_at = d['createdAt']

    # Proportion of games played since timestamp
    if timestamp_to_use > user_created_at:
        estimated_games = int(total_games * ((int(time.time())*1000 - timestamp_to_use) / (int(time.time())*1000 - user_created_at)))
        # print(f'Estimated games: {estimated_games}', f'Total games: {total_games}', f'Ratio: {estimated_games / total_games}', timestamp_to_use, user_created_at, int(time.time())*1000)
    else:
        estimated_games = total_games

    # Second request is to pull the actual games
    chunks_expected = min(estimated_games,max_games)   
    chunks = 0
    url = f"https://lichess.org/api/games/user/{username}?pgnInJson=true&opening=true&max={max_games}&moves=false&perfType=bullet,blitz,rapid,classical&since={timestamp_to_use}"
    print(url, flush=True)
    print('user_sids', user_sids, flush=True)

    response = requests.get(url,headers=headers,stream=True)
    #print('received response from lichess api for main load')
    for chunk in response.iter_content(chunk_size=1024):
        percentage_complete = f'{(chunks / chunks_expected) * 100:.1f}'
        socketio.emit('progress', {'percentage_complete': percentage_complete, 'chunks_expected': chunks_expected})
        #socketio.emit('progress', {'percentage_complete': percentage_complete, 'chunks_expected': chunks_expected}, room=user_sids[username])
        chunks += 1
        #print(percentage_complete)
        streamed_response.append(chunk)

def parse_streamed_reponse(streamed_response,username):

    # Get overall data
    openings_db = "assets/openings_pgn/combined_with_stats_parents.tsv"
    df = pd.read_csv(openings_db, sep="\t")    

    # Parse and create data
    full_response = b''.join(streamed_response).decode('utf-8')
    l = full_response.split('\n\n\n')    

    if len(l) == 1:
        print('error in response', full_response, flush=True)


    del l[-1] # Last response is  empty

    # Create dataframe
    df['player_white'] = 0
    df['player_black'] = 0
    for game in l:
        game_parsed = response_parser(game)
        if game_parsed['White'].lower() == username.lower():
            df.loc[df['name'] == game_parsed['Opening'],'player_white'] += 1
        else:
            df.loc[df['name'] == game_parsed['Opening'],'player_black'] += 1

    # Generate statistics
    df = generate_base_statistics(df)
    return df
    
# Convert timeframe to timestamp used for Lichess API call
def timeframe_to_timestamp(timeframe):
    if timeframe == 'forever':
        return 31536000*10*1000
    elif timeframe == 'last 12 months':
        return 31536000*1000
    elif timeframe == 'last 3 months':
        return 7776000*1000
    elif timeframe == 'last month':
        return 2592000*1000
    elif timeframe == 'last week':
        return 604800*1000
    elif timeframe == 'last 24 hours':
        return 86400*1000

@app.route('/')
def hello_world():
    return 'Hello, Worlds2!'

@app.route('/session')
def session_test():
    return jsonify(session)


@app.route('/login')
def login():
    scheme = app.config['URI_SCHEME']
    redirect_uri = url_for("authorize", _external=True, _scheme=scheme)
    state = request.args.get('state')

    return oauth.lichess.authorize_redirect(redirect_uri, state=state)

@app.route('/authorize')
def authorize():
    error = request.args.get('error')
    state = request.args.get('state')

    url = app.config['FRONTEND_URL']

    if error:
        # Authorization was cancelled, handle it here
        # For example, redirect to a cancelled authorization page
        return redirect(f"{url}/authorization-cancelled?state={state}")

    token = oauth.lichess.authorize_access_token()
    session['bearer_token'] = token['access_token']
    session.modified = True
    print('setting bearer token', flush=True)

    redirect_url = f"{url}?state={state}"
    return redirect(redirect_url)

@socketio.on('connect')
def handle_connect():
    # Get the username from the query parameters
    print(f"Connect event received with args: {request.args}")
    socket_username = request.args.get('username')
    # Store the session ID for this username
    user_sids[socket_username] = request.sid

# Main route
@app.route('/openings', methods=['GET'])
#@profile_route
def send_data_to_frontend():

    stored_usernames = ['drnykterstein','rebeccaharris','alireza2003','nihalsarin2004']

    # Core data pull
    username = request.args.get('username')
    timeframe = request.args.get('timeframe')
    
    # Remove leading and trailing whitespace
    username = username.strip()
    
    token = session.get('bearer_token')  # Retrieve the token from the session

    url_key = request.args.get('id', 'none') # Return none by default

    # Current unix timestamp (ms) minus delta
    timestamp_to_use = int(time.time())*1000 - timeframe_to_timestamp(timeframe)

    # Load user data
    # Returned data will be a dict of username, timeframe, and dataframe
    # Username, timeframe may update from the original request if found in the database

    # Initialize df
    df = None

    print('pulling data for ', username, timeframe, url_key, flush=True)

    # CASE 1: User in DB
    if url_key != 'none' and url_key != None:
        username, timeframe, df = check_if_key_exists(url_key)
        print('case 1: user in db', flush=True)


    # CASE 2: User is stored
    if df is None:
        df = check_if_username_is_stored(username,timeframe,stored_usernames=stored_usernames)


    # CASE 3: User is not stored
    if df is None:
        streamed_response = []
        get_user_data(username,timestamp_to_use,token,streamed_response=streamed_response)
        df = parse_streamed_reponse(streamed_response,username)
        print('case 3: api call', flush=True)



    # Save data to db
    if username.lower() not in stored_usernames and url_key == 'none':
        with app.app_context():
            url_key = generate_url_key()
            db.session.add(Record(url_key=url_key, username=username, timeframe=timeframe, data=df.to_json()))
            db.session.commit()

    #####
    # Second batch of statistics to prepare for frontend
    # These are not saved to the database
    ####

    # Add additional info
    total_games = int(df['player_total'].sum())
    total_stamps = int(df['player_total_with_children'].sum())
    unique_stamps = int(len(df.where(df['player_total'] > 0).dropna()))
    unique_stamps_all = int(len(df))    

    # Initialize defaults for the case where no openings meet the criteria
    default = {'name': 'None', 'pgn': '', 'ply': 0,'fen': '8/8/8/4k3/3K4/8/8/8 w - - 0 1', 'player_white_with_children': 0, 'player_black_with_children': 0, 'ratio_white': 0, 'ratio_black': 0, 'popularity_rank': 0, 'all_pct': 0}

    # Most popular openings compared to average
    most_popular_white = df.sort_values(by='ratio_white', ascending=False).head(1).to_dict('records') if df['player_white_with_children'].sum() > 0 else [default]
    most_popular_black = df.sort_values(by='ratio_black', ascending=False).head(1).to_dict('records') if df['player_black_with_children'].sum() > 0 else [default]

    # Least popular openings compared to average, but have played at least 10 games
    df_most_popular_white_min10 = df.query('player_white_with_children >= 10').sort_values(by='ratio_white', ascending=False)
    most_popular_white_min10 = df_most_popular_white_min10.head(1).to_dict('records') if not df_most_popular_white_min10.empty else [default]

    df_most_popular_black_min10 = df.query('player_black_with_children >= 10').sort_values(by='ratio_black', ascending=False)
    most_popular_black_min10 = df_most_popular_black_min10.head(1).to_dict('records') if not df_most_popular_black_min10.empty else [default]

    most_popular_missing_stamp =  df.query('player_total_with_children == 0').sort_values(by='all_pct', ascending=False).head(1).iloc[0].to_dict()
    
    df_filtered = df.query('player_total_with_children >= 1').sort_values(by='all_pct', ascending=True)
    if df_filtered.empty:
        print('df empty', flush=True)
        print('username:', username, flush=True)
        print('timeframe:', timeframe, flush=True)

    most_obscure_stamp = df.query('player_total_with_children >= 1').sort_values(by='all_pct', ascending=True).head(1).iloc[0].to_dict()

    random_collected =  df[df['player_total_with_children'] > 0].sample(n=1).head(1).iloc[0].to_dict()
    random_missing =  df[df['player_total_with_children'] == 0].sample(n=1).head(1).iloc[0].to_dict()

    df['ratio'] = df['player_total_with_children'] / df['all_pct']
    least_favorite_played = df.query('player_total_with_children >= 1').sort_values(by='ratio', ascending=True).head(1).iloc[0].to_dict()
    deepest_ply = df.query('player_total_with_children >= 1').sort_values(by=['ply','player_total_with_children'], ascending=False).head(1).iloc[0].to_dict()

    #other_missing_stamps = df.query('player_total_with_children == 0').sort_values(by='all_pct', ascending=False).head(4)['name'].tolist()[1:4]
        
    # Specify columns and only return the columns that are needed to speed things up
    all_openings = df[['name','pgn','ply','fen','player_total_with_children']]
    df = df[['name','pgn','ply','fen','player_white_with_children','player_black_with_children','all_pct','white_pct_with_children','black_pct_with_children','popularity_rank']]

    # Return df as json
    return jsonify({
        'openings': all_openings.to_dict(orient='records'),
        'total_games': total_games,
        'total_stamps': total_stamps,
        'unique_stamps': unique_stamps,
        'unique_stamps_all': unique_stamps_all,
        'url_key': url_key if username.lower() not in stored_usernames else '',
        'loaded_username': username,
        'loaded_timeframe': timeframe,
        'most_popular_white': most_popular_white[0],
        'most_popular_white_min10': most_popular_white_min10[0],
        'most_popular_black': most_popular_black[0],
        'most_popular_black_min10': most_popular_black_min10[0],
        'most_popular_missing_stamp': most_popular_missing_stamp,
        'most_obscure_stamp': most_obscure_stamp,
        'random_collected': random_collected,
        'random_missing': random_missing,
        'least_favorite_played': least_favorite_played,
        'deepest_ply': deepest_ply
    })

if __name__ == '__main__':
    socketio.run(app)