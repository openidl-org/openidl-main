
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_experienced_rating_modification_factor_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_experienced_rating_modification_factor_code) THEN 
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(1,'100','None');
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(2,'090','.900');
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(3,'067','.665');
END IF;
END $$;
