
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_large_area_modifier_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_large_area_modifier_code) THEN 
    INSERT INTO cp_large_area_modifier_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_large_area_modifier_code VALUES(2,'1','15,000 square feet or less');
    INSERT INTO cp_large_area_modifier_code VALUES(3,'2','15,001 to 25,000 square feet');
    INSERT INTO cp_large_area_modifier_code VALUES(4,'3','Greater than 25,000 square feet');
END IF;
END $$;
