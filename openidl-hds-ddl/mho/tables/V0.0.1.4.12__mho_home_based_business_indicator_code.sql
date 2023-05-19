
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_home_based_business_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM mho_home_based_business_indicator_code) THEN 
    INSERT INTO mho_home_based_business_indicator_code VALUES(1,'0','The AAIS ML-450 Coverage Part, ISO HO 07 01 Coverage Part, or equivalent is not part of this policy OR Does Not Apply');
    INSERT INTO mho_home_based_business_indicator_code VALUES(2,'1','A Home-Based Business that is insured through the AAIS ML-450 Coverage Part, ISO HO 07 01 Coverage Part, or equivalent does exist on this policy');
END IF;
END $$;
