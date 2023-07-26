
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_fuel_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_fuel_type_code) THEN 
    INSERT INTO bt_fuel_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_fuel_type_code VALUES(2,'1','Gasoline');
    INSERT INTO bt_fuel_type_code VALUES(3,'2','Diesel');
    INSERT INTO bt_fuel_type_code VALUES(4,'9','All Other');
END IF;
END $$;
