import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PortfolioForm from "./PortfolioForm";

const API = "http://localhost:5000/api/portfolio";
const BASE = "http://localhost:5000";

const PortfolioManager = () => {
  const [withPortfolio, setWithPortfolio] = useState([]);
  const [withoutPortfolio, setWithoutPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClient, setEditClient] = useState(null);

  // 🔹 For description modal
  const [showDescModal, setShowDescModal] = useState(false);
  const [activeClient, setActiveClient] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [wRes, woRes] = await Promise.all([
        fetch(`${API}`),
        fetch(`${API}/clients`)
      ]);

      const wData = await wRes.json();
      const woData = await woRes.json();

      setWithPortfolio(wData.clients || []);
      setWithoutPortfolio(woData.clients || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch portfolios!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio?")) return;

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Portfolio deleted successfully!");
        fetchAll();
      } else {
        toast.error("Failed to delete portfolio.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error deleting portfolio.");
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "—";

  const shortText = (text, len = 80) =>
    text && text.length > len ? text.substring(0, len) + "..." : text;

  const openDesc = (client) => {
    setActiveClient(client);
    setShowDescModal(true);
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="row g-4">
        {/* 🔹 Form */}
        <div className="col-12 col-lg-4">
          <PortfolioForm
            editClient={editClient}
            onSaved={() => {
              setEditClient(null);
              fetchAll();
              toast.success("Portfolio saved successfully!");
            }}
            onCancel={() => setEditClient(null)}
          />
        </div>

        {/* 🔹 Lists */}
        <div className="col-12 col-lg-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* ✅ With Portfolio */}
              <h5>Clients With Portfolio</h5>
              <div className="portfolio-scroll mb-4">
                {withPortfolio.map((c) => (
                  <div key={c._id} className="portfolio-card">
                    <h6>{c.clientName}</h6>
                    <p className="mb-1 fw-semibold">{c.projectName}</p>

                    {c.projectDescription && (
                      <p className="small text-muted mb-1">
                        {shortText(c.projectDescription, 80)}
                        {c.projectDescription.length > 80 && (
                          <span
                            className="text-primary ms-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => openDesc(c)}
                          >
                            View more
                          </span>
                        )}
                      </p>
                    )}

                    <small className="d-block">
                      <strong>Start:</strong> {formatDate(c.startDate)}
                    </small>
                    <small className="d-block mb-2">
                      <strong>End:</strong> {formatDate(c.endDate)}
                    </small>

                    <div className="gallery mt-2">
                      {c.gallery?.map((img, i) => (
                        <img key={i} src={`${BASE}${img}`} alt="" />
                      ))}
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setEditClient(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ Without Portfolio */}
              <h5>Clients Without Portfolio</h5>
              <div className="portfolio-scroll">
                {withoutPortfolio.map((c) => (
                  <div key={c._id} className="portfolio-card">
                    <h6>{c.clientName}</h6>
                    <p className="mb-1 fw-semibold">{c.projectName}</p>

                    {c.projectDescription && (
                      <p className="small text-muted mb-1">
                        {shortText(c.projectDescription, 80)}
                        {c.projectDescription.length > 80 && (
                          <span
                            className="text-primary ms-1"
                            style={{ cursor: "pointer" }}
                            onClick={() => openDesc(c)}
                          >
                            View more
                          </span>
                        )}
                      </p>
                    )}

                    <small className="d-block">
                      <strong>Start:</strong> {formatDate(c.startDate)}
                    </small>
                    <small className="d-block mb-2">
                      <strong>End:</strong> {formatDate(c.endDate)}
                    </small>

                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => setEditClient(c)}
                    >
                      Add Portfolio
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Description Modal */}
      {showDescModal && activeClient && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowDescModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {activeClient.projectName}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDescModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <h6 className="fw-bold mb-2">
                  {activeClient.clientName}
                </h6>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {activeClient.projectDescription}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDescModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Styles */}
      <style>{`
        .portfolio-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 10px;
          -webkit-overflow-scrolling: touch;
        }

        .portfolio-card {
          flex: 0 0 260px;
          background: #fff;
          border-radius: 10px;
          padding: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .gallery {
          display: flex;
          gap: 6px;
          overflow-x: auto;
        }

        .gallery img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .portfolio-card {
            flex: 0 0 85%;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioManager;