const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@boborinwa12",
  database: "agency_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// Routes

// 1. Add a new agency (CREATE)
app.post("/agencies", (req, res) => {
  const { region, pcc, sc_code, agency_name, account_officer } = req.body;
  const query =
    "INSERT INTO agencies (region, pcc, sc_code, agency_name, account_officer) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [region, pcc, sc_code, agency_name, account_officer], (err) => {
    if (err) {
      console.error("Error adding data:", err);
      return res.status(500).send("Error saving data.");
    }
    res.status(201).send("Data added successfully.");
  });
});

<<<<<<< HEAD
// 2. Get all agencies (READ)
app.get("/agencies", (req, res) => {
  const query = "SELECT * FROM agencies";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
=======
//Update an agencies ID (UPDATE)
app.put("/agencies/id:",(req, res) =>{
  const {id} = req.params;
  const{ region, pcc, sc_code, agency_name, account_officer} = req.body
  const query =
 " UPDATE agencies SET region=?, pcc=?, sc_code=?, agency_name=?, account_officer=? WHERE id=?,"
 db.query(
  query,
  [region, pcc, sc_code, agency_name, account_officer, id],
  (err, result) => {
    if(err){
      console.error("Error fetching data:",err);
>>>>>>> e034a9ef93c81fcca66ee04ca229f9abeac3306d
      return res.status(500).send("Error fetching data.");
    }
    res.status(200).json(results);
  });
});

// 3. Update an agency by ID (UPDATE)
app.put("/agencies/:id", (req, res) => {
  const { id } = req.params;
  const { region, pcc, sc_code, agency_name, account_officer } = req.body;
  const query =
    "UPDATE agencies SET region = ?, pcc = ?, sc_code = ?, agency_name = ?, account_officer = ? WHERE id = ?";
  db.query(
    query,
    [region, pcc, sc_code, agency_name, account_officer, id],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).send("Error updating data.");
      }
      res.status(200).send("Data updated successfully.");
    }
  );
});

// 4. Delete an agency by ID (DELETE)
app.delete("/agencies/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM agencies WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).send("Error deleting data.");
    }
    res.status(200).send("Data deleted successfully.");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
