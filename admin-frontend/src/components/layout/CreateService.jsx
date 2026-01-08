import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API_BASE_URL } from "../helper/config";
import { toast } from "react-toastify";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const data = new FormData();
    data.append("upload", file);

    const res = await fetch(`${API_BASE_URL}/api/ckeditor/upload`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const result = await res.json();

    if (!result.url) {
      throw new Error("No URL returned from server");
    }

    // ✅ If backend already sends full URL, don’t double it
    const imageUrl = result.url.startsWith("http")
      ? result.url
      : `${API_BASE_URL}${result.url}`;

    return {
      default: imageUrl,
    };
  }

  abort() {}
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

const CreateService = ({ editService, onSaved, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editService) {
      setTitle(editService.title.replace(/"/g, ""));
      setDescription(editService.description.replace(/"/g, ""));
      setLongDescription(editService.longDescription.replace(/"/g, ""));
      setThumbnail(null);
      setGallery([]);
    } else {
      reset();
    }
  }, [editService]);

  const reset = () => {
    setTitle("");
    setDescription("");
    setLongDescription("");
    setThumbnail(null);
    setGallery([]);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  // // Validation
  // if (!title.trim()) {
  //   alert("Title is required");
  //   return;
  // }
  // if (!description.trim()) {
  //   alert("Description is required");
  //   return;
  // }
  // if (!longDescription.trim()) {
  //   alert("Long description is required");
  //   return;
  // }
  // if (!editService && !thumbnail) {
  //   alert("Thumbnail required for new service");
  //   return;
  // }

  // 🔍 Frontend validation
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!description.trim()) {
      toast.error("Short description is required");
      return;
    }
    if (!longDescription.trim()) {
      toast.error("Long description is required");
      return;
    }
    if (!editService && !thumbnail) {
      toast.error("Thumbnail is required for new service");
      return;
    }

    const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

  const fd = new FormData();
  fd.append("title", title.trim());
  fd.append("description", description.trim());
  fd.append("longDescription", longDescription);
  if (thumbnail) fd.append("thumbnail", thumbnail);

  gallery.forEach((file, index) => {
      fd.append("gallery", file);
  });

  try {
    setLoading(true);
    const url = editService
      ? `http://localhost:5000/api/services/${editService._id}`
      : "http://localhost:5000/api/services";

    const method = editService ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });
    const data = await res.json();

    // Log everything for debugging
    // console.log("=== SERVER RESPONSE ===");
    // console.log("Status:", res.status);
    // console.log("Response data:", data);
    // console.log("======================");

    if (!res.ok || !data.success) {
      // Show the actual error from the server
      let errorMessage = data.message || `Server error: ${res.status}`;
      
      if (data.errors) {
        // Zod validation errors
        errorMessage = data.errors.map(e => `${e.path.join('.')}: ${e.message}`).join("\n");
      }
      
      alert(`Error:\n${errorMessage}`);
      throw new Error(errorMessage);
    }

    if (!data.service) {
      throw new Error("No service object in response");
    }

    onSaved(data.service);
    reset();
  } catch (err) {
    console.error("Full error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-0">
          {editService ? "Edit Service" : "Create Service"}
        </h3>
        {editService && (
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            className="form-control"
            placeholder="Service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description *</label>
          <textarea
            className="form-control"
            rows="2"
            placeholder="Brief description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Long Description *</label>
          <CKEditor
            editor={ClassicEditor}
            data={longDescription}
            config={{
              licenseKey: "GPL",
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setLongDescription(data);
            }}
          />
        </div>


        <div className="mb-3">
          <label className="form-label">
            Thumbnail {!editService && "*"}
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
          {editService && (
            <small className="text-muted">
              Leave empty to keep current thumbnail
            </small>
          )}
        </div>

          <div className="mb-3">
          <label className="form-label">
            Product Gallery (multiple images)
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            multiple
            onChange={(e) => setGallery([...e.target.files])}
          />
          <small className="text-muted">
            You can upload multiple images
          </small>
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editService
            ? "Update Service"
            : "Create Service"}
        </button>
      </div>
    </form>
  );
};

export default CreateService;