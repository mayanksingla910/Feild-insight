
# 🌾 Field Insight Dashboard

A full-stack sensor analytics dashboard that enables farmers, researchers, and agronomists to visualize, manage, and submit real-time sensor data (temperature, humidity, soil moisture) from agricultural fields.

---

## 🚀 Live Demo

**Frontend:** [View on Vercel](https://feild-insight.vercel.app?_vercel_share=IcQ9RvdZepEqlchohDwtesuZqqSehVgU)  
**Backend:** [API on Render](https://feild-insight.onrender.com/analytics)  

---

## 🛠 Tech Stack

### 🖥 Frontend
- **React + Vite**
- **Chart.js** for Time Series Visualization
- **Axios** for HTTP requests
- **Font Awesome** for icons
- **Responsive UI** with CSS Flex/Grid

### ⚙ Backend
- **FastAPI** (Python)
- **Pydantic** for validation
- **PostgreSQL** via **SQLAlchemy**
- **CORS + Uvicorn** server
- **Deployed via Render**

---

## 📊 Key Features

- 🔁 **Real-time sensor chart visualizations** (by field, sensor type)
- 🧾 **Submit sensor data** in 3 ways:
  - Dynamic form
  - JSON text input
  - JSON file upload
- 📈 **Time Series charts** (2 per row on large screens, responsive on mobile)
- ✅ **Unit auto-fill** based on sensor type
- ♻️ **Multiple readings supported**
- 🗑️ Ability to delete added entries dynamically
- 🌐 Fully deployed and integrated

---

## 📁 Folder Structure

```
field-insight-dashboard/
├── backend/
│   ├──app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── schemas.py
│   │   ├── tasks.py
│   ├── celery_worker.py
│   ├── requirements.txt
│
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── submit/
│   │   │   │   ├── FileUpload.jsx
│   │   │   │   ├── JsonUpload.jsx
│   │   │   │   ├── ReadingForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── TimeSeriesChart.jsx
│   │   │   ├── TimeSeriesChart.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SubmitData.jsx
│   │   │   ├── TimeSeries.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles/
│   │       ├── global.css
│   │       ├── navbar.css
│   │       ├── form.css
```

---

## 📦 API Endpoints

| Method | Endpoint        | Description                       |
|--------|------------------|-----------------------------------|
| `POST` | `/submit`        | Submit one or multiple readings  |
| `GET`  | `/analytics`     | Aggregated analytics per field   |
| `GET`  | `/timeseries`    | Full time series chart data      |

Payload Example:
```json
{
  "readings": [
    {
      "timestamp": "2025-01-30T10:00:00Z",
      "field_id": 1,
      "sensor_type": "temperature",
      "reading_value": 23.5,
      "unit": "°C"
    }
  ]
}
```

---

## ⚙️ Setup Instructions (Local)

### 🔧 Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

> Create a `.env` file in frontend and set:
```env
VITE_BACKEND_URL=http://localhost:8000
```

---

## 🌐 Deployment

### Backend (Render)
- Create a new Python web service
- Set:
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `uvicorn main:app --host 0.0.0.0 --port 8000`
  - Add `DATABASE_URL` as environment variable

### Frontend (Vercel)
- Connect to GitHub repo
- Set:
  - Framework: React
  - Output Dir: `dist`
  - Build Cmd: `npm run build`
  - Set `VITE_BACKEND_URL=https://your-api-url.onrender.com`

---

## 🧪 Sample JSON Upload Format

```json
{
  "readings": [
    {
      "timestamp": "2025-01-30T10:00:00Z",
      "field_id": 1,
      "sensor_type": "moisture",
      "reading_value": 45.2,
      "unit": "%"
    }
  ]
}
```

---

## 💡 Future Improvements

- ⏱️ Date filtering for analytics
- 👥 User authentication (JWT)
- 📍 Field maps with geolocation
- 🌍 Internationalization

---

## 👨‍💻 Author

**Mayank Singla**  
[GitHub](https://github.com/mayanksingla910)  
[LinkedIn](https://www.linkedin.com/in/mayanksingla910)  

---

## 📄 License

MIT License © 2025

---
