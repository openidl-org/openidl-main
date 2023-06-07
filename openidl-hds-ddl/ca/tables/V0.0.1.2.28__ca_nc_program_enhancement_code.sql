
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nc_program_enhancement_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_nc_program_enhancement_code) THEN 
    INSERT INTO ca_nc_program_enhancement_code VALUES(1,'0','Not an enhanced endorsement');
    INSERT INTO ca_nc_program_enhancement_code VALUES(2,'1','Enhanced Endorsement');
END IF;
END $$;
