
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_named_storm_deductible_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_named_storm_deductible_code) THEN 
    INSERT INTO bt_named_storm_deductible_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO bt_named_storm_deductible_code VALUES(2,'1','1%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(3,'2','2%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(4,'3','3%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(5,'4','4%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(6,'5','5%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(7,'6','10%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(8,'7','15%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(9,'8','20%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(10,'9','All Other','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(11,'A','$250','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(12,'B','$500','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(13,'C','$750','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(14,'D','$1,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(15,'E','$2,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(16,'F','$2,500','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(17,'G','$5,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(18,'H','$10,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(19,'J','All Other','Flat Named Storm Deductible Amounts');
END IF;
END $$;
