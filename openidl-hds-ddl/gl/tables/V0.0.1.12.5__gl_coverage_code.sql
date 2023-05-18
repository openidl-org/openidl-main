
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_coverage_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_coverage_code) THEN 
    INSERT INTO gl_coverage_code VALUES(1,'61','Combined single limit policy with or without medical payments');
    INSERT INTO gl_coverage_code VALUES(2,'62','Bodily injury with or without medical payments');
    INSERT INTO gl_coverage_code VALUES(3,'63','Property damage');
    INSERT INTO gl_coverage_code VALUES(4,'64','Medical payments only');
    INSERT INTO gl_coverage_code VALUES(5,'99','All other');
END IF;
END $$;
