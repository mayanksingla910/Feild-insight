from pydantic import BaseModel
from datetime import datetime

class SensorReadingCreate(BaseModel):
    timestamp : datetime
    field_id : int
    sensor_type : str
    reading_value : float
    unit : str

class BatchSensorUpload(BaseModel):
    readings : list[SensorReadingCreate]

class AnalyticsResponse(BaseModel):
    sensor_type : str
    field_id : int
    avg_value : float