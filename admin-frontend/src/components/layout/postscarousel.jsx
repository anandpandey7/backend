import { useEffect, useState } from "react";
import PostCard from "./postcard.jsx";

const PostsHorizontalSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // DELETE POST
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit POST
  const handleEdit = (post) => {
    setEditPost(post);
    setFormData({
        title: post.title.replace(/"/g, ""),
        description: post.description.replace(/"/g, ""),
        image: null, // new image optional
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
        setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdatePost = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", formData.title);
  data.append("description", formData.description);

  if (formData.image) {
    data.append("image", formData.image);
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/posts/${editPost._id}`,
      {
        method: "PUT",
        body: data,
      }
    );

    const result = await res.json();

    if (result.success) {
      setPosts((prev) =>
        prev.map((p) => (p._id === editPost._id ? result.post : p))
      );
      setShowEditModal(false);
    }
  } catch (err) {
    console.error(err);
  }
};



  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Posts</h3>
      </div>

      <div className="card-body">
        <div className="posts-scroll-container">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      {showEditModal && (
  <div className="modal fade show d-block" style={{ background: "#00000080" }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">Edit Post</h5>
          <button
            className="btn-close"
            onClick={() => setShowEditModal(false)}
          ></button>
        </div>

        <form onSubmit={handleUpdatePost}>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Replace Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PostsHorizontalSection;
