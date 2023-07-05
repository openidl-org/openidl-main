
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_type_of_policy_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_type_of_policy_code) THEN 
    INSERT INTO im_type_of_policy_code VALUES(1,'0','Does Not Apply');
    INSERT INTO im_type_of_policy_code VALUES(2,'1','Personal Inland Marine Policy');
    INSERT INTO im_type_of_policy_code VALUES(3,'2','Commercial Inland Marine Policy');
END IF;
END $$;
