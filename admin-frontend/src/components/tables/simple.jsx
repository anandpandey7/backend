import { useEffect } from "react";

export default function SimpleTables() {
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
  }, []);

  return (
    <div className="app-wrapper">
      {/* HEADER */}
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

      {/* SIDEBAR */}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="#" className="brand-link">
            <img
              src="/assets/img/AdminLTELogo.png"
              className="brand-image opacity-75 shadow"
              alt="AdminLTE Logo"
            />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>
        </div>
      </aside>

      {/* MAIN */}
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <h3>Simple Tables</h3>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Bordered Table</h3>
                  </div>

                  <div className="card-body">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Task</th>
                          <th>Progress</th>
                          <th style={{ width: "40px" }}>Label</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="align-middle">
                          <td>1.</td>
                          <td>Update software</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar text-bg-danger"
                                style={{ width: "55%" }}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="badge text-bg-danger">55%</span>
                          </td>
                        </tr>

                        <tr className="align-middle">
                          <td>2.</td>
                          <td>Clean database</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar text-bg-warning"
                                style={{ width: "70%" }}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="badge text-bg-warning">70%</span>
                          </td>
                        </tr>

                        <tr className="align-middle">
                          <td>3.</td>
                          <td>Cron job running</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar text-bg-primary"
                                style={{ width: "30%" }}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="badge text-bg-primary">30%</span>
                          </td>
                        </tr>

                        <tr className="align-middle">
                          <td>4.</td>
                          <td>Fix and squish bugs</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar text-bg-success"
                                style={{ width: "90%" }}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="badge text-bg-success">90%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Striped Table</h3>
                  </div>

                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Task</th>
                          <th>Progress</th>
                          <th>Label</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Update software</td>
                          <td>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar text-bg-danger"
                                style={{ width: "55%" }}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="badge text-bg-danger">55%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <strong>
          © 2014–2025{" "}
          <a href="https://adminlte.io" className="text-decoration-none">
            AdminLTE.io
          </a>
        </strong>
      </footer>
    </div>
  );
}
