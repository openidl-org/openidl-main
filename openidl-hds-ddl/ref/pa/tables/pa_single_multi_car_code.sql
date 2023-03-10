DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_single_multi_car_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_single_multi_car_code) THEN 
INSERT INTO pa_single_multi_car_code (id, code, description) VALUES( 1,'1','Single Car Rated' );
INSERT INTO pa_single_multi_car_code VALUES( 2,'2','Multi-Car Rated' );
INSERT INTO pa_single_multi_car_code VALUES( 3,'9','Not Applicable' );
END IF;

END $$;