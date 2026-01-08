const TestimonialCard = ({ client, type, onSelect, onDelete }) => {
  return (
    <div className="card" style={{ width: "250px" }}>
      <div className="card-body">
        <h6 className="fw-bold mb-1">{client.clientName}</h6>
        <p className="mb-1 text-muted">{client.projectName}</p>

        {type === "edit" && (
          <>
            <p className="small mb-1">⭐ {client.rating}</p>
            <p className="small text-muted">
              {client.feedback?.substring(0, 60)}...
            </p>
          </>
        )}

        <div className="d-flex gap-2 mt-2">
          <button className="btn btn-sm btn-outline-primary" onClick={onSelect}>
            {type === "add" ? "Add" : "Edit"}
          </button>
          {type === "edit" && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(client._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
