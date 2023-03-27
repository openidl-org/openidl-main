
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_program_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_program_code) THEN 
    INSERT INTO ho_program_code VALUES(1,'0','Does Not Apply');
    INSERT INTO ho_program_code VALUES(2,'3','ISO Program');
    INSERT INTO ho_program_code VALUES(3,'5','Independent Program');
    INSERT INTO ho_program_code VALUES(4,'6','AAIS Program - Alternate / Standard Coverage');
    INSERT INTO ho_program_code VALUES(5,'7','AAIS Program - Primary / Expanded Coverage');
    INSERT INTO ho_program_code VALUES(6,'8','AAIS Program - Forms and Endorsements with HO Prefix');
END IF;
END $$;
