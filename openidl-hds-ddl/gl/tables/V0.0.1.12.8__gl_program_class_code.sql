
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_program_class_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_program_class_code) THEN 
    INSERT INTO gl_program_class_code VALUES(1,'1','AAIS forms and class codes','Other than Exempt Commercial Risks');
    INSERT INTO gl_program_class_code VALUES(2,'3','ISO forms and class codes','Other than Exempt Commercial Risks');
    INSERT INTO gl_program_class_code VALUES(3,'4','Independent forms, but AAIS class codes','Other than Exempt Commercial Risks');
    INSERT INTO gl_program_class_code VALUES(4,'6','Independent forms, but ISO class codes','Other than Exempt Commercial Risks');
    INSERT INTO gl_program_class_code VALUES(5,'A','AAIS forms and class codes','Exempt Commercial Risks');
    INSERT INTO gl_program_class_code VALUES(6,'C','ISO forms and class codes','Exempt Commercial Risks');
    INSERT INTO gl_program_class_code VALUES(7,'D','Independent forms, but AAIS class codes','Exempt Commercial Risks');
    INSERT INTO gl_program_class_code VALUES(8,'F','Independent forms, but ISO class codes','Exempt Commercial Risks');
END IF;
END $$;
