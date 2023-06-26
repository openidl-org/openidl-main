
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_rating_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_rating_identification_code) THEN 
    INSERT INTO cp_rating_identification_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_rating_identification_code VALUES(2,'1','Class rated');
    INSERT INTO cp_rating_identification_code VALUES(3,'2','Class rated on a combined/blanket basis');
    INSERT INTO cp_rating_identification_code VALUES(4,'3','Specifically or schedule rated');
END IF;
END $$;
