import '../styles/layout.css';

function Layout({ route, setRoute, children }) {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">🌱 Field Vision</div>
        <div className="nav-buttons">
          <button onClick={() => setRoute('dashboard')} className={route === 'dashboard' ? 'active' : ''}>📊 Dashboard</button>
          <button onClick={() => setRoute('submit')} className={route === 'submit' ? 'active' : ''}>📤 Submit</button>
          <button onClick={() => setRoute('timeseries')} className={route === 'timeseries' ? 'active' : ''}>📈 Time Series</button>
        </div>
      </nav>
      <div className="page">{children}</div>
    </div>
  );
}

export default Layout;
