
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_line_of_insurance_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_line_of_insurance_code) THEN 
    INSERT INTO cr_line_of_insurance_code VALUES(1,'37','Crime');
END IF;
END $$;
