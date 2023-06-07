
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_ascii_lookup_code (
    id INT,
    code VARCHAR,
    digit INT,
    multiplier INT,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_ascii_lookup_code) THEN 
    INSERT INTO ca_ascii_lookup_code VALUES(1,'0',0,1);
    INSERT INTO ca_ascii_lookup_code VALUES(2,'1',1,1);
    INSERT INTO ca_ascii_lookup_code VALUES(3,'2',2,1);
    INSERT INTO ca_ascii_lookup_code VALUES(4,'3',3,1);
    INSERT INTO ca_ascii_lookup_code VALUES(5,'4',4,1);
    INSERT INTO ca_ascii_lookup_code VALUES(6,'5',5,1);
    INSERT INTO ca_ascii_lookup_code VALUES(7,'6',6,1);
    INSERT INTO ca_ascii_lookup_code VALUES(8,'7',7,1);
    INSERT INTO ca_ascii_lookup_code VALUES(9,'8',8,1);
    INSERT INTO ca_ascii_lookup_code VALUES(10,'9',9,1);
    INSERT INTO ca_ascii_lookup_code VALUES(11,'}',0,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(12,'J',1,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(13,'K',2,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(14,'L',3,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(15,'M',4,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(16,'N',5,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(17,'O',6,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(18,'P',7,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(19,'Q',8,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(20,'R',9,-1);
    INSERT INTO ca_ascii_lookup_code VALUES(21,'{',0,1);
    INSERT INTO ca_ascii_lookup_code VALUES(22,'A',1,1);
    INSERT INTO ca_ascii_lookup_code VALUES(23,'B',2,1);
    INSERT INTO ca_ascii_lookup_code VALUES(24,'C',3,1);
    INSERT INTO ca_ascii_lookup_code VALUES(25,'D',4,1);
    INSERT INTO ca_ascii_lookup_code VALUES(26,'E',5,1);
    INSERT INTO ca_ascii_lookup_code VALUES(27,'F',6,1);
    INSERT INTO ca_ascii_lookup_code VALUES(28,'G',7,1);
    INSERT INTO ca_ascii_lookup_code VALUES(29,'H',8,1);
    INSERT INTO ca_ascii_lookup_code VALUES(30,'I',9,1);
END IF;
END $$;
