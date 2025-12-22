import { useEffect, useState } from "react";
import ClientCard from "./ClientCard";
import ClientForm from "./ClientForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientsManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClient, setEditClient] = useState(null);
  

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/clients");
      const data = await res.json();
      setClients(data.projects || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client/project?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/clients/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.success) {
        setClients((prev) => prev.filter((c) => c._id !== id));
        toast.success("Client deleted successfully 🗑️");
        if (editClient?._id === id) setEditClient(null);
      } else {
        toast.error("Delete failed");
      }
    } catch (e) {
      toast.error("Server error");
    }
  };

  const handleSaved = () => {
    setEditClient(null);
    fetchClients();
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={2500} />

      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <ClientForm
            editClient={editClient}
            onSaved={handleSaved}
            onCancel={() => setEditClient(null)}
          />
        </div>

        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Clients / Projects</h3>
            </div>
            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : clients.length === 0 ? (
                <p className="text-muted">No clients yet.</p>
              ) : (
                <div className="d-flex gap-3 flex-wrap">
                  {clients.map((c) => (
                    <ClientCard
                      key={c._id}
                      client={c}
                      onEdit={setEditClient}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsManager;
