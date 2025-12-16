import { useEffect } from "react";

const SmallBox = () => {
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
    <div className="layout-fixed sidebar-expand-lg sidebar-open bg-body-tertiary">
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
          </div>
        </nav>

        {/* ================= SIDEBAR ================= */}
        <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <a href="/" className="brand-link">
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
                        <p>Small Box</p>
                      </a>
                    </li>
                  </ul>
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
                  <h3 className="mb-0">Small Box</h3>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-end">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Small Box</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="app-content">
            <div className="container-fluid">
              <h5 className="mb-2">Small Box</h5>

              <div className="row">

                {/* BOX 1 */}
                <div className="col-lg-3 col-6">
                  <div className="small-box text-bg-primary">
                    <div className="inner">
                      <h3>150</h3>
                      <p>New Orders</p>
                    </div>
                    <a href="#" className="small-box-footer link-light">
                      More info <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>

                {/* BOX 2 */}
                <div className="col-lg-3 col-6">
                  <div className="small-box text-bg-success">
                    <div className="inner">
                      <h3>
                        53<sup className="fs-5">%</sup>
                      </h3>
                      <p>Bounce Rate</p>
                    </div>
                    <a href="#" className="small-box-footer link-light">
                      More info <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>

                {/* BOX 3 */}
                <div className="col-lg-3 col-6">
                  <div className="small-box text-bg-warning">
                    <div className="inner">
                      <h3>44</h3>
                      <p>User Registrations</p>
                    </div>
                    <a href="#" className="small-box-footer link-dark">
                      More info <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>

                {/* BOX 4 */}
                <div className="col-lg-3 col-6">
                  <div className="small-box text-bg-danger">
                    <div className="inner">
                      <h3>65</h3>
                      <p>Unique Visitors</p>
                    </div>
                    <a href="#" className="small-box-footer link-light">
                      More info <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>

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
          . All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default SmallBox;
