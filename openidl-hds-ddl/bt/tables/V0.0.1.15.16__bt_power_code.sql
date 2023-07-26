
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_power_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_power_code) THEN 
    INSERT INTO bt_power_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_power_code VALUES(2,'1','Inboard');
    INSERT INTO bt_power_code VALUES(3,'2','Outboard');
    INSERT INTO bt_power_code VALUES(4,'3','Inboard/Outdrive');
    INSERT INTO bt_power_code VALUES(5,'4','Jet propelled or water jet propelled (e.g., jet skis, wave runners)');
    INSERT INTO bt_power_code VALUES(6,'5','Sail with auxiliary power');
    INSERT INTO bt_power_code VALUES(7,'6','Sail without auxiliary power');
    INSERT INTO bt_power_code VALUES(8,'9','All Other');
END IF;
END $$;
