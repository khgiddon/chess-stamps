
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import requests

app = Flask(__name__)
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

# Get user data
def get_user_data(username,defaultusername='khg002'):

    """
    This script uses the Lichess API to export the games of a user
    Documentation at: https://lichess.org/api#tag/Games/operation/apiGamesUser

    It counts the number of games played with each opening
    And joins it to the overall database of openings with their counts

    """

    # If no username is provided, load the default file
    if username == None or username == defaultusername:
        # Load default file
        base_file = "assets/base_file.tsv"
        df = pd.read_csv(base_file, sep="\t")
        return df
    
    else:

        # Get overall data
        openings_db = "assets/openings_pgn/combined_with_stats_parents.tsv"
        df = pd.read_csv(openings_db, sep="\t")

        # Get user data
        max = 100

        print('querying lichess api...')
        headers = {"Content-Type": "application/x-ndjson"}
        url = f"https://lichess.org/api/games/user/{username}?pgnInJson=true&opening=true&max={max}&moves=false"
        response = requests.get(url,headers=headers)
        print('received response from lichess api')

        # Parse and create data
        l = response.content.decode('utf-8').split('\n\n\n')
        print(f'length of response: {len(l)}')

        if len(l) == 1:
            print(response.content.decode('utf-8'))

        del l[-1] # Last response is empty

        df['player_white'] = 0
        df['player_black'] = 0

        for game in l:
            game_parsed = response_parser(game)
            if game_parsed['White'] == username:
                df.loc[df['name'] == game_parsed['Opening'],'player_white'] += 1
            else:
                df.loc[df['name'] == game_parsed['Opening'],'player_black'] += 1

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
        
        return df

@app.route('/')
def hello_world():
    return 'Hello, Worlds!'

@app.route('/openings', methods=['GET'])
def get_data():

    print('hello world3')

    # Core data pull
    username = request.args.get('username')
    df = get_user_data(username)

    # Add additional info
    total_games = int(df['player_total'].sum())
    total_stamps = int(df['player_total_with_children'].sum())

    """
    # Most popular openings compared to average
    # Least popular openings compared to average, but have played
    # Top missing stamps
    """

    # Test
    print(df.query('player_total_with_children >= 1').sort_values(by='all_pct', ascending=True).head(1).iloc[0])
    print(df.query('player_total_with_children >= 1').sort_values(by='all_pct', ascending=True).head(1).iloc[0].to_dict())

    most_popular_white = df.sort_values(by='ratio_white',ascending=False).head(1).iloc[0].to_dict()
    most_popular_white_min10 = df.query('player_white_with_children >= 10').sort_values(by='ratio_white', ascending=False).head(1).iloc[0].to_dict()

    most_popular_black = df.sort_values(by='ratio_black',ascending=False).head(1).iloc[0].to_dict()
    most_popular_black_min10 = df.query('player_black_with_children >= 10').sort_values(by='ratio_black', ascending=False).head(1).iloc[0].to_dict()

    most_popular_missing_stamp =  df.query('player_total_with_children == 0').sort_values(by='all_pct', ascending=False).head(1).iloc[0].to_dict()
    most_obscure_stamp = df.query('player_total_with_children >= 1').sort_values(by='all_pct', ascending=True).head(1).iloc[0].to_dict()

    other_missing_stamps = df.query('player_total_with_children == 0').sort_values(by='all_pct', ascending=False).head(4)['name'].tolist()[1:4]
    print(other_missing_stamps)

    #print(most_popular_missing_stamp)
    #print(most_obscure_stamp)


    # Specify columns and only return the columns that are needed to speed things up
    df = df[['name','pgn','player_white_with_children','player_black_with_children','all_pct','white_pct_with_children','black_pct_with_children']]

    # For now, we'll just return the dataframe data as JSON
    return jsonify({
        'openings': df.to_dict(orient='records'),
        'total_games': total_games,
        'total_stamps': total_stamps,
        'loaded_username': username,
        'most_popular_white': most_popular_white,
        'most_popular_white_min10': most_popular_white_min10,
        'most_popular_black': most_popular_black,
        'most_popular_black_min10': most_popular_black_min10,
        'most_popular_missing_stamp': most_popular_missing_stamp,
        'most_obscure_stamp': most_obscure_stamp
    })

if __name__ == '__main__':
    app.run(debug=True)