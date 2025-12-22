const ClientCard = ({ client, onEdit, onDelete }) => {
  return (
    <div className="card" style={{ width: "280px" }}>
      <img
        src={`http://localhost:5000${client.logo}`}
        alt={client.clientName}
        className="card-img-top"
        style={{ height: "140px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h6 className="fw-bold mb-1">{client.clientName}</h6>
        <p className="mb-1 text-muted">{client.projectName}</p>
        <p className="small text-muted mb-1">
          Start: {new Date(client.startDate).toLocaleDateString()}
        </p>

        {client.rating && (
          <p className="mb-1 small">⭐ {client.rating}</p>
        )}
        {client.feedback && (
          <p className="small text-muted mb-2">
            “{client.feedback}”
          </p>
        )}

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(client)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(client._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
