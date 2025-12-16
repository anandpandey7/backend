import React from 'react';

const AdminLTEDashboard = () => {
  return (
    <div className="app-wrapper">
      {/* Header */}
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button">
                <i className="bi bi-list"></i>
              </a>
            </li>
            <li className="nav-item d-none d-md-block"><a href="#" className="nav-link">Home</a></li>
            <li className="nav-item d-none d-md-block"><a href="#" className="nav-link">Contact</a></li>
          </ul>
          
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                <i className="bi bi-search"></i>
              </a>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link" data-bs-toggle="dropdown" href="#">
                <i className="bi bi-chat-text"></i>
                <span className="navbar-badge badge text-bg-danger">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                <a href="#" className="dropdown-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img
                        src="./assets/img/user1-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 rounded-circle me-3"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-end fs-7 text-danger">
                          <i className="bi bi-star-fill"></i>
                        </span>
                      </h3>
                      <p className="fs-7">Call me whenever you can...</p>
                      <p className="fs-7 text-secondary">
                        <i className="bi bi-clock-fill me-1"></i> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
              </div>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link" data-bs-toggle="dropdown" href="#">
                <i className="bi bi-bell-fill"></i>
                <span className="navbar-badge badge text-bg-warning">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="bi bi-envelope me-2"></i> 4 new messages
                  <span className="float-end text-secondary fs-7">3 mins</span>
                </a>
              </div>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#" data-lte-toggle="fullscreen">
                <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
                <i data-lte-icon="minimize" className="bi bi-fullscreen-exit" style={{ display: 'none' }}></i>
              </a>
            </li>
            
            <li className="nav-item dropdown user-menu">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <img
                  src="./assets/img/user2-160x160.jpg"
                  className="user-image rounded-circle shadow"
                  alt="User Image"
                />
                <span className="d-none d-md-inline">Alexander Pierce</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                <li className="user-header text-bg-primary">
                  <img
                    src="./assets/img/user2-160x160.jpg"
                    className="rounded-circle shadow"
                    alt="User Image"
                  />
                  <p>
                    Alexander Pierce - Web Developer
                    <small>Member since Nov. 2023</small>
                  </p>
                </li>
                <li className="user-body">
                  <div className="row">
                    <div className="col-4 text-center"><a href="#">Followers</a></div>
                    <div className="col-4 text-center"><a href="#">Sales</a></div>
                    <div className="col-4 text-center"><a href="#">Friends</a></div>
                  </div>
                </li>
                <li className="user-footer">
                  <a href="#" className="btn btn-default btn-flat">Profile</a>
                  <a href="#" className="btn btn-default btn-flat float-end">Sign out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="./index.html" className="brand-link">
            <img
              src="./assets/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            />
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>
        </div>
        
        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="navigation" aria-label="Main navigation">
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
                    <a href="./index.html" className="nav-link">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Dashboard v1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index2.html" className="nav-link active">
                      <i className="nav-icon bi bi-circle"></i>
                      <p>Dashboard v2</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6"><h3 className="mb-0">Dashboard v2</h3></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Dashboard v2</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        
        <div className="app-content">
          <div className="container-fluid">
            {/* Info boxes */}
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                  <span className="info-box-icon text-bg-primary shadow-sm">
                    <i className="bi bi-gear-fill"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">CPU Traffic</span>
                    <span className="info-box-number">
                      10
                      <small>%</small>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                  <span className="info-box-icon text-bg-danger shadow-sm">
                    <i className="bi bi-hand-thumbs-up-fill"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Likes</span>
                    <span className="info-box-number">41,410</span>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                  <span className="info-box-icon text-bg-success shadow-sm">
                    <i className="bi bi-cart-fill"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Sales</span>
                    <span className="info-box-number">760</span>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                  <span className="info-box-icon text-bg-warning shadow-sm">
                    <i className="bi bi-people-fill"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">New Members</span>
                    <span className="info-box-number">2,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Recap Report */}
            <div className="row">
              <div className="col-md-12">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title">Monthly Recap Report</h5>
                    <div className="card-tools">
                      <button type="button" className="btn btn-tool" data-lte-toggle="card-collapse">
                        <i data-lte-icon="expand" className="bi bi-plus-lg"></i>
                        <i data-lte-icon="collapse" className="bi bi-dash-lg"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <p className="text-center">
                          <strong>Sales: 1 Jan, 2023 - 30 Jul, 2023</strong>
                        </p>
                        <div id="sales-chart"></div>
                      </div>
                      <div className="col-md-4">
                        <p className="text-center"><strong>Goal Completion</strong></p>
                        <div className="progress-group">
                          Add Products to Cart
                          <span className="float-end"><b>160</b>/200</span>
                          <div className="progress progress-sm">
                            <div className="progress-bar text-bg-primary" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                        <div className="progress-group">
                          Complete Purchase
                          <span className="float-end"><b>310</b>/400</span>
                          <div className="progress progress-sm">
                            <div className="progress-bar text-bg-danger" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-3 col-6">
                        <div className="text-center border-end">
                          <span className="text-success">
                            <i className="bi bi-caret-up-fill"></i> 17%
                          </span>
                          <h5 className="fw-bold mb-0">$35,210.43</h5>
                          <span className="text-uppercase">TOTAL REVENUE</span>
                        </div>
                      </div>
                      <div className="col-md-3 col-6">
                        <div className="text-center">
                          <span className="text-danger">
                            <i className="bi bi-caret-down-fill"></i> 18%
                          </span>
                          <h5 className="fw-bold mb-0">1200</h5>
                          <span className="text-uppercase">GOAL COMPLETIONS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="float-end d-none d-sm-inline">Anything you want</div>
        <strong>
          Copyright &copy; 2014-2025&nbsp;
          <a href="https://adminlte.io" className="text-decoration-none">AdminLTE.io</a>.
        </strong>
        All rights reserved.
      </footer>
    </div>
  );
};

export default AdminLTEDashboard;