from app.tasks import celery

# Important so it auto-discovers tasks inside app.tasks
celery.autodiscover_tasks(['app.tasks'])

# Start with:
# celery -A backend.celery_worker worker --loglevel=info
