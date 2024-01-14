# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

def init_db(app):
    db.init_app(app)

class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    record_created_at = db.Column(db.DateTime, default=datetime.utcnow)    
    url_key = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(64), nullable=False)
    timeframe = db.Column(db.String(64), nullable=False)
    data = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        return f'<Record {self.id}, {self.url_key}, {self.username}, {self.timeframe}, {self.data}>'