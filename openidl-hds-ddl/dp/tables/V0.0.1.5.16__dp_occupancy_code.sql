
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_occupancy_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM dp_occupancy_code) THEN 
    INSERT INTO dp_occupancy_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO dp_occupancy_code VALUES(2,'3','Non-Seasonal','Owner Occupied');
    INSERT INTO dp_occupancy_code VALUES(3,'4','Seasonal','Owner Occupied');
    INSERT INTO dp_occupancy_code VALUES(4,'5','Non-Seasonal','Non-Owner Occupied');
    INSERT INTO dp_occupancy_code VALUES(5,'6','Seasonal','Non-Owner Occupied');
END IF;
END $$;
