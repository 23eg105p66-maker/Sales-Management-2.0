import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../styles/global.css";
import "../../styles/layout.css";

const routeTitles = {
  "/": "Overview dashboard",
  "/products": "Products inventory",
  "/customers": "Customer records",
  "/sales": "Sales activity",
};

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const location = useLocation();

  const path = location.pathname;
  const title = routeTitles[path] || "Workspace";

  const handleToggle = () => {
    if (window.innerWidth <= 960) {
      setOpenOnMobile((v) => !v);
    } else {
      setCollapsed((v) => !v);
    }
  };

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} openOnMobile={openOnMobile} onToggle={handleToggle} />
      <main className="main-content">
        <Navbar title={title} />
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
