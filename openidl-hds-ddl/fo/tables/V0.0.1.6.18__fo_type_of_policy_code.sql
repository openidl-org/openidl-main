
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_type_of_policy_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_type_of_policy_code) THEN 
    INSERT INTO fo_type_of_policy_code VALUES(1,'0','Does Not Apply');
    INSERT INTO fo_type_of_policy_code VALUES(2,'1','Farm Personal Liability');
    INSERT INTO fo_type_of_policy_code VALUES(3,'2','Commercial Liability');
END IF;
END $$;
