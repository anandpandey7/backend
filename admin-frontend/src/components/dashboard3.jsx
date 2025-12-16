import { useEffect } from "react";
import ApexCharts from "apexcharts";
import OverlayScrollbars from "overlayscrollbars";

const DashboardV3 = () => {
  useEffect(() => {
    // Sidebar scrollbar
    const sidebar = document.querySelector(".sidebar-wrapper");
    if (sidebar) {
      OverlayScrollbars(sidebar, {
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "leave",
          clickScroll: true,
        },
      });
    }

    // Visitors chart
    const visitorsChart = new ApexCharts(
      document.querySelector("#visitors-chart"),
      {
        series: [
          { name: "High - 2023", data: [100, 120, 170, 167, 180, 177, 160] },
          { name: "Low - 2023", data: [60, 80, 70, 67, 80, 77, 100] },
        ],
        chart: { type: "line", height: 200, toolbar: { show: false } },
        colors: ["#0d6efd", "#adb5bd"],
        stroke: { curve: "smooth" },
        markers: { size: 1 },
        xaxis: { categories: ["22th", "23th", "24th", "25th", "26th", "27th", "28th"] },
        legend: { show: false },
      }
    );

    visitorsChart.render();

    // Sales chart
    const salesChart = new ApexCharts(
      document.querySelector("#sales-chart"),
      {
        series: [
          { name: "Net Profit", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
          { name: "Revenue", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
          { name: "Free Cash Flow", data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
        ],
        chart: { type: "bar", height: 200 },
        plotOptions: { bar: { columnWidth: "55%", endingShape: "rounded" } },
        colors: ["#0d6efd", "#20c997", "#ffc107"],
        dataLabels: { enabled: false },
        legend: { show: false },
        xaxis: { categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"] },
      }
    );

    salesChart.render();

    return () => {
      visitorsChart.destroy();
      salesChart.destroy();
    };
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
          </ul>
        </div>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="/" className="brand-link">
            <span className="brand-text fw-light">AdminLTE 4</span>
          </a>
        </div>

        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer"></i>
                  <p>Dashboard v3</p>
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
            <h3 className="mb-0">Dashboard v3</h3>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-header border-0">
                    <h3 className="card-title">Online Store Visitors</h3>
                  </div>
                  <div className="card-body">
                    <div id="visitors-chart"></div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-header border-0">
                    <h3 className="card-title">Sales</h3>
                  </div>
                  <div className="card-body">
                    <div id="sales-chart"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="app-footer">
        <strong>
          © 2014–2025 <a href="https://adminlte.io">AdminLTE.io</a>
        </strong>
      </footer>

    </div>
  );
};

export default DashboardV3;
