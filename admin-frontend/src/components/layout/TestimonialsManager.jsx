import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../helper/config";

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

const TestimonialForm = ({ editClient, onSaved, onCancel }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [isCustomRating, setIsCustomRating] = useState(false);

  useEffect(() => {
    if (editClient) {
      setFeedback(editClient.feedback || "");
      const clientRating = editClient.rating?.toString() || "";
      setRating(clientRating);
      
      // Check if rating is a standard option (0, 0.5, 1.0, ..., 5.0)
      const standardRatings = [...Array(11)].map((_, i) => (i * 0.5).toFixed(1));
      setIsCustomRating(clientRating && !standardRatings.includes(clientRating));
    } else {
      setFeedback("");
      setRating("");
      setIsCustomRating(false);
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

  const handleSubmit = async () => {
    // Validation
    if (!feedback.trim()) {
      toast.error("Feedback is required!");
      return;
    }

    if (!rating || rating === "") {
      toast.error("Please select a rating!");
      return;
    }

    const ratingNum = parseFloat(rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      toast.error("Rating must be between 0 and 5!");
      return;
    }

    try {
      const method = editClient.feedback ? "PUT" : "POST";
      const url = `${API_BASE_URL}/api/testimonials/${editClient._id}`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, rating: ratingNum }),
      });

      if (!response.ok) {
        throw new Error("Failed to save testimonial");
      }

      toast.success(
        editClient.feedback 
          ? "Testimonial updated successfully!" 
          : "Testimonial added successfully!"
      );

      setFeedback("");
      setRating("");
      setIsCustomRating(false);
      onSaved();
    } catch (error) {
      toast.error("Error saving testimonial. Please try again.");
      console.error(error);
    }
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustomRating(true);
      setRating("");
    } else {
      setIsCustomRating(false);
      setRating(value);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">
          {editClient.feedback ? "Edit Testimonial" : "Add Testimonial"}
        </h5>
      </div>
      <div className="card-body">
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
          <label className="form-label">Project</label>
          <input
            type="text"
            className="form-control"
            value={editClient.projectName}
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating (0 – 5)</label>

          <select
            className="form-control mb-2"
            value={isCustomRating ? "custom" : rating}
            onChange={handleRatingChange}
          >
            <option value="">Select rating</option>
            {[...Array(11)].map((_, i) => {
              const value = (i * 0.5).toFixed(1);
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
            <option value="custom">Custom</option>
          </select>

          {isCustomRating && (
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              className="form-control"
              placeholder="Enter rating (0–5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          )}
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
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
      </div>
    </div>
  );
};

const TestimonialsManager = () => {
  const [withTestimonials, setWithTestimonials] = useState([]);
  const [withoutTestimonials, setWithoutTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClient, setEditClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const [withRes, withoutRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/testimonials`),
        fetch(`${API_BASE_URL}/api/testimonials/clients`),
      ]);

      if (!withRes.ok || !withoutRes.ok) {
        throw new Error("Failed to fetch clients");
      }

      const withData = await withRes.json();
      const withoutData = await withoutRes.json();

      setWithTestimonials(withData.clients || []);
      setWithoutTestimonials(withoutData.clients || []);
    } catch (err) {
      toast.error("Error loading clients. Please refresh the page.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }

      toast.success("Testimonial deleted successfully!");
      setWithTestimonials((prev) => prev.filter((c) => c._id !== id));
      setEditClient(null);
      fetchClients();
    } catch (error) {
      toast.error("Error deleting testimonial. Please try again.");
      console.error(error);
    }
  };

  const handleSaved = () => {
    setEditClient(null);
    fetchClients();
  };

  return (
    <div className="container py-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
      />
      
      <div className="row g-4">
        {/* Form */}
        <div className="col-12 col-lg-4">
          <TestimonialForm
            editClient={editClient}
            onSaved={handleSaved}
            onCancel={() => setEditClient(null)}
          />
        </div>

        {/* Lists */}
        <div className="col-12 col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Clients Without Testimonials</h5>
            </div>
            <div className="card-body d-flex flex-wrap gap-3">
              {loading ? (
                <p>Loading...</p>
              ) : withoutTestimonials.length === 0 ? (
                <p className="text-muted">All clients have testimonials.</p>
              ) : (
                withoutTestimonials.map((c) => (
                  <TestimonialCard
                    key={c._id}
                    client={c}
                    type="add"
                    onSelect={() => setEditClient(c)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Clients With Testimonials</h5>
            </div>
            <div className="card-body d-flex flex-wrap gap-3">
              {loading ? (
                <p>Loading...</p>
              ) : withTestimonials.length === 0 ? (
                <p className="text-muted">No testimonials yet.</p>
              ) : (
                withTestimonials.map((c) => (
                  <TestimonialCard
                    key={c._id}
                    client={c}
                    type="edit"
                    onSelect={() => setEditClient(c)}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsManager;