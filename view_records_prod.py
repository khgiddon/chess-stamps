from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from models import Record
import os
from dotenv import load_dotenv

def truncate():
    # Start a new session
    session = Session()

    # Truncate the Record table
    session.execute(text("TRUNCATE TABLE Record"))

    # Commit the changes
    session.commit()

    # Close the session
    session.close()

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

print("Record count:", len(records))

# Unique username count
unique_usernames = session.query(Record.username).distinct().count()
print("Unique usernames:", unique_usernames)

# Close the session
session.close()

# Truncate the table
#truncate()