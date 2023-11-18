How to run the application locally, using `/app` as the root directory:

1. Install the Python dependencies:
    1. Run `python -m venv venv` to create a virtual environment.
    2. Run `source venv/bin/activate` to activate the virtual environment.
    3. Run `pip install -r requirements.txt` to install the dependencies.
1. `.env` needs to be configured with the lichessToken credential.
1. Enter the terminal command: `flask run` to run the Flask server. This will start the Flask server, typically on http://127.0.0.1:5000.
1. In a new terminal instance, run `cd client` to enter the client directory.
1. If you haven't already installed the project dependencies, run `npm install` to install them.
1. Run `npm start` to start the React server. This will start the React server, typically on http://localhost:3000.