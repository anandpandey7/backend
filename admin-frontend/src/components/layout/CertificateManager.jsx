import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../helper/config";

const API = API_BASE_URL + "/api/certifications";

export default function CertificationManager() {
  const token = localStorage.getItem("token");

  const [certifications, setCertifications] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState("");
  const [logos, setLogos] = useState([]);
  const [certificates, setCertificates] = useState([]);

  /* ================= FETCH ================= */
  const fetchCertifications = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setCertifications(data.data || []);

      // 👉 Show form automatically if no data
      if (!data.data || data.data.length === 0) {
        setShowForm(true);
      }
    } catch {
      toast.error("Failed to load certifications");
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  /* ================= RESET ================= */
  const resetForm = () => {
    setDescription("");
    setLogos([]);
    setCertificates([]);
    setEditId(null);
    setShowForm(false);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      toast.error("Description is required");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("description", description);
      logos.forEach((f) => fd.append("logos", f));
      certificates.forEach((f) => fd.append("certificates", f));

      const res = await fetch(
        editId ? API : API,
        {
          method: editId ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Save failed");
        return;
      }

      toast.success(editId ? "Updated successfully" : "Created successfully");
      resetForm();
      fetchCertifications();
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditId(item._id);
    setDescription(item.description);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE CERTIFICATION ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certification?")) return;

    try {
      const res = await fetch(API, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Deleted successfully");
      fetchCertifications();
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= DELETE IMAGE ================= */
  const deleteImage = async (type, image) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      const res = await fetch(`${API}/image`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, image }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Image delete failed");
        return;
      }

      toast.success("Image deleted");
      fetchCertifications();
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container py-3">

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="card mb-4 p-3 shadow-sm">
          <h4>{editId ? "Edit Certification" : "Add Certification"}</h4>

          <form onSubmit={handleSubmit}>
            <label className="fw-bold">Description</label>
            <textarea
              className="form-control mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="fw-bold">Logos</label>
            <input
              type="file"
              className="form-control mb-3"
              multiple
              accept="image/*"
              onChange={(e) => setLogos([...e.target.files])}
            />

            <label className="fw-bold">Certificates</label>
            <input
              type="file"
              className="form-control mb-3"
              multiple
              accept="image/*"
              onChange={(e) => setCertificates([...e.target.files])}
            />

            <div className="d-flex gap-2">
              <button className="btn btn-success" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* ================= VIEW ================= */}
      {certifications.map((item) => (
        <div key={item._id} className="card mb-4 p-3 shadow-sm">

          <h5 className="border-bottom pb-2">Description</h5>
          <p>{item.description}</p>

          <h5 className="border-bottom pb-2 mt-3">Logos</h5>
          <div className="row">
            {item.logos?.map((img, i) => (
              <div key={i} className="col-md-2 text-center mb-2">
                <img
                  src={`http://localhost:5000${img}`}
                  className="img-fluid rounded"
                  alt=""
                />
                <button
                  className="btn btn-sm btn-danger mt-1"
                  onClick={() => deleteImage("logos", img)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <h5 className="border-bottom pb-2 mt-3">Certificates</h5>
          <div className="row">
            {item.certificates?.map((img, i) => (
              <div key={i} className="col-md-3 text-center mb-2">
                <img
                  src={`http://localhost:5000${img}`}
                  className="img-fluid rounded"
                  alt=""
                />
                <button
                  className="btn btn-sm btn-danger mt-1"
                  onClick={() => deleteImage("certificates", img)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
