USE agency_db;

CREATE TABLE IF NOT EXISTS agencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(225), 
    pcc VARCHAR(225),
    sc_code VARCHAR(225),
    agency_name VARCHAR(225),
    account_officer VARCHAR(225),
    
);
SELECT * FROM agencies;