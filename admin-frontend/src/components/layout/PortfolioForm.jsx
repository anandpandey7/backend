import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/portfolio";

const PortfolioForm = ({ editClient, onSaved, onCancel }) => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    setGallery([]);
  }, [editClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editClient) return alert("Select a client");

    const fd = new FormData();
    gallery.forEach((file) => fd.append("gallery", file));

    const method = editClient.gallery?.length ? "PUT" : "POST";

    await fetch(`${API}/${editClient._id}`, {
      method,
      body: fd
    });

    onSaved();
  };

  if (!editClient) {
  return (
    <div className="card h-100 d-flex align-items-center justify-content-center text-center p-4">
      <div>
        <div style={{ fontSize: "2.5rem" }}>📁</div>
        <h5 className="mt-3">No Client Selected</h5>
        <p className="text-muted mb-0">
          Please choose a client from the right to <br />
          add or edit their portfolio.
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="card">
      <div className="card-header">
        <h5>
          {editClient.gallery?.length ? "Edit Portfolio" : "Add Portfolio"}
        </h5>
      </div>
      <div className="card-body">
        <p><strong>{editClient.clientName}</strong></p>
        <p>{editClient.projectName}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            multiple
            className="form-control mb-3"
            onChange={(e) => setGallery([...e.target.files])}
          />

          <div className="d-flex gap-2">
            <button className="btn btn-success" type="submit">
              Save
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
