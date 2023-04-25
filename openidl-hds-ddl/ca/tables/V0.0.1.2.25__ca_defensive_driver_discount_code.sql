
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_defensive_driver_discount_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_defensive_driver_discount_code) THEN 
    INSERT INTO ca_defensive_driver_discount_code VALUES(1,'1','Defensive driver discount applied to this coverage.');
    INSERT INTO ca_defensive_driver_discount_code VALUES(2,'2','Driver does not qualify for the defensive driver discount available on this coverage.');
    INSERT INTO ca_defensive_driver_discount_code VALUES(3,'9','Not Applicable - Program does not offer a defensive driver discount on this coverage.');
END IF;
END $$;
