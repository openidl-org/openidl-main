
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_deductible_type_code) THEN 
    INSERT INTO cp_deductible_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_deductible_type_code VALUES(2,'1','No deductible ($0)');
    INSERT INTO cp_deductible_type_code VALUES(3,'4','Disappearing deductible');
    INSERT INTO cp_deductible_type_code VALUES(4,'5','Percentage deductible on all perils');
    INSERT INTO cp_deductible_type_code VALUES(5,'6','Flat deductible');
    INSERT INTO cp_deductible_type_code VALUES(6,'7','Flat, with a higher (flat or percentage) windstorm deductible');
    INSERT INTO cp_deductible_type_code VALUES(7,'9','All other deductible types');
END IF;
END $$;
