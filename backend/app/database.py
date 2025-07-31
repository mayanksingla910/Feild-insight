from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DataBase_URL = os.getenv("DATABASE_URL")

engine = create_engine(DataBase_URL)
SessionLocal = sessionmaker(bind=engine,
                             autocommit=False,
                             autoflush=False)
Base = declarative_base()