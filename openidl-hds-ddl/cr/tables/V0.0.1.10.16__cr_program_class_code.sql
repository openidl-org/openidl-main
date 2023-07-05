
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_program_class_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_program_class_code) THEN 
    INSERT INTO cr_program_class_code VALUES(1,'0','Does not apply');
    INSERT INTO cr_program_class_code VALUES(2,'1','AAIS Forms and Class Codes');
    INSERT INTO cr_program_class_code VALUES(3,'3','ISO Forms and Class Codes');
    INSERT INTO cr_program_class_code VALUES(4,'4','Independent Forms, but AAIS Class Codes');
    INSERT INTO cr_program_class_code VALUES(5,'6','Independent Forms, but ISO Class Codes');
END IF;
END $$;
