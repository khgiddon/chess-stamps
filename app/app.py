
from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import pandas as pd
import numpy as np
import requests
import os
import json
from dotenv import load_dotenv

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins="*")
CORS(app)  # This will allow the frontend to make requests to this server


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

def generate_base_statistics(df):
    # Begin generating stats

    # Credit openings with children
    df['player_white_with_children'] = df['player_white']
    df['player_black_with_children'] = df['player_black']
    for index, row in df.iterrows():
        parents = eval(row['parents'])
        if len(parents) > 0:
            for parent in parents:
                df.loc[df['name'] == parent,'player_white_with_children'] += row['player_white']
                df.loc[df['name'] == parent,'player_black_with_children'] += row['player_black']

    # Clean and analyze
    df['player_total'] = df['player_white'] + df['player_black']
    df['player_total_with_children'] = df['player_white_with_children'] + df['player_black_with_children']
    df['all_pct'] = df['games'] / df['games'].sum()
    df['player_pct'] = df['player_total'] / df['player_total'].sum()
    df['player_pct_with_children'] = df['player_total_with_children'] / df['player_total_with_children'].sum()
    df['white_pct'] = df['player_white'] / df['player_white'].sum()
    df['white_pct_with_children'] = df['player_white_with_children'] / df['player_white_with_children'].sum()
    df['black_pct'] = df['player_black'] / df['player_black'].sum()
    df['black_pct_with_children'] = df['player_black_with_children'] / df['player_black_with_children'].sum()

    # Ratios and handle division by zero
    df['ratio_white'] = np.where(df['all_pct'] == 0, 0, df['white_pct_with_children'] / df['all_pct'])
    df['ratio_black'] = np.where(df['all_pct'] == 0, 0, df['black_pct_with_children'] / df['all_pct'])
    
    #df.to_csv("assets/base_file.tsv", sep="\t", index=False)

    return(df)


# Get user data
def get_user_data(username,defaultusername='khg002'):

    """
    This script uses the Lichess API to export the games of a user
    Documentation at: https://lichess.org/api#tag/Games/operation/apiGamesUser

    It counts the number of games played with each opening
    And joins it to the overall database of openings with their counts

    """

    # If no username is provided, load the default file (for dev purposes)
    if username == None or username == defaultusername:
        # Load default file
        base_file = "assets/base_file.tsv"
        df = pd.read_csv(base_file, sep="\t")
        return df
    
    else:

        print(f'\n\n\n\n username {username} \n\n\n\n')

        # Get overall data
        openings_db = "assets/openings_pgn/combined_with_stats_parents.tsv"
        df = pd.read_csv(openings_db, sep="\t")
        print(f'querying lichess api for {username}...')

        # Get user data
        max = 150

        

        print(f'querying lichess api for {username}...')

        # Read the lichessToken
        load_dotenv()
        lichessToken = os.getenv("lichessToken")

        # First request is to get the number of games
        headers = {
            "Content-Type": "application/x-ndjson",
            "Authorization": f"Bearer {lichessToken}"
        }
        url = f"https://lichess.org/api/user/{username}"   
        response = requests.get(url,headers=headers)
        d = json.loads(response.content.decode('utf-8'))
        games_to_pull = sum(d['perfs'][game_type]['games'] for game_type in ['bullet', 'blitz', 'rapid', 'classical'])
        print(f'games to pull: {games_to_pull} for {username}')

        # Second request is to pull the actual games
        chunks_expected = min(games_to_pull,max)   
        chunks = 0
        response_test = []
        url = f"https://lichess.org/api/games/user/{username}?pgnInJson=true&opening=true&max={max}&moves=false&perfType=bullet,blitz,rapid,classical"
        response = requests.get(url,headers=headers,stream=True)
        print('received response from lichess api')
        for chunk in response.iter_content(chunk_size=1024):
            percentage_complete = f'{(chunks / chunks_expected) * 100:.1f}'
            socketio.emit('progress', {'percentage_complete': percentage_complete, 'chunks_expected': chunks_expected})
            chunks += 1
            print(percentage_complete)
            response_test.append(chunk)

        # Parse and create data
        full_response = b''.join(response_test).decode('utf-8')
        l = full_response.split('\n\n\n')    
        print(f'length of response: {len(l)}')

        if len(l) == 1:
            print(response.content.decode('utf-8'))
        del l[-1] # Last response is empty

        # Create dataframe
        df['player_white'] = 0
        df['player_black'] = 0
        for game in l:
            game_parsed = response_parser(game)
            if game_parsed['White'] == username:
                df.loc[df['name'] == game_parsed['Opening'],'player_white'] += 1
            else:
                df.loc[df['name'] == game_parsed['Opening'],'player_black'] += 1

        # Generate statistics
        df = generate_base_statistics(df)
        return df

@app.route('/')
def hello_world():
    return 'Hello, Worlds!'

@app.route('/openings', methods=['GET'])
def send_data_to_frontend():

    print('running get_data()')

    # Core data pull
    username = request.args.get('username')
    df = get_user_data(username)

    #print(df.columns)

    # Add additional info
    total_games = int(df['player_total'].sum())
    total_stamps = int(df['player_total_with_children'].sum())
    unique_stamps = int(len(df.where(df['player_total'] > 0).dropna()))
    unique_stamps_all = int(len(df))    


    """
    # Most popular openings compared to average
    # Least popular openings compared to average, but have played
    # Top missing stamps
    """

    # Most popular openings compared to average
    most_popular_white = df.sort_values(by='ratio_white', ascending=False).head(1).to_dict('records')
    most_popular_black = df.sort_values(by='ratio_black', ascending=False).head(1).to_dict('records')

    # Initialize defaults for the case where no openings meet the criteria
    default = {'name': 'None', 'pgn': '', 'fen': '8/8/8/4k3/3K4/8/8/8 w - - 0 1', 'player_white_with_children': 0, 'player_black_with_children': 0, 'ratio_white': 0, 'ratio_black': 0}

    # Least popular openings compared to average, but have played at least 10 games
    df_most_popular_white_min10 = df.query('player_white_with_children >= 10').sort_values(by='ratio_white', ascending=False)
    most_popular_white_min10 = df_most_popular_white_min10.head(1).to_dict('records') if not df_most_popular_white_min10.empty else [default]

    df_most_popular_black_min10 = df.query('player_black_with_children >= 10').sort_values(by='ratio_black', ascending=False)
    most_popular_black_min10 = df_most_popular_black_min10.head(1).to_dict('records') if not df_most_popular_black_min10.empty else [default]

    most_popular_missing_stamp =  df.query('player_total_with_children == 0').sort_values(by='all_pct', ascending=False).head(1).iloc[0].to_dict()
    most_obscure_stamp = df.query('player_total_with_children >= 1').sort_values(by='all_pct', ascending=True).head(1).iloc[0].to_dict()

    random_collected =  df[df['player_total_with_children'] > 0].sample(n=1).head(1).iloc[0].to_dict()
    random_missing =  df[df['player_total_with_children'] == 0].sample(n=1).head(1).iloc[0].to_dict()

    print(most_obscure_stamp)
    print(random_missing)

    other_missing_stamps = df.query('player_total_with_children == 0').sort_values(by='all_pct', ascending=False).head(4)['name'].tolist()[1:4]
        
    #print('other_missing_stamps:',other_missing_stamps)

    # Specify columns and only return the columns that are needed to speed things up
    df = df[['name','pgn','fen','player_white_with_children','player_black_with_children','all_pct','white_pct_with_children','black_pct_with_children']]

    print('returning json')

    # For now, we'll just return the dataframe data as JSON
    return jsonify({
        #'openings': df.to_dict(orient='records'),
        'total_games': total_games,
        'total_stamps': total_stamps,
        'unique_stamps': unique_stamps,
        'unique_stamps_all': unique_stamps_all,
        'loaded_username': username,
        'most_popular_white': most_popular_white[0] if most_popular_white else default,
        'most_popular_white_min10': most_popular_white_min10[0],
        'most_popular_black': most_popular_black[0] if most_popular_black else default,
        'most_popular_black_min10': most_popular_black_min10[0],
        'most_popular_missing_stamp': most_popular_missing_stamp,
        'most_obscure_stamp': most_obscure_stamp,
        'other_missing_stamps': other_missing_stamps,
        'random_collected': random_collected,
        'random_missing': random_missing
    })

if __name__ == '__main__':
    app.run(debug=True)