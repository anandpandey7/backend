import { useState } from "react";

const ServiceCard = ({ service, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const clean = (t) => t?.replace(/"/g, "") || "";

  const truncate = (text, max = 80) =>
    text.length > max ? text.substring(0, max) + "..." : text;

  const fixImageUrls = (html) => {
    if (!html) return "";
    const parse = new DOMParser();
    const doc = parse.parseFromString(html, "text/html");

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
      <div className="card shadow-sm service-card">
        <img
          src={`http://localhost:5000${service.thumbnail}`}
          className="card-img-top"
          alt={clean(service.title)}
          style={{ height: "150px", objectFit: "cover" }}
        />

        <div className="card-body d-flex flex-column">
          <h5>{clean(service.title)}</h5>

          <button
            className="btn btn-sm btn-outline-secondary mb-2"
            onClick={() => setShowModal(true)}
          >
            View Full Description
          </button>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(service)}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(service._id)}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>

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
                <h5 className="modal-title">{clean(service.title)}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {/* Featured Image */}
                <div className="text-center mb-3">
                  <img
                    src={`http://localhost:5000${service.thumbnail}`}
                    alt={service.title}
                    className="img-fluid rounded shadow-sm"
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      maxHeight: "180px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Short Description */}
                {service.description && (
                  <>
                    <h6 className="fw-semibold mb-1">Description</h6>
                    <p
                      className="text-muted small mb-3"
                      style={{ lineHeight: "1.4" }}
                    >
                      {clean(service.description)}
                    </p>
                    <hr className="my-2" />
                  </>
                )}

                {/* Full Content */}
                <h6 className="fw-semibold mb-2">Full Content</h6>
                <div
                  className="post-description-content small"
                  style={{
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    lineHeight: "1.5",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: fixImageUrls(service.longDescription || ""),
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
                    onEdit(service);
                  }}
                >
                  Edit Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceCard;