import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AnalyticsChart({ data }) {
  const labels = data.map(item => `${item.sensor_type} (Field ${item.field_id})`);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Average',
        data: data.map(d => d.avg_value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Min',
        data: data.map(d => d.min_value),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Max',
        data: data.map(d => d.max_value),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} height={100}/>;
}

export default AnalyticsChart;
