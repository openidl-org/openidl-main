
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_experienced_rating_modification_factor_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_experienced_rating_modification_factor_code) THEN 
    INSERT INTO pa_experienced_rating_modification_factor_code VALUES(1,'100','None');
    INSERT INTO pa_experienced_rating_modification_factor_code VALUES(2,'090','.900');
    INSERT INTO pa_experienced_rating_modification_factor_code VALUES(3,'067','.665');
END IF;
END $$;
