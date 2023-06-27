
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_subline_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_subline_code) THEN 
    INSERT INTO ca_subline_code VALUES(1,'1','Private Passenger Auto','Personal');
    INSERT INTO ca_subline_code VALUES(2,'2','Commercial Auto','Commercial');
END IF;
END $$;
