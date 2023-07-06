
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_package_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_package_identification_code) THEN 
    INSERT INTO im_package_identification_code VALUES(1,'0','Coverage written as a Separate Policy, or Does Not Apply');
    INSERT INTO im_package_identification_code VALUES(2,'7','Written as Part of Package Policy Such as an SMP, CMP, or CPP');
    INSERT INTO im_package_identification_code VALUES(3,'9','Written as an Endorsement to Any Other Policy');
END IF;
END $$;
