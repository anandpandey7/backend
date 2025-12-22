import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ClientForm = ({ editClient, onSaved, onCancel }) => {
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    budget: "",
    rating: "",
    feedback: "",
  });

  const [logo, setLogo] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editClient) {
      setForm({
        clientName: editClient.clientName || "",
        email: editClient.email || "",
        phone: editClient.phone || "",
        projectName: editClient.projectName || "",
        projectDescription: editClient.projectDescription || "",
        startDate: editClient.startDate?.substring(0, 10) || "",
        endDate: editClient.endDate?.substring(0, 10) || "",
        budget: editClient.budget || "",
        rating: editClient.rating || "",
        feedback: editClient.feedback || "",
      });
      setLogo(null);
      setGallery([]);
    } else {
      setForm({
        clientName: "",
        email: "",
        phone: "",
        projectName: "",
        projectDescription: "",
        startDate: "",
        endDate: "",
        budget: "",
        rating: "",
        feedback: "",
      });
      setLogo(null);
      setGallery([]);
    }
  }, [editClient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        fd.append(k, v || "");
    });

      if (logo) fd.append("logo", logo);
      gallery.forEach((img) => fd.append("gallery", img));

      const method = editClient ? "PUT" : "POST";
      const url = editClient
        ? `http://localhost:5000/api/clients/${editClient._id}`
        : "http://localhost:5000/api/clients";

      const res = await fetch(url, {
        method,
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Save failed");
        return;
      }

      toast.success(
        editClient ? "Client updated successfully ✅" : "Client added successfully 🎉"
      );

      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="card-title mb-0">
          {editClient ? "Edit Client" : "Add Client"}
        </h5>
        {editClient && (
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {[
            ["clientName", "Client Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["projectName", "Project Name"],
          ].map(([name, label]) => (
            <div className="mb-2" key={name}>
              <label className="form-label">{label}</label>
              <input
                type="text"
                className="form-control"
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-2">
            <label className="form-label">Project Description</label>
            <textarea
              className="form-control"
              rows="2"
              name="projectDescription"
              value={form.projectDescription}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col mb-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="col mb-2">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Budget</label>
            <input
              type="number"
              className="form-control"
              name="budget"
              value={form.budget}
              onChange={handleChange}
            />
          </div>

          {/* Optional rating & feedback */}
          <div className="row">
            <div className="col mb-2">
              <label className="form-label">Rating (optional)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="form-control"
                name="rating"
                value={form.rating}
                onChange={handleChange}
              />
            </div>
            <div className="col mb-2">
              <label className="form-label">Feedback (optional)</label>
              <input
                type="text"
                className="form-control"
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">
              {editClient ? "Replace Logo (optional)" : "Logo"}
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gallery Images (multiple)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={(e) => setGallery(Array.from(e.target.files))}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editClient
              ? "Update Client"
              : "Add Client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
