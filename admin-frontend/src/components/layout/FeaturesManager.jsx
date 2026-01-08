import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const API = `${API_BASE_URL}/api/features`;

export default function FeaturesManager() {
  const token = localStorage.getItem("token");

  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    type: "boolean",
  });

  // fetch features

  const fetchFeatures = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (data.success) {
        setFeatures(data.features);
      }
    } catch {
      toast.error("Failed to load features");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  /* ================= FORM ================= */

  const resetForm = () => {
    setForm({ title: "", type: "boolean" });
    setEditId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return toast.error("Title is required");
    }

    try {
      const res = await fetch(
        editId ? `${API}/${editId}` : API,
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Save failed");
        return;
      }

      toast.success(editId ? "Feature updated" : "Feature created");
      resetForm();
      fetchFeatures();
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (feature) => {
    setEditId(feature._id);
    setForm({
      title: feature.title,
      type: feature.type,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feature?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Feature deleted");
      fetchFeatures();
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return <p className="text-center mt-4">Loading features...</p>;
  }

  return (
    <div className="container py-4">
      
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Features</h4>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add Feature
        </button>
      </div>

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="card mb-4 shadow-sm p-3">
          <h5>{editId ? "Edit Feature" : "Add Feature"}</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="boolean">Boolean</option>
                <option value="input">Input</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-success">
                {editId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= LIST ================= */}
      {features.length === 0 ? (
        <p className="text-muted">No features added yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f._id}>
                  <td>{f.title}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {f.type}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(f)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(f._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
