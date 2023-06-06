
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_penalty_points_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_penalty_points_code) THEN 
    INSERT INTO pa_penalty_points_code VALUES(1,'0','0');
    INSERT INTO pa_penalty_points_code VALUES(2,'1','1');
    INSERT INTO pa_penalty_points_code VALUES(3,'2','2');
    INSERT INTO pa_penalty_points_code VALUES(4,'3','3');
    INSERT INTO pa_penalty_points_code VALUES(5,'4','4');
    INSERT INTO pa_penalty_points_code VALUES(6,'5','5');
    INSERT INTO pa_penalty_points_code VALUES(7,'6','6');
    INSERT INTO pa_penalty_points_code VALUES(8,'7','7 or more');
    INSERT INTO pa_penalty_points_code VALUES(9,'8','Inexperienced driver (less than 3 years), but accident and conviction free');
END IF;
END $$;
