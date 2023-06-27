
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fp_program_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fp_program_code) THEN 
    INSERT INTO fp_program_code VALUES(1,'1','AAIS Program');
    INSERT INTO fp_program_code VALUES(2,'2','Policies written on a consent-to-rate basis');
    INSERT INTO fp_program_code VALUES(3,'3','ISO Program');
    INSERT INTO fp_program_code VALUES(4,'5','Independent Program');
END IF;
END $$;
