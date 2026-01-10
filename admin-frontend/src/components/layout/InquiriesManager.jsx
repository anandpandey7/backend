import { useEffect, useState } from "react";
import InquiryCard from "./InquiryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const API = `${API_BASE_URL}/api/inquiries`;

const InquiriesManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
  if (!token) {
    toast.error("Please login again");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      toast.error("Session expired. Please login again.");
      return;
    }

    const data = await res.json();
    setInquiries(data.inquiries || []);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load inquiries");
  } finally {
    setLoading(false);
  }
};

  const openCommentModal = (inq) => {
    setSelectedInquiry(inq);
    setComment(inq.comment || "");
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
    setSelectedInquiry(null);
    setComment("");
  };

  const toggleResolve = async (inq) => {
    // If marking as resolved, show comment modal
    if (!inq.resolve) {
      openCommentModal(inq);
      return;
    }

    // If marking as unresolved, proceed directly
    await updateInquiryStatus(inq, false, null);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment is required when marking as resolved");
      return;
    }

    await updateInquiryStatus(selectedInquiry, true, comment);
    closeCommentModal();
  };

  const updateInquiryStatus = async (inq, resolve, comment) => {
    // Show confirmation ONLY when reverting from resolved → unresolved
    if (!resolve) {
      const confirmUnresolve = window.confirm(
        "This inquiry is already resolved. Mark it as unresolved?"
      );
      if (!confirmUnresolve) return;
    }
    try {
      setSubmitting(true);
      const body = { resolve };
      if (comment !== null) {
        body.comment = comment;
      }

      const res = await fetch(`${API}/${inq._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success(
        resolve ? "Marked as resolved ✅" : "Marked as unresolved 🔄"
      );

      setInquiries((prev) =>
        prev.map((i) =>
          i._id === inq._id
            ? { ...i, resolve, comment: resolve ? comment : null }
            : i
        )
      );
    } catch (e) {
      console.error(e);
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Inquiry deleted 🗑️");
      setInquiries((prev) => prev.filter((i) => i._id !== id));
    } catch (e) {
      console.error(e);
      toast.error("Server error");
    }
  };

  const unresolved = inquiries.filter((i) => !i.resolve);
  const resolved = inquiries.filter((i) => i.resolve);

  return (
    <div className="container py-4">
      <h3 className="mb-4">Inquiry Section</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row g-4">
          <ToastContainer position="top-center" autoClose={2500} />
          
          {/* Unresolved */}
          <div className="col-12 col-lg-6">
            <div className="card border-danger">
              <div
                className="card-header bg-danger text-white fs-5"
                style={{ fontWeight: 600 }}
              >
                Unresolved Inquiries ({unresolved.length})
              </div>
              <div className="card-body">
                {unresolved.length === 0 ? (
                  <p className="text-muted">No unresolved inquiries 🎉</p>
                ) : (
                  unresolved.map((inq) => (
                    <InquiryCard
                      key={inq._id}
                      inquiry={inq}
                      onToggle={() => toggleResolve(inq)}
                      onDelete={() => handleDelete(inq._id)}
                      resolveLabel="Mark Resolved"
                      resolveBtn="success"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Resolved */}
          <div className="col-12 col-lg-6">
            <div className="card border-success">
              <div
                className="card-header bg-success text-white fs-5"
                style={{ fontWeight: 600 }}
              >
                Resolved Inquiries ({resolved.length})
              </div>
              <div className="card-body">
                {resolved.length === 0 ? (
                  <p className="text-muted">No resolved inquiries</p>
                ) : (
                  resolved.map((inq) => (
                    <InquiryCard
                      key={inq._id}
                      inquiry={inq}
                      onToggle={() => toggleResolve(inq)}
                      onDelete={() => handleDelete(inq._id)}
                      resolveLabel="Mark Unresolved"
                      resolveBtn="warning"
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
                <h5 className="modal-title">Add Resolution Comment</h5>
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
                  placeholder="Enter resolution details or notes..."
                  disabled={submitting}
                />
                <small className="text-muted">
                  This comment will be saved with the resolved inquiry.
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
                  {submitting ? "Saving..." : "Mark as Resolved"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiriesManager;