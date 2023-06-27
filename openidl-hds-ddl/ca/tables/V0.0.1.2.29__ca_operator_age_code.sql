
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_operator_age_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_operator_age_code) THEN 
    INSERT INTO ca_operator_age_code VALUES(1,'0','Not applicable to Commercial Automobile policies');
    INSERT INTO ca_operator_age_code VALUES(2,'1','17 and Under');
    INSERT INTO ca_operator_age_code VALUES(3,'2','18');
    INSERT INTO ca_operator_age_code VALUES(4,'3','19');
    INSERT INTO ca_operator_age_code VALUES(5,'4','20');
    INSERT INTO ca_operator_age_code VALUES(6,'5','21 - 24');
    INSERT INTO ca_operator_age_code VALUES(7,'6','25 - 29');
    INSERT INTO ca_operator_age_code VALUES(8,'7','30 - 54');
    INSERT INTO ca_operator_age_code VALUES(9,'8','55 - 64');
    INSERT INTO ca_operator_age_code VALUES(10,'9','65 and over');
END IF;
END $$;
