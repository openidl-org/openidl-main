
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_type_of_policy_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_type_of_policy_code) THEN 
    INSERT INTO gl_type_of_policy_code VALUES(1,'1','Occurrence Policy','Occurrence Policy');
    INSERT INTO gl_type_of_policy_code VALUES(2,'2','Basic policy - with a retroactive date','Claims made policy');
    INSERT INTO gl_type_of_policy_code VALUES(3,'3','Basic policy - no retroactive date','Claims made policy');
    INSERT INTO gl_type_of_policy_code VALUES(4,'4','Supplemental Extended Reporting Period Coverage - with a retroactive date','Claims made policy');
    INSERT INTO gl_type_of_policy_code VALUES(5,'5','Supplemental Extended Reporting Period Coverage - no retroactive date','Claims made policy');
END IF;
END $$;
