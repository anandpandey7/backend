import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API_BASE_URL } from "../helper/config";

/* ================= CKEditor Upload Adapter ================= */

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

/* ================= Helpers ================= */

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
};

/* ================= PostCard ================= */

const PostCard = ({ post, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const truncateText = (text, maxLength = 90) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Fix relative image URLs in CKEditor HTML
  const fixImageUrls = (html) => {
    if (!html) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("/")) {
        img.setAttribute("src", "http://localhost:5000" + src);
      }
    });

    return doc.body.innerHTML;
  };

  return (
    <>
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

          <p className="card-text text-muted mb-1">
            {truncateText(post.description.replaceAll('"', ""))}
          </p>

          {post.projectLongDescription && (
            <button
              className="btn btn-link btn-sm p-0 mb-2"
              onClick={() => setShowModal(true)}
            >
              View Full Description →
            </button>
          )}

          <div className="d-flex justify-content-between mt-auto">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {post.title.replaceAll('"', "")}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">

              {/* Featured Image (Compact) */}
              <div className="text-center mb-3">
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    maxHeight: "180px",
                    objectFit: "cover"
                  }}
                />
              </div>

              {/* Short Description */}
              <h6 className="fw-semibold mb-1">Description</h6>
              <p
                className="text-muted small mb-3"
                style={{ lineHeight: "1.4" }}
              >
                {post.description.replaceAll('"', "")}
              </p>

              <hr className="my-2" />

              {/* Full Content */}
              <h6 className="fw-semibold mb-2">Full Content</h6>

              <div
                className="post-description-content small"
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  lineHeight: "1.5"
                }}
                dangerouslySetInnerHTML={{
                  __html: fixImageUrls(post.projectLongDescription || "")
                }}
              />
            </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    onEdit(post);
                  }}
                >
                  Edit Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .post-description-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
        }
        .post-description-content {
          line-height: 1.6;
        }
        .post-description-content p {
          margin-bottom: 0.75rem;
        }
        .post-description-content h2,
        .post-description-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
};

/* ================= CreatePost ================= */

const CreatePost = ({ editPost, onPostSaved, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectLongDescription, setProjectLongDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title.replace(/"/g, ""));
      setDescription(editPost.description.replace(/"/g, ""));
      setProjectLongDescription(editPost.projectLongDescription || "");
      setImage(null);
    } else {
      setTitle("");
      setDescription("");
      setProjectLongDescription("");
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
    formData.append("projectLongDescription", projectLongDescription);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const url = editPost
        ? `http://localhost:5000/api/posts/${editPost._id}`
        : "http://localhost:5000/api/posts";

      const method = editPost ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to save post");
        return;
      }

      toast.success(`Post ${editPost ? "updated" : "created"} successfully!`);

      setTitle("");
      setDescription("");
      setProjectLongDescription("");
      setImage(null);

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
    setProjectLongDescription("");
    setImage(null);
    onCancelEdit();
    toast.info("Edit cancelled");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-0">
          {editPost ? "Edit Blog" : "Create Blog"}
        </h3>
        {editPost && (
          <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Blog Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Short Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Long Description - CKEditor */}
        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={projectLongDescription}
            config={{
              licenseKey: "GPL",
              extraPlugins: [MyCustomUploadAdapterPlugin],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setProjectLongDescription(data);
            }}
          />
          <small className="text-muted">
            You can upload images directly in the editor.
          </small>
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label">
            {editPost ? "Replace Image (optional)" : "Blog Image"}
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

/* ================= PostsManager ================= */

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
      .catch(() => {
        toast.error("Failed to load posts");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted");
      if (editPost?._id === id) setEditPost(null);
    } else {
      toast.error("Delete failed");
    }
  };

  const handlePostSaved = (post) => {
    if (editPost) {
      setPosts((prev) =>
        prev.map((p) => (p._id === post._id ? post : p))
      );
      setEditPost(null);
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <CreatePost
            editPost={editPost}
            onPostSaved={handlePostSaved}
            onCancelEdit={() => setEditPost(null)}
          />
        </div>

        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Blogs</h3>
            </div>

            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : posts.length === 0 ? (
                <p className="text-muted">No posts yet.</p>
              ) : (
                <div className="posts-scroll-container">
                  {posts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      onEdit={setEditPost}
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
        }
        .post-card {
          min-width: 280px;
          max-width: 280px;
        }
      `}</style>
    </div>
  );
};

export default PostsManager;