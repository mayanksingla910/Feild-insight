import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function JsonTextUpload({ jsonText, setJsonText, handleJsonUpload }) {
  return (
    <div className="json-upload">
      <textarea
        rows="8"
        cols="60"
        placeholder='[{"timestamp": "2025-01-30T10:00:00Z", "field_id": "field_1", "sensor_type": "soil_moisture", "reading_value": 45.2, "unit": "%"}]'        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />
      <button type="submit" className="submit-btn" onClick={handleJsonUpload}>
        <FontAwesomeIcon icon={faUpload} style={{ marginRight: '6px' }} />
        Submit
      </button>
    </div>
  );
}

export default JsonTextUpload;
