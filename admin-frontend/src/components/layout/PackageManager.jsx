import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const PACKAGE_API = `${API_BASE_URL}/api/packages`;
const FEATURE_API = `${API_BASE_URL}/api/features`;
const SERVICE_API = `${API_BASE_URL}/api/services`;

const PackageManager = ()=> {
  const token = localStorage.getItem("token");

  const [packages, setPackages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [services, setServices] = useState([]);

  const [searchPkg, setSearchPkg] = useState("");
  const [featureSearch, setFeatureSearch] = useState("");
  const [showFeatureDropdown, setShowFeatureDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState("");



  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    service: "",
    name: "",
    price: "",
    sellingPrice: "",
    description: "",
    isPopular: false,
    servicesOffered: [],
  });

  /* ================= FETCH DATA ================= */

  const fetchAll = async () => {
    try {
      const [pkgRes, featRes, servRes] = await Promise.all([
        fetch(PACKAGE_API),
        fetch(FEATURE_API),
        fetch(SERVICE_API),
      ]);

      const pkgData = await pkgRes.json();
      const featData = await featRes.json();
      const servData = await servRes.json();

      setPackages(pkgData.packages || []);
      setFeatures(featData.features || []);
      setServices(servData.services || []);
    } catch {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ================= FORM ================= */

  const resetForm = () => {
    setEditId(null);
    setSelectedService("");
    setForm({
      service: "",
      name: "",
      price: "",
      sellingPrice: "",
      description: "",
      isPopular: false,
      servicesOffered: [],
    });
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  /* ================= FEATURES ================= */

  const addFeature = (feature) => {
    if (form.servicesOffered.find((f) => f.feature === feature._id)) return;

    setForm({
      ...form,
      servicesOffered: [
        ...form.servicesOffered,
        {
          feature: feature._id,
          type: feature.type,
          title: feature.title,
          value: feature.type === "boolean" ? false : "",
        },
      ],
    });
  };

  const updateFeatureValue = (index, value) => {
    const updated = [...form.servicesOffered];
    updated[index].value = value;
    setForm({ ...form, servicesOffered: updated });
  };

  const removeFeature = (index) => {
    const updated = [...form.servicesOffered];
    updated.splice(index, 1);
    setForm({ ...form, servicesOffered: updated });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      return toast.error("Name is required");
    }
    if (!form.service) {
      return toast.error("Service is required");
    }
    if (!form.price) {
      return toast.error("Price is required");
    }
    if (!form.sellingPrice) {
      return toast.error("Selling Price is required");
    }
    if (!form.description) {
      return toast.error("Description is required");
    }

    try {
      const res = await fetch(
        editId ? `${PACKAGE_API}/${editId}` : PACKAGE_API,
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            servicesOffered: form.servicesOffered.map((f) => ({
              feature: f.feature,
              value: f.value,
            })),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        return toast.error(data.message || "Save failed");
      }

      toast.success(editId ? "Package updated" : "Package created");
      resetForm();
      fetchAll();
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= EDIT / DELETE ================= */

  const handleEdit = (pkg) => {
    setEditId(pkg._id);
    setForm({
      ...pkg,
      service: pkg.service._id || pkg.service,
      // servicesOffered: pkg.servicesOffered.map((f) => {
      //   const feature = features.find((x) => x._id === f.feature);
      //   return {
      //     feature: f.feature,
      //     title: feature?.title || "",
      //     type: feature?.type || "input",
      //     value: f.value,
      //   };
      // }),

      servicesOffered: pkg.servicesOffered.map((f) => {  // <- edited part beacuse feature title is not showing
      const featureId = typeof f.feature === "object"   
        ? f.feature._id
        : f.feature;

      const feature = features.find(
        (x) => String(x._id) === String(featureId)
      );                                              // When ever this type of problem happens just check data response formate - what is structure of data

      return {
        feature: featureId,
        title: feature?.title || f.feature?.title || "",
        type: feature?.type || f.feature?.type || "input",
        value: f.value,
      };
    }),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderFeatureValue = (f) => {
  if (typeof f.value === "boolean") {
    return f.value ? "Yes" : "No";
  }
  return f.value || "-";
};


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    await fetch(`${PACKAGE_API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Package deleted");
    fetchAll();
  };


  useEffect(() => {
  const closeDropdown = () => setShowFeatureDropdown(false);
  window.addEventListener("click", closeDropdown);
  return () => window.removeEventListener("click", closeDropdown);
}, []);


  /* ================= UI ================= */

  const filteredFeatures = features.filter((f) =>
    f.title.toLowerCase().includes(featureSearch.toLowerCase())
  );
  

  const filteredPackages = packages.filter((p) => {
    const matchesName = p.name
      .toLowerCase()
      .includes(searchPkg.toLowerCase());

    const matchesService = selectedService
      ? String(p.service?._id || p.service) === String(selectedService)
      : true;

    return matchesName && matchesService;
  });


  return (
    <div className="container-fluid py-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="row">
        {/* ================= LEFT ================= */}
        <div className="col-md-5">
          <div className="card p-3 shadow-sm">
            <h5>{editId ? "Edit Package" : "Create Package"}</h5>

            <form onSubmit={handleSubmit}>
              <select
                className="form-select mb-2"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select Service</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.title}
                  </option>
                ))}
              </select>

              <input
                className="form-control mb-2"
                placeholder="Package Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                type="number"
                placeholder="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                type="number"
                placeholder="Selling Price"
                name="sellingPrice"
                value={form.sellingPrice}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-2"
                placeholder="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />

              <label className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="isPopular"
                  checked={form.isPopular}
                  onChange={handleChange}
                />{" "}
                Popular Package
              </label>

              <h6 className="mt-3">Add Features</h6>
              
              <div className="position-relative mb-3">
                <input
                  className="form-control"
                  placeholder="Search & select feature..."
                  value={featureSearch}
                  onFocus={() => setShowFeatureDropdown(true)}
                  onChange={(e) => setFeatureSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                {showFeatureDropdown && (
                  <div
                    className="border bg-white position-absolute w-100 mt-1 rounded shadow"
                    style={{ maxHeight: "200px", overflowY: "auto", zIndex: 1000 }}
                  >
                    {filteredFeatures.length === 0 && (
                      <div className="p-2 text-muted">No feature found</div>
                    )}

                    {filteredFeatures.map((feature) => {
                      const alreadyAdded = form.servicesOffered.some(
                        (f) => f.feature === feature._id
                      );

                      return (
                        <div
                          key={feature._id}
                          className={`p-2 d-flex justify-content-between align-items-center ${
                            alreadyAdded ? "text-muted" : "cursor-pointer"
                          }`}
                          style={{ cursor: alreadyAdded ? "not-allowed" : "pointer" }}
                          onClick={() => {
                            if (!alreadyAdded) {
                              addFeature(feature);
                              setFeatureSearch("");
                              setShowFeatureDropdown(false);
                            }
                          }}
                        >
                          <span>{feature.title}</span>
                          <small className="badge bg-secondary">{feature.type}</small>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>


              {form.servicesOffered.map((f, i) => (
                <div key={i} className="border p-2 mb-2">
                  <strong>{f.title}</strong>

                  {f.type === "boolean" ? (
                    <select
                      className="form-select mt-1"
                      value={f.value}
                      onChange={(e) =>
                        updateFeatureValue(i, e.target.value === "true")
                      }
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  ) : (
                    <input
                      className="form-control mt-1"
                      value={f.value}
                      onChange={(e) =>
                        updateFeatureValue(i, e.target.value)
                      }
                    />
                  )}

                  <button
                    type="button"
                    className="btn btn-sm btn-danger mt-1"
                    onClick={() => removeFeature(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {editId && (<button className="btn btn-danger w-50 mt-2"
              onClick={resetForm}
              >
                Cancel
              </button>
              )}

              <button className="btn btn-success w-100 mt-2">
                {editId ? "Update Package" : "Create Package"}
              </button>
            </form>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="col-md-7">
          <div className="d-flex gap-2 mb-3">
            <input
              className="form-control"
              placeholder="Search package..."
              value={searchPkg}
              onChange={(e) => setSearchPkg(e.target.value)}
            />

            <select
              className="form-select"
              style={{ maxWidth: "220px" }}
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">All Services</option>
              {services.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>


          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Popular</th>
                <th style={{ minWidth: "300px" }}>Features Included</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>₹{p.sellingPrice}</td>
                  <td>{p.isPopular ? "Yes" : "No"}</td>
                  <td>
                    <div
                      className="d-flex gap-2"
                      style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        maxWidth: "350px",
                        paddingBottom: "5px",
                      }}
                    >
                      {p.servicesOffered?.length > 0 ? (
                        p.servicesOffered.map((f, i) => (
                          <div
                            key={i}
                            className="border rounded px-2 py-1 bg-light"
                            style={{ minWidth: "150px" }}
                          >
                            <div className="fw-semibold small">
                              {f.feature?.title || "Feature"}
                            </div>
                            <div className="text-muted small">
                              {renderFeatureValue(f)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-muted">No features</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      style={{marginBottom: "5px"}}
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PackageManager;