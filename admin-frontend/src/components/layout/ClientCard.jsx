import { useState } from "react";

const API_URL = "http://localhost:5000";

const ClientCard = ({ client, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  // Strip HTML for preview text
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
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
        img.setAttribute("src", API_URL + src);
      }
    });

    return doc.body.innerHTML;
  };

  const description =
    client.projectLongDescription || client.projectDescription || "";
  const plainText = stripHtml(description);

  const shortDesc =
    plainText.length > 80
      ? plainText.substring(0, 80) + "..."
      : plainText;

  return (
    <>
      <div className="card" style={{ width: "280px" }}>
        <img
          src={`http://localhost:5000${client.logo}`}
          alt={client.clientName}
          className="card-img-top"
          style={{ height: "140px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h6 className="fw-bold mb-1">{client.clientName}</h6>
          <p className="mb-1 text-muted">{client.projectName}</p>

          {shortDesc && (
            <p className="small text-muted mb-1">{shortDesc}</p>
          )}

          {client.projectLongDescription && (
            <button
              className="btn btn-link btn-sm p-0 mb-1"
              onClick={() => setShowModal(true)}
            >
              View Full Description →
            </button>
          )}

          <p className="small text-muted mb-1">
            Start: {new Date(client.startDate).toLocaleDateString()}
          </p>

          {client.rating && <p className="mb-1 small">⭐ {client.rating}</p>}
          {client.feedback && (
            <p className="small text-muted mb-2">"{client.feedback}"</p>
          )}

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(client)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(client._id)}
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
                  {client.projectName} - Full Description
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <h6 className="fw-bold mb-3">{client.clientName}</h6>

                {/* Render HTML with fixed image URLs */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: fixImageUrls(
                      client.projectLongDescription ||
                        client.projectDescription ||
                        ""
                    ),
                  }}
                  className="client-description-content"
                  style={{ maxWidth: "100%", wordWrap: "break-word" }}
                />

                <hr className="my-3" />

                <div className="row">
                  <div className="col-md-6">
                    <p className="small mb-1">
                      <strong>Start Date:</strong>{" "}
                      {new Date(client.startDate).toLocaleDateString()}
                    </p>
                    {client.endDate && (
                      <p className="small mb-1">
                        <strong>End Date:</strong>{" "}
                        {new Date(client.endDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    {client.budget && (
                      <p className="small mb-1">
                        <strong>Budget:</strong> ${client.budget}
                      </p>
                    )}
                    {client.rating && (
                      <p className="small mb-1">
                        <strong>Rating:</strong> ⭐ {client.rating}
                      </p>
                    )}
                  </div>
                </div>

                {client.feedback && (
                  <div className="mt-3">
                    <strong>Feedback:</strong>
                    <p className="text-muted">"{client.feedback}"</p>
                  </div>
                )}

                {/* Gallery Section */}
                {client.gallery && client.gallery.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-bold mb-2">Project Gallery</h6>
                    <div className="row g-3">
                      {client.gallery.map((img, idx) => (
                        <div className="col-6 col-md-4" key={idx}>
                          <div className="border rounded p-1 h-100">
                            <img
                              src={`http://localhost:5000${img}`}
                              alt={`Gallery ${idx + 1}`}
                              className="img-fluid rounded"
                              style={{
                                height: "150px",
                                objectFit: "cover",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                window.open(`http://localhost:5000${img}`, "_blank")
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                    onEdit(client);
                  }}
                >
                  Edit Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .client-description-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
        }
        .client-description-content {
          line-height: 1.6;
        }
        .client-description-content p {
          margin-bottom: 0.75rem;
        }
        .client-description-content h2,
        .client-description-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
};

export default ClientCard;
