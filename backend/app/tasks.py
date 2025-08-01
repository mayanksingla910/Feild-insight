import os
from celery import Celery
from .database import SessionLocal
from . import models
from sqlalchemy import func
from dotenv import load_dotenv
import ssl

load_dotenv()

redis_url = os.getenv("REDIS_URL")

celery = Celery("worker", broker=redis_url, backend=redis_url)

celery.conf.update(
    broker_use_ssl={
        "ssl_cert_reqs": ssl.CERT_NONE  # Use CERT_REQUIRED in production with proper certs
    },
    redis_backend_use_ssl={
        "ssl_cert_reqs": ssl.CERT_NONE
    }
)

@celery.task
def calculate_analytics():
    db = SessionLocal()
    try:
        results = db.query(
            models.SensorReading.sensor_type,
            models.SensorReading.field_id,

            # functions for analytics
            func.avg(models.SensorReading.reading_value).label("avg_value"),
            func.min(models.SensorReading.reading_value).label("min_value"),
            func.max(models.SensorReading.reading_value).label("max_value"),
            func.count(models.SensorReading.id).label("count")
        ).group_by(
            models.SensorReading.sensor_type,
            models.SensorReading.field_id
        ).all()

        print("\n Analytics Calculated:")
        for sensor_type, field_id, avg, min_, max_, count in results:
            print(f"🔹 Field {field_id} - {sensor_type}")
            print(f"   ➤ Avg: {round(avg, 2)} | Min: {round(min_, 2)} | Max: {round(max_, 2)} | Count: {count}\n")

    except Exception as e:
        print(" Error in analytics calculation:", e)
    finally:
        db.close()
