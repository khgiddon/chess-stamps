import chess
import chess.pgn
import io
import pandas as pd
import requests
from time import sleep

def pgn_to_fen_and_ply(pgn_text):
    pgn = io.StringIO(pgn_text)
    game = chess.pgn.read_game(pgn)
    
    # Get the board from the game
    board = game.board()

    # Traverse through all moves and play them on a board
    ply_count = 0
    for move in game.mainline_moves():
        board.push(move)
        ply_count += 1

    return board.fen(), ply_count

openings_db = "assets/openings_pgn/combined_with_stats_parents.tsv"
df = pd.read_csv(openings_db, sep="\t")

df['fen'], df['ply'] = zip(*df['pgn'].apply(pgn_to_fen_and_ply))

df.to_csv("assets/openings_pgn/combined_with_stats_parents.tsv", sep="\t", index=False)