import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

/* 🔌 Base64 Upload Adapter */
class Base64UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve({
              default: reader.result, // base64 data URL
            });
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(file);
        })
    );
  }

  abort() {
    // Abort the upload process if needed
  }
}

function Base64UploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new Base64UploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const data = new FormData();
    data.append("upload", file);

    const res = await fetch("http://localhost:5000/api/ckeditor/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (!result.url) {
      throw new Error("Upload failed");
    }

    return {
      default: result.url,
    };
  }

  abort() {}
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}


const ClientForm = ({ editClient, onSaved, onCancel }) => {
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    phone: "",
    projectName: "",
    projectDescription: "",
    projectLongDescription: "", // 👈 Stores HTML with images
    startDate: "",
    endDate: "",
    budget: "",
    rating: "",
    feedback: "",
  });

  const [logo, setLogo] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editClient) {
      setForm({
        clientName: editClient.clientName || "",
        email: editClient.email || "",
        phone: editClient.phone || "",
        projectName: editClient.projectName || "",
        projectDescription: editClient.projectDescription || "",
        projectLongDescription: editClient.projectLongDescription || "",
        startDate: editClient.startDate?.substring(0, 10) || "",
        endDate: editClient.endDate?.substring(0, 10) || "",
        budget: editClient.budget || "",
        rating: editClient.rating || "",
        feedback: editClient.feedback || "",
      });
      setLogo(null);
      setGallery([]);
    } else {
      setForm({
        clientName: "",
        email: "",
        phone: "",
        projectName: "",
        projectDescription: "",
        projectLongDescription: "",
        startDate: "",
        endDate: "",
        budget: "",
        rating: "",
        feedback: "",
      });
      setLogo(null);
      setGallery([]);
    }
  }, [editClient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        fd.append(k, v || "");
      });

      if (logo) fd.append("logo", logo);
      gallery.forEach((img) => fd.append("gallery", img));

      const method = editClient ? "PUT" : "POST";
      const url = editClient
        ? `http://localhost:5000/api/clients/${editClient._id}`
        : "http://localhost:5000/api/clients";

      const res = await fetch(url, {
        method,
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Save failed");
        return;
      }

      toast.success(
        editClient ? "Client updated successfully ✅" : "Client added successfully 🎉"
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
        <h5 className="card-title mb-0">
          {editClient ? "Edit Client" : "Add Client"}
        </h5>
        {editClient && (
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {[
            ["clientName", "Client Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["projectName", "Project Name"],
          ].map(([name, label]) => (
            <div className="mb-2" key={name}>
              <label className="form-label">{label}</label>
              <input
                type="text"
                className="form-control"
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-2">
            <label className="form-label">Project Description (Short)</label>
            <textarea
              className="form-control"
              rows="2"
              name="projectDescription"
              value={form.projectDescription}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Long desc with CKEditor */}
          <div className="mb-3">
            <label className="form-label">Long Project Description</label>
            <CKEditor
              editor={ClassicEditor}
              data={form.projectLongDescription}
              config={{
                licenseKey: "GPL",
                extraPlugins: [MyCustomUploadAdapterPlugin],
              }}
              onChange={(e, editor) => {
                const data = editor.getData();
                setForm((prevForm) => ({
                  ...prevForm,
                  projectLongDescription: data,
                }));
              }}
            />
            <small className="text-muted">
              You can upload images directly in the editor.
            </small>
          </div>

          <div className="row">
            <div className="col mb-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="col mb-2">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Budget</label>
            <input
              type="number"
              step="1000"
              className="form-control"
              name="budget"
              value={form.budget}
              onChange={handleChange}
            />
          </div>

          {/* Optional rating & feedback */}
          <div className="row">
            <div className="col mb-2">
              <label className="form-label">Rating (optional)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="5"
                className="form-control"
                name="rating"
                value={form.rating}
                onChange={handleChange}
              />
            </div>
            <div className="col mb-2">
              <label className="form-label">Feedback (optional)</label>
              <input
                type="text"
                className="form-control"
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">
              {editClient ? "Replace Logo (optional)" : "Logo"}
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gallery Images (multiple)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={(e) => setGallery(Array.from(e.target.files))}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editClient
              ? "Update Client"
              : "Add Client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;