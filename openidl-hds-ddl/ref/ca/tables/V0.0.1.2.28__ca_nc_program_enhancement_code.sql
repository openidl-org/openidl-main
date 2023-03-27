
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nc_program_enhancement_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_nc_program_enhancement_code) THEN 
    INSERT INTO ca_nc_program_enhancement_code VALUES(1,'0','Not an enhanced endorsement');
    INSERT INTO ca_nc_program_enhancement_code VALUES(2,'1','Enhanced Endorsement');
END IF;
END $$;
