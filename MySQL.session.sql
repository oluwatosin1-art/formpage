USE agency_db;

CREATE TABLE IF NOT EXISTS agencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(225) NOT NULL, 
    pcc VARCHAR(225) NOT NULL,
    sc_code VARCHAR(225) NOT NULL,
    agency_name VARCHAR(225) NOT NULL,
    account_officer VARCHAR(225) NOT NULL,
    
);
SELECT * FROM agencies;