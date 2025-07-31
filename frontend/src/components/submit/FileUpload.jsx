
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function FileUpload({ handleFileUpload }) {
  return (
    <div className="json-upload">
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <button type="submit" className="submit-btn" onClick={handleFileUpload}>
        <FontAwesomeIcon icon={faUpload} style={{ marginRight: '6px' }} />
        Submit
      </button>
    </div>
  );
}

export default FileUpload;
