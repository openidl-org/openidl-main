
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_experienced_rating_modification_factor_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_experienced_rating_modification_factor_code) THEN 
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(1,'100','None');
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(2,'090','.900');
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(3,'067','.665');
END IF;
END $$;
