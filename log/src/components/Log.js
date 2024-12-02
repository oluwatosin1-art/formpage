import React, { useEffect, useState } from "react";
import axios from "axios";

const Log = () => {
  const [agencies, setAgencies] = useState([]);
  const [formData, setFormData] = useState({
    region: "",
    pcc: "",
    scCode: "",
    agencyName: "",
    accountOfficer: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      if (editingId) {
        // Update existing record
        await 
        axios.put(`${apiUrl}/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Add new record
        await 
        axios.post(apiUrl, formData);
      }
      setFormData({
        region: "",
        pcc: "",
        sc_code: "",
        agency_name: "",
        account_officer: "",
      });
      fetchData(); // Call fetchData after submission
    } catch (error) {
      console.error("Error saving data:", error);
    }
  

    setErrors({});
    axios
      .post("http://localhost:5000/submit", formData)
      .then((response) => {
        setMessage("Form submitted successfully!");
        setFormData({
          region: "",
          pcc: "",
          scCode: "",
          agencyName: "",
          accountOfficer: "",
        });
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
        console.error(error);
      });
  };
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
     
  

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
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
    <div className="flex justify-center items-center h-screen-200hv  bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Agency Form</h2>

        {message && (
          <p className={`mb-4 text-center ${message.includes("error") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="region" className="block font-medium mb-1">
            REGION
          </label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="pcc" className="block font-medium mb-1">
            PCC
          </label>
          <input
            type="text"
            id="pcc"
            name="pcc"
            value={formData.pcc}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.pcc && <p className="text-red-500 text-sm">{errors.pcc}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="scCode" className="block font-medium mb-1">
            SC CODE
          </label>
          <input
            type="text"
            id="scCode"
            name="scCode"
            value={formData.sc_code}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.scCode && <p className="text-red-500 text-sm">{errors.scCode}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="agencyName" className="block font-medium mb-1">
            AGENCY NAME
          </label>
          <input
            type="text"
            id="agencyName"
            name="agencyName"
            value={formData.agency_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.agencyName && <p className="text-red-500 text-sm">{errors.agencyName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="accountOfficer" className="block font-medium mb-1">
            ACCOUNT OFFICER
          </label>
          <input
            type="text"
            id="accountOfficer"
            name="accountOfficer"
            value={formData.account_officer}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.accountOfficer && <p className="text-red-500 text-sm">{errors.accountOfficer}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>

        <h3 className="text-xl font-bold mt-10 mb-4 items-center justify-center text-center">Saved Records</h3>
        {/*TABLE*/}
        <table className="max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white">
          <thead>
            <tr>
              <th className="border border-gray-300 p-3">REGION</th>
              <th className="border border-gray-300 p-3">PCC</th>
              <th className="border border-gray-300 p-3">SCCODE</th>
              <th className="border border-gray-300 p-3">AGENCY NAME</th>
              <th className="border border-gray-300 p-3" >ACCOUNT OFFICER</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((agency) =>(
             <tr key={agency.id}>
                 <td className="border border-gray-300  p-3">{agency.region}</td>
                 <td className="border border-gray-300  p-3">{agency.pcc}</td>
                 <td className="border border-gray-300  p-3">{agency.sc_code}</td>
                 <td className="border border-gray-300  p-3">{agency.agency_name}</td>
                 <td className="border border-gray-300  p-3">{agency.account_officer}</td>
                 <td className="border border-gray-300  p-3">  
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
      </form>
    </div>
  );
};

export default Log;
