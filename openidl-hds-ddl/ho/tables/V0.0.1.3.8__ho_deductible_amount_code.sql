
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_deductible_amount_code) THEN 
    INSERT INTO ho_deductible_amount_code VALUES(1,'10','10%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(2,'15','15%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(3,'20','20%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(4,'25','25%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(5,'30','30%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(6,'35','35%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(7,'41','None ($0)','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(8,'42','$50','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(9,'43','100','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(10,'44','101 - 199','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(11,'45','200 - 249','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(12,'46','250','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(13,'47','500','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(14,'49','750','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(15,'50','50%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(16,'51','1,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(17,'53','1,500','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(18,'54','2,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(19,'55','2,500','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(20,'59','3,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(21,'61','4,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(22,'63','5,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(23,'65','7,500','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(24,'67','10,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(25,'68','12,500','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(26,'69','15,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(27,'70','20,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(28,'71','25,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(29,'75','50,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(30,'79','75,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(31,'81','100,000','Flat');
    INSERT INTO ho_deductible_amount_code VALUES(32,'99','Over 100,000 / Over 50%','Flat and Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(33,'00','Does Not Apply','Flat and Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(34,'01','1%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(35,'02','2%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(36,'03','3%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(37,'04','4%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(38,'05','5%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(39,'06','6%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(40,'07','7%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(41,'08','8%','Percentage');
    INSERT INTO ho_deductible_amount_code VALUES(42,'09','9%','Percentage');
END IF;
END $$;
