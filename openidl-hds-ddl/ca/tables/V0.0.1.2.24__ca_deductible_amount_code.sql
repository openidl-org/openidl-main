
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_deductible_amount_code) THEN 
    INSERT INTO ca_deductible_amount_code VALUES(1,'0','No Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(2,'1','$50 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(3,'2','$100 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(4,'3','$200 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(5,'4','$250 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(6,'5','$500 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(7,'6','$1,000 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(8,'7','$1,500 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(9,'8','$2,000 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(10,'9','All Other');
    INSERT INTO ca_deductible_amount_code VALUES(11,'A','$25 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(12,'B','$150 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(13,'C','$300 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(14,'D','$750 Deductible');
END IF;
END $$;
