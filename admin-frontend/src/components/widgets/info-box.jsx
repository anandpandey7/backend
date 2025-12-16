import { useEffect } from "react";

const InfoBox = () => {
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
                      <p>Info Box</p>
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
                <h3 className="mb-0">Info Box</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Info Box</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">

            {/* ===== BASIC INFO BOX ===== */}
            <h5 className="mb-2">Info Box</h5>
            <div className="row">
              {[
                ["CPU Traffic", "10%", "bi-gear-fill", "primary"],
                ["Sales", "760", "bi-cart-fill", "success"],
                ["New Members", "2,000", "bi-people-fill", "warning"],
                ["Likes", "41,410", "bi-hand-thumbs-up-fill", "danger"],
              ].map(([text, value, icon, color], i) => (
                <div className="col-12 col-sm-6 col-md-3" key={i}>
                  <div className="info-box">
                    <span className={`info-box-icon text-bg-${color} shadow-sm`}>
                      <i className={`bi ${icon}`}></i>
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">{text}</span>
                      <span className="info-box-number">{value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== BG INFO BOX ===== */}
            <h5 className="mt-4 mb-2">Info Box With <code>bg-*</code></h5>
            <div className="row">
              {[
                ["Bookmarks", "primary", "bi-bookmark-fill"],
                ["Likes", "success", "bi-hand-thumbs-up"],
                ["Events", "warning", "bi-calendar3"],
                ["Comments", "danger", "bi-chat-text-fill"],
              ].map(([text, color, icon], i) => (
                <div className="col-md-3 col-sm-6 col-12" key={i}>
                  <div className={`info-box text-bg-${color}`}>
                    <span className="info-box-icon">
                      <i className={`bi ${icon}`}></i>
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">{text}</span>
                      <span className="info-box-number">41,410</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                      <span className="progress-description">
                        70% Increase in 30 Days
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
        </strong>{" "}
        All rights reserved.
      </footer>
    </div>
  );
};

export default InfoBox;
