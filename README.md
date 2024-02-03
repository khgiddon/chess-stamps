# Chess Stamps

Live URL: 
https://www.chessstamps.app


## Getting Started
Chess Stamps uses a Flask backend and a React frontend. API calls to the Lichess API are made from the backend.

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have Node.js, npm, and Python installed on your machine. You can install Node.js and npm from the [official Node.js website](https://nodejs.org/) and Python from the [official Python website](https://www.python.org/).

### Setting Up a Virtual Environment

This project uses a virtual environment to manage Python dependencies. To set up the virtual environment:

1. Navigate to the project directory in your terminal.
2. Create a new virtual environment by running the following command:

```bash
python3 -m venv venv
```

#### Activate the virtual environment:

On Windows, run:

```bash
venv\Scripts\activate
```

On Unix or MacOS, run:

```bash
source venv/bin/activate
```


### Installing

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Navigate to the project directory:

```bash
cd <project_directory>
```

3. Install the backend dependencies:

```bash
pip install -r requirements.txt
```

4. Navigate to the client directory:

```bash
cd client
```

5. Install the frontend dependencies:

```bash
npm install
```

6. Create a `.env` file in the project directory and add your environment variables:

```env
lichessToken = '<your_lichess_token>'
FLASK_ENV = 'development'
LICHESS_CLIENT_ID="lichess-oauth-flask"
SECRET_KEY="<secret_key>"
AUTH_METHOD="oauth"
```

Replace `<your_lichess_token>` with a personal access token described [here](https://lichess.org/api#section/Introduction/Authentication). This is to provide another auth method for dev purposes without having to go through OAuth every time. To stop using OAuth, you can change the `AUTH_METHOD` described in `env.`.

 `<SECRET_KEY>` is a static secret key for the Flask app. You can generate a secret key using the following Python code:

```python
import secrets
print(secrets.token_hex(16))
```

### Running the Application

To run the backend, navigate to the project directory and execute the following command:

```bash
flask run
```

To run the frontend, navigate to the `client` directory and execute the following command:

```bash
npm start
```

The backend will start and be available at `http://localhost:5000`, and the frontend will be available at `http://localhost:3000`.

## Built With

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- Chessboard component from [react-chessboard](https://www.npmjs.com/package/react-chessboard)
- Some styles and components from [Material-UI](https://material-ui.com/). Styling is a mix of CSS and MUI.
- [Lichess API](https://lichess.org/api) for game data


## Authors

- Kyle Giddon

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributing

To contribute to this project, please open an issue or a pull request.

