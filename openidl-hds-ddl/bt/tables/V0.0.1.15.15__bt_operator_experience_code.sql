
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_operator_experience_code (
    id INT,
    code VARCHAR,
    years_of_experience VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_operator_experience_code) THEN 
    INSERT INTO bt_operator_experience_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_operator_experience_code VALUES(2,'1','0-1');
    INSERT INTO bt_operator_experience_code VALUES(3,'2','1-2');
    INSERT INTO bt_operator_experience_code VALUES(4,'3','2-3');
    INSERT INTO bt_operator_experience_code VALUES(5,'4','3-4');
    INSERT INTO bt_operator_experience_code VALUES(6,'5','4-5');
    INSERT INTO bt_operator_experience_code VALUES(7,'9','5+');
END IF;
END $$;
