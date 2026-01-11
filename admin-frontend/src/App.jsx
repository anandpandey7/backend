import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import MainContent from "./components/layout/maincontent";
import PostsManager from "./components/layout/megepost";
import Country from "./components/layout/country";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import ServicesManager from "./components/layout/servicesManager";
import PortfolioManager from "./components/layout/portfolioManager";
import TestimonialsManager from "./components/layout/testimonialsManager";
import ClientsManager from "./components/layout/ClientsManager";
import InquiriesManager from "./components/layout/InquiriesManager";
import SettingsManager from "./components/layout/SettingsManager";
import ProductAdmin from "./components/layout/ProductAdmin";
import JobAdmin from "./components/layout/job";
import CareersManager from "./components/layout/careerManager";
import CertificationManager from "./components/layout/CertificateManager";
import OEM from "./components/layout/OemManager";
import FeaturesManager from "./components/layout/FeaturesManager";
import PackageManager from "./components/layout/PackageManager";
import ProductInquiriesManager from "./components/layout/productInquiriesManager";
import ServiceInquiriesManager from "./components/layout/serviceInquiriesManager";
import MarqueeManager from "./components/layout/marqueeManager";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

// ✅ Auth check
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// ✅ Protected wrapper
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-wrapper">
      {!hideLayout && <Sidebar />}
      {!hideLayout && <Header />}

      <main className="app-main">{children}</main>

      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
    {/* ✅ Toast container available globally */}
      <ToastContainer position="top-center" autoClose={3000} />

      <AppLayout>
        <Routes>
          {/* 🔐 Auth Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* 🔒 Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/country"
            element={
              <ProtectedRoute>
                <Country />
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <ServicesManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/serviceInquires"
            element={
              <ProtectedRoute>
                <ServiceInquiriesManager />
              </ProtectedRoute>
            }
          />


          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <PortfolioManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/testimonials"
            element={
              <ProtectedRoute>
                <TestimonialsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inquires"
            element={
              <ProtectedRoute>
                <InquiriesManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/careers"
            element={
              <ProtectedRoute>
                <CareersManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productInquires"
            element={
              <ProtectedRoute>
                <ProductInquiriesManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/certifications"
            element={
              <ProtectedRoute>
                <CertificationManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/oem"
            element={
              <ProtectedRoute>
                <OEM />
              </ProtectedRoute>
            }
          />

          <Route
            path="/features"
            element={
              <ProtectedRoute>
                <FeaturesManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/packages"
            element={
              <ProtectedRoute>
                <PackageManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/marquee"
            element= {
              <ProtectedRoute>
                <MarqueeManager />
              </ProtectedRoute>
            } 
          />

          {/* ➡ Default */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ❌ 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
