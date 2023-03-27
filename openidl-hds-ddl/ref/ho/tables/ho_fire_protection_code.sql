DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_fire_protection_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_fire_protection_code) THEN 
INSERT INTO ho_fire_protection_code (id, code, name, type) VALUES( 1,'00','Does Not Apply','N/A' );
INSERT INTO ho_fire_protection_code VALUES( 2,'21','Fully Protected, Unless Using a Refined Code','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 3,'51','Protected 1 (P1)','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 4,'52','Protected 2 (P2)','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 5,'53','Protected 3 (P3)','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 6,'54','Protected 4 (P4)','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 7,'55','Protected 5 (P5)','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 8,'22','Partially Protected','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 9,'23','Unprotected','Simplified Fire Protection' );
INSERT INTO ho_fire_protection_code VALUES( 10,'01','1','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 11,'02','2','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 12,'03','3','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 13,'04','4','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 14,'05','5','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 15,'06','6','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 16,'07','7','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 17,'08','8','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 18,'09','9','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 19,'10','10','Fire Protection Grading System' );
INSERT INTO ho_fire_protection_code VALUES( 20,'99','New York City - New York Only','Special Fire Protection Class Categories' );
INSERT INTO ho_fire_protection_code VALUES( 21,'15','9E - North Carolina Only','Special Fire Protection Class Categories' );
INSERT INTO ho_fire_protection_code VALUES( 22,'79','9S - North Carolina Only','Special Fire Protection Class Categories' );
INSERT INTO ho_fire_protection_code VALUES( 23,'40','Puerto Rico','Special Fire Protection Class Categories' );
INSERT INTO ho_fire_protection_code VALUES( 24,'65','9A - Washington Only','Special Fire Protection Class Categories' );
INSERT INTO ho_fire_protection_code VALUES( 25,'80','8A - Washington Only','Special Fire Protection Class Categories' );
INSERT INTO ho_fire_protection_code VALUES( 26,'19','8B - In States Where Applicable','Special Fire Protection Class Categories' );
END IF;

END $$;