DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_passive_restraint_discount_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_passive_restraint_discount_code) THEN 
INSERT INTO pa_passive_restraint_discount_code (id, code, description) VALUES( 1,'1','Air Bags for both front seat occupants.' );
INSERT INTO pa_passive_restraint_discount_code VALUES( 2,'2','Air Bag for the driver only — No passenger belt passive restraint.' );
INSERT INTO pa_passive_restraint_discount_code VALUES( 3,'3','Air Bag for the driver only — With passenger belt passive restraint.' );
INSERT INTO pa_passive_restraint_discount_code VALUES( 4,'4','Belt Passive Restraint System for both front seat occupants.' );
INSERT INTO pa_passive_restraint_discount_code VALUES( 5,'5','Belt Passive Restraint System for the driver only.' );
INSERT INTO pa_passive_restraint_discount_code VALUES( 6,'6','Vehicles with No Passive Restraint System.' );
INSERT INTO pa_passive_restraint_discount_code VALUES( 7,'9','Not Applicable' );
END IF;

END $$;