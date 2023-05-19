
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS mho_program_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM mho_program_code) THEN 
    INSERT INTO mho_program_code VALUES(1,'0','Does Not Apply');
    INSERT INTO mho_program_code VALUES(2,'3','ISO Program');
    INSERT INTO mho_program_code VALUES(3,'5','Independent Program');
    INSERT INTO mho_program_code VALUES(4,'6','AAIS Program - Alternate / Standard Coverage');
    INSERT INTO mho_program_code VALUES(5,'7','AAIS Program - Primary / Expanded Coverage');
    INSERT INTO mho_program_code VALUES(6,'8','AAIS Program - Forms and Endorsements with HO Prefix');
END IF;
END $$;
