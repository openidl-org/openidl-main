
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_home_based_business_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_home_based_business_indicator_code) THEN 
    INSERT INTO ho_home_based_business_indicator_code VALUES(1,'0','The AAIS ML-450 Coverage Part, ISO HO 07 01 Coverage Part, or equivalent is not part of this policy OR Does Not Apply');
    INSERT INTO ho_home_based_business_indicator_code VALUES(2,'1','A Home-Based Business that is insured through the AAIS ML-450 Coverage Part, ISO HO 07 01 Coverage Part, OR equivalent Does exist on this policy');
END IF;
END $$;
