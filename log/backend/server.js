const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser")

// Initialize express app
const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(cors());
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost", // MySQL server hostname
  user: "root",      // MySQL username (default is "root")
  password: "@boborinwa12",      // MySQL password (leave empty if none)  
  database: "agency_db", // The name of the database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Test the connection
app.get("/", (req, res) => {
  res.send("MySQL backend connected!");
});

// Example POST route to insert data
app.post("/submit",(req,res) => {const { region, pcc, scCode, agencyName, accountOfficer } = req.body;


// Backend validation
if (!region || !pcc || !scCode || !agencyName || !accountOfficer) {
  return res.status(400).send("All fields are required.");
}

// Insert data into MySQL
const query =
  "INSERT INTO agencies (region, pcc, sc_code, agency_name, account_officer) VALUES (?, ?, ?, ?, ?)";
db.query(
  query,
  [region, pcc, scCode, agencyName, accountOfficer],
  (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("An error occurred while saving data.");
    } else {
      res.status(200).send("Data saved successfully.");
    }
  }
);
});

//Get all agencies
app.get("/agencies", (req, res) => {
  const query = "SELECT * FROM agencies";
  db.query(query, (err, result) =>{
      if(err){
        console.error("Error fectching data:",err);
        return res.status(500).send("Error fetching data.");
      } else {
        res.status(200).json (result)
      }
      
    
    
  });
});

//Update an agencies ID (UPDATE)
app.put("/agencies/id:",(req, res) =>{
  const {id} = req.params;
  const  { region, pcc, sc_code, agency_name, account_officer} = req.body
  const query =
 " UPDATE agencies SET region=?, pcc=?, sc_code=?, agency_name=?, account_officer=? WHERE id=?,"
 db.query(
  query,
  [region, pcc, sc_code, agency_name, account_officer, id],
  (err, result) => {
    if(err){
      console.error("Error fetching data:",err);
      return res.status(500).send("Error fetching data.");
    }
   
    res.status(200).json(results);
  });
});

//Delete an agency by ID (DELETE)
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


// start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
