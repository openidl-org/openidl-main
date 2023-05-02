
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_program_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_program_code) THEN 
    INSERT INTO pa_program_code VALUES(1,'3','ISO Program');
    INSERT INTO pa_program_code VALUES(2,'5','All Other Programs (including independent bureaus)');
    INSERT INTO pa_program_code VALUES(3,'C','Exempt Commercial Risk: ISO forms and class codes');
    INSERT INTO pa_program_code VALUES(4,'F','Exempt Commercial Risk: Independent forms but ISO class codes');
END IF;
END $$;
