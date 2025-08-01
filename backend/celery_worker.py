from app.tasks import celery

try:
    celery.autodiscover_tasks(['app.tasks'])
except Exception as e:
    print("Celery worker failed to discover tasks:", e)

# Start with:
# celery -A backend.celery_worker worker --loglevel=info --pool=solo
