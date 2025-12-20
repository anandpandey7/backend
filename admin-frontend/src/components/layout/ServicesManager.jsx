import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import CreateService from "./CreateService";

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();
      setServices(data.services || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE",
    });

    setServices((prev) => prev.filter((s) => s._id !== id));
    if (editService?._id === id) setEditService(null);
  };

  const handleSaved = (service) => {
    if (editService) {
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? service : s))
      );
      setEditService(null);
    } else {
      fetchServices();
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <CreateService
            editService={editService}
            onSaved={handleSaved}
            onCancel={() => setEditService(null)}
          />
        </div>

        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Services</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : services.length === 0 ? (
                <p className="text-muted">No services yet</p>
              ) : (
                <div className="d-flex gap-3 flex-wrap">
                  {services.map((s) => (
                    <ServiceCard
                      key={s._id}
                      service={s}
                      onEdit={setEditService}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .service-card {
          width: 280px;
        }
        @media (max-width: 768px) {
          .service-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesManager;
