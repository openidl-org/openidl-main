
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_cause_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_cause_of_loss_code) THEN 
    INSERT INTO im_cause_of_loss_code VALUES(1,'10','Glass Breakage');
    INSERT INTO im_cause_of_loss_code VALUES(2,'11','Hail');
    INSERT INTO im_cause_of_loss_code VALUES(3,'12','Lightning');
    INSERT INTO im_cause_of_loss_code VALUES(4,'13','Mysterious Disappearance - on Premises');
    INSERT INTO im_cause_of_loss_code VALUES(5,'14','Mysterious Disappearance - off Premises');
    INSERT INTO im_cause_of_loss_code VALUES(6,'16','Riot and Civil Commotion');
    INSERT INTO im_cause_of_loss_code VALUES(7,'17','Smoke - Not From a Woodburning Stove');
    INSERT INTO im_cause_of_loss_code VALUES(8,'18','Theft - From Auto');
    INSERT INTO im_cause_of_loss_code VALUES(9,'19','Theft - On Premises');
    INSERT INTO im_cause_of_loss_code VALUES(10,'20','Theft - Off Premises');
    INSERT INTO im_cause_of_loss_code VALUES(11,'21','Vandalism');
    INSERT INTO im_cause_of_loss_code VALUES(12,'22','Vehicles');
    INSERT INTO im_cause_of_loss_code VALUES(13,'23','Sewer Back Up');
    INSERT INTO im_cause_of_loss_code VALUES(14,'24','Windstorm');
    INSERT INTO im_cause_of_loss_code VALUES(15,'25','All Other Physical Damage');
    INSERT INTO im_cause_of_loss_code VALUES(16,'32','Collapse, Other than Sinkhole');
    INSERT INTO im_cause_of_loss_code VALUES(17,'33','Fire - From a Woodburning Stove');
    INSERT INTO im_cause_of_loss_code VALUES(18,'34','Smoke - From a Woodburning Stove');
    INSERT INTO im_cause_of_loss_code VALUES(19,'37','Sinkhole Collapse');
    INSERT INTO im_cause_of_loss_code VALUES(20,'38','Volcanic Action');
    INSERT INTO im_cause_of_loss_code VALUES(21,'40','Power Surge, Including Brownouts and Blackouts');
    INSERT INTO im_cause_of_loss_code VALUES(22,'41','Weight of Ice, Snow, or Sleet');
    INSERT INTO im_cause_of_loss_code VALUES(23,'44','Mold (Property Related)');
    INSERT INTO im_cause_of_loss_code VALUES(24,'70','Burglary or Robbery - on Premises');
    INSERT INTO im_cause_of_loss_code VALUES(25,'71','Burglary of Robbery - off Premises');
    INSERT INTO im_cause_of_loss_code VALUES(26,'72','Loading and Unloading');
    INSERT INTO im_cause_of_loss_code VALUES(27,'73','Marine Perils, Including General Average and Salvage Charges');
    INSERT INTO im_cause_of_loss_code VALUES(28,'74','Non-Delivery');
    INSERT INTO im_cause_of_loss_code VALUES(29,'75','Protection Indemnity');
    INSERT INTO im_cause_of_loss_code VALUES(30,'76','Sprinkler Leakage');
    INSERT INTO im_cause_of_loss_code VALUES(31,'01','Aircraft');
    INSERT INTO im_cause_of_loss_code VALUES(32,'02','Breakage');
    INSERT INTO im_cause_of_loss_code VALUES(33,'03','Collision, Including Upset / Overturn');
    INSERT INTO im_cause_of_loss_code VALUES(34,'04','Credit Card');
    INSERT INTO im_cause_of_loss_code VALUES(35,'05','Earthquake');
    INSERT INTO im_cause_of_loss_code VALUES(36,'06','Explosion');
    INSERT INTO im_cause_of_loss_code VALUES(37,'07','Fire - Not from a Woodburning Stove');
    INSERT INTO im_cause_of_loss_code VALUES(38,'08','Flood');
    INSERT INTO im_cause_of_loss_code VALUES(39,'09','Freezing');
END IF;
END $$;
