import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link"> {/* Added opening <Link> tag */}
              <i className="bi bi-list"></i> {/* Using <span> here for better accessibility */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              <span>Products</span> {/* Using <span> here for better accessibility */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <span>Settings</span> {/* Using <span> here for better accessibility */}
            </Link>
          </li>
        </ul>


        {/* Right navbar links */}
        <ul className="navbar-nav ms-auto">
          {/* Search */}
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>

          {/* Messages */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-chat-text"></i>
              <span className="navbar-badge badge text-bg-danger">3</span>
            </a>

            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              {[
                { img: "user1-128x128.jpg", name: "Brad Diesel", star: "text-danger", msg: "Call me whenever you can..." },
                { img: "user8-128x128.jpg", name: "John Pierce", star: "text-secondary", msg: "I got your message bro" },
                { img: "user3-128x128.jpg", name: "Nora Silvester", star: "text-warning", msg: "The subject goes here" }
              ].map((user, i) => (
                <div key={i}>
                  <a href="#" className="dropdown-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <img
                          src={`/assets/img/${user.img}`}
                          alt="User Avatar"
                          className="img-size-50 rounded-circle me-3"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="dropdown-item-title">
                          {user.name}
                          <span className={`float-end fs-7 ${user.star}`}>
                            <i className="bi bi-star-fill"></i>
                          </span>
                        </h3>
                        <p className="fs-7">{user.msg}</p>
                        <p className="fs-7 text-secondary">
                          <i className="bi bi-clock-fill me-1"></i> 4 Hours Ago
                        </p>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                </div>
              ))}
              <a href="#" className="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li>

          {/* Notifications */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
              <i className="bi bi-bell-fill"></i>
              <span className="navbar-badge badge text-bg-warning">15</span>
            </a>

            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider"></div>

              <a href="#" className="dropdown-item">
                <i className="bi bi-envelope me-2"></i> 4 new messages
                <span className="float-end text-secondary fs-7">3 mins</span>
              </a>

              <div className="dropdown-divider"></div>

              <a href="#" className="dropdown-item">
                <i className="bi bi-people-fill me-2"></i> 8 friend requests
                <span className="float-end text-secondary fs-7">12 hours</span>
              </a>

              <div className="dropdown-divider"></div>

              <a href="#" className="dropdown-item">
                <i className="bi bi-file-earmark-fill me-2"></i> 3 new reports
                <span className="float-end text-secondary fs-7">2 days</span>
              </a>

              <div className="dropdown-divider"></div>

              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li>

          {/* Fullscreen */}
          <li className="nav-item">
            <a className="nav-link" data-lte-toggle="fullscreen" href="#">
              <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen"></i>
              <i
                data-lte-icon="minimize"
                className="bi bi-fullscreen-exit"
                style={{ display: "none" }}
              ></i>
            </a>
          </li>

          {/* User menu */}
          <li className="nav-item dropdown user-menu">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <img
                src="/assets/img/user2-160x160.jpg"
                className="user-image rounded-circle shadow"
                alt="User"
              />
              <span className="d-none d-md-inline">Alexander Pierce</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <li className="user-header text-bg-primary">
                <img
                  src="/assets/img/user2-160x160.jpg"
                  className="rounded-circle shadow"
                  alt="User"
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
                <a href="#" className="btn btn-default btn-flat float-end">
                  Sign out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
