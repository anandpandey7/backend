import { useEffect } from "react";
import "admin-lte/dist/css/adminlte.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import OverlayScrollbars from "overlayscrollbars";

const Dashboard = () => {
  useEffect(() => {
    // Sidebar scrollbar
    const sidebar = document.querySelector(".sidebar-wrapper");
    if (sidebar) {
      OverlayScrollbars(sidebar, {
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "leave",
          clickScroll: true,
        },
      });
    }
  }, []);

  return (
    <div className="app-wrapper layout-fixed sidebar-expand-lg sidebar-open bg-body-tertiary">

      {/* ================= HEADER ================= */}
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-lte-toggle="sidebar" href="#">
                <i className="bi bi-list"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="/" className="brand-link">
            <img
              src="/assets/img/AdminLTELogo.png"
              className="brand-image opacity-75 shadow"
              alt="AdminLTE"
            />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>
        </div>

        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer"></i>
                  <p>Dashboard</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <h3 className="mb-0">Dashboard</h3>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">

            {/* SMALL BOXES */}
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-primary">
                  <div className="inner">
                    <h3>150</h3>
                    <p>New Orders</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-success">
                  <div className="inner">
                    <h3>53%</h3>
                    <p>Bounce Rate</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>User Registrations</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box text-bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Unique Visitors</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="app-footer">
        <strong>
          Copyright © 2014–2025{" "}
          <a href="https://adminlte.io">AdminLTE.io</a>
        </strong>
      </footer>

    </div>
  );
};

export default Dashboard;
