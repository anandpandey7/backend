import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../helper/config";

const defaultSocial = {
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  youtube: "",
  pinterest: "",
  snapchat: "",
  reddit: "",
  whatsapp: "",
  tumblr: "",
  googleMyBusiness: "",
  quora: "",
  wechat: "",
  discord: "",
};

const defaultColours = {
  primary: "#000000",
  secondary: "#FFFFFF",
  accent: "#FF0000",
  surface: "#F5F5F5",
};

const API = `${API_BASE_URL}/api/settings`;

const SettingsManager = () => {
  const [setting, setSetting] = useState(null);
  const [categoryInput, setCategoryInput] = useState(""); // 🔹 Local state for category typing
  const [form, setForm] = useState({
    companyName: "",
    phoneNo: "",
    email: "",
    location: "",
    description: "",
    social: defaultSocial,
    colours: defaultColours,
    productCategory: [], // 🔹 Initialize as empty array
  });

  const [logo, setLogo] = useState(null);
  const [video1, setVideo1] = useState(null);
  const [video2, setVideo2] = useState(null);


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch setting on load
  useEffect(() => {
    fetchSetting();
  }, []);

  const fetchSetting = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      if (data.success && data.setting) {
        setSetting(data.setting);
      } else {
        setSetting(null);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch settings.");
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fill form when editing
  useEffect(() => {
    if (edit && setting) {
      setForm({
        companyName: setting.companyName || "",
        phoneNo: setting.phoneNo || "",
        email: setting.email || "",
        location: setting.location || "",
        description: setting.description || "",
        social: { ...defaultSocial, ...setting.social },
        colours: { ...defaultColours, ...setting.colours },
        productCategory: setting.productCategory || [], // 🔹 Sync array
      });
      setLogo(null);
    }

    if (!edit) resetForm();
  }, [edit, setting]);

  const resetForm = () => {
    setForm({
      companyName: "",
      phoneNo: "",
      email: "",
      location: "",
      description: "",
      social: defaultSocial,
      colours: defaultColours,
      productCategory: [],
    });
    setLogo(null);
    setVideo1(null);
    setVideo2(null);
    setCategoryInput("");
  };

  // 🔹 Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e) => {
    setForm({
      ...form,
      social: { ...form.social, [e.target.name]: e.target.value },
    });
  };

  const handleColourChange = (e) => {
    setForm({
      ...form,
      colours: { ...form.colours, [e.target.name]: e.target.value },
    });
  };

  // 🔹 🔹 Array Handlers (New)
  const addCategory = () => {
    if (categoryInput.trim()) {
      setForm({
        ...form,
        productCategory: [...form.productCategory, categoryInput.trim()],
      });
      setCategoryInput("");
    }
  };

  const removeCategory = (indexToRemove) => {
    setForm({
      ...form,
      productCategory: form.productCategory.filter((_, index) => index !== indexToRemove),
    });
  };

  // 🔹 Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("companyName", form.companyName);
      fd.append("phoneNo", form.phoneNo);
      fd.append("email", form.email);
      fd.append("location", form.location);
      fd.append("description", form.description);
      fd.append("social", JSON.stringify(form.social));
      fd.append("colours", JSON.stringify(form.colours));
      fd.append("productCategory", JSON.stringify(form.productCategory));

      if (logo) fd.append("companyLogo", logo);
      if (video1) fd.append("video1", video1);
      if (video2) fd.append("video2", video2);

      const method = setting ? "PUT" : "POST";

      const res = await fetch(API, {
        method,
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Save failed");
        return;
      }

      toast.success(setting ? "Settings updated ✅" : "Settings created 🎉");
      setEdit(false);
      fetchSetting();
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete settings?")) return;

    try {
      const res = await fetch(API, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Settings deleted 🗑️");
        setSetting(null);
        setEdit(false);
        resetForm();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // ---------------- UI ----------------

  if (loading) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <p className="text-center mt-4">Loading settings...</p>
      </>
    );
  }

  if (error) {
    return (
      <div className="container py-4 text-center">
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="alert alert-danger">
          {error}
          <div className="mt-3">
            <button className="btn btn-outline-danger" onClick={fetchSetting}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <h2>Settings</h2>

      {/* 👉 Form */}
      {!setting || edit ? (
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0">
              {setting ? "Edit Settings" : "Add Settings"}
            </h5>
            {setting && (
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            )}
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {["companyName", "phoneNo", "email", "location"].map((f) => (
                <div className="mb-2" key={f}>
                  <label className="form-label text-capitalize">{f}</label>
                  <input
                    type="text"
                    className="form-control"
                    name={f}
                    value={form[f]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="mb-2">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* 🔹 Product Categories Form Section */}
              <div className="mb-3">
                <label className="form-label">Product Categories</label>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter category name"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={addCategory}
                  >
                    Add
                  </button>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {form.productCategory.map((cat, index) => (
                    <span key={index} className="badge bg-primary d-flex align-items-center gap-2">
                      {cat}
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        style={{ fontSize: "0.5rem" }}
                        onClick={() => removeCategory(index)}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>

              <h6 className="mt-4">Social Links</h6>
              <div className="row">
                {Object.keys(form.social).map((key) => (
                  <div className="col-12 col-md-6 mb-2" key={key}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={key}
                      name={key}
                      value={form.social[key]}
                      onChange={handleSocialChange}
                    />
                  </div>
                ))}
              </div>

              <h6 className="mt-3">Theme Colours</h6>
              <div className="row">
                {Object.keys(form.colours).map((key) => (
                  <div className="col-6 col-md-3 mb-2" key={key}>
                    <label className="form-label text-capitalize">{key}</label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      name={key}
                      value={form.colours[key]}
                      onChange={handleColourChange}
                    />
                  </div>
                ))}
              </div>

              {setting?.companyLogo && edit && (
                <div className="mb-2">
                  <img
                    src={`${API_BASE_URL}${setting.companyLogo}`}
                    alt="Current Logo"
                    style={{ maxHeight: "80px", objectFit: "contain" }}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">
                  {setting ? "Replace Logo (optional)" : "Company Logo"}
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </div>

              <div className="mb-3">
  <label className="form-label">Upload Video 1</label>
  <input
    type="file"
    className="form-control"
    accept="video/*"
    onChange={(e) => setVideo1(e.target.files[0])}
  />
</div>

<div className="mb-3">
  <label className="form-label">Upload Video 2</label>
  <input
    type="file"
    className="form-control"
    accept="video/*"
    onChange={(e) => setVideo2(e.target.files[0])}
  />
</div>


              <button className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : setting ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        // 👉 View Mode
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Company Settings</h5>
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={`${API_BASE_URL}${setting.companyLogo}`}
                  alt="Logo"
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                />
                <h5>{setting.companyName}</h5>
              </div>

              <div className="col-md-8">
                <p><strong>Email:</strong> {setting.email}</p>
                <p><strong>Phone:</strong> {setting.phoneNo}</p>
                <p><strong>Location:</strong> {setting.location}</p>
                <p><strong>Description:</strong> {setting.description}</p>

                {/* 🔹 Product Categories View Section */}
                <hr />
                <h6>Product Categories</h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {setting.productCategory && setting.productCategory.length > 0 ? (
                    setting.productCategory.map((cat, i) => (
                      <span key={i} className="badge bg-secondary">{cat}</span>
                    ))
                  ) : (
                    <span className="text-muted small">No categories defined.</span>
                  )}
                </div>

                <hr />
                <h6>Social Links</h6>
                <ul className="list-unstyled">
                  {Object.entries(setting.social || {}).map(
                    ([key, value]) =>
                      value && (
                        <li key={key}>
                          <strong>{key}:</strong>{" "}
                          <a href={value} target="_blank" rel="noreferrer">
                            {value}
                          </a>
                        </li>
                      )
                  )}
                </ul>

                <hr />
                <h6>Theme Colours</h6>
                <div className="d-flex gap-3 flex-wrap">
                  {Object.entries(setting.colours || {}).map(([k, v]) => (
                    <div key={k} className="text-center">
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          background: v,
                          borderRadius: "50%",
                          border: "1px solid #ccc",
                          margin: "0 auto",
                        }}
                      />
                      <small>{k}</small>
                    </div>
                  ))}
                </div>

                <hr />
                <h6>Videos</h6>

                <div className="row">
                  {setting.video1 && (
                    <div className="col-md-6 mb-3">
                      <p className="fw-semibold">Video 1</p>
                      <video
                        src={`${API_BASE_URL}${setting.video1}`}
                        controls
                        className="w-100 rounded"
                      />
                    </div>
                  )}

                  {setting.video2 && (
                    <div className="col-md-6 mb-3">
                      <p className="fw-semibold">Video 2</p>
                      <video
                        src={`${API_BASE_URL}${setting.video2}`}
                        controls
                        className="w-100 rounded"
                      />
                    </div>
                  )}

                  {!setting.video1 && !setting.video2 && (
                    <p className="text-muted small">No videos uploaded.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManager;