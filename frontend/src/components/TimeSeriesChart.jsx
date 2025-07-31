import { useEffect, useState } from 'react';
import axios from 'axios';
import TimeSeriesChart from '../components/TimeSeriesChart';

function TimeSeries() {
  const [timeSeries, setTimeSeries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/timeseries')
      .then(res => setTimeSeries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>📈 Time Series Visualization</h2>
      {timeSeries.length > 0 ? (
        timeSeries.map((sensor, idx) => (
          <div key={idx} style={{ marginBottom: '3rem' }}>
            <TimeSeriesChart sensorData={sensor} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TimeSeries;
