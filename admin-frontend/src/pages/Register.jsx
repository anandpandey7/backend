import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "admin-lte/dist/css/adminlte.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { API_BASE_URL } from "../components/helper/config";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // OverlayScrollbars logic (optional, if needed for consistency)
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
                <b>Admin</b>PANEL
              </h1>
            </a>
          </div>

          <div className="card-body register-card-body">
            <p className="register-box-msg">
              Register a new membership
            </p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="input-group mb-1">
                <div className="form-floating">
                  <input
                    id="registerName"
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="registerName">Full name</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-person"></span>
                </div>
              </div>
              {errors.name && <div className="text-danger small mb-3">{errors.name}</div>}

              {/* Email */}
              <div className="input-group mb-1">
                <div className="form-floating">
                  <input
                    id="registerEmail"
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="registerEmail">Email</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-envelope"></span>
                </div>
              </div>
              {errors.email && <div className="text-danger small mb-3">{errors.email}</div>}

              {/* Password */}
              <div className="input-group mb-1">
                <div className="form-floating">
                  <input
                    id="registerPassword"
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="registerPassword">Password</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-lock-fill"></span>
                </div>
              </div>
              {errors.password && <div className="text-danger small mb-3">{errors.password}</div>}
              <div className="row">
                <div className="col-4">
                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Row */}
              {/* <div className="row">
                <div className="col-8 d-inline-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agreeTerms"
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="agreeTerms"
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
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </div>
                </div>
              </div> */}
            </form>

            <p className="mb-0">
              <Link to="/login" className="text-center">
                I already have a membership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;