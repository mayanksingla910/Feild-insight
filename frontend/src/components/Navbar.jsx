import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faArrowUpFromBracket, faChartLine, faSeedling } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"> <FontAwesomeIcon icon={faSeedling} style={{ marginRight: '6px' }} />
        Field Insight
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          <FontAwesomeIcon icon={faChartColumn} style={{ marginRight: '6px' }} />
          Dashboard
        </NavLink>
        <NavLink to="/submit" className={({ isActive }) => isActive ? 'active' : ''}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: '6px' }} />
          Submit
        </NavLink>
        <NavLink to="/timeseries" className={({ isActive }) => isActive ? 'active' : ''}>
          <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '6px' }} />
          Time Series
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;