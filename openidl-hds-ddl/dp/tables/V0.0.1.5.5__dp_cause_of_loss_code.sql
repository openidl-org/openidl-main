
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_cause_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM dp_cause_of_loss_code) THEN 
    INSERT INTO dp_cause_of_loss_code VALUES(1,'10','Glass breakage');
    INSERT INTO dp_cause_of_loss_code VALUES(2,'11','Hail');
    INSERT INTO dp_cause_of_loss_code VALUES(3,'12','Lightning');
    INSERT INTO dp_cause_of_loss_code VALUES(4,'16','Riot and civil commotion');
    INSERT INTO dp_cause_of_loss_code VALUES(5,'17','Smoke - Not from a Woodburning stove');
    INSERT INTO dp_cause_of_loss_code VALUES(6,'18','Theft - From auto');
    INSERT INTO dp_cause_of_loss_code VALUES(7,'19','Theft - On premises');
    INSERT INTO dp_cause_of_loss_code VALUES(8,'20','Theft - Off premises');
    INSERT INTO dp_cause_of_loss_code VALUES(9,'21','Vandalism');
    INSERT INTO dp_cause_of_loss_code VALUES(10,'22','Vehicles');
    INSERT INTO dp_cause_of_loss_code VALUES(11,'23','Sewer back up/Water damage');
    INSERT INTO dp_cause_of_loss_code VALUES(12,'24','Windstorm');
    INSERT INTO dp_cause_of_loss_code VALUES(13,'25','All other physical damage');
    INSERT INTO dp_cause_of_loss_code VALUES(14,'31','Electrocution of livestock');
    INSERT INTO dp_cause_of_loss_code VALUES(15,'32','Collapse, other than sinkhole');
    INSERT INTO dp_cause_of_loss_code VALUES(16,'33','Fire - From a Woodburning stove');
    INSERT INTO dp_cause_of_loss_code VALUES(17,'34','Smoke - From a Woodburning stove');
    INSERT INTO dp_cause_of_loss_code VALUES(18,'37','Sinkhole collapse');
    INSERT INTO dp_cause_of_loss_code VALUES(19,'38','Volcanic action');
    INSERT INTO dp_cause_of_loss_code VALUES(20,'40','Power surge, including brownouts and blackouts');
    INSERT INTO dp_cause_of_loss_code VALUES(21,'41','Weight of ice, snow, or sleet');
    INSERT INTO dp_cause_of_loss_code VALUES(22,'43','Heating spontaneous');
    INSERT INTO dp_cause_of_loss_code VALUES(23,'44','Mold (property related)');
    INSERT INTO dp_cause_of_loss_code VALUES(24,'45','Escaped liquid fuel - property related');
    INSERT INTO dp_cause_of_loss_code VALUES(25,'70','Loading and unloading of livestock');
    INSERT INTO dp_cause_of_loss_code VALUES(26,'75','All liability and med-pay claims against Landlord Policies');
    INSERT INTO dp_cause_of_loss_code VALUES(27,'76','Sprinkler leakage');
    INSERT INTO dp_cause_of_loss_code VALUES(28,'77','Ice Dam');
    INSERT INTO dp_cause_of_loss_code VALUES(29,'01','Aircraft');
    INSERT INTO dp_cause_of_loss_code VALUES(30,'02','Breakage');
    INSERT INTO dp_cause_of_loss_code VALUES(31,'03','Collision, incl. upset/overturn');
    INSERT INTO dp_cause_of_loss_code VALUES(32,'04','Credit card');
    INSERT INTO dp_cause_of_loss_code VALUES(33,'05','Earthquake');
    INSERT INTO dp_cause_of_loss_code VALUES(34,'06','Explosion');
    INSERT INTO dp_cause_of_loss_code VALUES(35,'07','Fire - Not from a Woodburning stove');
    INSERT INTO dp_cause_of_loss_code VALUES(36,'08','Flood');
    INSERT INTO dp_cause_of_loss_code VALUES(37,'09','Freezing');
END IF;
END $$;
