import { useEffect } from "react";
import OverlayScrollbars from "overlayscrollbars";

const SidebarMiniCollapsed = () => {
  useEffect(() => {
    const sidebarWrapper = document.querySelector(".sidebar-wrapper");

    if (sidebarWrapper) {
      OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "leave",
          clickScroll: true,
        },
      });
    }
  }, []);

  return (
    <div className="app-wrapper layout-fixed sidebar-expand-lg sidebar-mini sidebar-collapse bg-body-tertiary">

      {/* ================= HEADER ================= */}
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-lte-toggle="sidebar" href="#">
                <i className="bi bi-list"></i>
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a href="#" className="nav-link">Home</a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a href="#" className="nav-link">Contact</a>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">

            {/* Search */}
            <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            {/* Fullscreen */}
            <li className="nav-item">
              <a className="nav-link" data-lte-toggle="fullscreen" href="#">
                <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
                <i data-lte-icon="minimize" className="bi bi-fullscreen-exit d-none"></i>
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
              alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>
        </div>

        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer"></i>
                  <p>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>

                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Dashboard v1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link active">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Dashboard v2</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-table"></i>
                  <p>Tables</p>
                </a>
              </li>

              <li className="nav-header">LABELS</li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-circle text-danger"></i>
                  <p>Important</p>
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
            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">Collapsed Sidebar</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Collapsed Sidebar</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Title</h3>
                <div className="card-tools">
                  <button
                    className="btn btn-tool"
                    data-lte-toggle="card-collapse"
                  >
                    <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                    <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                  </button>

                  <button
                    className="btn btn-tool"
                    data-lte-toggle="card-remove"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              <div className="card-body">
                Start creating your amazing application!
              </div>

              <div className="card-footer">Footer</div>
            </div>
          </div>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="app-footer">
        <div className="float-end d-none d-sm-inline">
          Anything you want
        </div>

        <strong>
          © 2014–2025{" "}
          <a href="https://adminlte.io" className="text-decoration-none">
            AdminLTE.io
          </a>
        </strong>
      </footer>

    </div>
  );
};

export default SidebarMiniCollapsed;
