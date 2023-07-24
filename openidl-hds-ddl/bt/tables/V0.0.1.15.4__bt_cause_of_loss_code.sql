
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_cause_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_cause_of_loss_code) THEN 
    INSERT INTO bt_cause_of_loss_code VALUES(1,'10','Glass Breakage');
    INSERT INTO bt_cause_of_loss_code VALUES(2,'11','Hail');
    INSERT INTO bt_cause_of_loss_code VALUES(3,'12','Lightning');
    INSERT INTO bt_cause_of_loss_code VALUES(4,'16','Riot & Civil Commotion');
    INSERT INTO bt_cause_of_loss_code VALUES(5,'17','Smoke');
    INSERT INTO bt_cause_of_loss_code VALUES(6,'21','Vandalism and Malicious Mischief');
    INSERT INTO bt_cause_of_loss_code VALUES(7,'24','Wind');
    INSERT INTO bt_cause_of_loss_code VALUES(8,'25','All Other Physical Damage');
    INSERT INTO bt_cause_of_loss_code VALUES(9,'29','All Liability');
    INSERT INTO bt_cause_of_loss_code VALUES(10,'50','Capsizing/Swamping');
    INSERT INTO bt_cause_of_loss_code VALUES(11,'51','Collision In Water');
    INSERT INTO bt_cause_of_loss_code VALUES(12,'52','Grounding');
    INSERT INTO bt_cause_of_loss_code VALUES(13,'53','Hauling');
    INSERT INTO bt_cause_of_loss_code VALUES(14,'54','Launching/Landing');
    INSERT INTO bt_cause_of_loss_code VALUES(15,'55','Sinking');
    INSERT INTO bt_cause_of_loss_code VALUES(16,'56','Stranding');
    INSERT INTO bt_cause_of_loss_code VALUES(17,'57','Theft Of Boat/Yacht');
    INSERT INTO bt_cause_of_loss_code VALUES(18,'58','Theft Of Equipment');
    INSERT INTO bt_cause_of_loss_code VALUES(19,'59','Theft Of Motor');
    INSERT INTO bt_cause_of_loss_code VALUES(20,'60','Theft Of Personal Property');
    INSERT INTO bt_cause_of_loss_code VALUES(21,'61','Theft Of Trailer');
    INSERT INTO bt_cause_of_loss_code VALUES(22,'01','Aircraft');
    INSERT INTO bt_cause_of_loss_code VALUES(23,'02','Breakage');
    INSERT INTO bt_cause_of_loss_code VALUES(24,'03','Collision Out Of Water');
    INSERT INTO bt_cause_of_loss_code VALUES(25,'05','Earthquake or Landslide');
    INSERT INTO bt_cause_of_loss_code VALUES(26,'06','Explosion');
    INSERT INTO bt_cause_of_loss_code VALUES(27,'07','Fire');
    INSERT INTO bt_cause_of_loss_code VALUES(28,'08','Flooding');
    INSERT INTO bt_cause_of_loss_code VALUES(29,'09','Freezing');
END IF;
END $$;
