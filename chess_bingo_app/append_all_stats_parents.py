import pandas as pd

# Get overall data
openings_db = "assets/openings_pgn/combined_with_stats.tsv"
df = pd.read_csv(openings_db, sep="\t")

# Some of the opening names have duplicate names. We care about names, so we're going to remove duplicate
# Keep the duplicate name with the highest number of games
df = df.sort_values(by=['name', 'games'], ascending=[True, False])
df = df.drop_duplicates(subset='name', keep='first')

# Find parents
def is_parent(uci_parent, uci_child):
    #print(uci_parent,uci_child)
    return uci_child[:len(uci_parent)] == uci_parent

# List to store parents for each row
parents_list = []

# For each row in the dataframe
df = df.sort_values(by='games', ascending=False)

for index, row in df.iterrows():
    uci_moves_current = eval(row['uci_moves'])
    potential_parents = df[df['uci_moves'].str.len() < len(row['uci_moves'])]
    
    # If there are potential parents
    if not potential_parents.empty:
        parents = potential_parents[potential_parents['uci_moves'].apply(lambda x: is_parent(eval(x), uci_moves_current))]['name'].tolist()
    else:
        parents = []
    parents_list.append(parents)

df['parents'] = parents_list

df.to_csv("assets/openings_pgn/combined_with_stats_parents.tsv", sep="\t", index=False)