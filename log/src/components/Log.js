import React, { useState, useEffect } from "react";
import axios from "axios";

const Log = () => {
  const [agencies, setAgencies] = useState([]);
  const [formData, setFormData] = useState({
    region: "",
    pcc: "",
    sc_code: "",
    agency_name: "",
    account_officer: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Dynamic API base URL
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://backend-theta-roan.vercel.app"
      : "http://localhost:5000";

  const apiUrl = `${API_BASE_URL}/agencies`;

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setAgencies(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update an existing agency
        await axios.put(`${apiUrl}/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Add a new agency
        await axios.post(apiUrl, formData);
      }
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  const handleEdit = (agency) => {
    setEditingId(agency.id);
    setFormData({
      region: agency.region,
      pcc: agency.pcc,
      sc_code: agency.sc_code,
      agency_name: agency.agency_name,
      account_officer: agency.account_officer,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      region: "",
      pcc: "",
      sc_code: "",
      agency_name: "",
      account_officer: "",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Agency Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white"
      >
        {["region", "pcc", "sc_code", "agency_name", "account_officer"].map(
          (field, index) => (
            <div className="mb-4" key={index}>
              <label htmlFor={field} className="block font-medium mb-1">
                {field.replace(/_/g, " ").toUpperCase()}
              </label>
              <input
                type="text"
                placeholder={field.replace(/_/g, " ")}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {editingId ? "Update" : "Submit"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-400 mt-8">
        <thead>
          <tr>
            {[
              "Region",
              "PCC",
              "SC Code",
              "Agency Name",
              "Account Officer",
              "Actions",
            ].map((header, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agencies.length > 0 ? (
            agencies.map((agency) => (
              <tr key={agency.id}>
                <td className="border border-gray-300 p-2">{agency.region}</td>
                <td className="border border-gray-300 p-2">{agency.pcc}</td>
                <td className="border border-gray-300 p-2">{agency.sc_code}</td>
                <td className="border border-gray-300 p-2">
                  {agency.agency_name}
                </td>
                <td className="border border-gray-300 p-2">
                  {agency.account_officer}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEdit(agency)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agency.id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center p-4 border border-gray-300"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Log;
