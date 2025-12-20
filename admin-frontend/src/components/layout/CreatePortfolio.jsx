import { useEffect, useState } from "react";

const CreatePortfolio = ({ editClient, onSaved, onCancel }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFiles([]);
  }, [editClient]);

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please select images");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("gallery", file));

    try {
      setLoading(true);

      const url = editClient?.gallery?.length
        ? `http://localhost:5000/api/portfolio/${editClient._id}`
        : `http://localhost:5000/api/portfolio/${editClient._id}`;

      const method = editClient?.gallery?.length ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed to save portfolio");
        return;
      }

      onSaved(data.client);
      setFiles([]);
    } catch (e) {
      console.error(e);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h3 className="card-title">
          {editClient ? "Edit Portfolio" : "Add Portfolio"}
        </h3>
        {editClient && (
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Gallery Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*"
            onChange={(e) => setFiles([...e.target.files])}
          />
        </div>

        {editClient?.gallery?.length > 0 && (
          <div className="mb-3">
            <small className="text-muted">Existing images:</small>
            <div className="d-flex gap-2 flex-wrap mt-2">
              {editClient.gallery.map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000${img}`}
                  alt=""
                  height="60"
                  style={{ objectFit: "cover", borderRadius: "6px" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : editClient ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CreatePortfolio;
