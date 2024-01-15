from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Record
import os
from dotenv import load_dotenv

# Get the DATABASE_URL from environment variables
load_dotenv()
print(os.getenv('DATABASE_URL'))
database_url = os.getenv('DATABASE_URL').replace("postgres://", "postgresql://", 1)

# Create an engine that stores database-specific information
engine = create_engine(database_url)

# Create a configured "Session" class
Session = sessionmaker(bind=engine)

# Create a session
session = Session()

# Fetch all records from the Record table
records = session.query(Record).all()

# Print out each record
for record in records:
    print(record.username, record.record_created_at, record.timeframe, record.url_key)

# Close the session
session.close()