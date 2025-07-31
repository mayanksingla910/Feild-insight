from sqlalchemy import Column, Integer, Float, String, DateTime
from .database import Base

class SensorReading(Base):
    __tablename__ = 'sensor_readings'

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime)
    field_id = Column(Integer)
    sensor_type = Column(String)
    reading_value = Column(Float)
    unit = Column(String)