import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const MarqueeManager = () => {
  const [marquee, setMarquee] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  // 🔐 Auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  
  const fetchMarquee = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/marquee`);
      const data = await res.json();

      if (data.marquee?.items) {
        setMarquee(data.marquee.items);
        setEdit(true);
      } else {
        setMarquee([]);
        setEdit(false);
      }
    } catch {
      toast.error("Failed to load marquee");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarquee();
  }, []);

  
  const addItem = () => {
    if (!newItem.trim()) {
      toast.error("Item cannot be empty");
      return;
    }
    setMarquee([...marquee, newItem.trim()]);
    setNewItem("");
  };

  
  const updateItem = (index, value) => {
    const updated = [...marquee];
    updated[index] = value;
    setMarquee(updated);
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = (index) => {
    const updated = marquee.filter((_, i) => i !== index);
    setMarquee(updated);
  };

  
  const handleSubmit = async () => {
    if (marquee.length === 0) {
      toast.error("Add at least one marquee item");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/marquee`, {
        method: edit ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ items: marquee }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success(edit ? "Marquee updated" : "Marquee created");
      setEdit(true);
      fetchMarquee();
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async () => {
    if (!window.confirm("Delete marquee completely?")) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/marquee`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Marquee deleted");
      setMarquee([]);
      setEdit(false);
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container py-4">
      <ToastContainer />

      <h3 className="mb-3">Marquee Manager</h3>

      {/* Add new item */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter marquee text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addItem}>
          Add
        </button>
      </div>

      {/* Items list */}
      {marquee.map((item, index) => (
        <div key={index} className="d-flex gap-2 mb-2">
          <input
            className="form-control"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <button
            className="btn btn-danger"
            onClick={() => removeItem(index)}
          >
            ✕
          </button>
        </div>
      ))}

      {/* Actions */}
      <div className="mt-4 d-flex gap-2">
        <button
          className="btn btn-success"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : edit ? "Update Marquee" : "Create Marquee"}
        </button>

        {edit && (
          <button
            className="btn btn-outline-danger"
            disabled={loading}
            onClick={handleDelete}
          >
            Delete Marquee
          </button>
        )}
      </div>
    </div>
  );
};

export default MarqueeManager;
