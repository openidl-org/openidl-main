
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nj_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31');

IF NOT EXISTS (SELECT * FROM ca_nj_deductible_code) THEN 
    INSERT INTO ca_nj_deductible_code VALUES(1,'2','$500');
    INSERT INTO ca_nj_deductible_code VALUES(2,'3','$1000');
    INSERT INTO ca_nj_deductible_code VALUES(3,'4','$2500');
    INSERT INTO ca_nj_deductible_code VALUES(4,'5','$250');
    INSERT INTO ca_nj_deductible_code VALUES(5,'9','All Other');
END IF;
END $$;
