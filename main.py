# main.py
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from models import init_db  # Import init_db from models

import os
from dotenv import load_dotenv


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
load_dotenv()

# Use SQLite for local development and PostgreSQL for production

if os.getenv('FLASK_ENV') == 'development':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL').replace("postgres://", "postgresql://", 1)


init_db(app)  # Initialize the SQLAlchemy instance with the Flask app