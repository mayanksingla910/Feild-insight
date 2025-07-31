import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

function ReadingForm({ readings, onChange, onRemove, onAdd }) {
  return (
    <>
      {readings.map((reading, index) => (
        <div className="reading-card" key={index}>
          <div className="reading-title">
            Reading {index + 1}
            {index > 0 && (
              <div className="trash-button" onClick={() => onRemove(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            )}
          </div>
          <div className="reading-grid">
            <div className="reading-field">
              <label>Timestamp</label>
              <input
                type="datetime-local"
                value={reading.timestamp}
                onChange={(e) => onChange(index, 'timestamp', e.target.value)}
                required
              />
            </div>
            <div className="reading-field">
              <label>Field ID</label>
              <input
                type="text"
                value={reading.field_id}
                onChange={(e) => onChange(index, 'field_id', e.target.value)}
                required
                placeholder="e.g., 1"
              />
            </div>
            <div className="reading-field">
              <label>Sensor Type</label>
              <select
                value={reading.sensor_type}
                onChange={(e) => onChange(index, 'sensor_type', e.target.value)}
                required
              >
                <option value="">Select sensor type</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="soil moisture">Soil Moisture</option>
                <option value="ph">ph</option>
                <option value="sunlight">sunlight</option>
                <option value="rainfall">rainfall</option>
                <option value="wind_speed">wind Speed</option>
                <option value="soil_nitrogen">soil Nitrogen</option>
              </select>
            </div>
            <div className="reading-field">
              <label>Reading Value</label>
              <input
                type="number"
                value={reading.reading_value}
                onChange={(e) => onChange(index, 'reading_value', e.target.value)}
                required
                placeholder="0"
              />
            </div>
            <div className="reading-field">
              <label>Unit</label>
              <input value={reading.unit} readOnly className="unit-field" placeholder="Auto-added"/>
            </div>
          </div>
        </div>
      ))}

      <div className="btn">
        <button type="button" onClick={onAdd} className="add-reading-btn">
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '6px' }} />
          Add Another Reading
        </button>

        <button type="submit" className="submit-btn">
          <FontAwesomeIcon icon={faUpload} style={{ marginRight: '6px' }} />
          Submit
        </button>
      </div>
    </>
  );
}

export default ReadingForm;
