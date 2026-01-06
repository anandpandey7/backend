import { useEffect, useState } from "react";
import { API_BASE_URL } from "../helper/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const domainAPI = API_BASE_URL + "/api/domains";
const oemAPI = API_BASE_URL + "/api/oem";

export default function OEM() {
  const token = localStorage.getItem("token");

  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [oemForms, setOemForms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [loading, setLoading] = useState(true);

  // domian data

  const fetchDomains = async () => {
    try {
      const res = await fetch(domainAPI);
      const data = await res.json();
      if (data.success) setDomains(data.domains);
    } catch {
      toast.error("Failed to load domains");
    }
  };

// form data
  const fetchOEMForms = async () => {
    try {
      const res = await fetch(oemAPI);
      const data = await res.json();
      if (data.success) setOemForms(data.forms);
    } catch {
      toast.error("Failed to load OEM forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDomains();
    fetchOEMForms();
  }, []);

  // domain added logic

  const addDomain = async () => {
    if (!newDomain.trim()) {
      toast.error("Domain name required");
      return;
    }

    try {
      const res = await fetch(domainAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDomain }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to add domain");
        return;
      }

      toast.success("Domain added");
      setNewDomain("");
      fetchDomains();
    } catch {
      toast.error("Server error");
    }
  };

  const deleteDomain = async (id) => {
    if (!window.confirm("Are you sure you want to delete this domain?")) return;

    try {
      const res = await fetch(`${domainAPI}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to delete domain");
        return;
      }

      toast.success("Domain deleted successfully");
      fetchDomains();
    } catch {
      toast.error("Error deleting domain");
    }
  };


  const deleteOEM = async (id) => {
    if (!window.confirm("Delete this OEM form?")) return;

    try {
      const res = await fetch(`${oemAPI}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("OEM deleted");
      fetchOEMForms();
    } catch {
      toast.error("Server error");
    }
  };

  const markResponded = async (id, currentStatus) => {
    try {
      const res = await fetch(`${oemAPI}/${id}/responded`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responded: !currentStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to update status");
        return;
      }

      toast.success(
        currentStatus ? "Marked as unresponded" : "Marked as responded"
      );

      fetchOEMForms();
    } catch {
      toast.error("Error updating status");
    }
  };

  /* ================= FILTER ================= */

  const filteredForms = selectedDomain
    ? oemForms.filter((f) => f.domain?._id === selectedDomain)
    : oemForms;

  const unresponded = filteredForms.filter((f) => !f.responded);
  const responded = filteredForms.filter((f) => f.responded);

  /* ================= UI ================= */

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* ================= DOMAIN SECTION ================= */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Domains</h5>

        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new domain"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addDomain}>
            Add
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {domains.map((d) => (
            <span
              key={d._id}
              className="badge bg-primary d-flex align-items-center gap-2"
            >
              {d.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDomain(d._id);
                }}
                className="btn btn-sm btn-light p-0 px-1"
                style={{ lineHeight: 1 }}
              >
                ❌
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="mb-3">
        <select
          className="form-select"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option value="">All Domains</option>
          {domains.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* ================= OEM FORMS ================= */}
      <div className="row">
        {/* LEFT */}
        <div className="col-md-6">
          <h5 className="text-danger mb-3">Unresponded</h5>
          {unresponded.map((f) => (
            <OEMCard
              key={f._id}
              data={f}
              onRespond={() => markResponded(f._id, f.responded)}
              onDelete={() => deleteOEM(f._id)}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-md-6">
          <h5 className="text-success mb-3">Responded</h5>
          {responded.map((f) => (
            <OEMCard
              key={f._id}
              data={f}
              onRespond={() => markResponded(f._id, f.responded)}
              onDelete={() => deleteOEM(f._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// CARD Logic

const OEMCard = ({ data, onRespond, onDelete }) => {
  return (
    <div className="card mb-3 shadow-sm p-3">
      <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Domain:</strong> {data.domain?.name}</p>
      <p><strong>Phone 1:</strong> {data.contactNo1}</p>
      <p><strong>Phone 2:</strong> {data.contactNo2}</p>
      <p><strong>Location:</strong> {data.address}</p>

      {data.organization && (
        <p><strong>Organization:</strong> {data.organization}</p>
      )}

      <p><strong>Description:</strong> {data.projectDescription}</p>

      {data.projectReport && (
        <a
          href={`${API_BASE_URL}${data.projectReport}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-outline-primary mb-2"
        >
          View Project Report
        </a>
      )}

      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-success" onClick={onRespond}>
          {data.responded ? "Mark Unresponded" : "Mark Responded"}
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
