
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_occupancy_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_occupancy_code) THEN 
    INSERT INTO mho_occupancy_code VALUES(1,'0','Does Not Apply','N/A');
    INSERT INTO mho_occupancy_code VALUES(2,'1','Non-Seasonal','N/A');
    INSERT INTO mho_occupancy_code VALUES(3,'2','Seasonal','N/A');
    INSERT INTO mho_occupancy_code VALUES(4,'3','Non-Seasonal','Owner Occupied');
    INSERT INTO mho_occupancy_code VALUES(5,'4','Seasonal','Owner Occupied');
    INSERT INTO mho_occupancy_code VALUES(6,'5','Non-Seasonal','Non-Owner Occupied');
    INSERT INTO mho_occupancy_code VALUES(7,'6','Seasonal','Non-Owner Occupied');
END IF;
END $$;
