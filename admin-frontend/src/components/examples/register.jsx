import { useEffect } from "react";
import "admin-lte/dist/css/adminlte.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Register = () => {
  useEffect(() => {
    // OverlayScrollbars (optional – mostly for sidebar layouts)
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
    <div className="register-page bg-body-secondary">
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-header">
            <a
              href="/"
              className="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover"
            >
              <h1 className="mb-0">
                <b>Admin</b>LTE
              </h1>
            </a>
          </div>

          <div className="card-body register-card-body">
            <p className="register-box-msg">
              Register a new membership
            </p>

            <form>
              {/* Full Name */}
              <div className="input-group mb-1">
                <div className="form-floating">
                  <input
                    id="registerFullName"
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                  />
                  <label htmlFor="registerFullName">
                    Full Name
                  </label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-person"></span>
                </div>
              </div>

              {/* Email */}
              <div className="input-group mb-1">
                <div className="form-floating">
                  <input
                    id="registerEmail"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <label htmlFor="registerEmail">
                    Email
                  </label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-envelope"></span>
                </div>
              </div>

              {/* Password */}
              <div className="input-group mb-1">
                <div className="form-floating">
                  <input
                    id="registerPassword"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <label htmlFor="registerPassword">
                    Password
                  </label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-lock-fill"></span>
                </div>
              </div>

              {/* Row */}
              <div className="row">
                <div className="col-8 d-inline-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="termsCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="termsCheck"
                    >
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>

                <div className="col-4">
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Social Auth */}
            <div className="social-auth-links text-center mb-3 d-grid gap-2">
              <p>- OR -</p>

              <a href="#" className="btn btn-primary">
                <i className="bi bi-facebook me-2"></i>
                Sign in using Facebook
              </a>

              <a href="#" className="btn btn-danger">
                <i className="bi bi-google me-2"></i>
                Sign in using Google+
              </a>
            </div>

            <p className="mb-0">
              <a href="/login" className="link-primary text-center">
                I already have a membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
