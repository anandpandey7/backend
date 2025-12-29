import { useEffect, useState } from "react";
import InquiryCard from "./InquiryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const API = "http://localhost:5000/api/inquiries";

const InquiriesManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const toggleResolve = async (inq) => {
    try {
      const res = await fetch(`${API}/${inq._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resolve: !inq.resolve }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success(
        !inq.resolve ? "Marked as resolved ✅" : "Marked as unresolved 🔄"
      );

      setInquiries((prev) =>
        prev.map((i) =>
          i._id === inq._id ? { ...i, resolve: !inq.resolve } : i
        )
      );
    } catch (e) {
      console.error(e);
      toast.error("Server error");
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
          {/* ❌ Unresolved */}
          <ToastContainer position="top-center" autoClose={2500} />
          <div className="col-12 col-lg-6">
            <div className="card border-danger">
              <div className="card-header bg-danger text-white fs-5"
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

          {/* ✅ Resolved */}
          <div className="col-12 col-lg-6">
            <div className="card border-success">
              <div className="card-header bg-success text-white fs-5"
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
                    />
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

export default InquiriesManager;
