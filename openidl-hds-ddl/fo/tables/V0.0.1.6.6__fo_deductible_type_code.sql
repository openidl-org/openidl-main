
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
	type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_deductible_type_code) THEN 
    INSERT INTO fo_deductible_type_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO fo_deductible_type_code VALUES(2,'1','No Deductible ($0)','Does Not Apply');
    INSERT INTO fo_deductible_type_code VALUES(3,'4','Disappearing Deductible','Does Not Apply');
    INSERT INTO fo_deductible_type_code VALUES(4,'5','Percentage Deductible on All Perils','Percentage');
    INSERT INTO fo_deductible_type_code VALUES(5,'6','Flat Deductible','Flat');
    INSERT INTO fo_deductible_type_code VALUES(6,'7','Flat, With a Higher (Flat or Percentage) windstorm deductible','Flat');
    INSERT INTO fo_deductible_type_code VALUES(7,'9','All Other Deductible Types','Does Not Apply');
END IF;
END $$;
