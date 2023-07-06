
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_size_of_farm_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_size_of_farm_code) THEN 
    INSERT INTO fo_size_of_farm_code VALUES(1,'0','Does Not Apply');
    INSERT INTO fo_size_of_farm_code VALUES(2,'1','1 - 160 Acres');
    INSERT INTO fo_size_of_farm_code VALUES(3,'2','161 - 500 Acres');
    INSERT INTO fo_size_of_farm_code VALUES(4,'3','501 - 1,000 Acres');
    INSERT INTO fo_size_of_farm_code VALUES(5,'4','1,001 - 2,000 Acres');
    INSERT INTO fo_size_of_farm_code VALUES(6,'5','Over 2,000 Acres');
END IF;
END $$;
