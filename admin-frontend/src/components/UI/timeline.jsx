import React from 'react';

const TimelineComponent = () => {
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
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" data-bs-toggle="dropdown" href="#">
                <i className="bi bi-bell-fill"></i>
                <span className="navbar-badge badge text-bg-warning">15</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" data-lte-toggle="fullscreen">
                <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="../index.html" className="brand-link">
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>
        </div>
        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-speedometer"></i>
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon bi bi-tree-fill"></i>
                  <p>UI Elements</p>
                </a>
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
              <div className="col-sm-6"><h3 className="mb-0">Timeline</h3></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Timeline</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="timeline">
                  {/* Timeline label */}
                  <div className="time-label">
                    <span className="text-bg-danger">10 Feb. 2023</span>
                  </div>

                  {/* Email timeline item */}
                  <div>
                    <i className="timeline-icon bi bi-envelope text-bg-primary"></i>
                    <div className="timeline-item">
                      <span className="time">
                        <i className="bi bi-clock-fill"></i> 12:05
                      </span>
                      <h3 className="timeline-header">
                        <a href="#">Support Team</a> sent you an email
                      </h3>
                      <div className="timeline-body">
                        Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning
                        heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo
                        edmodo ifttt zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu weebly
                        balihoo...
                      </div>
                      <div className="timeline-footer">
                        <a className="btn btn-primary btn-sm">Read more</a>
                        <a className="btn btn-danger btn-sm">Delete</a>
                      </div>
                    </div>
                  </div>

                  {/* Friend request timeline item */}
                  <div>
                    <i className="timeline-icon bi bi-person text-bg-success"></i>
                    <div className="timeline-item">
                      <span className="time">
                        <i className="bi bi-clock-fill"></i> 5 mins ago
                      </span>
                      <h3 className="timeline-header no-border">
                        <a href="#">Sarah Young</a> accepted your friend request
                      </h3>
                    </div>
                  </div>

                  {/* Comment timeline item */}
                  <div>
                    <i className="timeline-icon bi bi-chat-text-fill text-bg-warning"></i>
                    <div className="timeline-item">
                      <span className="time">
                        <i className="bi bi-clock-fill"></i> 27 mins ago
                      </span>
                      <h3 className="timeline-header">
                        <a href="#">Jay White</a> commented on your post
                      </h3>
                      <div className="timeline-body">
                        Take me to your leader! Switzerland is small and neutral! We are more like
                        Germany, ambitious and misunderstood!
                      </div>
                      <div className="timeline-footer">
                        <a className="btn btn-warning btn-sm">View comment</a>
                      </div>
                    </div>
                  </div>

                  {/* Second timeline label */}
                  <div className="time-label">
                    <span className="text-bg-success">3 Jan. 2023</span>
                  </div>

                  {/* Photos timeline item */}
                  <div>
                    <i className="timeline-icon bi bi-camera text-bg-primary"></i>
                    <div className="timeline-item">
                      <span className="time">
                        <i className="bi bi-clock-fill"></i> 2 days ago
                      </span>
                      <h3 className="timeline-header">
                        <a href="#">Mina Lee</a> uploaded new photos
                      </h3>
                      <div className="timeline-body">
                        <img src="https://via.placeholder.com/128" alt="User" />
                        <img src="https://via.placeholder.com/128" alt="User" />
                        <img src="https://via.placeholder.com/128" alt="User" />
                        <img src="https://via.placeholder.com/128" alt="User" />
                      </div>
                    </div>
                  </div>

                  {/* Video timeline item */}
                  <div>
                    <i className="timeline-icon bi bi-camera-film text-bg-info"></i>
                    <div className="timeline-item">
                      <span className="time">
                        <i className="bi bi-clock-fill"></i> 5 days ago
                      </span>
                      <h3 className="timeline-header">
                        <a href="#">Mr. Doe</a> shared a video
                      </h3>
                      <div className="timeline-body">
                        <div className="ratio ratio-16x9">
                          <iframe
                            src="https://www.youtube.com/embed/tMWkeBIohBs"
                            allowFullScreen
                            title="Shared video"
                          ></iframe>
                        </div>
                      </div>
                      <div className="timeline-footer">
                        <a href="#" className="btn btn-sm text-bg-warning">
                          See comments
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* End icon */}
                  <div>
                    <i className="timeline-icon bi bi-clock-fill text-bg-secondary"></i>
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

      <style jsx>{`
        body {
          font-family: 'Source Sans 3', sans-serif;
        }
        .timeline {
          position: relative;
          margin: 0 0 30px 0;
          padding: 0;
          list-style: none;
        }
        .timeline:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #ddd;
          left: 31px;
          margin: 0;
          border-radius: 2px;
        }
        .timeline > div {
          position: relative;
          margin-right: 10px;
          margin-bottom: 15px;
        }
        .timeline-icon {
          width: 30px;
          height: 30px;
          font-size: 15px;
          line-height: 30px;
          position: absolute;
          border-radius: 50%;
          text-align: center;
          left: 18px;
          top: 0;
        }
        .timeline-item {
          box-shadow: 0 1px 1px rgba(0,0,0,0.1);
          border-radius: 3px;
          margin-top: 0;
          background: #fff;
          color: #495057;
          margin-left: 60px;
          margin-right: 15px;
          padding: 0;
          position: relative;
        }
        .timeline-item > .time {
          color: #999;
          float: right;
          padding: 10px;
          font-size: 12px;
        }
        .timeline-item > .timeline-header {
          margin: 0;
          color: #555;
          border-bottom: 1px solid #f4f4f4;
          padding: 10px;
          font-size: 16px;
          line-height: 1.1;
        }
        .timeline-item > .timeline-body,
        .timeline-item > .timeline-footer {
          padding: 10px;
        }
        .timeline-body img {
          margin: 10px;
          max-width: 150px;
        }
        .time-label > span {
          font-weight: 600;
          padding: 5px;
          display: inline-block;
          border-radius: 4px;
        }
        .time-label {
          margin-left: 60px;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default TimelineComponent;