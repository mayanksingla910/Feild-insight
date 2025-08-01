import { useEffect, useState } from 'react';
import axios from 'axios';
import AnalyticsChart from '../components/AnalyticsChart';
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://feild-insight.onrender.com/analytics`)
      .then(res => {
        const grouped = groupBySensorType(res.data);
        setAnalytics(grouped);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const groupBySensorType = (data) => {
    const grouped = {};
    data.forEach(entry => {
      if (!grouped[entry.sensor_type]) {
        grouped[entry.sensor_type] = [];
      }
      grouped[entry.sensor_type].push(entry);
    });
    return grouped;
  };

  return (
    <div className="container">
      <h2>
        <FontAwesomeIcon icon={faChartColumn} style={{ marginRight: '6px' }} />
        Analytics Dashboard
      </h2>

      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        Object.entries(analytics).map(([sensorType, sensorData]) => (
          <div key={sensorType} className="chart-container">
            <h3 style={{ marginTop: '2rem' }}>{sensorType.toUpperCase()} DATA</h3>
            <AnalyticsChart data={sensorData} height={100} />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
