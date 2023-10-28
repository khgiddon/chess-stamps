import chess
import chess.pgn
import io
import pandas as pd
import requests
from time import sleep

def pgn_to_fen(pgn_text):
    pgn = io.StringIO(pgn_text)
    game = chess.pgn.read_game(pgn)
    
    # Get the board from the game
    board = game.board()

    # Traverse through all moves and play them on a board
    for move in game.mainline_moves():
        board.push(move)

    return board.fen()

openings_db = "assets/openings_pgn/combined_with_stats_parents.tsv"
df = pd.read_csv(openings_db, sep="\t")
df['fen'] = df['pgn'].apply(pgn_to_fen)

df.to_csv("assets/openings_pgn/combined_with_stats_parents.tsv", sep="\t", index=False)
