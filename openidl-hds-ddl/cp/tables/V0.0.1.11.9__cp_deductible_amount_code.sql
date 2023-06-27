
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_deductible_amount_code) THEN 
    INSERT INTO cp_deductible_amount_code VALUES(1,'10','10%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(2,'15','15%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(3,'20','20%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(4,'25','25%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(5,'30','30%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(6,'35','35%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(7,'41','None ($0)','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(8,'42','$50','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(9,'43','$100','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(10,'44','$101 - $199','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(11,'45','$200 - $249','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(12,'46','$250','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(13,'47','$500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(14,'49','$750','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(15,'51','$1,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(16,'53','$1,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(17,'55','$2,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(18,'59','$3,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(19,'63','$5,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(20,'65','$7,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(21,'67','$10,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(22,'68','$12,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(23,'69','$15,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(24,'70','$20,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(25,'71','$25,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(26,'75','$50,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(27,'79','$75,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(28,'81','$100,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(29,'99','Over $100,000 / Over 35%','Flat and Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(30,'00','Does Not Apply','Does Not Apply');
    INSERT INTO cp_deductible_amount_code VALUES(31,'01','1%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(32,'02','2%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(33,'03','3%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(34,'04','4%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(35,'05','5%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(36,'06','6%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(37,'07','7%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(38,'08','8%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(39,'09','9%','Percentage');
END IF;
END $$;
