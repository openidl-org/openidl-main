
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fp_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fp_deductible_amount_code) THEN 
    INSERT INTO fp_deductible_amount_code VALUES(1,'10','10%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(2,'15','15%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(3,'20','20%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(4,'25','25%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(5,'30','30%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(6,'35','35%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(7,'41','None ($0)','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(8,'42','$50','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(9,'43','$100','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(10,'44','$101 - $199','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(11,'45','$200 - $249','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(12,'46','$250','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(13,'47','$500','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(14,'49','$750','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(15,'51','$1,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(16,'53','$1,500','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(17,'54','$2,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(18,'55','$2,500','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(19,'59','$3,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(20,'61','$4,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(21,'63','$5,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(22,'65','$7,500','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(23,'67','$10,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(24,'68','$12,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(25,'69','$15,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(26,'70','$20,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(27,'71','$25,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(28,'75','$50,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(29,'79','$75,000','Flat');
    INSERT INTO fp_deductible_amount_code VALUES(30,'99','Over 75,000 / Over 35%','Flat and Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(31,'00','Does Not Apply','Does Not Apply');
    INSERT INTO fp_deductible_amount_code VALUES(32,'01','1%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(33,'02','2%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(34,'03','3%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(35,'04','4%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(36,'05','5%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(37,'06','6%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(38,'07','7%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(39,'08','8%','Percentage');
    INSERT INTO fp_deductible_amount_code VALUES(40,'09','9%','Percentage');
END IF;
END $$;
