import { useState } from "react";

const ServiceCard = ({ service, onEdit, onDelete }) => {
  const [showLong, setShowLong] = useState(false);

  const clean = (t) => t?.replace(/"/g, "") || "";

  const truncate = (text, max = 80) =>
    text.length > max ? text.substring(0, max) + "..." : text;

  return (
    <div className="card shadow-sm service-card">
      <img
        src={`http://localhost:5000${service.thumbnail}`}
        className="card-img-top"
        alt={clean(service.title)}
        style={{ height: "150px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5>{clean(service.title)}</h5>

        <p className="text-muted flex-grow-1">
          {showLong
            ? clean(service.longDescription)
            : truncate(clean(service.description))}
        </p>

        <button
          className="btn btn-sm btn-outline-secondary mb-2"
          onClick={() => setShowLong((p) => !p)}
        >
          {showLong ? "Hide" : "Show"} Details
        </button>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(service)}
          >
            <i className="bi bi-pencil"></i> Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(service._id)}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
