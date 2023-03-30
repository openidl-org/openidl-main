
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_escaped_liquid_fuel_coverage_property_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_escaped_liquid_fuel_coverage_property_code) THEN 
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(1,'0','Does Not Apply','N/A');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(2,'1','Basic Limits ($10,000)','N/A');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(3,'2','$25,000','All Tanks Are Above Ground');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(4,'3','$50,000','All Tanks Are Above Ground');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(5,'4','$100,000','All Tanks Are Above Ground');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(6,'5','$25,000','One or More Tanks are Below Ground (partially or full)');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(7,'6','$50,000','One or More Tanks are Below Ground (partially or full)');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(8,'7','$100,000','One or More Tanks are Below Ground (partially or full)');
    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(9,'9','Without Property Remediation for Escaped Liquid Fuel','N/A');
END IF;
END $$;
