import { useEffect, useState } from "react";
import TestimonialForm from "./TestimonialForm";
import TestimonialCard from "./TestimonialCard";

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
        fetch("http://localhost:5000/api/testimonials"),
        fetch("http://localhost:5000/api/testimonials/clients"),
      ]);

      const withData = await withRes.json();
      const withoutData = await withoutRes.json();

      setWithTestimonials(withData.clients || []);
      setWithoutTestimonials(withoutData.clients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    await fetch(`http://localhost:5000/api/testimonials/${id}`, {
      method: "DELETE",
    });

    setWithTestimonials((prev) => prev.filter((c) => c._id !== id));
    setEditClient(null);
    fetchClients();
  };

  const handleSaved = () => {
    setEditClient(null);
    fetchClients();
  };

  return (
    <div className="container py-4">
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
