
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fp_risk_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fp_risk_type_code) THEN 
    INSERT INTO fp_risk_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO fp_risk_type_code VALUES(2,'1','Type 1');
    INSERT INTO fp_risk_type_code VALUES(3,'2','Type 2');
    INSERT INTO fp_risk_type_code VALUES(4,'3','Type 3');
END IF;
END $$;
