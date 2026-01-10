import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const API = `${API_BASE_URL}/api/careers`;

/* ================= CareerCard ================= */
const CareerCard = ({ career, onToggle, onDelete, onViewCV, showComment }) => {
  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title text-primary">{career.name}</h5>
        <div className="card-text small text-muted">
          <p className="career-info mb-1"><strong>Email:</strong> {career.email}</p>
          <p className="career-info mb-1"><strong>Phone:</strong> {career.phone}</p>
          <p className="career-info mb-1">
            <strong>Job Title:</strong> <span className="badge bg-info text-dark">{career.jobTitle || "N/A"}</span>
          </p>
          <p className="career-info mb-1"><strong>Details:</strong> {career.details || "No details provided"}</p>
          <p className="career-info mb-0">
            <strong>Applied:</strong> {career.createdAt ? new Date(career.createdAt).toLocaleDateString() : "N/A"}
          </p>
        </div>

        {showComment && career.comment && (
          <div className="alert alert-info mt-3 mb-2">
            <strong>Response Comment:</strong>
            <p className="mb-0 mt-2 small">{career.comment}</p>
          </div>
        )}

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
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Helper to get headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
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

  const openCommentModal = (career) => {
    setSelectedCareer(career);
    setComment(career.comment || "");
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
    setSelectedCareer(null);
    setComment("");
  };

  const toggleResponded = async (career) => {
    // If marking as responded, show comment modal
    if (!career.responded) {
      openCommentModal(career);
      return;
    }

    // If marking as unresponded, proceed directly
    await updateCareerStatus(career, false, null);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment is required when marking as responded");
      return;
    }

    await updateCareerStatus(selectedCareer, true, comment);
    closeCommentModal();
  };

  const updateCareerStatus = async (career, responded, comment) => {
    try {
      setSubmitting(true);
      const body = { responded };
      if (comment !== null) {
        body.comment = comment;
      }

      const res = await fetch(`${API}/${career._id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Update failed");
      }

      toast.success(responded ? "Marked as responded ✅" : "Marked as unresponded 🔄");
      
      setCareers((prev) =>
        prev.map((c) =>
          c._id === career._id
            ? { ...c, responded, comment: responded ? comment : null }
            : c
        )
      );
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
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
      <ToastContainer position="top-center" autoClose={2000} />
      
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
                    <CareerCard
                      key={c._id}
                      career={c}
                      onToggle={toggleResponded}
                      onDelete={handleDelete}
                      onViewCV={handleViewCV}
                      showComment={false}
                    />
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
                    <CareerCard
                      key={c._id}
                      career={c}
                      onToggle={toggleResponded}
                      onDelete={handleDelete}
                      onViewCV={handleViewCV}
                      showComment={true}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeCommentModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Response Comment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeCommentModal}
                  disabled={submitting}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label fw-semibold">
                  Comment <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter response details or action taken..."
                  disabled={submitting}
                />
                <small className="text-muted">
                  This comment will be saved with the responded application.
                </small>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeCommentModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCommentSubmit}
                  disabled={submitting || !comment.trim()}
                >
                  {submitting ? "Saving..." : "Mark as Responded"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersManager;