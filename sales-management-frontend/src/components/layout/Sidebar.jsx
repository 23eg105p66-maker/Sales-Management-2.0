import { NavLink } from "react-router-dom";
import "../../styles/layout.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: "◆", end: true },
  { to: "/products", label: "Products", icon: "⬚" },
  { to: "/customers", label: "Customers", icon: "◎" },
  { to: "/sales", label: "Sales", icon: "✦" },
];

export function Sidebar({ collapsed, openOnMobile, onToggle }) {
  const sidebarClass = [
    "sidebar",
    collapsed ? "collapsed" : "",
    openOnMobile ? "open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={sidebarClass}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <div className="sidebar-mark" />
          {!collapsed && (
            <div>
              <div className="sidebar-title">Sales Console</div>
              <div className="sidebar-subtitle">Management system</div>
            </div>
          )}
        </div>
        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? ">" : "<"}
        </button>
      </div>

      <div>
        {!collapsed && <div className="nav-section-label">Workspace</div>}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                ["nav-item", isActive ? "active" : ""].filter(Boolean).join(" ")
              }
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {!collapsed && (
        <div className="sidebar-footer">
          <div>Today</div>
          <div className="sidebar-metric">
            <span className="chip">Session: Morning Shift</span>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
