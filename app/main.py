# main.py
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from models import init_db  # Import init_db from models

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'  # Use SQLite for simplicity

init_db(app)  # Initialize the SQLAlchemy instance with the Flask app