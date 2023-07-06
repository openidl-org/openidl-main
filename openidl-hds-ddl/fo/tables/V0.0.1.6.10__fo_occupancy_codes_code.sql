
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_occupancy_codes_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_occupancy_codes_code) THEN 
    INSERT INTO fo_occupancy_codes_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO fo_occupancy_codes_code VALUES(2,'1','Non-Seasonal','Does Not Apply');
    INSERT INTO fo_occupancy_codes_code VALUES(3,'2','Seasonal','Does Not Apply');
END IF;
END $$;