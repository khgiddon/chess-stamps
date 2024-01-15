# db_setup.py
from models import db, Record, init_db
from app import app

# Drop all tables and recreate them
with app.app_context():
    db.drop_all()
    db.create_all()

# Add a record to the Record table
with app.app_context():
    db.session.add(Record(url_key='test', username='test', timeframe='test', data='{}'))
    db.session.commit()

# Fetch all records from the Record table
with app.app_context():
    records = Record.query.all()

# Print out each record
for record in records:
    print(record)