
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_package_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_package_identification_code) THEN 
    INSERT INTO dp_package_identification_code VALUES(1,'0','Coverage written as a separate policy OR Does Not Apply');
    INSERT INTO dp_package_identification_code VALUES(2,'7','Written as part of a package policy such as an SMP, CMP, or CPP');
    INSERT INTO dp_package_identification_code VALUES(3,'9','Written as an endorsement to any other policy');
END IF;
END $$;
