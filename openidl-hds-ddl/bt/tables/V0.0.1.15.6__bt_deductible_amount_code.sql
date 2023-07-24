
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_deductible_amount_code (
    id INT,
    code VARCHAR,
    flat_ded_amount VARCHAR,
    split_ded_amount VARCHAR,
    percentage_deductible VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_deductible_amount_code) THEN 
    INSERT INTO bt_deductible_amount_code VALUES(1,'0','Does Not Apply','Does Not Apply','Does Not Apply');
    INSERT INTO bt_deductible_amount_code VALUES(2,'1','None','None','0%');
    INSERT INTO bt_deductible_amount_code VALUES(3,'2','$50','-------','1%');
    INSERT INTO bt_deductible_amount_code VALUES(4,'3','$100','$50 / 100','2%');
    INSERT INTO bt_deductible_amount_code VALUES(5,'4','$250','$100 / 250','3%');
    INSERT INTO bt_deductible_amount_code VALUES(6,'5','$500','$100 / 500','5%');
    INSERT INTO bt_deductible_amount_code VALUES(7,'6','$1,000','$100 / 1,000','10%');
    INSERT INTO bt_deductible_amount_code VALUES(8,'7','$101-199','-------','-------');
    INSERT INTO bt_deductible_amount_code VALUES(9,'8','$200-249','-------','-------');
    INSERT INTO bt_deductible_amount_code VALUES(10,'9','All Other','All Other','All Other');
    INSERT INTO bt_deductible_amount_code VALUES(11,'A','$2,500','$250 / 2,500','-------');
    INSERT INTO bt_deductible_amount_code VALUES(12,'B','$5,000','$250 / 5,000','-------');
    INSERT INTO bt_deductible_amount_code VALUES(13,'C','------','$500 / 1%','-------');
    INSERT INTO bt_deductible_amount_code VALUES(14,'D','------','$500 / 2%','-------');
    INSERT INTO bt_deductible_amount_code VALUES(15,'E','------','$500 / 3%','-------');
END IF;
END $$;
