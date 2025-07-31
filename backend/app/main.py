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
    try:
        readings = []
        for entry in payload.readings:
            reading = models.SensorReading(**entry.dict())
            db.add(reading)
            readings.append(reading)
        db.commit()

        tasks.calculate_analytics.delay()
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

func.avg(models.SensorReading.reading_value).label("avg_value")
    ).group_by(models.SensorReading.sensor_type, models.SensorReading.field_id).all()

    return [
        schemas.AnalyticsResponse(
            sensor_type=s[0], field_id=s[1], avg_value=round(s[2], 2)
        ) for s in results
    ]