import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// PostCard Component
const PostCard = ({ post, onEdit, onDelete }) => {
  const truncateText = (text, maxLength = 90) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="post-card card shadow-sm">
      <img
        src={`http://localhost:5000${post.image}`}
        className="card-img-top"
        alt={post.title}
        style={{ height: "160px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          {post.title.replaceAll('"', "")}
        </h5>

        <p className="card-text text-muted flex-grow-1">
          {truncateText(post.description.replaceAll('"', ""))}
        </p>

        <div className="d-flex justify-content-between mt-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(post)}
          >
            <i className="bi bi-pencil"></i> Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(post._id)}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// CreatePost Component (now handles both create and edit)
const CreatePost = ({ editPost, onPostSaved, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update form when editPost changes
  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title.replace(/"/g, ""));
      setDescription(editPost.description.replace(/"/g, ""));
      setImage(null);
    } else {
      setTitle("");
      setDescription("");
      setImage(null);
    }
  }, [editPost]);

  const handleSubmit = async () => {
    if (!editPost && !image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const url = editPost
        ? `http://localhost:5000/api/posts/${editPost._id}`
        : "http://localhost:5000/api/posts";

      const method = editPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || `Failed to ${editPost ? "update" : "create"} post`);
        return;
      }

      toast.success(`Post ${editPost ? "updated" : "created"} successfully! ✅`);

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);

      // Notify parent component
      onPostSaved(data.post);

    } catch (err) {
      console.error(err);
      toast.error("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    onCancelEdit();
    toast.info("Edit cancelled");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-0">
          {editPost ? "Edit Post" : "Create Post"}
        </h3>
        {editPost && (
          <button
            className="btn btn-sm btn-secondary"
            onClick={handleCancel}
          >
            Cancel Edit
          </button>
        )}
      </div>

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
          <label className="form-label">
            {editPost ? "Replace Image (optional)" : "Post Image"}
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editPost}
          />
        </div>
      </div>

      <div className="card-footer">
        <button 
          className="btn btn-primary" 
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : editPost ? "Update Post" : "Save Post"}
        </button>
      </div>
    </div>
  );
};

// Main PostsManager Component
const PostsManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(null);

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
        toast.error("Failed to load posts");
        setLoading(false);
      });
  };

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
        toast.success("Post deleted successfully! 🗑️");
        
        // If we're editing this post, cancel the edit
        if (editPost && editPost._id === postId) {
          setEditPost(null);
        }
      } else {
        toast.error("Failed to delete post");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting post");
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
  };

  const handlePostSaved = (updatedPost) => {
    if (editPost) {
      // Update existing post
      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
      setEditPost(null);
    } else {
      // Add new post
      fetchPosts(); // Refresh the list
    }
  };

  const handleCancelEdit = () => {
    setEditPost(null);
  };

  return (
    <div className="container py-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="row g-4">
        {/* Create/Edit Section */}
        <div className="col-12 col-lg-4">
          <CreatePost
            editPost={editPost}
            onPostSaved={handlePostSaved}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* Posts List */}
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Posts</h3>
            </div>

            <div className="card-body">
              {loading ? (
                <p>Loading posts...</p>
              ) : posts.length === 0 ? (
                <p className="text-muted">No posts yet. Create your first post!</p>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .posts-scroll-container {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 0.5rem 0;
        }

        .post-card {
          min-width: 280px;
          max-width: 280px;
        }

        @media (max-width: 768px) {
          .post-card {
            min-width: 250px;
            max-width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default PostsManager;