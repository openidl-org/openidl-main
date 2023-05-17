
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_coverage_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM dp_coverage_code) THEN 
    INSERT INTO dp_coverage_code VALUES(1,'11','Dwelling');
    INSERT INTO dp_coverage_code VALUES(2,'12','Contents');
    INSERT INTO dp_coverage_code VALUES(3,'13','Dwelling and Contents Combined');
    INSERT INTO dp_coverage_code VALUES(4,'17','Condominium Unit - Owner Additions');
    INSERT INTO dp_coverage_code VALUES(5,'99','All Other');
    INSERT INTO dp_coverage_code VALUES(6,'00','Does Not Apply');
END IF;
END $$;
