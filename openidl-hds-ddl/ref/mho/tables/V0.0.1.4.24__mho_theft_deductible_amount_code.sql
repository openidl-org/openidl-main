
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS mho_theft_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_theft_deductible_amount_code) THEN 
    INSERT INTO mho_theft_deductible_amount_code VALUES(1,'0','Does Not Apply');
    INSERT INTO mho_theft_deductible_amount_code VALUES(2,'1','$250');
    INSERT INTO mho_theft_deductible_amount_code VALUES(3,'2','$500');
    INSERT INTO mho_theft_deductible_amount_code VALUES(4,'3','$1,000');
    INSERT INTO mho_theft_deductible_amount_code VALUES(5,'4','$2,500');
    INSERT INTO mho_theft_deductible_amount_code VALUES(6,'5','$5,000');
    INSERT INTO mho_theft_deductible_amount_code VALUES(7,'9','All Other Theft Deductible Amounts');
END IF;
END $$;
