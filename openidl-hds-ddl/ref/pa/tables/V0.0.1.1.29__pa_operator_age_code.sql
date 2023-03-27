
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_operator_age_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_operator_age_code) THEN 
    INSERT INTO pa_operator_age_code VALUES(1,'0','Multi-car risk - Specific operator not assigned to this automobile');
    INSERT INTO pa_operator_age_code VALUES(2,'1','17 and Under');
    INSERT INTO pa_operator_age_code VALUES(3,'2','18');
    INSERT INTO pa_operator_age_code VALUES(4,'3','19');
    INSERT INTO pa_operator_age_code VALUES(5,'4','20');
    INSERT INTO pa_operator_age_code VALUES(6,'5','21 - 24');
    INSERT INTO pa_operator_age_code VALUES(7,'6','25 - 29');
    INSERT INTO pa_operator_age_code VALUES(8,'7','30 - 54');
    INSERT INTO pa_operator_age_code VALUES(9,'8','55 - 64');
    INSERT INTO pa_operator_age_code VALUES(10,'9','65 and over');
END IF;
END $$;
