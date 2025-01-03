require('dotenv').config();  // This loads the .env file
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: ["https://frontend-tau-livid.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,     // Fetches MYSQL_HOST from the .env file
  user: process.env.MYSQL_USER,     // Fetches MYSQL_USER from the .env file
  password: process.env.MYSQL_PASSWORD, // Fetches MYSQL_PASSWORD from the .env file
  database: process.env.MYSQL_DATABASE, // Fetches MYSQL_DATABASE from the .env file
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Routes

// Add a new agency (CREATE)
app.post("/agencies", (req, res) => {
  const { region, pcc, sc_code, agency_name, account_officer } = req.body;
  if (!region || !pcc || !sc_code || !agency_name || !account_officer) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const query =
    "INSERT INTO agencies (region, pcc, sc_code, agency_name, account_officer) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [region, pcc, sc_code, agency_name, account_officer], (err) => {
    if (err) {
      console.error("Error adding data:", err.message);
      return res.status(500).json({ error: "Error saving data.", details: err.message });
    }
    res.status(201).json({ message: "Data added successfully." });
  });
});

// Get all agencies (READ)
app.get("/agencies", (req, res) => {
  const query = "SELECT * FROM agencies";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err.message);
      return res.status(500).json({ error: "Error fetching data.", details: err.message });
    }
    res.status(200).json(result);
  });
});

// Update an agency by ID (UPDATE)
app.put("/agencies/:id", (req, res) => {
  const { id } = req.params;
  const { region, pcc, sc_code, agency_name, account_officer } = req.body;
  if (!region || !pcc || !sc_code || !agency_name || !account_officer) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const query =
    "UPDATE agencies SET region = ?, pcc = ?, sc_code = ?, agency_name = ?, account_officer = ? WHERE id = ?";
  db.query(
    query,
    [region, pcc, sc_code, agency_name, account_officer, id],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err.message);
        return res.status(500).json({ error: "Error updating data.", details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Agency not found." });
      }
      res.status(200).json({ message: "Data updated successfully." });
    }
  );
});

// Delete an agency by ID (DELETE)
app.delete("/agencies/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM agencies WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting data:", err.message);
      return res.status(500).json({ error: "Error deleting data.", details: err.message });
    }
    res.status(200).json({ message: "Data deleted successfully." });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
