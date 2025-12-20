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
  };

  const handleSubmit = async () => {
    if (!editService && !thumbnail) {
      alert("Thumbnail required");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("longDescription", longDescription);
    if (thumbnail) fd.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      const url = editService
        ? `http://localhost:5000/api/services/${editService._id}`
        : "http://localhost:5000/api/services";

      const method = editService ? "PUT" : "POST";

      const res = await fetch(url, { method, body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed");

      onSaved(data.service);
      reset();
    } catch (err) {
      console.error(err);
      alert("Error saving service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3 className="card-title">
          {editService ? "Edit Service" : "Create Service"}
        </h3>
        {editService && (
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          rows="2"
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          rows="4"
          placeholder="Long description"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        />

        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required={!editService}
        />
      </div>

      <div className="card-footer">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : editService ? "Update Service" : "Save Service"}
        </button>
      </div>
    </div>
  );
};

export default CreateService;
