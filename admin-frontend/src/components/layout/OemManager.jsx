import { useEffect, useState } from "react";
import { API_BASE_URL } from "../helper/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const domainAPI = API_BASE_URL + "/api/domains";
const oemAPI = API_BASE_URL + "/api/oem";

export default function OEM() {
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [oemForms, setOemForms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedOEM, setSelectedOEM] = useState(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Helper to get authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // Fetch domains
  const fetchDomains = async () => {
    try {
      const res = await fetch(domainAPI, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) setDomains(data.domains);
    } catch {
      toast.error("Failed to load domains");
    }
  };

  // Fetch OEM forms
  const fetchOEMForms = async () => {
    try {
      const res = await fetch(oemAPI, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) setOemForms(data.forms);
    } catch {
      toast.error("Failed to load OEM forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
    fetchOEMForms();
  }, []);

  // Add domain
  const addDomain = async () => {
    if (!newDomain.trim()) {
      toast.error("Domain name required");
      return;
    }

    try {
      const res = await fetch(domainAPI, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newDomain }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to add domain");
        return;
      }

      toast.success("Domain added");
      setNewDomain("");
      fetchDomains();
    } catch {
      toast.error("Server error");
    }
  };

  // Delete domain
  const deleteDomain = async (id) => {
    if (!window.confirm("Are you sure you want to delete this domain?")) return;

    try {
      const res = await fetch(`${domainAPI}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to delete domain");
        return;
      }

      toast.success("Domain deleted successfully");
      fetchDomains();
    } catch {
      toast.error("Error deleting domain");
    }
  };

  // Delete OEM
  const deleteOEM = async (id) => {
    if (!window.confirm("Delete this OEM form?")) return;

    try {
      const res = await fetch(`${oemAPI}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("OEM deleted");
      fetchOEMForms();
    } catch {
      toast.error("Server error");
    }
  };

  // Open comment modal
  const openCommentModal = (oem) => {
    setSelectedOEM(oem);
    setComment(oem.comment || "");
    setShowCommentModal(true);
  };

  // Close comment modal
  const closeCommentModal = () => {
    setShowCommentModal(false);
    setSelectedOEM(null);
    setComment("");
  };

  // Mark responded - with comment modal
  const markResponded = async (oem) => {
    // If marking as responded, show comment modal
    if (!oem.responded) {
      openCommentModal(oem);
      return;
    }

    // If marking as unresponded, proceed directly
    await updateOEMStatus(oem, false, null);
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment is required when marking as responded");
      return;
    }

    await updateOEMStatus(selectedOEM, true, comment);
    closeCommentModal();
  };

  // Update OEM status
  const updateOEMStatus = async (oem, responded, comment) => {
    try {
      setSubmitting(true);
      const body = { responded };
      if (comment !== null) {
        body.comment = comment;
      }

      const res = await fetch(`${oemAPI}/${oem._id}/responded`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      toast.success(
        responded ? "Marked as responded ✅" : "Marked as unresponded 🔄"
      );

      // Update local state
      setOemForms((prev) =>
        prev.map((f) =>
          f._id === oem._id
            ? { ...f, responded, comment: responded ? comment : null }
            : f
        )
      );
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredForms = selectedDomain
    ? oemForms.filter((f) => f.domain?._id === selectedDomain)
    : oemForms;

  const unresponded = filteredForms.filter((f) => !f.responded);
  const responded = filteredForms.filter((f) => f.responded);

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* ================= DOMAIN SECTION ================= */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Domains Management</h5>

        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new domain"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addDomain()}
          />
          <button className="btn btn-primary" onClick={addDomain}>
            Add
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {domains.length === 0 ? (
            <p className="text-muted small">No domains added yet</p>
          ) : (
            domains.map((d) => (
              <span
                key={d._id}
                className="badge bg-primary d-flex align-items-center gap-2 px-3 py-2"
              >
                {d.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDomain(d._id);
                  }}
                  className="btn btn-sm btn-light p-0 px-1"
                  style={{ lineHeight: 1 }}
                >
                  ❌
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option value="">All Domains</option>
          {domains.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* ================= OEM FORMS ================= */}
      <div className="row g-4">
        {/* Unresponded */}
        <div className="col-12 col-lg-6">
          <div className="card h-100 border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-danger text-white py-3 fw-bold">
              Unresponded ({unresponded.length})
            </div>
            <div
              className="card-body bg-light"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {unresponded.length === 0 ? (
                <p className="text-center text-muted py-4">
                  No unresponded OEM forms 🎉
                </p>
              ) : (
                unresponded.map((f) => (
                  <OEMCard
                    key={f._id}
                    data={f}
                    onRespond={() => markResponded(f)}
                    onDelete={() => deleteOEM(f._id)}
                    showComment={false}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Responded */}
        <div className="col-12 col-lg-6">
          <div className="card h-100 border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-success text-white py-3 fw-bold">
              Responded ({responded.length})
            </div>
            <div
              className="card-body bg-light"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {responded.length === 0 ? (
                <p className="text-center text-muted py-4">
                  No responded OEM forms yet
                </p>
              ) : (
                responded.map((f) => (
                  <OEMCard
                    key={f._id}
                    data={f}
                    onRespond={() => markResponded(f)}
                    onDelete={() => deleteOEM(f._id)}
                    showComment={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMMENT MODAL ================= */}
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
                  This comment will be saved with the responded OEM form.
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
}

/* ================= OEM CARD COMPONENT ================= */
const OEMCard = ({ data, onRespond, onDelete, showComment }) => {
  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title text-primary">
          {data.firstName} {data.lastName}
        </h5>
        <div className="small text-muted">
          <p className="mb-1">
            <strong>Email:</strong> {data.email}
          </p>
          <p className="mb-1">
            <strong>Domain:</strong>{" "}
            <span className="badge bg-info text-dark">
              {data.domain?.name || "N/A"}
            </span>
          </p>
          <p className="mb-1">
            <strong>Phone 1:</strong> {data.contactNo1}
          </p>
          <p className="mb-1">
            <strong>Phone 2:</strong> {data.contactNo2}
          </p>
          <p className="mb-1">
            <strong>Location:</strong> {data.address}
          </p>
          {data.organization && (
            <p className="mb-1">
              <strong>Organization:</strong> {data.organization}
            </p>
          )}
          <p className="mb-0">
            <strong>Description:</strong> {data.projectDescription}
          </p>
        </div>

        {showComment && data.comment && (
          <div className="alert alert-info mt-3 mb-2">
            <strong>Response Comment:</strong>
            <p className="mb-0 mt-2 small">{data.comment}</p>
          </div>
        )}

        <hr />

        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
          {data.projectReport && (
            <a
              href={`${API_BASE_URL}${data.projectReport}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-primary"
            >
              View Project Report
            </a>
          )}

          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-success" onClick={onRespond}>
              {data.responded ? "Mark Unresponded" : "Mark Responded"}
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};