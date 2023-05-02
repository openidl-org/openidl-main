
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_cause_of_loss_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_cause_of_loss_code) THEN 
    INSERT INTO ho_cause_of_loss_code VALUES(1,'10','Glass Breakage','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(2,'11','Hail','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(3,'12','Lightning','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(4,'16','Riot and Civil Commotion','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(5,'17','Smoke - NOT from a Woodburning Stove','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(6,'18','Theft - From Auto','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(7,'19','Theft - On Premises','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(8,'20','Theft - Off Premises','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(9,'21','Vandalism','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(10,'22','Vehicles','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(11,'23','Sewer Back Up / Water Damage','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(12,'24','Windstorm','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(13,'25','All Other Physical Damage','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(14,'26','Bodily Injury - All Other','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(15,'27','Property Damage - All Other','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(16,'28','Fire Legal Liability','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(17,'29','All Other Liability','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(18,'30','Medical Payments - All Other','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(19,'32','Collapse, other than Sinkhole','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(20,'33','Fire - from a Woodburning Stove','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(21,'34','Smoke - from a Woodburning Stove','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(22,'37','Sinkhole Collapse','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(23,'38','Volcanic Action','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(24,'39','Expenses Related to Identity Fraud','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(25,'40','Power Surge, including Brownouts and Blackouts','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(26,'41','Weight of Ice, Snow, or Sleet','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(27,'44','Mold (Property Related)','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(28,'45','Escaped Liquid Fuel (Property Related)','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(29,'53','Liability (BI, PD, and Med-Pay) for Dog Bite','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(30,'54','Liability (BI, PD, and Med-Pay) for Mold','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(31,'55','Liability (BI, PD, and Med-Pay) for Swimming Pool','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(32,'56','Liability (BI, PD, and Med-Pay) for Trampoline','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(33,'57','Liability (BI, PD, and Med-Pay) for Escaped Liquid Fuel','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(34,'58','Liability (BI, PD, and Med-Pay) for Lead Poisoning','Liability Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(35,'76','Sprinkler Leakage','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(36,'77','Ice Dams','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(37,'01','Aircraft','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(38,'02','Breakage','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(39,'03','Collision, including Upset/Overturn','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(40,'04','Credit Card - Theft or unauthorized use of credit cards, debit cards, or fund transfer cards and loss due to forgery or acceptance of counterfeit money','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(41,'05','Earthquake','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(42,'06','Explosion','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(43,'07','Fire - NOT from a Woodburning Stove','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(44,'08','Flood','Property Coverage');
    INSERT INTO ho_cause_of_loss_code VALUES(45,'09','Freezing','Property Coverage');
END IF;
END $$;
