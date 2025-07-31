import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

function TimeSeries() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/timeseries')
      .then(res => setSeries(res.data))
      .catch(err => console.error('❌ Failed to fetch timeseries:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
  <h2> <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '6px' }} />
    Time Series Charts
  </h2>

  <div className="chart-grid">
    {series.map((sensor, idx) => {
      const data = {
        labels: sensor.data.map(point => new Date(point.timestamp).toLocaleTimeString()),
        datasets: [{
          label: `${sensor.sensor_type} (Field ${sensor.field_id})`,
          data: sensor.data.map(point => point.value),
          fill: false,
          borderColor: '#3B6E22',
          backgroundColor: '#3B6E22',
          tension: 0.2,
        }]
      };

      const options = {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { title: { display: true, text: 'Time' } },
          y: { title: { display: true, text: 'Reading Value' } }
        }
      };

      return (
        <div className="chart-card" key={idx}>
          <Line data={data} options={options} height={200} />
        </div>
      );
    })}
  </div>
</div>
  );
}

export default TimeSeries;
