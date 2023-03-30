
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_single_multi_car_code (
    id INT,
    code VARCHAR,
    description VARCHAR,    
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_single_multi_car_code) THEN 
    INSERT INTO pa_single_multi_car_code VALUES(1,'1','Single Car Rated');
    INSERT INTO pa_single_multi_car_code VALUES(2,'2','Multi-Car Rated');
    INSERT INTO pa_single_multi_car_code VALUES(3,'9','Not Applicable');
END IF;
END $$;
