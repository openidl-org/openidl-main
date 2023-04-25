DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_nc_program_enhancement_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_nc_program_enhancement_indicator_code) THEN 
INSERT INTO ho_nc_program_enhancement_indicator_code (id, code, description) VALUES( 1,'0','Not an Enhancement Endorsement' );
INSERT INTO ho_nc_program_enhancement_indicator_code VALUES( 2,'1','Enhanced Endorsement' );
END IF;

END $$;