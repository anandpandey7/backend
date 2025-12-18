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

        {/* ACTION BUTTONS */}
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

export default PostCard;
