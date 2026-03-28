import "../../styles/layout.css";

export function Navbar({ title }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div>
          <div className="navbar-title">Sales Management System</div>
          <div className="navbar-subtitle">{title}</div>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-chip">KPI view: Today</div>
        <div className="navbar-profile">
          <div className="navbar-avatar" />
          <div>
            <div style={{ fontSize: "0.8rem" }}>Admin</div>
            <div className="navbar-role">Account owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
