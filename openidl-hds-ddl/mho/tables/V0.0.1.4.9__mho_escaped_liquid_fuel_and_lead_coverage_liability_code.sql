
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_escaped_liquid_fuel_and_lead_coverage_liability_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM mho_escaped_liquid_fuel_and_lead_coverage_liability_code) THEN 
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(1,'0','Without Property Remediation For Escaped Liquid Fuel / Limited lead Liability Coverage / or Does Not Apply','Does Not Apply');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(2,'1','Basic Limits ($50,000)','Does Not Apply');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(3,'2','$100,000','All Tanks Are Above Ground');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(4,'3','$300,000','All Tanks Are Above Ground');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(5,'4','$100,000','One or More Tanks are Below Ground (partially or full)');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(6,'5','$300,000','One or More Tanks are Below Ground (partially or full)');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(7,'6','$100,000','No Tanks At All');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(8,'7','$300,000','No Tanks At All');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(9,'A','Up to Policy Liability Limit','All Tanks Are Above Ground');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(10,'B','Up to Policy Liability Limit','One or More Tanks are Below Ground (partially or full)');
    INSERT INTO mho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(11,'C','Up to Policy Liability Limit','No Tanks At All');
END IF;
END $$;
