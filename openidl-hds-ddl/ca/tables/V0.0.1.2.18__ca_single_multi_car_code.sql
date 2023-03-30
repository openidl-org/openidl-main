
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_single_multi_car_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_single_multi_car_code) THEN 
    INSERT INTO ca_single_multi_car_code VALUES(1,'1','Single Car Rated');
    INSERT INTO ca_single_multi_car_code VALUES(2,'2','Multi-Car Rated');
    INSERT INTO ca_single_multi_car_code VALUES(3,'9','Not Applicable');
END IF;
END $$;
