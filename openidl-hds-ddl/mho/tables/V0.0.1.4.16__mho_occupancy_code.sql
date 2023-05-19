
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_occupancy_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM mho_occupancy_code) THEN 
    INSERT INTO mho_occupancy_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO mho_occupancy_code VALUES(2,'1','Non-Seasonal','Does Not Apply');
    INSERT INTO mho_occupancy_code VALUES(3,'2','Seasonal','Does Not Apply');
    INSERT INTO mho_occupancy_code VALUES(4,'3','Non-Seasonal','Owner Occupied');
    INSERT INTO mho_occupancy_code VALUES(5,'4','Seasonal','Owner Occupied');
    INSERT INTO mho_occupancy_code VALUES(6,'5','Non-Seasonal','Non-Owner Occupied');
    INSERT INTO mho_occupancy_code VALUES(7,'6','Seasonal','Non-Owner Occupied');
END IF;
END $$;
