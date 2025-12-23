import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PortfolioForm from "./PortfolioForm";

const API = "http://localhost:5000/api/portfolio";

const PortfolioManager = () => {
  const [withPortfolio, setWithPortfolio] = useState([]);
  const [withoutPortfolio, setWithoutPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClient, setEditClient] = useState(null);

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

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="row g-4">
        {/* Form */}
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

        {/* Lists */}
        <div className="col-12 col-lg-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* With Portfolio */}
              <h5>Clients With Portfolio</h5>
              <div className="portfolio-scroll mb-4">
                {withPortfolio.map((c) => (
                  <div key={c._id} className="portfolio-card">
                    <h6>{c.clientName}</h6>
                    <p className="mb-1">{c.projectName}</p>
                    <small>
                      Start: {new Date(c.startDate).toLocaleDateString()}
                    </small>

                    <div className="gallery mt-2">
                      {c.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={`http://localhost:5000${img}`}
                          alt=""
                        />
                      ))}
                    </div>

                    <div className="d-flex gap-2 mt-2">
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

              {/* Without Portfolio */}
              <h5>Clients Without Portfolio</h5>
              <div className="portfolio-scroll">
                {withoutPortfolio.map((c) => (
                  <div key={c._id} className="portfolio-card">
                    <h6>{c.clientName}</h6>
                    <p className="mb-1">{c.projectName}</p>
                    <small>
                      Start: {new Date(c.startDate).toLocaleDateString()}
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

      {/* Styles */}
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
