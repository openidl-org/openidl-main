
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_exposure_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM dp_exposure_code) THEN 
    INSERT INTO dp_exposure_code VALUES(1,'11','1 - Report each dwelling as a separate record.');
    INSERT INTO dp_exposure_code VALUES(2,'12','1');
    INSERT INTO dp_exposure_code VALUES(3,'13','1 - Report each dwelling as a separate record.');
    INSERT INTO dp_exposure_code VALUES(4,'14','1 - See PART C - GENERAL CODING INSTRUCTIONS for the rules regarding summarization.');
    INSERT INTO dp_exposure_code VALUES(5,'15','1');
    INSERT INTO dp_exposure_code VALUES(6,'16','1');
    INSERT INTO dp_exposure_code VALUES(7,'17','1 - Report each dwelling as a separate record.');
    INSERT INTO dp_exposure_code VALUES(8,'99','1');
    INSERT INTO dp_exposure_code VALUES(9,'00','For Major Peril code 60, code the number of endorsements covered by the premium transaction. For Major Peril codes 62 and 70, the Exposure count is always 1.');
END IF;
END $$;
