
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS state_code (
    id INT,
    abbreviation VARCHAR,
    code VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM state_code) THEN 
    INSERT INTO state_code VALUES(1,'AL','01');
    INSERT INTO state_code VALUES(2,'AZ','02');
    INSERT INTO state_code VALUES(3,'AR','03');
    INSERT INTO state_code VALUES(4,'CA','04');
    INSERT INTO state_code VALUES(5,'CO','05');
    INSERT INTO state_code VALUES(6,'CT','06');
    INSERT INTO state_code VALUES(7,'DE','07');
    INSERT INTO state_code VALUES(8,'DC','08');
    INSERT INTO state_code VALUES(9,'FL','09');
    INSERT INTO state_code VALUES(10,'GA','10');
    INSERT INTO state_code VALUES(11,'ID','11');
    INSERT INTO state_code VALUES(12,'IL','12');
    INSERT INTO state_code VALUES(13,'IN','13');
    INSERT INTO state_code VALUES(14,'IA','14');
    INSERT INTO state_code VALUES(15,'KS','15');
    INSERT INTO state_code VALUES(16,'KY','16');
    INSERT INTO state_code VALUES(17,'LA','17');
    INSERT INTO state_code VALUES(18,'ME','18');
    INSERT INTO state_code VALUES(19,'MD','19');
    INSERT INTO state_code VALUES(20,'MA','20');
    INSERT INTO state_code VALUES(21,'MI','21');
    INSERT INTO state_code VALUES(22,'MN','22');
    INSERT INTO state_code VALUES(23,'MS','23');
    INSERT INTO state_code VALUES(24,'MO','24');
    INSERT INTO state_code VALUES(25,'MT','25');
    INSERT INTO state_code VALUES(26,'NE','26');
    INSERT INTO state_code VALUES(27,'NV','27');
    INSERT INTO state_code VALUES(28,'NH','28');
    INSERT INTO state_code VALUES(29,'NJ','29');
    INSERT INTO state_code VALUES(30,'NM','30');
    INSERT INTO state_code VALUES(31,'NY','31');
    INSERT INTO state_code VALUES(32,'NC','32');
    INSERT INTO state_code VALUES(33,'ND','33');
    INSERT INTO state_code VALUES(34,'OH','34');
    INSERT INTO state_code VALUES(35,'OK','35');
    INSERT INTO state_code VALUES(36,'OR','36');
    INSERT INTO state_code VALUES(37,'PA','37');
    INSERT INTO state_code VALUES(38,'RI','38');
    INSERT INTO state_code VALUES(39,'SC','39');
    INSERT INTO state_code VALUES(40,'SD','40');
    INSERT INTO state_code VALUES(41,'TN','41');
    INSERT INTO state_code VALUES(42,'TX','42');
    INSERT INTO state_code VALUES(43,'UT','43');
    INSERT INTO state_code VALUES(44,'VT','44');
    INSERT INTO state_code VALUES(45,'VA','45');
    INSERT INTO state_code VALUES(46,'WA','46');
    INSERT INTO state_code VALUES(47,'WV','47');
    INSERT INTO state_code VALUES(48,'WI','48');
    INSERT INTO state_code VALUES(49,'WY','49');
    INSERT INTO state_code VALUES(50,'HI','52');
    INSERT INTO state_code VALUES(51,'AK','54');
    INSERT INTO state_code VALUES(52,'PR','58');
END IF;
END $$;
