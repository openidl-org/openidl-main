
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fp_coverage_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fp_coverage_code) THEN 
    INSERT INTO fp_coverage_code VALUES(1,'11','Dwelling');
    INSERT INTO fp_coverage_code VALUES(2,'12','Contents');
    INSERT INTO fp_coverage_code VALUES(3,'13','Dwelling and Contents Combined');
    INSERT INTO fp_coverage_code VALUES(4,'14','Farm Barns, Buildings and Other Structures');
    INSERT INTO fp_coverage_code VALUES(5,'15','Farm Blanket Personal Property');
    INSERT INTO fp_coverage_code VALUES(6,'16','Farm Scheduled Personal Property');
    INSERT INTO fp_coverage_code VALUES(7,'99','All Other');
    INSERT INTO fp_coverage_code VALUES(8,'00','Does Not Apply');
END IF;
END $$;
