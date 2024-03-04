import requests

# Open the input and output files
with open('assets/openings_pgn/combined_with_stats_parents.tsv', 'r') as infile, open('combined_with_eval.tsv', 'w') as outfile:
    # Write the header line to the output file
    outfile.write(next(infile).strip() + '\tevaluation\n')

    # Read the file line by line
    for line in infile:
        # Split the line into fields
        fields = line.split('\t')

        # Get the FEN (it's the 7th field)
        fen = fields[6]
        name = fields[1]

        try:
            # Use the FEN to get the evaluation from the lichess API
            response = requests.get(f'https://lichess.org/api/cloud-eval?fen={fen}')
            response.raise_for_status()  # Raises a HTTPError if the status is 4xx, 5xx

            # Extract the evaluation from the JSON response
            evaluation = response.json()['pvs'][0]['cp']

            print(f"{name}: {evaluation}")

        except (requests.exceptions.HTTPError, KeyError):
            print(f"No evaluation available for FEN: {fen}")
            evaluation = 'null'  # Use 'null' for no evaluation

        # Write the line with the evaluation to the output file
        outfile.write(line.strip() + '\t' + str(evaluation) + '\n')