
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_occupancy_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_occupancy_code) THEN 
    INSERT INTO dp_occupancy_code VALUES(1,'0','Does Not Apply','N/A');
    INSERT INTO dp_occupancy_code VALUES(2,'3','Non-Seasonal','Owner Occupied');
    INSERT INTO dp_occupancy_code VALUES(3,'4','Seasonal','Owner Occupied');
    INSERT INTO dp_occupancy_code VALUES(4,'5','Non-Seasonal','Non-Owner Occupied');
    INSERT INTO dp_occupancy_code VALUES(5,'6','Seasonal','Non-Owner Occupied');
END IF;
END $$;
