import pandas as pd
import os

# Directory path
dir_path = "assets/openings_pgn"

# File names
file_names = ["a.tsv", "b.tsv", "c.tsv", "d.tsv", "e.tsv"]

# Create an empty list to store individual DataFrames
dfs = []

# Loop through each file name and read its content into a DataFrame
for file_name in file_names:
    file_path = os.path.join(dir_path, file_name)
    df = pd.read_csv(file_path, sep="\t")  # Read TSV file
    dfs.append(df)

# Concatenate all individual DataFrames into a single one
combined_df = pd.concat(dfs, ignore_index=True)

# Display the combined DataFrame
print(combined_df)

# Save the combined DataFrame to a new TSV file
combined_df.to_csv(os.path.join(dir_path, "combined.tsv"), sep="\t", index=False)