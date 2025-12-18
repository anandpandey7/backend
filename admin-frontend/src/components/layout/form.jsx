import { useState } from "react";

const CountryForm = () => {
  const [formData, setFormData] = useState({
    country: "",
    code: "",
    telCode: "",
    flag: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      flag: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("country", formData.country);
    data.append("code", formData.code);
    data.append("telCode", formData.telCode);
    data.append("flag", formData.flag);

    const res = await fetch("http://localhost:5000/api/countries", {
      method: "POST",
      body: data, // ✅ DO NOT set headers
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Failed to add country");
      console.error(result);
      return;
    }

    alert("Country added successfully ✅");
    console.log(result);

    // reset form
    setFormData({
      country: "",
      code: "",
      telCode: "",
      flag: null,
    });
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Add Country</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card-body">
          {/* Country Name */}
          <div className="mb-3">
            <label className="form-label">Country Name</label>
            <input
              type="text"
              name="country"               // ✅ FIXED
              className="form-control"
              placeholder="India"
              value={formData.country}     // ✅ FIXED
              onChange={handleChange}
              required
            />
          </div>

          {/* Country Code */}
          <div className="mb-3">
            <label className="form-label">Country Code</label>
            <input
              type="text"
              name="code"
              className="form-control"
              placeholder="IN"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          {/* Telephone Code */}
          <div className="mb-3">
            <label className="form-label">Telephone Code</label>
            <input
              type="text"
              name="telCode"
              className="form-control"
              placeholder="+91"
              value={formData.telCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Flag Upload */}
          <div className="mb-3">
            <label className="form-label">Country Flag</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Save Country
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;
