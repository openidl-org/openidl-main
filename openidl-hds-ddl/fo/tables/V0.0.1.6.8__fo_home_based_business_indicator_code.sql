
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_home_based_business_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_home_based_business_indicator_code) THEN 
    INSERT INTO fo_home_based_business_indicator_code VALUES(1,'0','The AAIS ML-450 Endorsement (or Equivalent) is not Part of This Policy or Does Not Apply');
    INSERT INTO fo_home_based_business_indicator_code VALUES(2,'1','A Home Based Business that is Insured Through The AAIS ML-450 Endorsement (or Equivalent) Does Exist on This Policy');
END IF;
END $$;
