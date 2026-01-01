import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../helper/config";

const API = `${API_BASE_URL}/api/jobs`;

/* ================= Helpers ================= */

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
};

/* ================= JobCard ================= */

const JobCard = ({ job, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const truncateText = (text, maxLength = 90) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div className="job-card card shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            {job.title}
          </h5>
          
          {/* Show Employment Type Badge */}
          {job.employmentType && (
             <span className="badge bg-light text-dark border mb-2 align-self-start">
               {job.employmentType}
             </span>
          )}

          <p className="card-text text-muted mb-1">
            {truncateText(job.description)}
          </p>

          {job.salary && job.salary.isVisible && (
            <p className="text-success fw-bold mb-2">
              {job.salary.currency} {job.salary.min ? `${job.salary.min} - ` : ""}{job.salary.max || ""}
            </p>
          )}

          <p className="text-muted small mb-2">
            Location: {job.location.type} {job.location.city ? `, ${job.location.city}` : ""} {job.location.state ? `, ${job.location.state}` : ""}
          </p>

          {job.requirements && job.requirements.length > 0 && (
            <button
              className="btn btn-link btn-sm p-0 mb-2"
              onClick={() => setShowModal(true)}
            >
              View Details →
            </button>
          )}

          <div className="d-flex justify-content-between mt-auto">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(job)}
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(job._id)}
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
                  {job.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <h6 className="fw-semibold mb-1">Description</h6>
                <p
                  className="text-muted small mb-3"
                  style={{ lineHeight: "1.4" }}
                >
                  {job.description}
                </p>

                <h6 className="fw-semibold mb-1">Employment Type</h6>
                <p className="text-muted small mb-3">{job.employmentType}</p>

                <h6 className="fw-semibold mb-1">Location</h6>
                <p className="text-muted small mb-3">
                  {job.location.type} {job.location.city ? `, ${job.location.city}` : ""} {job.location.state ? `, ${job.location.state}` : ""}
                </p>

                {job.salary && job.salary.isVisible && (
                  <>
                    <h6 className="fw-semibold mb-1">Salary</h6>
                    <p className="text-success fw-bold mb-3">
                      {job.salary.currency} {job.salary.min ? `${job.salary.min} - ` : ""}{job.salary.max || ""}
                    </p>
                  </>
                )}

                <h6 className="fw-semibold mb-1">Category</h6>
                <p className="text-muted small mb-3">{job.category}</p>

                {job.experienceLevel && (
                  <>
                    <h6 className="fw-semibold mb-1">Experience Level</h6>
                    <p className="text-muted small mb-3">{job.experienceLevel}</p>
                  </>
                )}

                {job.status && (
                  <>
                    <h6 className="fw-semibold mb-1">Status</h6>
                    <p className="text-muted small mb-3">{job.status}</p>
                  </>
                )}

                {job.applicationDeadline && (
                  <>
                    <h6 className="fw-semibold mb-1">Application Deadline</h6>
                    <p className="text-muted small mb-3">{new Date(job.applicationDeadline).toLocaleDateString()}</p>
                  </>
                )}

                <hr className="my-2" />

                <h6 className="fw-semibold mb-2">Requirements</h6>
                <ul className="small">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>

                <h6 className="fw-semibold mb-2">Responsibilities</h6>
                <ul className="small">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
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
                    onEdit(job);
                  }}
                >
                  Edit Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ================= CreateJob ================= */

const CreateJob = ({ editJob, onJobSaved, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [responsibilities, setResponsibilities] = useState([""]);
  const [locationType, setLocationType] = useState("Remote");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("INR");
  const [salaryVisible, setSalaryVisible] = useState(true);
  const [category, setCategory] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [status, setStatus] = useState("Active");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (editJob) {
      setTitle(editJob.title);
      setDescription(editJob.description);
      setRequirements(editJob.requirements || [""]);
      setResponsibilities(editJob.responsibilities || [""]);
      setLocationType(editJob.location.type);
      setCity(editJob.location.city || "");
      setState(editJob.location.state || "");
      setEmploymentType(editJob.employmentType);
      setSalaryMin(editJob.salary?.min || "");
      setSalaryMax(editJob.salary?.max || "");
      setSalaryCurrency(editJob.salary?.currency || "INR");
      setSalaryVisible(editJob.salary?.isVisible ?? true);
      setCategory(editJob.category);
      setExperienceLevel(editJob.experienceLevel || "");
      setStatus(editJob.status || "Active");
      setApplicationDeadline(editJob.applicationDeadline || "");
    } else {
      resetForm();
    }
  }, [editJob]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setRequirements([""]);
    setResponsibilities([""]);
    setLocationType("Remote");
    setCity("");
    setState("");
    setEmploymentType("Full-time");
    setSalaryMin("");
    setSalaryMax("");
    setSalaryCurrency("INR");
    setSalaryVisible(true);
    setCategory("");
    setExperienceLevel("");
    setStatus("Active");
    setApplicationDeadline("");
  };

  const handleRequirementChange = (index, value) => {
    const newReqs = [...requirements];
    newReqs[index] = value;
    setRequirements(newReqs);
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleResponsibilityChange = (index, value) => {
    const newResps = [...responsibilities];
    newResps[index] = value;
    setResponsibilities(newResps);
  };

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const removeResponsibility = (index) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || !description || !category) {
      toast.error("Please fill all required fields");
      return;
    }

    const jobData = {
      title,
      description,
      requirements: requirements.filter(r => r.trim()),
      responsibilities: responsibilities.filter(r => r.trim()),
      location: {
        type: locationType,
        city: city || undefined,
        state: state || undefined
      },
      employmentType,
      salary: {
        min: salaryMin ? parseInt(salaryMin) : undefined,
        max: salaryMax ? parseInt(salaryMax) : undefined,
        currency: salaryCurrency,
        isVisible: salaryVisible
      },
      category,
      experienceLevel: experienceLevel || undefined,
      status,
      applicationDeadline: applicationDeadline || undefined
    };

    try {
      setLoading(true);

      const url = editJob ? `${API}/${editJob._id}` : API;
      const method = editJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to save job");
        return;
      }

      toast.success(`Job ${editJob ? "updated" : "added"} successfully!`);
      
      resetForm();
      onJobSaved(data.job);

    } catch (err) {
      console.error(err);
      toast.error("Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
    toast.info("Edit cancelled");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title mb-0">
          {editJob ? "Edit Job" : "Add Job"}
        </h3>
        {editJob && (
          <button className="btn btn-sm btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

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

        <div className="mb-3">
          <label className="form-label">Requirements</label>
          {requirements.map((req, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                placeholder="Enter requirement"
              />
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeRequirement(index)}
                disabled={requirements.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={addRequirement}>
            Add Requirement
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Responsibilities</label>
          {responsibilities.map((resp, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={resp}
                onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                placeholder="Enter responsibility"
              />
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeResponsibility(index)}
                disabled={responsibilities.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={addResponsibility}>
            Add Responsibility
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Location Type</label>
          <select
            className="form-select"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {(locationType === "On-site" || locationType === "Hybrid") && (
          <>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="form-label">Employment Type</label>
          <select
            className="form-select"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Salary Min</label>
          <input
            type="number"
            className="form-control"
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary Max</label>
          <input
            type="number"
            className="form-control"
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary Currency</label>
          <input
            type="text"
            className="form-control"
            value={salaryCurrency}
            onChange={(e) => setSalaryCurrency(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={salaryVisible}
            onChange={(e) => setSalaryVisible(e.target.checked)}
          />
          <label className="form-check-label">Salary Visible</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience Level</label>
          <select
            className="form-select"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

                <div className="mb-3">
          <label className="form-label">Application Deadline</label>
          <input
            type="datetime-local"
            className="form-control"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
          />
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-primary w-100"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : editJob ? "Update Job" : "Add Job"}
        </button>
      </div>
    </div>
  );
};

/* ================= JobAdmin ================= */

const JobAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJob, setEditJob] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmploymentType, setFilterEmploymentType] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load jobs");
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j._id !== id));
      toast.success("Job deleted");
      if (editJob?._id === id) setEditJob(null);
    } else {
      toast.error("Delete failed");
    }
  };

  const handleJobSaved = (job) => {
    if (editJob) {
      setJobs((prev) => prev.map((j) => (j._id === job._id ? job : j)));
      setEditJob(null);
    } else {
      fetchJobs();
    }
  };

  // Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmploymentType = filterEmploymentType === "" || job.employmentType === filterEmploymentType;
    return matchesSearch && matchesEmploymentType;
  });

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <CreateJob
            editJob={editJob}
            onJobSaved={handleJobSaved}
            onCancelEdit={() => setEditJob(null)}
          />
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h4 className="mb-3">Job Management</h4>
              
              {/* Search and Filter Bar */}
              <div className="row g-2">
                <div className="col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <select
                    className="form-select"
                    value={filterEmploymentType}
                    onChange={(e) => setFilterEmploymentType(e.target.value)}
                  >
                    <option value="">All Employment Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-body bg-light">
              {loading ? (
                <p>Loading...</p>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-5">
                   <p className="text-muted">No jobs found matching your criteria.</p>
                </div>
              ) : (
                <div className="jobs-scroll-container pb-2">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onEdit={setEditJob}
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
        .jobs-scroll-container {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: thin;
        }
        .job-card {
          min-width: 280px;
          max-width: 280px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default JobAdmin;