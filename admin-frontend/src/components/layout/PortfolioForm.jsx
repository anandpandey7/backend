import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/portfolio";

const PortfolioForm = ({ editClient, onSaved, onCancel }) => {
  const [gallery, setGallery] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");


  useEffect(() => {
    if (editClient) {
      setGallery([]);
      setStartDate(editClient.startDate?.substring(0, 10) || "");
      setEndDate(editClient.endDate?.substring(0, 10) || "");
      setProjectDescription(editClient.projectDescription || "");
    }
  }, [editClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editClient) return alert("Select a client");

    const fd = new FormData();
    gallery.forEach((file) => fd.append("gallery", file));

    fd.append("startDate", startDate);
    fd.append("endDate", endDate);
    fd.append("projectDescription", projectDescription);

    const method = editClient.gallery?.length ? "PUT" : "POST";

    await fetch(`${API}/${editClient._id}`, {
      method,
      body: fd,
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
            accept="image/*"
            className="form-control mb-3"
            onChange={(e) => setGallery([...e.target.files])}
          />

          <div className="mb-2">
            <label className="form-label">Project Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          

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
