
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_program_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_program_code) THEN 
    INSERT INTO pa_program_code VALUES(1,'3','ISO Program');
    INSERT INTO pa_program_code VALUES(2,'5','All Other Programs (including independent bureaus)');
    INSERT INTO pa_program_code VALUES(3,'C','Exempt Commercial Risk: ISO forms and class codes');
    INSERT INTO pa_program_code VALUES(4,'F','Exempt Commercial Risk: Independent forms but ISO class codes');
END IF;
END $$;
