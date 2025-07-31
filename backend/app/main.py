import traceback
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .import models, schemas, tasks
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/submit")
async def submit_sensor_data(payload: schemas.BatchSensorUpload,
                             db: Session = Depends(get_db)):
    print("➡️ /submit endpoint HIT")
    try:
        print("Payload:", payload)
        readings = []

        for entry in payload.readings:
            print("Reading:", entry)
            reading = models.SensorReading(**entry.model_dump())
            db.add(reading)
            readings.append(reading)

        db.commit()

        # tasks.calculate_analytics.delay()  # comment during test
        return {"message": f"{len(readings)} readings received, analyzing..."}

    except Exception as e:
        print(f"Error while processing data: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.get("/analytics", response_model=list[schemas.AnalyticsResponse])
def get_analytics(db: Session = Depends(get_db)):
    from sqlalchemy import func

    results = db.query(
        models.SensorReading.sensor_type,
        models.SensorReading.field_id,
        func.avg(models.SensorReading.reading_value).label("avg_value"),
        func.min(models.SensorReading.reading_value).label("min_value"),
        func.max(models.SensorReading.reading_value).label("max_value"),
        func.count(models.SensorReading.id).label("count")
    ).group_by(
        models.SensorReading.sensor_type,
        models.SensorReading.field_id
    ).all()

    return [
        schemas.AnalyticsResponse(
            sensor_type=row[0],
            field_id=row[1],
            avg_value=round(row[2], 2),
            min_value=round(row[3], 2),
            max_value=round(row[4], 2),
            count=row[5]
        ) for row in results
    ]

@app.get("/timeseries", response_model=list[schemas.TimeSeriesResponse])
def get_timeseries(db: Session = Depends(get_db)):
    from sqlalchemy import asc

    readings = db.query(
        models.SensorReading.sensor_type,
        models.SensorReading.field_id,
        models.SensorReading.timestamp,
        models.SensorReading.reading_value
    ).order_by(
        models.SensorReading.sensor_type,
        models.SensorReading.field_id,
        asc(models.SensorReading.timestamp)
    ).all()

    grouped = {}
    for sensor_type, field_id, timestamp, value in readings:
        key = (sensor_type, field_id)
        if key not in grouped:
            grouped[key] = []
        grouped[key].append({
            "timestamp": timestamp,
            "value": value
        })

    response = []
    for (sensor_type, field_id), data in grouped.items():
        response.append(schemas.TimeSeriesResponse(
            sensor_type=sensor_type,
            field_id=field_id,
            data=data
        ))

    return response