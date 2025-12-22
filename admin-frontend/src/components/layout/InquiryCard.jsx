import { useState } from "react";

const InquiryCard = ({
  inquiry,
  onToggle,
  onDelete,
  resolveLabel,
  resolveBtn,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const truncate = (text, len = 80) => {
    if (!text) return "";
    return text.length > len ? text.substring(0, len) + "..." : text;
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h6 className="card-title">
          {inquiry.firstName} {inquiry.lastName}
        </h6>

        <p className="mb-1"><b>Email:</b> {inquiry.email || "-"}</p>
        <p className="mb-1"><b>Domain:</b> {inquiry.domain}</p>
        <p className="mb-1">
          <b>Location:</b> {inquiry.city}, {inquiry.state}, {inquiry.country}
        </p>
        <p className="mb-1">
          <b>Contact:</b> {inquiry.contactNo1}
          {inquiry.contactNo2 && `, ${inquiry.contactNo2}`}
        </p>

        {/* Message */}
        <p className="mt-2">
          <b>Message:</b>{" "}
          {showDetails
            ? inquiry.message
            : truncate(inquiry.message, 90)}
        </p>

        <div className="d-flex flex-wrap gap-2 mt-3">
          {/* Details Toggle */}
          <button
            className="btn btn-sm btn-info"
            onClick={() => setShowDetails((p) => !p)}
          >
            {showDetails ? "Hide Details" : "Details"}
          </button>

          {/* Resolve Toggle */}
          <button
            className={`btn btn-sm btn-${resolveBtn}`}
            onClick={onToggle}
          >
            {resolveLabel}
          </button>

          {/* Delete */}
          <button
            className="btn btn-sm btn-danger"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;
