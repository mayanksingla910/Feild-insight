import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SubmitData from './pages/SubmitData';
import TimeSeries from './pages/TimeSeries';
import Navbar from './components/Navbar';
import './styles/layout.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/submit" element={<SubmitData />} />
          <Route path="/timeseries" element={<TimeSeries />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
