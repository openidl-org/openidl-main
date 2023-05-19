
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_package_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_package_identification_code) THEN 
    INSERT INTO gl_package_identification_code VALUES(1,'0','Coverage written as a separate policy');
    INSERT INTO gl_package_identification_code VALUES(2,'7','Written as part of a package policy such as an SMP, CMP, or CPP or written as part of an ISO Farm Combination Coverage policy');
    INSERT INTO gl_package_identification_code VALUES(3,'9','Written as an endorsement to any other policy');
END IF;
END $$;
