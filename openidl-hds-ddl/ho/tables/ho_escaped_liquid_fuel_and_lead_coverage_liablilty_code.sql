DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_escaped_liquid_fuel_and_lead_coverage_liablity_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_escaped_liquid_fuel_and_lead_coverage_liablity_code) THEN 
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code (id, code, name, type) VALUES( 1,'0','Without Property Remediation / Limited lead Liability Coverage / or Does Not Apply','N/A' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 2,'1','Basic Limits ($50,000)','N/A' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 3,'2','$100,000','All Tanks Are Above Ground' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 4,'3','$300,000','All Tanks Are Above Ground' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 5,'A','Up to Policy Liability Limit','All Tanks Are Above Ground' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 6,'4','$100,000','One or More Tanks are Below Ground (partially or full)' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 7,'5','$300,000','One or More Tanks are Below Ground (partially or full)' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 8,'B','Up to Policy Liability Limit','One or More Tanks are Below Ground (partially or full)' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 9,'6','$100,000','No Tanks At All' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 10,'7','$300,000','No Tanks At All' );
INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liablity_code VALUES( 11,'C','Up to Policy Liability Limit','No Tanks At All' );
END IF;

END $$;