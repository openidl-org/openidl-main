
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_cause_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_cause_of_loss_code) THEN 
    INSERT INTO cp_cause_of_loss_code VALUES(1,'10','Glass breakage');
    INSERT INTO cp_cause_of_loss_code VALUES(2,'11','Hail');
    INSERT INTO cp_cause_of_loss_code VALUES(3,'12','Lightning');
    INSERT INTO cp_cause_of_loss_code VALUES(4,'16','Riot and civil commotion');
    INSERT INTO cp_cause_of_loss_code VALUES(5,'17','Smoke - Not from a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(6,'18','Theft - From auto');
    INSERT INTO cp_cause_of_loss_code VALUES(7,'19','Theft - On premises');
    INSERT INTO cp_cause_of_loss_code VALUES(8,'20','Theft - Off premises');
    INSERT INTO cp_cause_of_loss_code VALUES(9,'21','Vandalism');
    INSERT INTO cp_cause_of_loss_code VALUES(10,'22','Vehicles');
    INSERT INTO cp_cause_of_loss_code VALUES(11,'23','Sewer back up / Water damage');
    INSERT INTO cp_cause_of_loss_code VALUES(12,'24','Windstorm');
    INSERT INTO cp_cause_of_loss_code VALUES(13,'25','All other physical damage');
    INSERT INTO cp_cause_of_loss_code VALUES(14,'32','Collapse, other than sinkhole');
    INSERT INTO cp_cause_of_loss_code VALUES(15,'33','Fire - From a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(16,'34','Smoke - From a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(17,'37','Sinkhole collapse');
    INSERT INTO cp_cause_of_loss_code VALUES(18,'38','Volcanic action');
    INSERT INTO cp_cause_of_loss_code VALUES(19,'40','Power surge, including brownouts and blackouts');
    INSERT INTO cp_cause_of_loss_code VALUES(20,'41','Weight of ice, snow, or sleet');
    INSERT INTO cp_cause_of_loss_code VALUES(21,'42','Electrical breakdown');
    INSERT INTO cp_cause_of_loss_code VALUES(22,'43','Heating spontaneous');
    INSERT INTO cp_cause_of_loss_code VALUES(23,'44','Mold (property related)');
    INSERT INTO cp_cause_of_loss_code VALUES(24,'76','Sprinkler leakage');
    INSERT INTO cp_cause_of_loss_code VALUES(25,'77','Ice Dam');
    INSERT INTO cp_cause_of_loss_code VALUES(26,'01','Aircraft');
    INSERT INTO cp_cause_of_loss_code VALUES(27,'02','Breakage');
    INSERT INTO cp_cause_of_loss_code VALUES(28,'03','Collision, incl. upset/overturn');
    INSERT INTO cp_cause_of_loss_code VALUES(29,'04','Credit card');
    INSERT INTO cp_cause_of_loss_code VALUES(30,'05','Earthquake');
    INSERT INTO cp_cause_of_loss_code VALUES(31,'06','Explosion');
    INSERT INTO cp_cause_of_loss_code VALUES(32,'07','Fire - Not from a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(33,'08','Flood');
    INSERT INTO cp_cause_of_loss_code VALUES(34,'09','Freezing');
END IF;
END $$;
