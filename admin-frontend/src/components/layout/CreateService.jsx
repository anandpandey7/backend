import { useEffect, useState } from "react";

const CreateService = ({ editService, onSaved, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editService) {
      setTitle(editService.title.replace(/"/g, ""));
      setDescription(editService.description.replace(/"/g, ""));
      setLongDescription(editService.longDescription.replace(/"/g, ""));
      setThumbnail(null);
    } else {
      reset();
    }
  }, [editService]);

  const reset = () => {
    setTitle("");
    setDescription("");
    setLongDescription("");
    setThumbnail(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async () => {
  // Validation
  if (!title.trim()) {
    alert("Title is required");
    return;
  }
  if (!description.trim()) {
    alert("Description is required");
    return;
  }
  if (!longDescription.trim()) {
    alert("Long description is required");
    return;
  }
  if (!editService && !thumbnail) {
    alert("Thumbnail required for new service");
    return;
  }

  const fd = new FormData();
  fd.append("title", title.trim());
  fd.append("description", description.trim());
  fd.append("longDescription", longDescription.trim());
  if (thumbnail) fd.append("thumbnail", thumbnail);

  try {
    setLoading(true);
    const url = editService
      ? `http://localhost:5000/api/services/${editService._id}`
      : "http://localhost:5000/api/services";

    const method = editService ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });
    const data = await res.json();

    // Log everything for debugging
    // console.log("=== SERVER RESPONSE ===");
    // console.log("Status:", res.status);
    // console.log("Response data:", data);
    // console.log("======================");

    if (!res.ok || !data.success) {
      // Show the actual error from the server
      let errorMessage = data.message || `Server error: ${res.status}`;
      
      if (data.errors) {
        // Zod validation errors
        errorMessage = data.errors.map(e => `${e.path.join('.')}: ${e.message}`).join("\n");
      }
      
      alert(`Error:\n${errorMessage}`);
      throw new Error(errorMessage);
    }

    if (!data.service) {
      throw new Error("No service object in response");
    }

    onSaved(data.service);
    reset();
  } catch (err) {
    console.error("Full error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-0">
          {editService ? "Edit Service" : "Create Service"}
        </h3>
        {editService && (
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            className="form-control"
            placeholder="Service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description *</label>
          <textarea
            className="form-control"
            rows="2"
            placeholder="Brief description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Long Description *</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Detailed description"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Thumbnail {!editService && "*"}
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          {editService && (
            <small className="text-muted">
              Leave empty to keep current thumbnail
            </small>
          )}
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-primary w-100"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading
            ? "Saving..."
            : editService
            ? "Update Service"
            : "Create Service"}
        </button>
      </div>
    </div>
  );
};

export default CreateService;