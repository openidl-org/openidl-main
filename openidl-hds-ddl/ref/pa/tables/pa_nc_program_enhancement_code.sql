DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_nc_program_enhancement_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_nc_program_enhancement_code) THEN 
INSERT INTO pa_nc_program_enhancement_code (id, code, description) VALUES( 1,'0','Not an enhanced endorsement' );
INSERT INTO pa_nc_program_enhancement_code VALUES( 2,'1','Enhanced endorsement' );
END IF;

END $$;