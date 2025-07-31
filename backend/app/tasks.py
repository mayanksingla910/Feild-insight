from celery import Celery
from .database import SessionLocal
from . import models
from sqlalchemy import func

celery = Celery(
    __name__,
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0'
)

@celery.task
def calculate_analytics():
    db = SessionLocal()
    try:
        results = db.query(
            models.SensorReading.sensor_type,
            models.SensorReading.field_id,
            func.avg(models.SensorReading.reading_value).label("avg_value")
        ).group_by(models.SensorReading.sensor_type, models.SensorReading.field_id).all()

        print("\n📊 Analytics Calculated:")
        for sensor_type, field_id, avg_value in results:
            print(f"Field {field_id} - {sensor_type}: {round(avg_value, 2)}")

    finally:
        db.close()
