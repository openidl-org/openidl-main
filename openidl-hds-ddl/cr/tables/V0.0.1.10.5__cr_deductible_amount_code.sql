
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_deductible_amount_code) THEN 
    INSERT INTO cr_deductible_amount_code VALUES(1,'41','None ($0)','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(2,'42','$50','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(3,'43','100','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(4,'44','101 - 199','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(5,'45','200 - 249','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(6,'46','250','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(7,'47','500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(8,'49','750','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(9,'51','1,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(10,'53','1,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(11,'54','2,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(12,'55','2,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(13,'59','3,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(14,'63','5,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(15,'65','7,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(16,'67','10,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(17,'68','12,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(18,'69','15,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(19,'70','20,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(20,'71','25,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(21,'75','50,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(22,'79','75,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(23,'81','100,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(24,'99','Over 100,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(25,'00','Does Not Apply','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(26,'10','10%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(27,'15','15%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(28,'20','20%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(29,'25','25%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(30,'30','30%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(31,'35','35%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(32,'50','50%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(33,'99','Over 50%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(34,'00','Does Not Apply','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(35,'01','1%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(36,'02','2%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(37,'03','3%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(38,'04','4%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(39,'05','5%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(40,'06','6%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(41,'07','7%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(42,'08','8%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(43,'09','9%','Percentage');
END IF;
END $$;
