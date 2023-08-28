# %%
import chess
import chess.pgn
import io
import pandas as pd
import requests
from time import sleep

"""This script gets the total number of games played for each opening in the combined.tsv file."""

def pgn_to_uci(pgn_text):
    pgn = io.StringIO(pgn_text)
    game = chess.pgn.read_game(pgn)

    # Get the game's mainline moves
    mainline_moves = game.mainline_moves()
    
    uci_moves = [move.uci() for move in mainline_moves]
    return uci_moves

def get_stats(uci_moves):
    url = f"https://explorer.lichess.ovh/lichess?variant=standard&speeds=ultraBullet,bullet,blitz,rapid,classical,correspondence&play={','.join(uci_moves)}"

    response = requests.get(url)
    response.raise_for_status()

    data = response.json()
    total_games = data['white'] + data['black'] + data['draws']

    sleep(1.5)

    return total_games


openings_db = "assets/openings_pgn/combined.tsv"
df = pd.read_csv(openings_db, sep="\t")

# Create a new column called "uci_moves" and apply the pgn_to_uci function to each row
df['uci_moves'] = df['pgn'].apply(pgn_to_uci)

# Create a new column called "games" and get the total number of games played for each opening
df['games'] = df['uci_moves'].apply(get_stats)


df.to_csv("assets/openings_pgn/combined_with_stats.tsv", sep="\t", index=False)

# %%



