
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_area_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_area_indicator_code) THEN 
    INSERT INTO ho_area_indicator_code VALUES(1,'0','Does Not Apply');
    INSERT INTO ho_area_indicator_code VALUES(2,'1','Beach area (Specific Atlantic and Gulf states only)');
    INSERT INTO ho_area_indicator_code VALUES(3,'2','Seacoast area (Specific Atlantic and Gulf states only)');
    INSERT INTO ho_area_indicator_code VALUES(4,'3','Designated brush area (California only)');
END IF;
END $$;
