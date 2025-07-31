import { useEffect, useState } from 'react';
import axios from 'axios';
import AnalyticsChart from '../components/AnalyticsChart';
import { faChartColumn} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Dashboard() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/analytics')
      .then(res => setAnalytics(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2> <FontAwesomeIcon icon={faChartColumn} style={{ marginRight: '6px' }} />
        Analytics Dashboard
      </h2>
      <div className="chart-container">
        {analytics.length > 0 ? (
          <AnalyticsChart data={analytics} height={200}/>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
