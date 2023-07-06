
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_rate_group_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_rate_group_code) THEN 
    INSERT INTO cr_rate_group_code VALUES(1,'10','10');
    INSERT INTO cr_rate_group_code VALUES(2,'00','Does not apply');
    INSERT INTO cr_rate_group_code VALUES(3,'01','1');
    INSERT INTO cr_rate_group_code VALUES(4,'02','2');
    INSERT INTO cr_rate_group_code VALUES(5,'03','3');
    INSERT INTO cr_rate_group_code VALUES(6,'04','4');
    INSERT INTO cr_rate_group_code VALUES(7,'05','5');
    INSERT INTO cr_rate_group_code VALUES(8,'06','6');
    INSERT INTO cr_rate_group_code VALUES(9,'07','7');
    INSERT INTO cr_rate_group_code VALUES(10,'08','8');
    INSERT INTO cr_rate_group_code VALUES(11,'09','9');
END IF;
END $$;
