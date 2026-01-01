import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const API = `${API_BASE_URL}/api/careers`;

/* ================= CareerCard ================= */
const CareerCard = ({ career, onToggle, onDelete, onViewCV }) => {
  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title text-primary">{career.name}</h5>
        <div className="card-text small text-muted">
          <p className="career-info mb-1"><strong>Email:</strong> {career.email}</p>
          <p className="career-info mb-1"><strong>Phone:</strong> {career.phone}</p>
          <p className="career-info mb-1"><strong>Job Title:</strong> <span className="badge bg-info text-dark">{career.jobTitle || "N/A"}</span></p>
          <p className="career-info mb-1"><strong>Details:</strong> {career.details || "No details provided"}</p>
          <p className="career-info mb-0"><strong>Applied:</strong> {career.createdAt ? new Date(career.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
        <hr />
        <div className="d-flex flex-wrap gap-2 justify-content-between">
          <button className="btn btn-outline-primary btn-sm" onClick={() => onViewCV(career.cv)}>
            View CV
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-success" onClick={() => onToggle(career)}>
              {career.responded ? "Undo Responded" : "Mark Responded"}
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(career._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= CareersManager ================= */
const CareersManager = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Helper to get headers (Used in every request)
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchCareers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      
      if (res.ok) {
        setCareers(data.careers || []);
      } else {
        toast.error(data.message || "Unauthorized access");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const toggleResponded = async (career) => {
    try {
      const res = await fetch(`${API}/${career._id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ responded: !career.responded }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Update failed");
      }

      toast.success(career.responded ? "Marked as unresponded" : "Marked as responded");
      
      // Update local state instead of re-fetching
      setCareers((prev) =>
        prev.map((c) => (c._id === career._id ? { ...c, responded: !career.responded } : c))
      );
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this application?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Delete failed");

      toast.success("Application deleted");
      setCareers((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleViewCV = (cvPath) => {
    if (!cvPath) return toast.warning("No CV uploaded");
    const cvUrl = `${API_BASE_URL}${cvPath}`;
    window.open(cvUrl, "_blank");
  };

  // Safe filtering
  const filteredCareers = Array.isArray(careers) ? careers.filter((career) =>
    career.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const unresponded = filteredCareers.filter((c) => !c.responded);
  const responded = filteredCareers.filter((c) => c.responded);

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Career Applications</h3>
        <button className="btn btn-primary btn-sm" onClick={fetchCareers}>Refresh List</button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or job title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Fetching applications...</p>
        </div>
      ) : (
        <div className="row g-4">
          {/* Unresponded Section */}
          <div className="col-12 col-lg-6">
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <div className="card-header bg-danger text-white py-3 fw-bold">
                Pending Action ({unresponded.length})
              </div>
              <div className="card-body bg-light" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {unresponded.length === 0 ? (
                  <p className="text-center text-muted py-4">All clear!</p>
                ) : (
                  unresponded.map((c) => (
                    <CareerCard key={c._id} career={c} onToggle={toggleResponded} onDelete={handleDelete} onViewCV={handleViewCV} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Responded Section */}
          <div className="col-12 col-lg-6">
            <div className="card h-100 border-0 shadow-sm overflow-hidden">
              <div className="card-header bg-success text-white py-3 fw-bold">
                Archived/Responded ({responded.length})
              </div>
              <div className="card-body bg-light" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {responded.length === 0 ? (
                  <p className="text-center text-muted py-4">No responded applications yet.</p>
                ) : (
                  responded.map((c) => (
                    <CareerCard key={c._id} career={c} onToggle={toggleResponded} onDelete={handleDelete} onViewCV={handleViewCV} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersManager;