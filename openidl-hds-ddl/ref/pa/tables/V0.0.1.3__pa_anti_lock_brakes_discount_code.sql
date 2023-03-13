DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_anti_lock_brakes_discount_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_anti_lock_brakes_discount_code) THEN 
INSERT INTO pa_anti_lock_brakes_discount_code (id, code, description) VALUES( 1,'1','Anti-Lock Braking System discount applied to this coverage.' );
INSERT INTO pa_anti_lock_brakes_discount_code VALUES( 2,'2','Program offers an Anti-Lock Braking System discount on this coverage, but the vehicle does not qualify for the discount.' );
INSERT INTO pa_anti_lock_brakes_discount_code VALUES( 3,'9','Not Applicable - Program does not offer an Anti-Lock Braking System discount on this coverage.' );
END IF;

END $$;