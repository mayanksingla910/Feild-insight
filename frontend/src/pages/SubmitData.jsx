import { useState } from 'react';
import axios from 'axios';
import '../styles/form.css';
import {
  faArrowUpFromBracket,
  faAlignJustify,
  faFile,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReadingForm from '../components/submit/ReadingForm';
import JsonTextUpload from '../components/submit/JsonUpload';
import FileUpload from '../components/submit/FileUpload';

function SubmitData() {
  const [readings, setReadings] = useState([
    { timestamp: '', field_id: '', sensor_type: '', reading_value: '', unit: '' },
  ]);
  const [message, setMessage] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [uploadMethod, setUploadMethod] = useState('form');

  const handleChange = (index, field, value) => {
    const updated = [...readings];
    updated[index][field] = value;

    if (field === 'sensor_type') {
      updated[index].unit =
        value === 'temperature' ? '°C'
          : value === 'humidity' || value === 'soil moisture' ? '%'
          : value === 'ph' ? 'pH units'
          : value === 'sunlight' ? 'W/m²'
          : value === 'rainfall' ? 'mm'
          : value === 'wind_speed' ? 'm/s'
          : value === 'soil_nitrogen' ? 'mg/kg'
          : '';
    }

    setReadings(updated);
  };

  const addReading = () => {
    setReadings([
      ...readings,
      { timestamp: '', field_id: '', sensor_type: '', reading_value: '', unit: '' },
    ]);
  };

  const removeReading = (index) => {
    const updated = readings.filter((_, i) => i !== index);
    setReadings(updated);
  };

  const handleJsonUpload = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed.readings)) {
        setReadings(parsed.readings);
        setMessage('✅ JSON loaded!');
      } else {
        setMessage("❌ JSON must contain a 'readings' array.");
      }
    } catch (e) {
      setMessage('❌ Invalid JSON.');
      console.error(e);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed.readings)) {
          setReadings(parsed.readings);
          setMessage('✅ File loaded!');
        } else {
          setMessage("❌ File must contain a 'readings' array.");
        }
      } catch (err) {
        setMessage('❌ Failed to parse file.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const payload = {
        readings: readings.map((r) => ({
          ...r,
          field_id: parseInt(r.field_id),
          reading_value: parseFloat(r.reading_value),
        })),
      };
      const res = await axios.post('http://localhost:8000/submit', payload);
      setMessage(res.data.message || '✅ Submitted!');
      setReadings([
        { timestamp: '', field_id: '', sensor_type: '', reading_value: '', unit: '' },
      ]);
    } catch (err) {
      setMessage('❌ Failed to submit.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>
        <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: '6px' }} />
        Submit Sensor Data
      </h2>

      <div className="method-toggle">
        <button type="button" className={uploadMethod === 'form' ? 'active' : ''} onClick={() => setUploadMethod('form')}>
          <FontAwesomeIcon icon={faAlignJustify} style={{ marginRight: '6px' }} />
          Form
        </button>
        <button type="button" className={uploadMethod === 'text' ? 'active' : ''} onClick={() => setUploadMethod('text')}>
          <FontAwesomeIcon icon={faFileLines} style={{ marginRight: '6px' }} />
          Paste JSON
        </button>
        <button type="button" className={uploadMethod === 'file' ? 'active' : ''} onClick={() => setUploadMethod('file')}>
          <FontAwesomeIcon icon={faFile} style={{ marginRight: '6px' }} />
          Upload File
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {uploadMethod === 'form' && (
          <ReadingForm readings={readings} onChange={handleChange} onRemove={removeReading} onAdd={addReading} />
        )}

        {uploadMethod === 'text' && (
          <JsonTextUpload jsonText={jsonText} setJsonText={setJsonText} handleJsonUpload={handleJsonUpload} />
        )}

        {uploadMethod === 'file' && (
          <FileUpload handleFileUpload={handleFileUpload} />
        )}
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default SubmitData;
