
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_number_of_families_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_number_of_families_code) THEN 
    INSERT INTO dp_number_of_families_code VALUES(1,'0','Does not apply');
    INSERT INTO dp_number_of_families_code VALUES(2,'1','One family');
    INSERT INTO dp_number_of_families_code VALUES(3,'2','Two families');
    INSERT INTO dp_number_of_families_code VALUES(4,'3','Three families');
    INSERT INTO dp_number_of_families_code VALUES(5,'4','Four families');
    INSERT INTO dp_number_of_families_code VALUES(6,'9','Five or more families');
END IF;
END $$;
