
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_rating_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_rating_identification_code) THEN 
    INSERT INTO gl_rating_identification_code VALUES(1,'1','Class Rated');
    INSERT INTO gl_rating_identification_code VALUES(2,'4','Experience or Schedule Rated');
    INSERT INTO gl_rating_identification_code VALUES(3,'5','Composite Rated');
    INSERT INTO gl_rating_identification_code VALUES(4,'9','All Other');
END IF;
END $$;
