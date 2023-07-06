
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_program_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_program_code) THEN 
    INSERT INTO fo_program_code VALUES(1,'0','Does Not Apply');
    INSERT INTO fo_program_code VALUES(2,'3','ISO Program');
    INSERT INTO fo_program_code VALUES(3,'5','Independent Program');
    INSERT INTO fo_program_code VALUES(4,'6','AAIS ML Program - Standard Coverage');
    INSERT INTO fo_program_code VALUES(5,'7','AAIS ML Program - Expanded Coverage');
    INSERT INTO fo_program_code VALUES(6,'9','AAIS FO/GL Program');
END IF;
END $$;
