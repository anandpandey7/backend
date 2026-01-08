import { useEffect, useState } from "react";
import ClientCard from "./ClientCard";
import ClientForm from "./ClientForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const ClientsManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editClient, setEditClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/clients`);
      const data = await res.json();
      setClients(data.projects || []);
    } catch {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/clients/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        setClients((p) => p.filter((c) => c._id !== id));
        toast.success("Deleted 🗑️");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleSaved = () => {
    setEditClient(null);
    fetchClients();
  };

  // Filter clients based on search query
  const filteredClients = clients.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.clientName?.toLowerCase().includes(query) ||
      client.projectName?.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query) ||
      client.projectDescription?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="row g-4">
        <div className="col-lg-6">
          <ClientForm
            editClient={editClient}
            onSaved={handleSaved}
            onCancel={() => setEditClient(null)}
          />
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Clients / Projects</h4>
                <span className="badge bg-primary">
                  {filteredClients.length} of {clients.length}
                </span>
              </div>
            </div>
            <div className="card-body">
              {/* Search Bar */}
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i> 
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by client name, project, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : filteredClients.length === 0 ? (
                <div className="text-center text-muted py-4">
                  {searchQuery ? (
                    <>
                      <p className="mb-1">No clients found matching "{searchQuery}"</p>
                      <button
                        className="btn btn-sm btn-link"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear search
                      </button>
                    </>
                  ) : (
                    <p>No clients yet.</p>
                  )}
                </div>
              ) : (
                <div className="d-flex gap-3 flex-wrap">
                  {filteredClients.map((c) => (
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