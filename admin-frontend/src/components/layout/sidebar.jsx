import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">

      {/* LOGO */}
      <div className="sidebar-brand">
        <Link to="/dashboard" className="brand-link">
          <img
            src="/assets/img/AdminLTELogo.png"
            alt="Logo"
            className="brand-image opacity-75 shadow"
          />
          <span className="brand-text fw-light">Admin Panel</span>
        </Link>
      </div>

      {/* MENU */}
      <div className="sidebar-wrapper">
        <nav className="mt-2">
          <ul className="nav sidebar-menu flex-column">

            {/* Dashboard */}
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon bi bi-speedometer"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/clients" className="nav-link">
                <i className="nav-icon bi bi-file-text"></i>
                <p>Clients</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/portfolio" className="nav-link">
                <i className="nav-icon bi bi-file-text"></i>
                <p>Portfolio</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/testimonials" className="nav-link">
                <i className="nav-icon bi bi-file-text"></i>
                <p>Testimonials</p>
              </Link>
            </li>

            {/* Blogs */}
            <li className="nav-item">
              <Link to="/posts" className="nav-link">
                <i className="nav-icon bi bi-file-text"></i>
                <p>Blogs</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/inquires" className="nav-link">
                <i className="nav-icon bi bi-file-text"></i>
                <p>Inquiry</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/services" className="nav-link">
                <i className="nav-icon bi bi-file-text"></i>
                <p>Services</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <i className="nav-icon bi bi-file-text"></i>
                <p>Settings</p>
              </Link>
            </li>

            {/* Country (Merged Single Page) */}
            <li className="nav-item">
              <Link to="/country" className="nav-link">
                <i className="nav-icon bi bi-globe"></i>
                <p>Country</p>
              </Link>
            </li>

            {/* Logout */}
            <li className="nav-item mt-3">
              <button
                onClick={handleLogout}
                className="nav-link w-100 text-start border-0 bg-transparent"
                style={{ cursor: "pointer" }}
              >
                <i className="nav-icon bi bi-box-arrow-right"></i>
                <p>Logout</p>
              </button>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
