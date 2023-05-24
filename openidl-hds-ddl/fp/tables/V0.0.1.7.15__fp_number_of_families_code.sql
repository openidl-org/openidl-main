
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fp_number_of_families_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fp_number_of_families_code) THEN 
    INSERT INTO fp_number_of_families_code VALUES(1,'0','Does Not Apply');
    INSERT INTO fp_number_of_families_code VALUES(2,'1','One family');
    INSERT INTO fp_number_of_families_code VALUES(3,'2','Two families');
    INSERT INTO fp_number_of_families_code VALUES(4,'3','Three families');
    INSERT INTO fp_number_of_families_code VALUES(5,'4','Four families');
    INSERT INTO fp_number_of_families_code VALUES(6,'9','Five or more families');
END IF;
END $$;
