import { useEffect } from "react";

const ThemeCustomize = () => {
  useEffect(() => {
    const SELECTOR_SIDEBAR_WRAPPER = ".sidebar-wrapper";

    if (window.OverlayScrollbarsGlobal?.OverlayScrollbars) {
      const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
      window.OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "leave",
          clickScroll: true,
        },
      });
    }

    const themeBg = [
      "bg-primary", "bg-primary-subtle", "bg-secondary", "bg-secondary-subtle",
      "bg-success", "bg-success-subtle", "bg-danger", "bg-danger-subtle",
      "bg-warning", "bg-warning-subtle", "bg-info", "bg-info-subtle",
      "bg-light", "bg-light-subtle", "bg-dark", "bg-dark-subtle",
      "bg-body-secondary", "bg-body-tertiary", "bg-body",
      "bg-black", "bg-white", "bg-transparent",
    ];

    const setupTheme = (root, modeSelect, colorSelect, codeBox, tag) => {
      colorSelect.innerHTML = themeBg
        .map(bg => `<option value="${bg}">${bg}</option>`)
        .join("");

      let mode = "";
      let bg = "";

      const update = () => {
        root.setAttribute("data-bs-theme", mode);
        codeBox.innerHTML = `<pre><code>&lt;${tag} class="${bg}" data-bs-theme="${mode}"&gt;...&lt;/${tag}&gt;</code></pre>`;
      };

      modeSelect.addEventListener("input", e => {
        mode = e.target.value;
        update();
      });

      colorSelect.addEventListener("input", e => {
        bg = e.target.value;
        themeBg.forEach(c => root.classList.remove(c));
        root.classList.add(bg);
        update();
      });
    };

    setupTheme(
      document.querySelector(".app-sidebar"),
      document.querySelector("#sidebar-color-modes"),
      document.querySelector("#sidebar-color"),
      document.querySelector("#sidebar-color-code"),
      "aside"
    );

    setupTheme(
      document.querySelector(".app-header"),
      document.querySelector("#navbar-color-modes"),
      document.querySelector("#navbar-color"),
      document.querySelector("#navbar-color-code"),
      "nav"
    );

    setupTheme(
      document.querySelector(".app-footer"),
      document.querySelector("#footer-color-modes"),
      document.querySelector("#footer-color"),
      document.querySelector("#footer-color-code"),
      "footer"
    );
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
                  <i className="bi bi-list" />
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* ================= SIDEBAR ================= */}
        <aside className="app-sidebar bg-primary shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <a href="/" className="brand-link">
              <img
                src="../assets/img/AdminLTELogo.png"
                className="brand-image opacity-75 shadow"
                alt="AdminLTE"
              />
              <span className="brand-text fw-light">AdminLTE 4</span>
            </a>
          </div>

          <div className="sidebar-wrapper">
            <nav className="mt-2">
              <ul className="nav sidebar-menu flex-column">
                <li className="nav-header">MULTI LEVEL EXAMPLE</li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon bi bi-circle-fill" />
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
              <h3 className="mb-0">Theme Customize</h3>
            </div>
          </div>

          <div className="app-content">
            <div className="container-fluid">

              {/* SIDEBAR THEME */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Sidebar Theme</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <select id="sidebar-color-modes" className="form-select form-select-lg">
                        <option value="">---Select---</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select id="sidebar-color" className="form-select form-select-lg" />
                    </div>
                    <div className="col-md-6">
                      <div id="sidebar-color-code" />
                    </div>
                  </div>
                </div>
              </div>

              {/* NAVBAR THEME */}
              <div className="card mt-4">
                <div className="card-header">
                  <h3 className="card-title">Navbar Theme</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <select id="navbar-color-modes" className="form-select form-select-lg">
                        <option value="">---Select---</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select id="navbar-color" className="form-select form-select-lg" />
                    </div>
                    <div className="col-md-6">
                      <div id="navbar-color-code" />
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER THEME */}
              <div className="card mt-4">
                <div className="card-header">
                  <h3 className="card-title">Footer Theme</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <select id="footer-color-modes" className="form-select form-select-lg">
                        <option value="">---Select---</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select id="footer-color" className="form-select form-select-lg" />
                    </div>
                    <div className="col-md-6">
                      <div id="footer-color-code" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="app-footer">
          <strong>© 2014–2025 AdminLTE.io</strong>
        </footer>

      </div>
    </div>
  );
};

export default ThemeCustomize;
