# view_records.py
from models import Record
from main import app

# Fetch all records from the Record table
with app.app_context():
    records = Record.query.all()

# Print out each record
for record in records:
    print(record.username, record.timeframe, record.url_key)