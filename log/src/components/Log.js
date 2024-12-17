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

  const apiUrl = "http://localhost:5000/agencies";

  // Fetch all data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setAgencies(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing record
        await axios.put(`${apiUrl}/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Add new record
        await axios.post(apiUrl, formData);
      }
      setFormData({
        region: "",
        pcc: "",
        sc_code: "",
        agency_name: "",
        account_officer: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Handle edit
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Agency Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white">
      
      <div className="mb-4">
          <label htmlFor="region" className="block font-medium mb-1">
            REGION
          </label>
        <input
          type="text"
          placeholder="Region"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
        </div>

        <div className="mb-4">
          <label htmlFor="region" className="block font-medium mb-1">
          PCC
          </label>
        <input
          type="text"
          placeholder="PCC"
          value={formData.pcc}
          onChange={(e) => setFormData({ ...formData, pcc: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
        </div>

        <div className="mb-4">
          <label htmlFor="region" className="block font-medium mb-1">
           SC CODE
          </label>
        <input
          type="text"
          placeholder="SC Code"
          value={formData.sc_code}
          onChange={(e) => setFormData({ ...formData, sc_code: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
        </div>

        <div className="mb-4">
          <label htmlFor="region" className="block font-medium mb-1">
           AGENCY NAME
          </label>
        <input
          type="text"
          placeholder="Agency Name"
          value={formData.agency_name}
          onChange={(e) => setFormData({ ...formData, agency_name: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
        </div>

        <div className="mb-4">
          <label htmlFor="region" className="block font-medium mb-1">
             ACCOUNT OFFICER
          </label>
        <input
          type="text"
          placeholder="Account Officer"
          value={formData.account_officer}
          onChange={(e) => setFormData({ ...formData, account_officer: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded"
        />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          {editingId ? "Update" : "Submit"}
        </button>
      </form>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Region</th>
            <th className="border border-gray-300 p-2">PCC</th>
            <th className="border border-gray-300 p-2">SC Code</th>
            <th className="border border-gray-300 p-2">Agency Name</th>
            <th className="border border-gray-300 p-2">Account Officer</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency.id}>
              <td className="border border-gray-300 p-2">{agency.region}</td>
              <td className="border border-gray-300 p-2">{agency.pcc}</td>
              <td className="border border-gray-300 p-2">{agency.sc_code}</td>
              <td className="border border-gray-300 p-2">{agency.agency_name}</td>
              <td className="border border-gray-300 p-2">{agency.account_officer}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Log;