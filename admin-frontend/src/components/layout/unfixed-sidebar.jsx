import { useEffect } from "react";

const UnfixedSidebar = () => {
  useEffect(() => {
    const SELECTOR_SIDEBAR_WRAPPER = ".sidebar-wrapper";
    const Default = {
      scrollbarTheme: "os-theme-light",
      scrollbarAutoHide: "leave",
      scrollbarClickScroll: true,
    };

    const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
    if (sidebarWrapper && window.OverlayScrollbarsGlobal?.OverlayScrollbars) {
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
    <div className="sidebar-expand-lg sidebar-open bg-body-tertiary">
      <div className="app-wrapper">

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
              <li className="nav-item">
                <a className="nav-link" data-widget="navbar-search" href="#">
                  <i className="bi bi-search"></i>
                </a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link" data-bs-toggle="dropdown" href="#">
                  <i className="bi bi-chat-text"></i>
                  <span className="navbar-badge badge text-bg-danger">3</span>
                </a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link" data-bs-toggle="dropdown" href="#">
                  <i className="bi bi-bell-fill"></i>
                  <span className="navbar-badge badge text-bg-warning">15</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" data-lte-toggle="fullscreen" href="#">
                  <i className="bi bi-arrows-fullscreen"></i>
                  <i
                    className="bi bi-fullscreen-exit"
                    style={{ display: "none" }}
                  ></i>
                </a>
              </li>

              <li className="nav-item dropdown user-menu">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#">
                  <img
                    src="../assets/img/user2-160x160.jpg"
                    className="user-image rounded-circle shadow"
                    alt="User"
                  />
                  <span className="d-none d-md-inline">Alexander Pierce</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* ================= SIDEBAR ================= */}
        <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <a href="#" className="brand-link">
              <img
                src="../assets/img/AdminLTELogo.png"
                className="brand-image opacity-75 shadow"
                alt="AdminLTE Logo"
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
                    <i className="nav-icon bi bi-clipboard-fill"></i>
                    <p>
                      Layout Options
                      <span className="nav-badge badge text-bg-secondary me-3">6</span>
                      <i className="nav-arrow bi bi-chevron-right"></i>
                    </p>
                  </a>
                </li>

                <li className="nav-header">MULTI LEVEL EXAMPLE</li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle-fill"></i>
                    <p>Level 1</p>
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
                  <h3 className="mb-0">Unfixed Layout</h3>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-end">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Unfixed Layout</li>
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
                    <button className="btn btn-tool" data-lte-toggle="card-collapse">
                      <i className="bi bi-plus-lg"></i>
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <button className="btn btn-tool" data-lte-toggle="card-remove">
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
          <div className="float-end d-none d-sm-inline">Anything you want</div>
          <strong>
            © 2014–2025{" "}
            <a href="https://adminlte.io" className="text-decoration-none">
              AdminLTE.io
            </a>
          </strong>
        </footer>

      </div>
    </div>
  );
};

export default UnfixedSidebar;
