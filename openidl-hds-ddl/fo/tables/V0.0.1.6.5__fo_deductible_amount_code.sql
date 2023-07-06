
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_deductible_amount_code) THEN 
    INSERT INTO fo_deductible_amount_code VALUES(1,'41','None ($0)','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(2,'42','$50','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(3,'43','100','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(4,'44','101 - 199','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(5,'45','200 - 249','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(6,'46','250','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(7,'47','500','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(8,'49','750','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(9,'51','1,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(10,'53','1,500','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(11,'54','2,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(12,'55','2,500','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(13,'59','3,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(14,'61','4,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(15,'63','5,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(16,'65','7,500','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(17,'67','10,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(18,'68','12,500','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(19,'69','15,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(20,'70','20,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(21,'71','25,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(22,'75','50,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(23,'79','75,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(24,'99','Over 75,000','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(25,'00','Does Not Apply','Flat');
    INSERT INTO fo_deductible_amount_code VALUES(26,'10','10%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(27,'15','15%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(28,'20','20%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(29,'25','25%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(30,'30','30%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(31,'35','35%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(32,'99','Over 35%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(33,'01','1%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(34,'02','2%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(35,'03','3%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(36,'04','4%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(37,'05','5%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(38,'06','6%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(39,'07','7%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(40,'08','8%','Percentage');
    INSERT INTO fo_deductible_amount_code VALUES(41,'09','9%','Percentage');
END IF;
END $$;
