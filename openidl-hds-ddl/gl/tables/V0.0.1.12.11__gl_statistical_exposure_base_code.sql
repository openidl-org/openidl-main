
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_statistical_exposure_base_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_statistical_exposure_base_code) THEN 
    INSERT INTO gl_statistical_exposure_base_code VALUES(1,'0','Does Not Apply');
    INSERT INTO gl_statistical_exposure_base_code VALUES(2,'1','Units or each');
    INSERT INTO gl_statistical_exposure_base_code VALUES(3,'2','Per 100');
    INSERT INTO gl_statistical_exposure_base_code VALUES(4,'3','Per 1,000');
    INSERT INTO gl_statistical_exposure_base_code VALUES(5,'4','Per 10,000');
    INSERT INTO gl_statistical_exposure_base_code VALUES(6,'5','Per 100,000');
    INSERT INTO gl_statistical_exposure_base_code VALUES(7,'6','Per 1,000,000');
    INSERT INTO gl_statistical_exposure_base_code VALUES(8,'9','All other');
END IF;
END $$;
