
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_fire_protection_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_fire_protection_code) THEN 
    INSERT INTO mho_fire_protection_code VALUES(1,'10','10','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(2,'15','9E - North Carolina Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(3,'19','8B - In States Where Applicable','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(4,'21','Fully Protected, Unless Using a Refined Code','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(5,'22','Partially Protected','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(6,'23','Unprotected','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(7,'40','Puerto Rico','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(8,'51','Protected 1 (P1)','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(9,'52','Protected 2 (P2)','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(10,'53','Protected 3 (P3)','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(11,'54','Protected 4 (P4)','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(12,'55','Protected 5 (P5)','Simplified Fire Protection','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(13,'65','9A - Washington Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(14,'79','9S - North Carolina Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(15,'80','8A - Washington Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(16,'99','New York City - New York Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(17,'00','Does Not Apply','N/A','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(18,'01','1','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(19,'02','2','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(20,'03','3','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(21,'04','4','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(22,'05','5','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(23,'06','6','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(24,'07','7','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(25,'08','8','Fire Protection Grading System','Fire Protection');
    INSERT INTO mho_fire_protection_code VALUES(26,'09','9','Fire Protection Grading System','Fire Protection');
END IF;
END $$;
