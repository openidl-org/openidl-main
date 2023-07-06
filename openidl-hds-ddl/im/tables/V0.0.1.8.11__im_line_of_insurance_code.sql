
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_line_of_insurance_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_line_of_insurance_code) THEN 
    INSERT INTO im_line_of_insurance_code VALUES(1,'31','Inland Marine');
END IF;
END $$;
