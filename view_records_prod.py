from sqlalchemy import create_engine, text, func, distinct
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

# Fetch the last 50 records from the Record table
records = session.query(Record).order_by(Record.record_created_at.desc()).limit(50).all()


# Print out each record
for record in records:
    print(record.username, record.record_created_at, record.timeframe, record.url_key)

# Get the count of all records
count = session.query(func.count(Record.id)).scalar()

# Get the count of distinct usernames
distinct_usernames_count = session.query(func.count(distinct(Record.username))).scalar()

print(f"Total records: {count}")
print(f"Distinct usernames: {distinct_usernames_count}")

# Close the session
session.close()

# Truncate the table
#truncate()