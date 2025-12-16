import { useEffect } from "react";

const WidgetsCards = () => {
  useEffect(() => {
    const SELECTOR_SIDEBAR_WRAPPER = ".sidebar-wrapper";
    const Default = {
      scrollbarTheme: "os-theme-light",
      scrollbarAutoHide: "leave",
      scrollbarClickScroll: true,
    };

    const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
    if (
      sidebarWrapper &&
      window.OverlayScrollbarsGlobal?.OverlayScrollbars
    ) {
      window.OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: Default.scrollbarTheme,
          autoHide: Default.scrollbarAutoHide,
          clickScroll: Default.scrollbarClickScroll,
        },
      });
    }
  }, []);

  return (
    <div className="app-wrapper">
      {/* HEADER */}
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-lte-toggle="sidebar"
                href="#"
                role="button"
              >
                <i className="bi bi-list"></i>
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <a href="#" className="brand-link">
            <img
              src="../assets/img/AdminLTELogo.png"
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
              role="navigation"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon bi bi-box-seam-fill"></i>
                  <p>
                    Widgets
                    <i className="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link active">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">Cards</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Cards</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <h5 className="mb-2">Abilities</h5>

            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div className="card card-primary collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">Expandable</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-lte-toggle="card-collapse"
                      >
                        <i
                          data-lte-icon="expand"
                          className="bi bi-plus-lg"
                        ></i>
                        <i
                          data-lte-icon="collapse"
                          className="bi bi-dash-lg"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">The body of the card</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">Collapsable</h3>
                  </div>
                  <div className="card-body">The body of the card</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card card-warning">
                  <div className="card-header">
                    <h3 className="card-title">Removable</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-lte-toggle="card-remove"
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">The body of the card</div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card card-danger">
                  <div className="card-header">
                    <h3 className="card-title">Maximizable</h3>
                  </div>
                  <div className="card-body">The body of the card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="float-end d-none d-sm-inline">
          Anything you want
        </div>
        <strong>
          Copyright © 2014–2025{" "}
          <a href="https://adminlte.io" className="text-decoration-none">
            AdminLTE.io
          </a>
        </strong>
        . All rights reserved.
      </footer>
    </div>
  );
};

export default WidgetsCards;
