import { useEffect, useState } from "react";

const TestimonialForm = ({ editClient, onSaved, onCancel }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (editClient) {
      setFeedback(editClient.feedback || "");
      setRating(editClient.rating || "");
    }
  }, [editClient]);

  if (!editClient) {
    return (
      <div className="card h-100 d-flex align-items-center justify-content-center text-center p-4">
        <div>
          <div style={{ fontSize: "2.5rem" }}>💬</div>
          <h5 className="mt-3">No Client Selected</h5>
          <p className="text-muted mb-0">
            Select a client to add or edit testimonial.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editClient.feedback ? "PUT" : "POST";
    const url = `http://localhost:5000/api/testimonials/${editClient._id}`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback, rating }),
    });

    setFeedback("");
    setRating("");
    onSaved();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">
          {editClient.feedback ? "Edit Testimonial" : "Add Testimonial"}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Client</label>
            <input
              type="text"
              className="form-control"
              value={editClient.clientName}
              disabled
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Feedback</label>
            <textarea
              className="form-control"
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rating (0 - 5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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

export default TestimonialForm;
