
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_protective_device_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_protective_device_code) THEN 
    INSERT INTO cr_protective_device_code VALUES(1,'0','None or Does not apply');
    INSERT INTO cr_protective_device_code VALUES(2,'1','Watchman - Signals to central station or police station');
    INSERT INTO cr_protective_device_code VALUES(3,'2','Watchman - Other');
    INSERT INTO cr_protective_device_code VALUES(4,'3','Burglary alarm system - Signals to central station');
    INSERT INTO cr_protective_device_code VALUES(5,'4','Burglary alarm system - Other');
    INSERT INTO cr_protective_device_code VALUES(6,'9','All other');
END IF;
END $$;
