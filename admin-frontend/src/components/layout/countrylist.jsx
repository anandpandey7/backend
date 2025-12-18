import { useEffect, useState } from "react";
import CountryForm from "./form";

const CountryTable = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/countries") // 🔁 change URL if needed
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCountries(data.countries);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  // Remove unwanted quotes from backend strings
  const clean = (value) => value?.replace(/^"+|"+$/g, "");

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Countries List</h3>
      </div>

      <div className="card-body table-responsive p-0">
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>#</th>
              <th>Flag</th>
              <th>Country</th>
              <th>Code</th>
              <th>Tel Code</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c, index) => (
              <tr key={c._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:5000${c.flag}`}
                    alt={clean(c.country)}
                    width="40"
                    height="25"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{clean(c.country)}</td>
                <td>{clean(c.code)}</td>
                <td>{clean(c.telCode)}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryTable;
