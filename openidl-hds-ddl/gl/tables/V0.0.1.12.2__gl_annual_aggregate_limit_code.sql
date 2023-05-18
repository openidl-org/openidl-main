
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_annual_aggregate_limit_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_annual_aggregate_limit_code) THEN 
    INSERT INTO gl_annual_aggregate_limit_code VALUES(1,'10','500,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(2,'11','600,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(3,'12','750,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(4,'13','1,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(5,'14','1,500,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(6,'15','2,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(7,'16','2,500,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(8,'17','3,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(9,'18','5,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(10,'19','7,500,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(11,'20','10,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(12,'21','15,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(13,'22','20,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(14,'23','30,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(15,'24','50,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(16,'25','100,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(17,'31','4,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(18,'32','6,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(19,'33','8,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(20,'99','Over 100,000,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(21,'00','Does Not Apply');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(22,'01','25,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(23,'02','50,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(24,'03','75,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(25,'04','100,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(26,'05','150,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(27,'06','200,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(28,'07','250,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(29,'08','300,000');
    INSERT INTO gl_annual_aggregate_limit_code VALUES(30,'09','400,000');
END IF;
END $$;
