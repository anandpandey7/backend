import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const SettingForm = ({ editSetting, onSaved, onCancel }) => {
  const [form, setForm] = useState({
    companyName: "",
    phoneNo: "",
    email: "",
    location: "",
    description: "",
    social: defaultSocial,
  });

  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editSetting) {
      setForm({
        companyName: editSetting.companyName || "",
        phoneNo: editSetting.phoneNo || "",
        email: editSetting.email || "",
        location: editSetting.location || "",
        description: editSetting.description || "",
        social: { ...defaultSocial, ...editSetting.social },
      });
    }
    else {
        // 👇 reset when switching to "Add" mode
        setForm({
        companyName: "",
        phoneNo: "",
        email: "",
        location: "",
        description: "",
        social: defaultSocial,
        });
        setLogo(null);
    }
  }, [editSetting]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e) => {
    setForm({
      ...form,
      social: { ...form.social, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("companyName", form.companyName);
      fd.append("phoneNo", form.phoneNo);
      fd.append("email", form.email);
      fd.append("location", form.location);
      fd.append("description", form.description);
      fd.append("social", JSON.stringify(form.social));
      if (logo) fd.append("companyLogo", logo);

      const method = editSetting ? "PUT" : "POST";

      const res = await fetch("http://localhost:5000/api/settings", {
        method,
        body: fd,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Save failed");
        return;
      }

      toast.success(
        editSetting ? "Settings updated ✅" : "Settings created 🎉"
      );
      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="mb-0">
          {editSetting ? "Edit Settings" : "Add Settings"}
        </h5>
        {editSetting && (
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
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

          <h6 className="mt-3">Social Links</h6>
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

          <div className="mb-3">
            <label className="form-label">
              {editSetting ? "Replace Logo (optional)" : "Company Logo"}
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : editSetting ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingForm;
