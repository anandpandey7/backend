import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!description.length == 0){
      alert("Please upload an description");
      return;
    }

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: formData, // IMPORTANT
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create post");
        return;
      }

      alert("Post created successfully ✅");

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Create Post</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">

          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Post Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label className="form-label">Post Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

        </div>

        <div className="card-footer">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
