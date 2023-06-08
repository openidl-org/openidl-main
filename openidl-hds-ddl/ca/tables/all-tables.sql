
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



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_subline_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_subline_code) THEN 
    INSERT INTO ca_subline_code VALUES(1,'1','Private Passenger Auto','Personal');
    INSERT INTO ca_subline_code VALUES(2,'2','Commercial Auto','Commercial');
END IF;
END $$;



DO $$
BEGIN 
CREATE TABLE IF NOT EXISTS ca_um_uim_motorist_code(
	id INT,
	fk_state_id VARCHAR,
	code VARCHAR,
	description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (select * from ca_um_uim_motorist_code) THEN
	INSERT INTO ca_um_uim_motorist_code VALUES (1,1,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (2,1,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (3,1,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (4,2,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (5,2,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (6,2,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (7,3,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (8,3,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (9,3,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (10,4,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (11,4,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (12,4,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (13,5,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (14,5,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (15,5,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (16,6,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (17,6,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (18,6,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (19,7,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (20,7,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (21,7,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (22,8,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (23,8,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (24,8,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (25,9,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (26,9,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (27,9,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (28,10,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (29,10,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (30,10,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (31,11,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (32,11,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (33,11,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (34,12,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (35,12,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (36,12,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (37,13,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (38,13,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (39,13,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (40,14,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (41,14,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (42,14,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (43,15,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (44,15,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (45,15,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (46,16,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (47,16,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (48,16,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (49,17,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (50,17,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (51,17,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (52,18,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (53,18,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (54,18,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (55,19,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (56,19,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (57,19,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (58,20,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (59,20,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (60,20,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (61,21,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (62,21,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (63,21,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (64,22,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (65,22,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (66,22,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (67,23,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (68,23,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (69,23,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (70,24,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (71,24,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (72,24,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (73,25,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (74,25,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (75,25,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (76,26,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (77,26,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (78,26,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (79,27,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (80,27,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (81,27,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (82,28,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (83,28,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (84,28,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (85,29,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (86,29,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (87,29,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (88,30,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (89,30,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (90,30,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (91,31,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (92,31,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (93,31,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (94,32,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (95,32,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (96,32,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (97,33,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (98,33,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (99,33,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (100,34,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (101,34,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (102,34,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (103,35,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (104,35,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (105,35,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (106,36,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (107,36,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (108,36,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (109,37,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (110,37,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (111,37,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (112,38,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (113,38,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (114,38,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (115,39,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (116,39,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (117,39,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (118,40,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (119,40,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (120,40,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (121,41,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (122,41,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (123,41,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (124,42,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (125,42,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (126,42,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (127,43,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (128,43,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (129,43,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (130,44,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (131,44,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (132,44,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (133,45,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (134,45,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (135,45,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (136,46,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (137,46,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (138,46,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (139,47,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (140,47,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (141,47,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (142,48,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (143,48,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (144,48,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (145,49,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (146,49,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (147,49,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (148,50,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (149,50,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (150,50,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (151,51,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (152,51,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (153,51,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (154,52,'1','Bodily Injury');
	INSERT INTO ca_um_uim_motorist_code VALUES (155,52,'2','Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (156,52,'3','Bodily Injury and Property Damage');
	INSERT INTO ca_um_uim_motorist_code VALUES (157,37,'1','Bodily Injury — no stacking of UM/UIM limits');
	INSERT INTO ca_um_uim_motorist_code VALUES (158,37,'2','Property Damage — no stacking of UM/UIM limits');
	INSERT INTO ca_um_uim_motorist_code VALUES (159,37,'3','Bodily Injury and Property Damage — no stacking of UM/UIM limits');
	INSERT INTO ca_um_uim_motorist_code VALUES (160,37,'4','Bodily Injury — stacked multi-car UM/UIM limits');
	INSERT INTO ca_um_uim_motorist_code VALUES (161,37,'5','Property Damage — stacked multi-car UM/UIM limits');
	INSERT INTO ca_um_uim_motorist_code VALUES (162,37,'6','Bodily Injury and Property Damage — stacked multi-car UM/UIM limits');
END IF;
END $$;



DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_vehicle_performance_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_vehicle_performance_code) THEN 
    INSERT INTO ca_vehicle_performance_code VALUES(1,'0','Not Applicable to Commercial Auto Policies');
    INSERT INTO ca_vehicle_performance_code VALUES(2,'1','Standard');
    INSERT INTO ca_vehicle_performance_code VALUES(3,'2','Intermediate');
    INSERT INTO ca_vehicle_performance_code VALUES(4,'3','High');
    INSERT INTO ca_vehicle_performance_code VALUES(5,'4','Sports Car');
    INSERT INTO ca_vehicle_performance_code VALUES(6,'5','Sports Premium (New Jersey Only)');
    INSERT INTO ca_vehicle_performance_code VALUES(7,'9','All Other');
END IF;
END $$;



DO $$
BEGIN 
CREATE TABLE IF NOT EXISTS ca_liability_limit_code (
    id INT,
    fk_coverage_id int,
    fk_state_id int,
    name varchar,
    code varchar,
    limitt varchar,
	effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_liability_limit_code) THEN
	INSERT INTO ca_liability_limit_code  VALUES (1,1,1,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2,1,1,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3,1,1,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (4,1,1,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (5,1,1,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (6,1,1,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (7,1,1,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (8,1,1,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (9,2,1,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (10,2,1,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (11,2,1,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (12,2,1,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (13,2,1,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (14,2,1,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (15,2,1,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (16,2,1,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (17,2,1,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (18,2,1,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (19,2,1,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (20,3,1,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (21,3,1,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (22,3,1,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (23,3,1,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (24,3,1,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (25,3,1,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (26,3,1,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (27,3,1,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (28,5,1,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (29,5,1,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (30,5,1,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (31,5,1,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (32,5,1,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (33,5,1,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (34,5,1,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (35,5,1,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (36,5,1,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (37,6,1,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (38,6,1,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (39,6,1,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (40,6,1,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (41,6,1,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (42,6,1,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (43,6,1,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (44,6,1,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (45,7,1,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (46,7,1,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (47,7,1,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (48,7,1,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (49,7,1,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (50,7,1,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (51,7,1,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (52,7,1,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (53,8,1,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (54,8,1,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (55,8,1,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (56,8,1,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (57,8,1,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (58,8,1,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (59,8,1,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (60,8,1,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (61,1,2,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (62,1,2,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (63,1,2,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (64,1,2,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (65,1,2,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (66,1,2,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (67,1,2,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (68,1,2,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (69,2,2,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (70,2,2,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (71,2,2,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (72,2,2,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (73,2,2,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (74,2,2,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (75,2,2,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (76,2,2,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (77,2,2,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (78,2,2,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (79,2,2,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (80,3,2,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (81,3,2,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (82,3,2,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (83,3,2,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (84,3,2,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (85,3,2,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (86,3,2,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (87,3,2,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (88,5,2,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (89,5,2,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (90,5,2,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (91,5,2,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (92,5,2,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (93,5,2,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (94,5,2,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (95,5,2,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (96,5,2,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (97,6,2,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (98,6,2,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (99,6,2,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (100,6,2,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (101,6,2,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (102,6,2,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (103,6,2,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (104,6,2,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (105,7,2,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (106,7,2,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (107,7,2,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (108,7,2,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (109,7,2,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (110,7,2,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (111,7,2,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (112,7,2,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (113,8,2,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (114,8,2,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (115,8,2,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (116,8,2,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (117,8,2,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (118,8,2,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (119,8,2,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (120,8,2,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (121,1,3,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (122,1,3,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (123,1,3,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (124,1,3,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (125,1,3,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (126,1,3,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (127,1,3,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (128,1,3,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (129,2,3,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (130,2,3,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (131,2,3,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (132,2,3,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (133,2,3,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (134,2,3,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (135,2,3,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (136,2,3,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (137,2,3,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (138,2,3,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (139,2,3,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (140,3,3,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (141,3,3,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (142,3,3,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (143,3,3,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (144,3,3,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (145,3,3,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (146,3,3,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (147,3,3,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (148,5,3,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (149,5,3,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (150,5,3,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (151,5,3,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (152,5,3,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (153,5,3,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (154,5,3,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (155,5,3,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (156,5,3,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (157,6,3,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (158,6,3,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (159,6,3,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (160,6,3,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (161,6,3,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (162,6,3,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (163,6,3,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (164,6,3,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (165,7,3,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (166,7,3,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (167,7,3,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (168,7,3,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (169,7,3,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (170,7,3,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (171,7,3,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (172,7,3,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (173,8,3,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (174,8,3,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (175,8,3,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (176,8,3,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (177,8,3,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (178,8,3,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (179,8,3,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (180,8,3,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (181,1,4,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (182,1,4,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (183,1,4,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (184,1,4,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (185,1,4,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (186,1,4,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (187,1,4,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (188,1,4,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (189,2,4,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (190,2,4,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (191,2,4,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (192,2,4,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (193,2,4,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (194,2,4,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (195,2,4,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (196,2,4,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (197,2,4,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (198,2,4,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (199,2,4,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (200,3,4,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (201,3,4,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (202,3,4,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (203,3,4,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (204,3,4,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (205,3,4,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (206,3,4,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (207,3,4,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (208,5,4,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (209,5,4,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (210,5,4,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (211,5,4,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (212,5,4,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (213,5,4,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (214,5,4,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (215,5,4,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (216,5,4,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (217,6,4,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (218,6,4,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (219,6,4,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (220,6,4,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (221,6,4,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (222,6,4,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (223,6,4,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (224,6,4,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (225,7,4,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (226,7,4,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (227,7,4,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (228,7,4,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (229,7,4,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (230,7,4,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (231,7,4,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (232,7,4,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (233,8,4,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (234,8,4,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (235,8,4,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (236,8,4,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (237,8,4,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (238,8,4,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (239,8,4,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (240,8,4,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (241,1,5,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (242,1,5,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (243,1,5,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (244,1,5,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (245,1,5,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (246,1,5,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (247,1,5,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (248,1,5,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (249,2,5,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (250,2,5,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (251,2,5,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (252,2,5,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (253,2,5,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (254,2,5,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (255,2,5,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (256,2,5,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (257,2,5,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (258,2,5,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (259,2,5,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (260,3,5,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (261,3,5,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (262,3,5,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (263,3,5,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (264,3,5,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (265,3,5,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (266,3,5,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (267,3,5,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (268,5,5,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (269,5,5,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (270,5,5,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (271,5,5,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (272,5,5,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (273,5,5,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (274,5,5,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (275,5,5,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (276,5,5,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (277,6,5,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (278,6,5,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (279,6,5,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (280,6,5,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (281,6,5,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (282,6,5,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (283,6,5,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (284,6,5,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (285,7,5,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (286,7,5,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (287,7,5,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (288,7,5,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (289,7,5,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (290,7,5,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (291,7,5,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (292,7,5,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (293,8,5,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (294,8,5,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (295,8,5,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (296,8,5,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (297,8,5,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (298,8,5,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (299,8,5,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (300,8,5,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (301,1,6,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (302,1,6,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (303,1,6,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (304,1,6,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (305,1,6,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (306,1,6,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (307,1,6,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (308,1,6,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (309,2,6,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (310,2,6,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (311,2,6,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (312,2,6,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (313,2,6,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (314,2,6,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (315,2,6,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (316,2,6,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (317,2,6,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (318,2,6,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (319,2,6,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (320,3,6,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (321,3,6,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (322,3,6,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (323,3,6,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (324,3,6,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (325,3,6,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (326,3,6,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (327,3,6,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (328,5,6,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (329,5,6,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (330,5,6,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (331,5,6,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (332,5,6,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (333,5,6,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (334,5,6,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (335,5,6,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (336,5,6,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (337,6,6,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (338,6,6,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (339,6,6,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (340,6,6,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (341,6,6,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (342,6,6,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (343,6,6,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (344,6,6,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (345,7,6,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (346,7,6,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (347,7,6,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (348,7,6,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (349,7,6,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (350,7,6,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (351,7,6,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (352,7,6,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (353,8,6,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (354,8,6,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (355,8,6,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (356,8,6,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (357,8,6,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (358,8,6,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (359,8,6,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (360,8,6,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (361,1,7,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (362,1,7,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (363,1,7,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (364,1,7,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (365,1,7,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (366,1,7,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (367,1,7,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (368,1,7,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (369,2,7,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (370,2,7,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (371,2,7,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (372,2,7,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (373,2,7,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (374,2,7,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (375,2,7,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (376,2,7,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (377,2,7,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (378,2,7,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (379,2,7,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (380,3,7,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (381,3,7,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (382,3,7,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (383,3,7,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (384,3,7,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (385,3,7,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (386,3,7,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (387,3,7,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (388,5,7,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (389,5,7,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (390,5,7,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (391,5,7,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (392,5,7,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (393,5,7,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (394,5,7,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (395,5,7,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (396,5,7,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (397,6,7,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (398,6,7,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (399,6,7,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (400,6,7,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (401,6,7,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (402,6,7,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (403,6,7,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (404,6,7,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (405,7,7,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (406,7,7,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (407,7,7,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (408,7,7,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (409,7,7,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (410,7,7,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (411,7,7,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (412,7,7,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (413,8,7,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (414,8,7,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (415,8,7,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (416,8,7,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (417,8,7,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (418,8,7,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (419,8,7,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (420,8,7,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (421,1,8,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (422,1,8,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (423,1,8,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (424,1,8,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (425,1,8,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (426,1,8,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (427,1,8,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (428,1,8,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (429,2,8,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (430,2,8,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (431,2,8,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (432,2,8,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (433,2,8,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (434,2,8,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (435,2,8,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (436,2,8,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (437,2,8,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (438,2,8,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (439,2,8,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (440,3,8,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (441,3,8,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (442,3,8,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (443,3,8,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (444,3,8,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (445,3,8,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (446,3,8,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (447,3,8,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (448,5,8,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (449,5,8,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (450,5,8,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (451,5,8,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (452,5,8,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (453,5,8,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (454,5,8,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (455,5,8,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (456,5,8,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (457,6,8,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (458,6,8,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (459,6,8,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (460,6,8,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (461,6,8,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (462,6,8,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (463,6,8,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (464,6,8,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (465,7,8,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (466,7,8,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (467,7,8,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (468,7,8,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (469,7,8,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (470,7,8,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (471,7,8,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (472,7,8,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (473,8,8,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (474,8,8,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (475,8,8,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (476,8,8,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (477,8,8,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (478,8,8,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (479,8,8,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (480,8,8,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (481,1,9,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (482,1,9,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (483,1,9,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (484,1,9,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (485,1,9,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (486,1,9,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (487,1,9,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (488,1,9,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (489,2,9,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (490,2,9,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (491,2,9,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (492,2,9,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (493,2,9,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (494,2,9,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (495,2,9,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (496,2,9,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (497,2,9,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (498,2,9,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (499,2,9,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (500,3,9,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (501,3,9,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (502,3,9,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (503,3,9,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (504,3,9,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (505,3,9,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (506,3,9,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (507,3,9,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (508,5,9,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (509,5,9,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (510,5,9,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (511,5,9,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (512,5,9,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (513,5,9,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (514,5,9,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (515,5,9,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (516,5,9,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (517,6,9,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (518,6,9,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (519,6,9,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (520,6,9,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (521,6,9,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (522,6,9,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (523,6,9,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (524,6,9,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (525,7,9,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (526,7,9,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (527,7,9,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (528,7,9,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (529,7,9,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (530,7,9,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (531,7,9,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (532,7,9,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (533,8,9,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (534,8,9,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (535,8,9,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (536,8,9,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (537,8,9,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (538,8,9,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (539,8,9,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (540,8,9,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (541,1,10,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (542,1,10,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (543,1,10,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (544,1,10,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (545,1,10,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (546,1,10,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (547,1,10,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (548,1,10,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (549,2,10,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (550,2,10,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (551,2,10,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (552,2,10,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (553,2,10,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (554,2,10,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (555,2,10,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (556,2,10,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (557,2,10,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (558,2,10,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (559,2,10,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (560,3,10,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (561,3,10,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (562,3,10,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (563,3,10,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (564,3,10,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (565,3,10,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (566,3,10,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (567,3,10,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (568,5,10,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (569,5,10,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (570,5,10,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (571,5,10,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (572,5,10,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (573,5,10,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (574,5,10,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (575,5,10,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (576,5,10,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (577,6,10,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (578,6,10,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (579,6,10,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (580,6,10,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (581,6,10,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (582,6,10,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (583,6,10,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (584,6,10,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (585,7,10,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (586,7,10,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (587,7,10,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (588,7,10,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (589,7,10,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (590,7,10,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (591,7,10,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (592,7,10,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (593,8,10,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (594,8,10,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (595,8,10,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (596,8,10,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (597,8,10,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (598,8,10,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (599,8,10,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (600,8,10,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (601,1,11,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (602,1,11,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (603,1,11,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (604,1,11,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (605,1,11,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (606,1,11,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (607,1,11,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (608,1,11,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (609,2,11,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (610,2,11,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (611,2,11,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (612,2,11,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (613,2,11,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (614,2,11,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (615,2,11,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (616,2,11,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (617,2,11,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (618,2,11,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (619,2,11,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (620,3,11,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (621,3,11,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (622,3,11,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (623,3,11,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (624,3,11,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (625,3,11,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (626,3,11,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (627,3,11,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (628,5,11,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (629,5,11,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (630,5,11,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (631,5,11,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (632,5,11,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (633,5,11,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (634,5,11,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (635,5,11,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (636,5,11,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (637,6,11,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (638,6,11,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (639,6,11,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (640,6,11,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (641,6,11,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (642,6,11,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (643,6,11,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (644,6,11,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (645,7,11,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (646,7,11,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (647,7,11,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (648,7,11,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (649,7,11,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (650,7,11,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (651,7,11,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (652,7,11,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (653,8,11,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (654,8,11,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (655,8,11,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (656,8,11,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (657,8,11,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (658,8,11,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (659,8,11,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (660,8,11,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (661,1,12,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (662,1,12,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (663,1,12,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (664,1,12,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (665,1,12,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (666,1,12,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (667,1,12,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (668,1,12,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (669,2,12,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (670,2,12,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (671,2,12,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (672,2,12,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (673,2,12,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (674,2,12,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (675,2,12,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (676,2,12,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (677,2,12,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (678,2,12,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (679,2,12,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (680,3,12,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (681,3,12,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (682,3,12,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (683,3,12,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (684,3,12,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (685,3,12,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (686,3,12,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (687,3,12,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (688,5,12,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (689,5,12,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (690,5,12,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (691,5,12,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (692,5,12,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (693,5,12,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (694,5,12,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (695,5,12,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (696,5,12,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (697,6,12,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (698,6,12,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (699,6,12,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (700,6,12,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (701,6,12,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (702,6,12,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (703,6,12,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (704,6,12,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (705,7,12,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (706,7,12,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (707,7,12,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (708,7,12,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (709,7,12,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (710,7,12,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (711,7,12,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (712,7,12,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (713,8,12,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (714,8,12,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (715,8,12,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (716,8,12,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (717,8,12,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (718,8,12,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (719,8,12,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (720,8,12,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (721,1,13,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (722,1,13,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (723,1,13,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (724,1,13,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (725,1,13,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (726,1,13,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (727,1,13,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (728,1,13,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (729,2,13,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (730,2,13,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (731,2,13,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (732,2,13,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (733,2,13,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (734,2,13,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (735,2,13,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (736,2,13,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (737,2,13,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (738,2,13,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (739,2,13,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (740,3,13,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (741,3,13,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (742,3,13,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (743,3,13,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (744,3,13,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (745,3,13,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (746,3,13,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (747,3,13,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (748,5,13,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (749,5,13,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (750,5,13,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (751,5,13,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (752,5,13,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (753,5,13,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (754,5,13,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (755,5,13,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (756,5,13,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (757,6,13,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (758,6,13,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (759,6,13,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (760,6,13,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (761,6,13,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (762,6,13,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (763,6,13,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (764,6,13,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (765,7,13,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (766,7,13,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (767,7,13,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (768,7,13,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (769,7,13,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (770,7,13,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (771,7,13,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (772,7,13,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (773,8,13,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (774,8,13,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (775,8,13,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (776,8,13,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (777,8,13,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (778,8,13,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (779,8,13,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (780,8,13,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (781,1,14,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (782,1,14,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (783,1,14,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (784,1,14,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (785,1,14,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (786,1,14,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (787,1,14,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (788,1,14,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (789,2,14,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (790,2,14,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (791,2,14,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (792,2,14,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (793,2,14,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (794,2,14,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (795,2,14,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (796,2,14,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (797,2,14,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (798,2,14,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (799,2,14,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (800,3,14,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (801,3,14,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (802,3,14,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (803,3,14,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (804,3,14,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (805,3,14,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (806,3,14,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (807,3,14,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (808,5,14,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (809,5,14,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (810,5,14,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (811,5,14,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (812,5,14,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (813,5,14,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (814,5,14,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (815,5,14,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (816,5,14,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (817,6,14,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (818,6,14,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (819,6,14,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (820,6,14,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (821,6,14,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (822,6,14,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (823,6,14,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (824,6,14,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (825,7,14,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (826,7,14,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (827,7,14,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (828,7,14,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (829,7,14,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (830,7,14,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (831,7,14,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (832,7,14,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (833,8,14,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (834,8,14,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (835,8,14,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (836,8,14,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (837,8,14,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (838,8,14,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (839,8,14,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (840,8,14,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (841,1,15,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (842,1,15,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (843,1,15,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (844,1,15,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (845,1,15,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (846,1,15,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (847,1,15,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (848,1,15,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (849,2,15,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (850,2,15,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (851,2,15,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (852,2,15,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (853,2,15,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (854,2,15,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (855,2,15,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (856,2,15,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (857,2,15,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (858,2,15,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (859,2,15,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (860,3,15,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (861,3,15,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (862,3,15,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (863,3,15,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (864,3,15,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (865,3,15,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (866,3,15,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (867,3,15,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (868,5,15,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (869,5,15,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (870,5,15,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (871,5,15,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (872,5,15,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (873,5,15,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (874,5,15,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (875,5,15,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (876,5,15,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (877,6,15,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (878,6,15,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (879,6,15,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (880,6,15,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (881,6,15,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (882,6,15,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (883,6,15,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (884,6,15,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (885,7,15,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (886,7,15,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (887,7,15,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (888,7,15,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (889,7,15,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (890,7,15,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (891,7,15,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (892,7,15,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (893,8,15,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (894,8,15,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (895,8,15,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (896,8,15,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (897,8,15,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (898,8,15,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (899,8,15,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (900,8,15,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (901,1,16,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (902,1,16,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (903,1,16,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (904,1,16,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (905,1,16,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (906,1,16,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (907,1,16,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (908,1,16,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (909,2,16,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (910,2,16,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (911,2,16,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (912,2,16,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (913,2,16,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (914,2,16,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (915,2,16,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (916,2,16,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (917,2,16,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (918,2,16,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (919,2,16,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (920,3,16,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (921,3,16,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (922,3,16,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (923,3,16,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (924,3,16,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (925,3,16,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (926,3,16,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (927,3,16,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (928,5,16,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (929,5,16,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (930,5,16,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (931,5,16,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (932,5,16,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (933,5,16,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (934,5,16,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (935,5,16,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (936,5,16,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (937,6,16,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (938,6,16,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (939,6,16,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (940,6,16,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (941,6,16,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (942,6,16,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (943,6,16,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (944,6,16,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (945,7,16,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (946,7,16,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (947,7,16,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (948,7,16,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (949,7,16,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (950,7,16,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (951,7,16,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (952,7,16,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (953,8,16,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (954,8,16,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (955,8,16,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (956,8,16,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (957,8,16,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (958,8,16,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (959,8,16,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (960,8,16,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (961,1,17,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (962,1,17,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (963,1,17,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (964,1,17,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (965,1,17,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (966,1,17,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (967,1,17,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (968,1,17,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (969,2,17,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (970,2,17,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (971,2,17,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (972,2,17,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (973,2,17,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (974,2,17,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (975,2,17,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (976,2,17,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (977,2,17,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (978,2,17,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (979,2,17,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (980,3,17,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (981,3,17,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (982,3,17,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (983,3,17,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (984,3,17,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (985,3,17,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (986,3,17,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (987,3,17,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (988,5,17,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (989,5,17,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (990,5,17,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (991,5,17,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (992,5,17,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (993,5,17,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (994,5,17,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (995,5,17,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (996,5,17,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (997,6,17,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (998,6,17,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (999,6,17,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1000,6,17,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1001,6,17,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1002,6,17,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1003,6,17,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1004,6,17,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1005,7,17,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1006,7,17,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1007,7,17,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1008,7,17,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1009,7,17,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1010,7,17,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1011,7,17,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1012,7,17,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1013,8,17,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1014,8,17,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1015,8,17,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1016,8,17,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1017,8,17,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1018,8,17,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1019,8,17,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1020,8,17,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1021,1,18,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1022,1,18,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1023,1,18,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1024,1,18,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1025,1,18,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1026,1,18,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1027,1,18,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1028,1,18,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1029,2,18,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1030,2,18,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1031,2,18,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1032,2,18,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1033,2,18,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1034,2,18,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1035,2,18,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1036,2,18,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1037,2,18,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1038,2,18,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1039,2,18,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1040,3,18,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1041,3,18,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1042,3,18,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1043,3,18,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1044,3,18,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1045,3,18,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1046,3,18,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1047,3,18,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1048,5,18,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1049,5,18,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1050,5,18,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1051,5,18,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1052,5,18,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1053,5,18,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1054,5,18,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1055,5,18,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1056,5,18,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1057,6,18,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1058,6,18,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1059,6,18,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1060,6,18,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1061,6,18,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1062,6,18,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1063,6,18,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1064,6,18,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1065,7,18,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1066,7,18,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1067,7,18,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1068,7,18,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1069,7,18,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1070,7,18,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1071,7,18,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1072,7,18,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1073,8,18,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1074,8,18,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1075,8,18,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1076,8,18,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1077,8,18,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1078,8,18,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1079,8,18,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1080,8,18,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1081,1,19,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1082,1,19,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1083,1,19,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1084,1,19,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1085,1,19,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1086,1,19,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1087,1,19,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1088,1,19,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1089,2,19,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1090,2,19,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1091,2,19,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1092,2,19,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1093,2,19,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1094,2,19,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1095,2,19,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1096,2,19,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1097,2,19,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1098,2,19,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1099,2,19,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1100,3,19,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1101,3,19,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1102,3,19,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1103,3,19,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1104,3,19,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1105,3,19,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1106,3,19,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1107,3,19,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1108,5,19,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1109,5,19,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1110,5,19,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1111,5,19,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1112,5,19,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1113,5,19,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1114,5,19,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1115,5,19,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1116,5,19,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1117,6,19,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1118,6,19,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1119,6,19,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1120,6,19,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1121,6,19,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1122,6,19,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1123,6,19,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1124,6,19,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1125,7,19,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1126,7,19,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1127,7,19,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1128,7,19,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1129,7,19,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1130,7,19,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1131,7,19,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1132,7,19,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1133,8,19,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1134,8,19,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1135,8,19,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1136,8,19,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1137,8,19,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1138,8,19,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1139,8,19,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1140,8,19,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1141,1,20,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1142,1,20,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1143,1,20,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1144,1,20,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1145,1,20,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1146,1,20,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1147,1,20,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1148,1,20,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1149,2,20,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1150,2,20,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1151,2,20,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1152,2,20,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1153,2,20,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1154,2,20,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1155,2,20,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1156,2,20,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1157,2,20,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1158,2,20,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1159,2,20,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1160,3,20,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1161,3,20,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1162,3,20,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1163,3,20,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1164,3,20,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1165,3,20,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1166,3,20,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1167,3,20,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1168,5,20,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1169,5,20,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1170,5,20,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1171,5,20,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1172,5,20,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1173,5,20,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1174,5,20,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1175,5,20,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1176,5,20,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1177,6,20,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1178,6,20,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1179,6,20,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1180,6,20,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1181,6,20,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1182,6,20,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1183,6,20,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1184,6,20,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1185,7,20,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1186,7,20,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1187,7,20,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1188,7,20,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1189,7,20,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1190,7,20,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1191,7,20,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1192,7,20,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1193,8,20,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1194,8,20,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1195,8,20,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1196,8,20,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1197,8,20,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1198,8,20,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1199,8,20,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1200,8,20,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1201,1,21,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1202,1,21,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1203,1,21,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1204,1,21,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1205,1,21,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1206,1,21,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1207,1,21,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1208,1,21,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1209,2,21,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1210,2,21,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1211,2,21,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1212,2,21,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1213,2,21,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1214,2,21,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1215,2,21,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1216,2,21,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1217,2,21,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1218,2,21,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1219,2,21,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1220,3,21,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1221,3,21,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1222,3,21,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1223,3,21,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1224,3,21,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1225,3,21,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1226,3,21,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1227,3,21,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1228,5,21,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1229,5,21,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1230,5,21,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1231,5,21,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1232,5,21,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1233,5,21,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1234,5,21,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1235,5,21,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1236,5,21,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1237,6,21,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1238,6,21,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1239,6,21,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1240,6,21,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1241,6,21,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1242,6,21,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1243,6,21,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1244,6,21,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1245,7,21,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1246,7,21,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1247,7,21,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1248,7,21,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1249,7,21,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1250,7,21,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1251,7,21,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1252,7,21,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1253,8,21,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1254,8,21,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1255,8,21,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1256,8,21,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1257,8,21,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1258,8,21,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1259,8,21,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1260,8,21,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1261,1,22,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1262,1,22,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1263,1,22,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1264,1,22,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1265,1,22,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1266,1,22,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1267,1,22,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1268,1,22,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1269,2,22,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1270,2,22,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1271,2,22,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1272,2,22,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1273,2,22,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1274,2,22,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1275,2,22,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1276,2,22,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1277,2,22,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1278,2,22,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1279,2,22,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1280,3,22,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1281,3,22,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1282,3,22,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1283,3,22,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1284,3,22,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1285,3,22,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1286,3,22,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1287,3,22,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1288,5,22,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1289,5,22,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1290,5,22,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1291,5,22,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1292,5,22,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1293,5,22,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1294,5,22,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1295,5,22,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1296,5,22,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1297,6,22,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1298,6,22,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1299,6,22,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1300,6,22,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1301,6,22,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1302,6,22,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1303,6,22,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1304,6,22,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1305,7,22,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1306,7,22,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1307,7,22,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1308,7,22,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1309,7,22,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1310,7,22,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1311,7,22,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1312,7,22,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1313,8,22,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1314,8,22,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1315,8,22,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1316,8,22,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1317,8,22,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1318,8,22,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1319,8,22,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1320,8,22,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1321,1,23,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1322,1,23,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1323,1,23,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1324,1,23,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1325,1,23,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1326,1,23,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1327,1,23,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1328,1,23,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1329,2,23,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1330,2,23,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1331,2,23,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1332,2,23,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1333,2,23,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1334,2,23,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1335,2,23,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1336,2,23,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1337,2,23,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1338,2,23,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1339,2,23,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1340,3,23,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1341,3,23,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1342,3,23,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1343,3,23,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1344,3,23,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1345,3,23,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1346,3,23,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1347,3,23,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1348,5,23,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1349,5,23,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1350,5,23,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1351,5,23,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1352,5,23,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1353,5,23,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1354,5,23,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1355,5,23,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1356,5,23,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1357,6,23,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1358,6,23,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1359,6,23,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1360,6,23,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1361,6,23,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1362,6,23,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1363,6,23,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1364,6,23,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1365,7,23,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1366,7,23,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1367,7,23,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1368,7,23,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1369,7,23,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1370,7,23,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1371,7,23,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1372,7,23,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1373,8,23,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1374,8,23,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1375,8,23,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1376,8,23,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1377,8,23,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1378,8,23,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1379,8,23,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1380,8,23,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1381,1,24,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1382,1,24,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1383,1,24,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1384,1,24,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1385,1,24,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1386,1,24,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1387,1,24,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1388,1,24,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1389,2,24,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1390,2,24,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1391,2,24,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1392,2,24,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1393,2,24,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1394,2,24,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1395,2,24,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1396,2,24,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1397,2,24,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1398,2,24,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1399,2,24,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1400,3,24,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1401,3,24,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1402,3,24,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1403,3,24,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1404,3,24,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1405,3,24,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1406,3,24,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1407,3,24,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1408,5,24,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1409,5,24,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1410,5,24,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1411,5,24,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1412,5,24,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1413,5,24,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1414,5,24,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1415,5,24,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1416,5,24,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1417,6,24,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1418,6,24,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1419,6,24,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1420,6,24,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1421,6,24,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1422,6,24,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1423,6,24,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1424,6,24,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1425,7,24,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1426,7,24,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1427,7,24,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1428,7,24,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1429,7,24,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1430,7,24,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1431,7,24,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1432,7,24,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1433,8,24,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1434,8,24,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1435,8,24,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1436,8,24,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1437,8,24,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1438,8,24,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1439,8,24,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1440,8,24,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1441,1,25,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1442,1,25,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1443,1,25,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1444,1,25,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1445,1,25,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1446,1,25,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1447,1,25,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1448,1,25,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1449,2,25,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1450,2,25,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1451,2,25,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1452,2,25,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1453,2,25,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1454,2,25,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1455,2,25,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1456,2,25,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1457,2,25,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1458,2,25,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1459,2,25,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1460,3,25,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1461,3,25,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1462,3,25,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1463,3,25,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1464,3,25,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1465,3,25,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1466,3,25,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1467,3,25,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1468,5,25,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1469,5,25,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1470,5,25,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1471,5,25,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1472,5,25,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1473,5,25,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1474,5,25,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1475,5,25,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1476,5,25,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1477,6,25,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1478,6,25,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1479,6,25,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1480,6,25,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1481,6,25,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1482,6,25,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1483,6,25,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1484,6,25,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1485,7,25,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1486,7,25,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1487,7,25,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1488,7,25,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1489,7,25,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1490,7,25,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1491,7,25,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1492,7,25,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1493,8,25,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1494,8,25,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1495,8,25,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1496,8,25,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1497,8,25,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1498,8,25,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1499,8,25,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1500,8,25,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1501,1,26,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1502,1,26,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1503,1,26,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1504,1,26,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1505,1,26,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1506,1,26,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1507,1,26,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1508,1,26,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1509,2,26,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1510,2,26,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1511,2,26,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1512,2,26,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1513,2,26,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1514,2,26,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1515,2,26,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1516,2,26,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1517,2,26,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1518,2,26,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1519,2,26,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1520,3,26,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1521,3,26,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1522,3,26,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1523,3,26,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1524,3,26,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1525,3,26,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1526,3,26,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1527,3,26,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1528,5,26,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1529,5,26,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1530,5,26,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1531,5,26,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1532,5,26,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1533,5,26,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1534,5,26,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1535,5,26,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1536,5,26,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1537,6,26,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1538,6,26,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1539,6,26,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1540,6,26,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1541,6,26,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1542,6,26,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1543,6,26,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1544,6,26,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1545,7,26,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1546,7,26,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1547,7,26,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1548,7,26,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1549,7,26,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1550,7,26,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1551,7,26,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1552,7,26,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1553,8,26,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1554,8,26,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1555,8,26,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1556,8,26,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1557,8,26,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1558,8,26,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1559,8,26,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1560,8,26,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1561,1,27,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1562,1,27,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1563,1,27,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1564,1,27,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1565,1,27,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1566,1,27,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1567,1,27,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1568,1,27,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1569,2,27,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1570,2,27,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1571,2,27,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1572,2,27,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1573,2,27,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1574,2,27,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1575,2,27,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1576,2,27,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1577,2,27,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1578,2,27,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1579,2,27,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1580,3,27,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1581,3,27,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1582,3,27,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1583,3,27,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1584,3,27,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1585,3,27,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1586,3,27,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1587,3,27,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1588,5,27,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1589,5,27,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1590,5,27,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1591,5,27,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1592,5,27,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1593,5,27,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1594,5,27,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1595,5,27,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1596,5,27,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1597,6,27,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1598,6,27,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1599,6,27,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1600,6,27,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1601,6,27,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1602,6,27,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1603,6,27,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1604,6,27,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1605,7,27,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1606,7,27,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1607,7,27,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1608,7,27,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1609,7,27,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1610,7,27,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1611,7,27,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1612,7,27,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1613,8,27,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1614,8,27,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1615,8,27,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1616,8,27,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1617,8,27,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1618,8,27,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1619,8,27,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1620,8,27,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1621,1,28,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1622,1,28,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1623,1,28,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1624,1,28,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1625,1,28,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1626,1,28,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1627,1,28,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1628,1,28,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1629,2,28,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1630,2,28,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1631,2,28,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1632,2,28,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1633,2,28,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1634,2,28,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1635,2,28,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1636,2,28,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1637,2,28,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1638,2,28,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1639,2,28,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1640,3,28,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1641,3,28,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1642,3,28,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1643,3,28,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1644,3,28,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1645,3,28,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1646,3,28,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1647,3,28,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1648,5,28,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1649,5,28,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1650,5,28,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1651,5,28,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1652,5,28,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1653,5,28,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1654,5,28,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1655,5,28,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1656,5,28,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1657,6,28,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1658,6,28,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1659,6,28,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1660,6,28,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1661,6,28,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1662,6,28,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1663,6,28,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1664,6,28,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1665,7,28,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1666,7,28,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1667,7,28,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1668,7,28,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1669,7,28,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1670,7,28,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1671,7,28,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1672,7,28,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1673,8,28,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1674,8,28,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1675,8,28,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1676,8,28,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1677,8,28,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1678,8,28,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1679,8,28,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1680,8,28,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1681,1,29,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1682,1,29,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1683,1,29,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1684,1,29,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1685,1,29,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1686,1,29,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1687,1,29,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1688,1,29,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1689,2,29,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1690,2,29,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1691,2,29,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1692,2,29,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1693,2,29,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1694,2,29,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1695,2,29,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1696,2,29,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1697,2,29,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1698,2,29,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1699,2,29,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1700,3,29,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1701,3,29,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1702,3,29,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1703,3,29,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1704,3,29,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1705,3,29,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1706,3,29,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1707,3,29,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1708,5,29,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1709,5,29,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1710,5,29,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1711,5,29,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1712,5,29,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1713,5,29,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1714,5,29,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1715,5,29,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1716,5,29,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1717,6,29,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1718,6,29,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1719,6,29,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1720,6,29,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1721,6,29,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1722,6,29,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1723,6,29,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1724,6,29,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1725,7,29,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1726,7,29,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1727,7,29,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1728,7,29,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1729,7,29,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1730,7,29,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1731,7,29,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1732,7,29,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1733,8,29,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1734,8,29,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1735,8,29,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1736,8,29,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1737,8,29,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1738,8,29,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1739,8,29,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1740,8,29,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1741,1,30,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1742,1,30,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1743,1,30,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1744,1,30,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1745,1,30,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1746,1,30,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1747,1,30,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1748,1,30,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1749,2,30,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1750,2,30,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1751,2,30,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1752,2,30,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1753,2,30,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1754,2,30,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1755,2,30,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1756,2,30,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1757,2,30,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1758,2,30,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1759,2,30,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1760,3,30,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1761,3,30,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1762,3,30,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1763,3,30,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1764,3,30,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1765,3,30,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1766,3,30,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1767,3,30,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1768,5,30,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1769,5,30,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1770,5,30,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1771,5,30,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1772,5,30,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1773,5,30,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1774,5,30,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1775,5,30,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1776,5,30,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1777,6,30,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1778,6,30,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1779,6,30,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1780,6,30,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1781,6,30,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1782,6,30,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1783,6,30,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1784,6,30,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1785,7,30,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1786,7,30,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1787,7,30,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1788,7,30,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1789,7,30,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1790,7,30,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1791,7,30,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1792,7,30,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1793,8,30,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1794,8,30,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1795,8,30,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1796,8,30,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1797,8,30,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1798,8,30,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1799,8,30,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1800,8,30,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1801,1,31,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1802,1,31,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1803,1,31,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1804,1,31,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1805,1,31,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1806,1,31,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1807,1,31,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1808,1,31,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1809,2,31,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1810,2,31,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1811,2,31,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1812,2,31,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1813,2,31,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1814,2,31,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1815,2,31,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1816,2,31,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1817,2,31,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1818,2,31,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1819,2,31,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1820,3,31,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1821,3,31,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1822,3,31,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1823,3,31,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1824,3,31,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1825,3,31,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1826,3,31,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1827,3,31,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1828,5,31,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1829,5,31,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1830,5,31,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1831,5,31,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1832,5,31,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1833,5,31,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1834,5,31,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1835,5,31,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1836,5,31,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1837,6,31,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1838,6,31,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1839,6,31,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1840,6,31,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1841,6,31,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1842,6,31,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1843,6,31,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1844,6,31,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1845,7,31,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1846,7,31,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1847,7,31,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1848,7,31,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1849,7,31,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1850,7,31,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1851,7,31,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1852,7,31,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1853,8,31,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1854,8,31,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1855,8,31,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1856,8,31,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1857,8,31,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1858,8,31,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1859,8,31,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1860,8,31,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1861,1,32,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1862,1,32,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1863,1,32,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1864,1,32,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1865,1,32,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1866,1,32,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1867,1,32,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1868,1,32,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1869,2,32,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1870,2,32,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1871,2,32,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1872,2,32,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1873,2,32,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1874,2,32,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1875,2,32,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1876,2,32,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1877,2,32,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1878,2,32,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1879,2,32,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1880,3,32,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1881,3,32,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1882,3,32,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1883,3,32,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1884,3,32,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1885,3,32,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1886,3,32,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1887,3,32,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1888,5,32,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1889,5,32,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1890,5,32,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1891,5,32,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1892,5,32,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1893,5,32,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1894,5,32,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1895,5,32,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1896,5,32,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1897,6,32,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1898,6,32,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1899,6,32,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1900,6,32,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1901,6,32,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1902,6,32,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1903,6,32,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1904,6,32,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1905,7,32,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1906,7,32,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1907,7,32,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1908,7,32,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1909,7,32,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1910,7,32,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1911,7,32,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1912,7,32,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1913,8,32,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1914,8,32,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1915,8,32,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1916,8,32,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1917,8,32,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1918,8,32,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1919,8,32,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1920,8,32,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1921,1,33,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1922,1,33,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1923,1,33,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1924,1,33,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1925,1,33,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1926,1,33,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1927,1,33,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1928,1,33,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1929,2,33,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1930,2,33,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1931,2,33,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1932,2,33,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1933,2,33,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1934,2,33,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1935,2,33,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1936,2,33,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1937,2,33,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1938,2,33,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1939,2,33,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (1940,3,33,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1941,3,33,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1942,3,33,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1943,3,33,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1944,3,33,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1945,3,33,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1946,3,33,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1947,3,33,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1948,5,33,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (1949,5,33,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (1950,5,33,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (1951,5,33,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (1952,5,33,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (1953,5,33,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (1954,5,33,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1955,5,33,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1956,5,33,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (1957,6,33,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1958,6,33,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1959,6,33,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1960,6,33,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1961,6,33,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1962,6,33,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1963,6,33,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1964,6,33,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1965,7,33,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1966,7,33,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1967,7,33,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1968,7,33,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1969,7,33,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1970,7,33,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1971,7,33,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1972,7,33,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1973,8,33,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1974,8,33,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1975,8,33,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (1976,8,33,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1977,8,33,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1978,8,33,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1979,8,33,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1980,8,33,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1981,1,34,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1982,1,34,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1983,1,34,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1984,1,34,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1985,1,34,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1986,1,34,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (1987,1,34,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1988,1,34,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (1989,2,34,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (1990,2,34,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (1991,2,34,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (1992,2,34,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (1993,2,34,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (1994,2,34,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (1995,2,34,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (1996,2,34,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (1997,2,34,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (1998,2,34,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (1999,2,34,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2000,3,34,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2001,3,34,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2002,3,34,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2003,3,34,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2004,3,34,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2005,3,34,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2006,3,34,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2007,3,34,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2008,5,34,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2009,5,34,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2010,5,34,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2011,5,34,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2012,5,34,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2013,5,34,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2014,5,34,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2015,5,34,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2016,5,34,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2017,6,34,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2018,6,34,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2019,6,34,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2020,6,34,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2021,6,34,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2022,6,34,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2023,6,34,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2024,6,34,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2025,7,34,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2026,7,34,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2027,7,34,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2028,7,34,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2029,7,34,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2030,7,34,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2031,7,34,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2032,7,34,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2033,8,34,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2034,8,34,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2035,8,34,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2036,8,34,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2037,8,34,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2038,8,34,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2039,8,34,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2040,8,34,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2041,1,35,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2042,1,35,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2043,1,35,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2044,1,35,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2045,1,35,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2046,1,35,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2047,1,35,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2048,1,35,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2049,2,35,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2050,2,35,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2051,2,35,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2052,2,35,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2053,2,35,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2054,2,35,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2055,2,35,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2056,2,35,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2057,2,35,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2058,2,35,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2059,2,35,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2060,3,35,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2061,3,35,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2062,3,35,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2063,3,35,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2064,3,35,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2065,3,35,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2066,3,35,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2067,3,35,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2068,5,35,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2069,5,35,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2070,5,35,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2071,5,35,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2072,5,35,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2073,5,35,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2074,5,35,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2075,5,35,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2076,5,35,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2077,6,35,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2078,6,35,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2079,6,35,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2080,6,35,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2081,6,35,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2082,6,35,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2083,6,35,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2084,6,35,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2085,7,35,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2086,7,35,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2087,7,35,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2088,7,35,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2089,7,35,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2090,7,35,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2091,7,35,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2092,7,35,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2093,8,35,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2094,8,35,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2095,8,35,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2096,8,35,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2097,8,35,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2098,8,35,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2099,8,35,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2100,8,35,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2101,1,36,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2102,1,36,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2103,1,36,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2104,1,36,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2105,1,36,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2106,1,36,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2107,1,36,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2108,1,36,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2109,2,36,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2110,2,36,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2111,2,36,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2112,2,36,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2113,2,36,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2114,2,36,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2115,2,36,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2116,2,36,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2117,2,36,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2118,2,36,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2119,2,36,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2120,3,36,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2121,3,36,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2122,3,36,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2123,3,36,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2124,3,36,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2125,3,36,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2126,3,36,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2127,3,36,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2128,5,36,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2129,5,36,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2130,5,36,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2131,5,36,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2132,5,36,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2133,5,36,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2134,5,36,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2135,5,36,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2136,5,36,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2137,6,36,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2138,6,36,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2139,6,36,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2140,6,36,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2141,6,36,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2142,6,36,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2143,6,36,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2144,6,36,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2145,7,36,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2146,7,36,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2147,7,36,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2148,7,36,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2149,7,36,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2150,7,36,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2151,7,36,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2152,7,36,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2153,8,36,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2154,8,36,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2155,8,36,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2156,8,36,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2157,8,36,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2158,8,36,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2159,8,36,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2160,8,36,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2161,1,37,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2162,1,37,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2163,1,37,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2164,1,37,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2165,1,37,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2166,1,37,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2167,1,37,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2168,1,37,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2169,2,37,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2170,2,37,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2171,2,37,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2172,2,37,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2173,2,37,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2174,2,37,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2175,2,37,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2176,2,37,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2177,2,37,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2178,2,37,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2179,2,37,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2180,3,37,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2181,3,37,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2182,3,37,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2183,3,37,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2184,3,37,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2185,3,37,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2186,3,37,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2187,3,37,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2188,5,37,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2189,5,37,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2190,5,37,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2191,5,37,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2192,5,37,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2193,5,37,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2194,5,37,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2195,5,37,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2196,5,37,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2197,6,37,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2198,6,37,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2199,6,37,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2200,6,37,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2201,6,37,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2202,6,37,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2203,6,37,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2204,6,37,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2205,7,37,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2206,7,37,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2207,7,37,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2208,7,37,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2209,7,37,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2210,7,37,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2211,7,37,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2212,7,37,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2213,8,37,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2214,8,37,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2215,8,37,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2216,8,37,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2217,8,37,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2218,8,37,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2219,8,37,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2220,8,37,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2221,1,38,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2222,1,38,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2223,1,38,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2224,1,38,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2225,1,38,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2226,1,38,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2227,1,38,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2228,1,38,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2229,2,38,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2230,2,38,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2231,2,38,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2232,2,38,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2233,2,38,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2234,2,38,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2235,2,38,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2236,2,38,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2237,2,38,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2238,2,38,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2239,2,38,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2240,3,38,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2241,3,38,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2242,3,38,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2243,3,38,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2244,3,38,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2245,3,38,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2246,3,38,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2247,3,38,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2248,5,38,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2249,5,38,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2250,5,38,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2251,5,38,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2252,5,38,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2253,5,38,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2254,5,38,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2255,5,38,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2256,5,38,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2257,6,38,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2258,6,38,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2259,6,38,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2260,6,38,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2261,6,38,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2262,6,38,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2263,6,38,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2264,6,38,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2265,7,38,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2266,7,38,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2267,7,38,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2268,7,38,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2269,7,38,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2270,7,38,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2271,7,38,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2272,7,38,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2273,8,38,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2274,8,38,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2275,8,38,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2276,8,38,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2277,8,38,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2278,8,38,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2279,8,38,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2280,8,38,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2281,1,39,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2282,1,39,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2283,1,39,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2284,1,39,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2285,1,39,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2286,1,39,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2287,1,39,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2288,1,39,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2289,2,39,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2290,2,39,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2291,2,39,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2292,2,39,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2293,2,39,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2294,2,39,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2295,2,39,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2296,2,39,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2297,2,39,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2298,2,39,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2299,2,39,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2300,3,39,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2301,3,39,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2302,3,39,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2303,3,39,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2304,3,39,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2305,3,39,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2306,3,39,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2307,3,39,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2308,5,39,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2309,5,39,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2310,5,39,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2311,5,39,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2312,5,39,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2313,5,39,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2314,5,39,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2315,5,39,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2316,5,39,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2317,6,39,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2318,6,39,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2319,6,39,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2320,6,39,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2321,6,39,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2322,6,39,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2323,6,39,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2324,6,39,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2325,7,39,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2326,7,39,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2327,7,39,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2328,7,39,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2329,7,39,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2330,7,39,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2331,7,39,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2332,7,39,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2333,8,39,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2334,8,39,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2335,8,39,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2336,8,39,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2337,8,39,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2338,8,39,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2339,8,39,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2340,8,39,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2341,1,40,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2342,1,40,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2343,1,40,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2344,1,40,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2345,1,40,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2346,1,40,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2347,1,40,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2348,1,40,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2349,2,40,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2350,2,40,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2351,2,40,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2352,2,40,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2353,2,40,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2354,2,40,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2355,2,40,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2356,2,40,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2357,2,40,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2358,2,40,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2359,2,40,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2360,3,40,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2361,3,40,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2362,3,40,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2363,3,40,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2364,3,40,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2365,3,40,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2366,3,40,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2367,3,40,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2368,5,40,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2369,5,40,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2370,5,40,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2371,5,40,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2372,5,40,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2373,5,40,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2374,5,40,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2375,5,40,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2376,5,40,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2377,6,40,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2378,6,40,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2379,6,40,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2380,6,40,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2381,6,40,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2382,6,40,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2383,6,40,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2384,6,40,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2385,7,40,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2386,7,40,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2387,7,40,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2388,7,40,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2389,7,40,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2390,7,40,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2391,7,40,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2392,7,40,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2393,8,40,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2394,8,40,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2395,8,40,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2396,8,40,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2397,8,40,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2398,8,40,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2399,8,40,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2400,8,40,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2401,1,41,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2402,1,41,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2403,1,41,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2404,1,41,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2405,1,41,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2406,1,41,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2407,1,41,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2408,1,41,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2409,2,41,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2410,2,41,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2411,2,41,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2412,2,41,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2413,2,41,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2414,2,41,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2415,2,41,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2416,2,41,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2417,2,41,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2418,2,41,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2419,2,41,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2420,3,41,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2421,3,41,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2422,3,41,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2423,3,41,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2424,3,41,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2425,3,41,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2426,3,41,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2427,3,41,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2428,5,41,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2429,5,41,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2430,5,41,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2431,5,41,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2432,5,41,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2433,5,41,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2434,5,41,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2435,5,41,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2436,5,41,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2437,6,41,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2438,6,41,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2439,6,41,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2440,6,41,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2441,6,41,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2442,6,41,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2443,6,41,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2444,6,41,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2445,7,41,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2446,7,41,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2447,7,41,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2448,7,41,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2449,7,41,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2450,7,41,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2451,7,41,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2452,7,41,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2453,8,41,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2454,8,41,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2455,8,41,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2456,8,41,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2457,8,41,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2458,8,41,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2459,8,41,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2460,8,41,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2461,1,42,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2462,1,42,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2463,1,42,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2464,1,42,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2465,1,42,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2466,1,42,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2467,1,42,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2468,1,42,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2469,2,42,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2470,2,42,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2471,2,42,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2472,2,42,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2473,2,42,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2474,2,42,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2475,2,42,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2476,2,42,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2477,2,42,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2478,2,42,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2479,2,42,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2480,3,42,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2481,3,42,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2482,3,42,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2483,3,42,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2484,3,42,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2485,3,42,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2486,3,42,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2487,3,42,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2488,5,42,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2489,5,42,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2490,5,42,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2491,5,42,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2492,5,42,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2493,5,42,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2494,5,42,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2495,5,42,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2496,5,42,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2497,6,42,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2498,6,42,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2499,6,42,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2500,6,42,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2501,6,42,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2502,6,42,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2503,6,42,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2504,6,42,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2505,7,42,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2506,7,42,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2507,7,42,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2508,7,42,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2509,7,42,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2510,7,42,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2511,7,42,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2512,7,42,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2513,8,42,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2514,8,42,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2515,8,42,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2516,8,42,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2517,8,42,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2518,8,42,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2519,8,42,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2520,8,42,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2521,1,43,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2522,1,43,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2523,1,43,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2524,1,43,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2525,1,43,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2526,1,43,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2527,1,43,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2528,1,43,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2529,2,43,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2530,2,43,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2531,2,43,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2532,2,43,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2533,2,43,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2534,2,43,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2535,2,43,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2536,2,43,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2537,2,43,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2538,2,43,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2539,2,43,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2540,3,43,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2541,3,43,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2542,3,43,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2543,3,43,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2544,3,43,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2545,3,43,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2546,3,43,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2547,3,43,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2548,5,43,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2549,5,43,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2550,5,43,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2551,5,43,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2552,5,43,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2553,5,43,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2554,5,43,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2555,5,43,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2556,5,43,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2557,6,43,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2558,6,43,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2559,6,43,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2560,6,43,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2561,6,43,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2562,6,43,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2563,6,43,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2564,6,43,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2565,7,43,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2566,7,43,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2567,7,43,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2568,7,43,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2569,7,43,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2570,7,43,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2571,7,43,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2572,7,43,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2573,8,43,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2574,8,43,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2575,8,43,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2576,8,43,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2577,8,43,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2578,8,43,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2579,8,43,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2580,8,43,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2581,1,44,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2582,1,44,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2583,1,44,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2584,1,44,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2585,1,44,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2586,1,44,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2587,1,44,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2588,1,44,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2589,2,44,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2590,2,44,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2591,2,44,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2592,2,44,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2593,2,44,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2594,2,44,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2595,2,44,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2596,2,44,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2597,2,44,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2598,2,44,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2599,2,44,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2600,3,44,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2601,3,44,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2602,3,44,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2603,3,44,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2604,3,44,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2605,3,44,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2606,3,44,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2607,3,44,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2608,5,44,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2609,5,44,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2610,5,44,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2611,5,44,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2612,5,44,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2613,5,44,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2614,5,44,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2615,5,44,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2616,5,44,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2617,6,44,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2618,6,44,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2619,6,44,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2620,6,44,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2621,6,44,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2622,6,44,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2623,6,44,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2624,6,44,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2625,7,44,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2626,7,44,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2627,7,44,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2628,7,44,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2629,7,44,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2630,7,44,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2631,7,44,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2632,7,44,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2633,8,44,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2634,8,44,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2635,8,44,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2636,8,44,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2637,8,44,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2638,8,44,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2639,8,44,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2640,8,44,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2641,1,45,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2642,1,45,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2643,1,45,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2644,1,45,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2645,1,45,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2646,1,45,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2647,1,45,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2648,1,45,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2649,2,45,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2650,2,45,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2651,2,45,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2652,2,45,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2653,2,45,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2654,2,45,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2655,2,45,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2656,2,45,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2657,2,45,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2658,2,45,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2659,2,45,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2660,3,45,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2661,3,45,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2662,3,45,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2663,3,45,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2664,3,45,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2665,3,45,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2666,3,45,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2667,3,45,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2668,5,45,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2669,5,45,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2670,5,45,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2671,5,45,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2672,5,45,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2673,5,45,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2674,5,45,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2675,5,45,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2676,5,45,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2677,6,45,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2678,6,45,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2679,6,45,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2680,6,45,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2681,6,45,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2682,6,45,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2683,6,45,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2684,6,45,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2685,7,45,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2686,7,45,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2687,7,45,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2688,7,45,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2689,7,45,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2690,7,45,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2691,7,45,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2692,7,45,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2693,8,45,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2694,8,45,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2695,8,45,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2696,8,45,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2697,8,45,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2698,8,45,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2699,8,45,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2700,8,45,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2701,1,46,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2702,1,46,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2703,1,46,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2704,1,46,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2705,1,46,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2706,1,46,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2707,1,46,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2708,1,46,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2709,2,46,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2710,2,46,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2711,2,46,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2712,2,46,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2713,2,46,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2714,2,46,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2715,2,46,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2716,2,46,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2717,2,46,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2718,2,46,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2719,2,46,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2720,3,46,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2721,3,46,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2722,3,46,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2723,3,46,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2724,3,46,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2725,3,46,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2726,3,46,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2727,3,46,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2728,5,46,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2729,5,46,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2730,5,46,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2731,5,46,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2732,5,46,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2733,5,46,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2734,5,46,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2735,5,46,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2736,5,46,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2737,6,46,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2738,6,46,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2739,6,46,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2740,6,46,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2741,6,46,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2742,6,46,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2743,6,46,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2744,6,46,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2745,7,46,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2746,7,46,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2747,7,46,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2748,7,46,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2749,7,46,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2750,7,46,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2751,7,46,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2752,7,46,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2753,8,46,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2754,8,46,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2755,8,46,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2756,8,46,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2757,8,46,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2758,8,46,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2759,8,46,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2760,8,46,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2761,1,47,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2762,1,47,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2763,1,47,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2764,1,47,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2765,1,47,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2766,1,47,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2767,1,47,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2768,1,47,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2769,2,47,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2770,2,47,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2771,2,47,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2772,2,47,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2773,2,47,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2774,2,47,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2775,2,47,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2776,2,47,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2777,2,47,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2778,2,47,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2779,2,47,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2780,3,47,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2781,3,47,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2782,3,47,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2783,3,47,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2784,3,47,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2785,3,47,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2786,3,47,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2787,3,47,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2788,5,47,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2789,5,47,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2790,5,47,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2791,5,47,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2792,5,47,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2793,5,47,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2794,5,47,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2795,5,47,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2796,5,47,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2797,6,47,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2798,6,47,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2799,6,47,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2800,6,47,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2801,6,47,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2802,6,47,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2803,6,47,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2804,6,47,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2805,7,47,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2806,7,47,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2807,7,47,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2808,7,47,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2809,7,47,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2810,7,47,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2811,7,47,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2812,7,47,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2813,8,47,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2814,8,47,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2815,8,47,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2816,8,47,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2817,8,47,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2818,8,47,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2819,8,47,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2820,8,47,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2821,1,48,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2822,1,48,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2823,1,48,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2824,1,48,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2825,1,48,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2826,1,48,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2827,1,48,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2828,1,48,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2829,2,48,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2830,2,48,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2831,2,48,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2832,2,48,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2833,2,48,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2834,2,48,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2835,2,48,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2836,2,48,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2837,2,48,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2838,2,48,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2839,2,48,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2840,3,48,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2841,3,48,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2842,3,48,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2843,3,48,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2844,3,48,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2845,3,48,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2846,3,48,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2847,3,48,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2848,5,48,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2849,5,48,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2850,5,48,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2851,5,48,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2852,5,48,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2853,5,48,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2854,5,48,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2855,5,48,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2856,5,48,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2857,6,48,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2858,6,48,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2859,6,48,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2860,6,48,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2861,6,48,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2862,6,48,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2863,6,48,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2864,6,48,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2865,7,48,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2866,7,48,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2867,7,48,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2868,7,48,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2869,7,48,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2870,7,48,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2871,7,48,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2872,7,48,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2873,8,48,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2874,8,48,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2875,8,48,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2876,8,48,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2877,8,48,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2878,8,48,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2879,8,48,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2880,8,48,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2881,1,49,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2882,1,49,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2883,1,49,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2884,1,49,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2885,1,49,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2886,1,49,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2887,1,49,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2888,1,49,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2889,2,49,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2890,2,49,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2891,2,49,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2892,2,49,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2893,2,49,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2894,2,49,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2895,2,49,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2896,2,49,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2897,2,49,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2898,2,49,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2899,2,49,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2900,3,49,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2901,3,49,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2902,3,49,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2903,3,49,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2904,3,49,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2905,3,49,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2906,3,49,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2907,3,49,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2908,5,49,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2909,5,49,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2910,5,49,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2911,5,49,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2912,5,49,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2913,5,49,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2914,5,49,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2915,5,49,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2916,5,49,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2917,6,49,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2918,6,49,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2919,6,49,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2920,6,49,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2921,6,49,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2922,6,49,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2923,6,49,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2924,6,49,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2925,7,49,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2926,7,49,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2927,7,49,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2928,7,49,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2929,7,49,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2930,7,49,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2931,7,49,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2932,7,49,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2933,8,49,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2934,8,49,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2935,8,49,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2936,8,49,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2937,8,49,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2938,8,49,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2939,8,49,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2940,8,49,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2941,1,50,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2942,1,50,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2943,1,50,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2944,1,50,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2945,1,50,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2946,1,50,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2947,1,50,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2948,1,50,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2949,2,50,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (2950,2,50,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2951,2,50,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2952,2,50,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (2953,2,50,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2954,2,50,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2955,2,50,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (2956,2,50,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2957,2,50,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2958,2,50,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2959,2,50,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (2960,3,50,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2961,3,50,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2962,3,50,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2963,3,50,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2964,3,50,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2965,3,50,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (2966,3,50,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2967,3,50,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2968,5,50,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (2969,5,50,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (2970,5,50,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (2971,5,50,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (2972,5,50,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (2973,5,50,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (2974,5,50,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2975,5,50,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (2976,5,50,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (2977,6,50,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2978,6,50,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2979,6,50,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2980,6,50,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2981,6,50,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2982,6,50,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2983,6,50,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2984,6,50,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2985,7,50,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2986,7,50,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2987,7,50,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2988,7,50,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2989,7,50,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2990,7,50,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2991,7,50,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (2992,7,50,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (2993,8,50,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (2994,8,50,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (2995,8,50,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (2996,8,50,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (2997,8,50,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (2998,8,50,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (2999,8,50,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3000,8,50,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3001,1,51,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3002,1,51,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3003,1,51,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3004,1,51,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3005,1,51,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3006,1,51,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3007,1,51,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3008,1,51,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3009,2,51,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (3010,2,51,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3011,2,51,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3012,2,51,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3013,2,51,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3014,2,51,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3015,2,51,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (3016,2,51,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3017,2,51,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3018,2,51,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3019,2,51,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (3020,3,51,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3021,3,51,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3022,3,51,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3023,3,51,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3024,3,51,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3025,3,51,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3026,3,51,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3027,3,51,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3028,5,51,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (3029,5,51,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (3030,5,51,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (3031,5,51,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (3032,5,51,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (3033,5,51,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3034,5,51,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3035,5,51,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3036,5,51,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (3037,6,51,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3038,6,51,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3039,6,51,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3040,6,51,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3041,6,51,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3042,6,51,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3043,6,51,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3044,6,51,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3045,7,51,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3046,7,51,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3047,7,51,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3048,7,51,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3049,7,51,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3050,7,51,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3051,7,51,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3052,7,51,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3053,8,51,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3054,8,51,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3055,8,51,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3056,8,51,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3057,8,51,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3058,8,51,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3059,8,51,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3060,8,51,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3061,1,52,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3062,1,52,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3063,1,52,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3064,1,52,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3065,1,52,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3066,1,52,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3067,1,52,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3068,1,52,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3069,2,52,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (3070,2,52,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3071,2,52,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3072,2,52,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3073,2,52,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3074,2,52,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3075,2,52,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (3076,2,52,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3077,2,52,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3078,2,52,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3079,2,52,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (3080,3,52,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3081,3,52,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3082,3,52,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3083,3,52,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3084,3,52,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3085,3,52,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3086,3,52,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3087,3,52,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3088,5,52,'Limit Per Person','1','$500');
	INSERT INTO ca_liability_limit_code  VALUES (3089,5,52,'Limit Per Person','2','$750');
	INSERT INTO ca_liability_limit_code  VALUES (3090,5,52,'Limit Per Person','3','$1,000');
	INSERT INTO ca_liability_limit_code  VALUES (3091,5,52,'Limit Per Person','4','$2,000');
	INSERT INTO ca_liability_limit_code  VALUES (3092,5,52,'Limit Per Person','5','$3,000');
	INSERT INTO ca_liability_limit_code  VALUES (3093,5,52,'Limit Per Person','6','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3094,5,52,'Limit Per Person','7','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3095,5,52,'Limit Per Person','8','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3096,5,52,'Limit Per Person','9','$25,000 and over');
	INSERT INTO ca_liability_limit_code  VALUES (3097,6,52,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3098,6,52,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3099,6,52,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3100,6,52,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3101,6,52,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3102,6,52,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3103,6,52,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3104,6,52,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3105,7,52,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3106,7,52,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3107,7,52,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3108,7,52,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3109,7,52,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3110,7,52,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3111,7,52,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3112,7,52,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3113,8,52,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3114,8,52,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3115,8,52,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3116,8,52,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3117,8,52,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3118,8,52,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3119,8,52,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3120,8,52,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3121,1,29,'Limits','0','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3122,1,29,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3123,1,29,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3124,1,29,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3125,1,29,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3126,1,29,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3127,1,29,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3128,1,29,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3129,1,29,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3130,2,29,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (3131,2,29,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3132,2,29,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3133,2,29,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3134,2,29,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3135,2,29,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3136,2,29,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (3137,2,29,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3138,2,29,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3139,2,29,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3140,2,29,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (3141,3,29,'Limits','0','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3142,3,29,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3143,3,29,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3144,3,29,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3145,3,29,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3146,3,29,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3147,3,29,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3148,3,29,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3149,3,29,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3150,6,29,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3151,6,29,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3152,6,29,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3153,6,29,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3154,6,29,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3155,6,29,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3156,6,29,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3157,6,29,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3158,6,29,'Per Person/Per Accident','9','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3159,7,29,'Limit','1','$35,000');
	INSERT INTO ca_liability_limit_code  VALUES (3160,7,29,'Limit','2','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3161,7,29,'Limit','4','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3162,7,29,'Limit','6','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3163,7,29,'Limit','7','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3164,8,29,'Limit','1','$35,000');
	INSERT INTO ca_liability_limit_code  VALUES (3165,8,29,'Limit','2','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3166,8,29,'Limit','4','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3167,8,29,'Limit','6','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3168,8,29,'Limit','7','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3169,1,37,'Limits','0','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3170,1,37,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3171,1,37,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3172,1,37,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3173,1,37,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3174,1,37,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3175,1,37,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3176,1,37,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3177,1,37,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3178,2,37,'State Statutory Basic Limits Through','0','$5,000 or less');
	INSERT INTO ca_liability_limit_code  VALUES (3179,2,37,'State Statutory Basic Limits Through','1','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3180,2,37,'State Statutory Basic Limits Through','2','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3181,2,37,'State Statutory Basic Limits Through','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3182,2,37,'State Statutory Basic Limits Through','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3183,2,37,'State Statutory Basic Limits Through','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3184,2,37,'State Statutory Basic Limits Through','6','$250,000');
	INSERT INTO ca_liability_limit_code  VALUES (3185,2,37,'State Statutory Basic Limits Through','7','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3186,2,37,'State Statutory Basic Limits Through','8','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3187,2,37,'State Statutory Basic Limits Through','A','$20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3188,2,37,'State Statutory Basic Limits Through','B','$40,000');
	INSERT INTO ca_liability_limit_code  VALUES (3189,17,37,'Limits','0','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3190,17,37,'Limits','1','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3191,17,37,'Limits','2','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3192,17,37,'Limits','3','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3193,17,37,'Limits','4','$250,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3194,17,37,'Limits','5','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3195,17,37,'Limits','6','$300,000/600,000');
	INSERT INTO ca_liability_limit_code  VALUES (3196,17,37,'Limits','7','$500,000/1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3197,17,37,'Limits','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3198,15,37,'Limit Per Person','1','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3199,15,37,'Limit Per Person','2','$300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3200,15,37,'Limit Per Person','3','$500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3201,15,37,'Limit Per Person','4','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3202,6,37,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3203,6,37,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3204,6,37,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3205,6,37,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3206,6,37,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3207,6,37,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3208,6,37,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3209,6,37,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3210,7,37,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3211,7,37,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3212,7,37,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3213,7,37,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3214,7,37,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3215,7,37,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3216,7,37,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3217,7,37,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3218,8,37,'Per Person/Per Accident','1','$5,000/10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3219,8,37,'Per Person/Per Accident','2','$10,000/20,000');
	INSERT INTO ca_liability_limit_code  VALUES (3220,8,37,'Per Person/Per Accident','3','$15,000/30,000');
	INSERT INTO ca_liability_limit_code  VALUES (3221,8,37,'Per Person/Per Accident','4','$25,000/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3222,8,37,'Per Person/Per Accident','5','$50,000/100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3223,8,37,'Per Person/Per Accident','6','$100,000/300,000');
	INSERT INTO ca_liability_limit_code  VALUES (3224,8,37,'Per Person/Per Accident','7','$300,000/500,000');
	INSERT INTO ca_liability_limit_code  VALUES (3225,8,37,'Per Person/Per Accident','8','$1,000,000');
	INSERT INTO ca_liability_limit_code  VALUES (3226,19,37,'Limits','1','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3227,19,37,'Limits','2','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3228,19,37,'Limits','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3229,19,37,'Limits','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3230,19,37,'Limits','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3231,28,37,'Limits','1','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3232,28,37,'Limits','2','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3233,28,37,'Limits','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3234,28,37,'Limits','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3235,28,37,'Limits','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3236,22,37,'Limits','1','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3237,22,37,'Limits','2','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3238,22,37,'Limits','3','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3239,22,37,'Limits','4','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3240,29,37,'Limits','1','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3241,29,37,'Limits','2','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3242,29,37,'Limits','3','$15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3243,29,37,'Limits','4','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3244,20,37,'Limits','1','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3245,20,37,'Limits','2','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3246,20,37,'Limits','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3247,20,37,'Limits','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3248,20,37,'Limits','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3249,27,37,'Limits','1','$5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3250,27,37,'Limits','2','$10,000');
	INSERT INTO ca_liability_limit_code  VALUES (3251,27,37,'Limits','3','$25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3252,27,37,'Limits','4','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3253,27,37,'Limits','5','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3254,23,37,'Limits','1','$1,500');
	INSERT INTO ca_liability_limit_code  VALUES (3255,23,37,'Limits','2','$2,500');
	INSERT INTO ca_liability_limit_code  VALUES (3256,30,37,'Limits','1','$1,500');
	INSERT INTO ca_liability_limit_code  VALUES (3257,30,37,'Limits','2','$2,500');
	INSERT INTO ca_liability_limit_code  VALUES (3258,21,37,'Limits','1','$1,000/5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3259,21,37,'Limits','2','$1,000/15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3260,21,37,'Limits','3','$1,500/25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3261,21,37,'Limits','4','$2,500/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3262,28,37,'Limits','1','$1,000/5,000');
	INSERT INTO ca_liability_limit_code  VALUES (3263,28,37,'Limits','2','$1,000/15,000');
	INSERT INTO ca_liability_limit_code  VALUES (3264,28,37,'Limits','3','$1,500/25,000');
	INSERT INTO ca_liability_limit_code  VALUES (3265,28,37,'Limits','4','$2,500/50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3266,24,37,'Limits','1','$12,500');
	INSERT INTO ca_liability_limit_code  VALUES (3267,24,37,'Limits','2','$17,500');
	INSERT INTO ca_liability_limit_code  VALUES (3268,24,37,'Limits','3','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3269,24,37,'Limits','4','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3270,24,37,'Limits','5','$177,500');
	INSERT INTO ca_liability_limit_code  VALUES (3271,24,37,'Limits','6','$200,000');
	INSERT INTO ca_liability_limit_code  VALUES (3272,24,37,'Limits','7','$277,500');
	INSERT INTO ca_liability_limit_code  VALUES (3273,25,37,'Limits','1','$12,500');
	INSERT INTO ca_liability_limit_code  VALUES (3274,25,37,'Limits','2','$17,500');
	INSERT INTO ca_liability_limit_code  VALUES (3275,25,37,'Limits','3','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3276,25,37,'Limits','4','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3277,25,37,'Limits','5','$177,500');
	INSERT INTO ca_liability_limit_code  VALUES (3278,25,37,'Limits','6','$200,000');
	INSERT INTO ca_liability_limit_code  VALUES (3279,25,37,'Limits','7','$277,500');
	INSERT INTO ca_liability_limit_code  VALUES (3280,31,37,'Limits','1','$12,500');
	INSERT INTO ca_liability_limit_code  VALUES (3281,31,37,'Limits','2','$17,500');
	INSERT INTO ca_liability_limit_code  VALUES (3282,31,37,'Limits','3','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3283,31,37,'Limits','4','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3284,31,37,'Limits','5','$177,500');
	INSERT INTO ca_liability_limit_code  VALUES (3285,31,37,'Limits','6','$200,000');
	INSERT INTO ca_liability_limit_code  VALUES (3286,31,37,'Limits','7','$277,500');
	INSERT INTO ca_liability_limit_code  VALUES (3287,32,37,'Limits','1','$12,500');
	INSERT INTO ca_liability_limit_code  VALUES (3288,32,37,'Limits','2','$17,500');
	INSERT INTO ca_liability_limit_code  VALUES (3289,32,37,'Limits','3','$50,000');
	INSERT INTO ca_liability_limit_code  VALUES (3290,32,37,'Limits','4','$100,000');
	INSERT INTO ca_liability_limit_code  VALUES (3291,32,37,'Limits','5','$177,500');
	INSERT INTO ca_liability_limit_code  VALUES (3292,32,37,'Limits','6','$200,000');
	INSERT INTO ca_liability_limit_code  VALUES (3293,32,37,'Limits','7','$277,500');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_vehicle_use_code (
    id INT,
    code VARCHAR,
    use VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_vehicle_use_code) THEN 
    INSERT INTO ca_vehicle_use_code VALUES(1,'0','Not Applicable to Commercial Automobile policies','Does Not Apply');
    INSERT INTO ca_vehicle_use_code VALUES(2,'1','Work/School','Under 15 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(3,'2','Work/School','Over 15 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(4,'3','Pleasure','Under 7500 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(5,'4','Pleasure','Over 7500 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(6,'5','Business','No Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(7,'6','Business','Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(8,'7','Farm','No Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(9,'8','Farm','Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(10,'9','Error!-showed up in data/does not exist in stat plan','Error!-showed up in data/does not exist in stat plan');
    INSERT INTO ca_vehicle_use_code VALUES(11,'B','Business','Operator Age Unspecified');
    INSERT INTO ca_vehicle_use_code VALUES(12,'F','Farm','Operator Age Unspecified');
END IF;
END $$;



DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_um_uim_stacking_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_um_uim_stacking_code) THEN 
    INSERT INTO ca_um_uim_stacking_code VALUES(1,'1','UM and/or UIM limits stacked (per vehicle)');
    INSERT INTO ca_um_uim_stacking_code VALUES(2,'2','UM and/or UIM limits non-stacked (per policy)');
END IF;
END $$;



DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_terrorism_indicator_code) THEN 
    INSERT INTO ca_terrorism_indicator_code VALUES(1,'7','Certified acts of terrorism not excluded');
    INSERT INTO ca_terrorism_indicator_code VALUES(2,'8','Certified acts of terrorism excluded');
END IF;
END $$;



DO $$
BEGIN 

CREATE TABLE IF NOT EXISTS ca_state_exception_category_code (
    id int,
    name VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);
    
CREATE TABLE IF NOT EXISTS ca_state_exception_code (
    id INT,
    fk_state_exception_category_id INT,
    fk_state_id INT,
    code VARCHAR,
    name VARCHAR, 
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
    );
    
IF NOT EXISTS (SELECT * FROM ca_state_exception_category_code) THEN
   INSERT INTO ca_state_exception_category_code (id, name) values (1,'stateExceptionA');
   INSERT INTO ca_state_exception_category_code (id, name) values (2,'stateExceptionB');
   INSERT INTO ca_state_exception_category_code (id, name) values (3,'stateExceptionC');
   INSERT INTO ca_state_exception_category_code (id, name) values (4,'stateExceptionCCWIP');
END IF;

IF NOT EXISTS (SELECT * FROM ca_state_exception_code) THEN
   INSERT INTO ca_state_exception_code VALUES (1,1,16,'01','Tort Limitation','No rejection of tort limitation - Residual Bodily Injury record only');
   INSERT INTO ca_state_exception_code VALUES (2,1,16,'02','Tort Limitation','All other liability records');
   INSERT INTO ca_state_exception_code VALUES (3,1,21,'03','Intrastate Interstate','Vehicles written on an intrastate basis');
   INSERT INTO ca_state_exception_code VALUES (4,1,21,'04','Intrastate Interstate','Vehicles written on an interstate basis');
   INSERT INTO ca_state_exception_code VALUES (5,1,29,'99','Threshold Tort Limitation','Liability with Unknown Threshold/Tort Limitation');
   INSERT INTO ca_state_exception_code VALUES (6,1,29,'04','Threshold Tort Limitation','No Threshold/No Tort Limitation');
   INSERT INTO ca_state_exception_code VALUES (7,1,29,'05','Threshold Tort Limitation','Verbal Threshold/Tort Limitation');
   INSERT INTO ca_state_exception_code VALUES (8,1,29,'06','Threshold Tort Limitation','No Threshold/No Tort Limitation');
   INSERT INTO ca_state_exception_code VALUES (9,1,29,'08','Threshold Tort Limitation','Verbal Threshold/Tort Limitation');
   INSERT INTO ca_state_exception_code VALUES (10,1,29,'07','Threshold Tort Limitation','No Threshold/No Tort Limitation');
   INSERT INTO ca_state_exception_code VALUES (11,1,29,'09','Threshold Tort Limitation','Verbal Threshold/Tort Limitation');
   INSERT INTO ca_state_exception_code VALUES (12,1,31,'01','Accident Prevention Credit','Vehicle with accident prevention credit');
   INSERT INTO ca_state_exception_code VALUES (13,1,31,'02','Accident Prevention Credit','Vehicle without accident prevention credit');
   INSERT INTO ca_state_exception_code VALUES (14,1,37,'04','Tort Limitation','Full Tort selected by the insured');
   INSERT INTO ca_state_exception_code VALUES (15,1,37,'05','Tort Limitation','Limited Tort selected by insured');
   INSERT INTO ca_state_exception_code VALUES (16,1,39,'01','SC Reinsurance Facility','Business written under the S.C.R.F. and ceded to S.C.R.F.');
   INSERT INTO ca_state_exception_code VALUES (17,1,39,'02','SC Reinsurance Facility','Business written under the S.C.R.F. and retained by the company');
   INSERT INTO ca_state_exception_code VALUES (18,1,39,'09','SC Reinsurance Facility','Business not written under the S.C.R.F.');
   INSERT INTO ca_state_exception_code VALUES (19,2,29,'17','Multi Car Risks','Principal Automobile - Not Discounted');
   INSERT INTO ca_state_exception_code VALUES (20,2,29,'27','Multi Car Risks','Additional Automobile(s) - Discounted');
   INSERT INTO ca_state_exception_code VALUES (21,2,29,'37','Multi Car Risks','All Other Automobiles');
   INSERT INTO ca_state_exception_code VALUES (22,2,29,'47','Multi Car Risks','The number of automobiles insured by the same insurer exceeds the number of licensed drivers customarily operating such automobiles.');
   INSERT INTO ca_state_exception_code VALUES (23,2,31,'99','Primary No Fault Health Plan','Unknown');
   INSERT INTO ca_state_exception_code VALUES (24,2,31,'01','Primary No Fault Health Plan','Employer s work loss plan primary');
   INSERT INTO ca_state_exception_code VALUES (25,2,31,'02','Primary No Fault Health Plan','Medicare primary');
   INSERT INTO ca_state_exception_code VALUES (26,2,31,'03','Primary No Fault Health Plan','No basic PIP medical expense because medical coverage is provided under an approved health plan');
   INSERT INTO ca_state_exception_code VALUES (27,2,31,'04','Primary No Fault Health Plan','Employer s work loss plan and medicare coordination, both primary');
   INSERT INTO ca_state_exception_code VALUES (28,2,31,'05','Primary No Fault Health Plan','Employer s work loss plan primary with no basic PIP medical expense because medical coverage is provided under an approved health plan');
   INSERT INTO ca_state_exception_code VALUES (29,2,31,'09','Primary No Fault Health Plan','PIP is primary insurance');
   INSERT INTO ca_state_exception_code VALUES (30,2,37,'00','55 And Over Discount','Not Applicable');
   INSERT INTO ca_state_exception_code VALUES (31,2,37,'05','55 And Over Discount',' 55 & Over  discount for successful completion of PA certified training course.');
   INSERT INTO ca_state_exception_code VALUES (32,3,29,'01','Engine Size','0 - 50 cc');
   INSERT INTO ca_state_exception_code VALUES (33,3,29,'02','Engine Size','51 - 100 cc');
   INSERT INTO ca_state_exception_code VALUES (34,3,29,'03','Engine Size','101 - 200 cc');
   INSERT INTO ca_state_exception_code VALUES (35,3,29,'04','Engine Size','201 - 360 cc');
   INSERT INTO ca_state_exception_code VALUES (36,3,29,'05','Engine Size','361 - 500 cc');
   INSERT INTO ca_state_exception_code VALUES (37,3,29,'06','Engine Size','501 - 800 cc');
   INSERT INTO ca_state_exception_code VALUES (38,3,29,'07','Engine Size','801 -1000 cc');
   INSERT INTO ca_state_exception_code VALUES (39,3,29,'08','Engine Size','Over 1000 cc Passenger');
   INSERT INTO ca_state_exception_code VALUES (40,3,29,'09','Engine Size','Hazard excluded');
END IF; 
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_single_multi_car_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_single_multi_car_code) THEN 
    INSERT INTO ca_single_multi_car_code VALUES(1,'1','Single Car Rated');
    INSERT INTO ca_single_multi_car_code VALUES(2,'2','Multi-Car Rated');
    INSERT INTO ca_single_multi_car_code VALUES(3,'9','Not Applicable');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_sex_and_marital_status_code (
    id INT,
    code VARCHAR,
    marital_status VARCHAR,
    gender VARCHAR,
    principal_secondary VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_sex_and_marital_status_code) THEN 
    INSERT INTO ca_sex_and_marital_status_code VALUES(1,'0','Not Applicable to Commercial Automobile policies','Not Applicable to Commercial Automobile policies','Not Applicable to Commercial Automobile policies');
    INSERT INTO ca_sex_and_marital_status_code VALUES(2,'1','Married','Male','Does Not Apply');
    INSERT INTO ca_sex_and_marital_status_code VALUES(3,'2','Single','Male','Principal');
    INSERT INTO ca_sex_and_marital_status_code VALUES(4,'3','Single','Male','Secondary');
    INSERT INTO ca_sex_and_marital_status_code VALUES(5,'4','Married','Female','Does Not Apply');
    INSERT INTO ca_sex_and_marital_status_code VALUES(6,'5','Single','Female','Principal');
    INSERT INTO ca_sex_and_marital_status_code VALUES(7,'6','Single','Female','Secondary');
    INSERT INTO ca_sex_and_marital_status_code VALUES(8,'7','Married','Does Not Apply','Does Not Apply');
    INSERT INTO ca_sex_and_marital_status_code VALUES(9,'8','Single','Does Not Apply','Does Not Apply');
END IF;
END $$;



DO $$
BEGIN
CREATE TABLE IF NOT EXISTS openidl_lob_code (
    id INT,
    name VARCHAR,
    code VARCHAR,
    description VARCHAR,
	aais_code VARCHAR,
	aais_subline VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM openidl_lob_code) THEN
    INSERT INTO openidl_lob_code(id,name,aais_code,aais_subline) VALUES(1,'Personal Auto','56','1');
    INSERT INTO openidl_lob_code(id,name,aais_code,aais_subline) VALUES(2,'Commercial Auto','56','2');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_commercial_automobile_use_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_commercial_automobile_use_code) THEN 
    INSERT INTO ca_commercial_automobile_use_code VALUES(1,'1','Service — 50 miles or less');
    INSERT INTO ca_commercial_automobile_use_code VALUES(2,'2','Service — 51 - 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(3,'3','Service — over 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(4,'4','Retail — 50 miles or less');
    INSERT INTO ca_commercial_automobile_use_code VALUES(5,'5','Retail — 51 - 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(6,'6','Retail — over 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(7,'7','Commercial — 50 miles or less');
    INSERT INTO ca_commercial_automobile_use_code VALUES(8,'8','Commercial — 51 - 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(9,'9','Commercial — over 200 miles');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_pool_affiliation_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_pool_affiliation_code) THEN 
    INSERT INTO ca_pool_affiliation_code VALUES(1,'1','Preferred Risk');
    INSERT INTO ca_pool_affiliation_code VALUES(2,'3','Standard risk not written in a pool, JUA or assigned risk facility, etc., and not shared with another company.');
    INSERT INTO ca_pool_affiliation_code VALUES(3,'4','Standard risk written in a pool, JUA or assigned risk facility, etc.');
    INSERT INTO ca_pool_affiliation_code VALUES(4,'5','Substandard risk not written in a pool, JUA or assigned risk facility, etc., and not shared with another company.');
    INSERT INTO ca_pool_affiliation_code VALUES(5,'6','Substandard risk written in a pool, JUA or assigned risk facility, etc.');
    INSERT INTO ca_pool_affiliation_code VALUES(6,'8','Servicing carrier');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_body_size_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_body_size_code) THEN 
    INSERT INTO ca_body_size_code VALUES(1,'1','Private Passenger');
    INSERT INTO ca_body_size_code VALUES(2,'2','Sports Car');
    INSERT INTO ca_body_size_code VALUES(3,'3','Oversized Car or Limousine');
    INSERT INTO ca_body_size_code VALUES(4,'4','Light Truck (10,000 lbs. or less empty weight) or Bus');
    INSERT INTO ca_body_size_code VALUES(5,'5','Medium Truck (10,001 - 20,000 lbs. empty weight)');
    INSERT INTO ca_body_size_code VALUES(6,'6','Heavy Truck (20,001 - 45,000 lbs. empty weight)');
    INSERT INTO ca_body_size_code VALUES(7,'7','Extra Heavy Truck (Over 45,000 lbs. empty weight)');
    INSERT INTO ca_body_size_code VALUES(8,'9','All Other');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_body_style_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_body_style_code) THEN 
    INSERT INTO ca_body_style_code VALUES(1,'10','Campers and Travel Trailers');
    INSERT INTO ca_body_style_code VALUES(2,'11','Dune Buggies');
    INSERT INTO ca_body_style_code VALUES(3,'12','All Terrain Vehicles');
    INSERT INTO ca_body_style_code VALUES(4,'13','Antique Autos');
    INSERT INTO ca_body_style_code VALUES(5,'14','Amphibious Autos');
    INSERT INTO ca_body_style_code VALUES(6,'15','Snowmobiles');
    INSERT INTO ca_body_style_code VALUES(7,'16','Golf Carts');
    INSERT INTO ca_body_style_code VALUES(8,'17','Motorcycles, Motorscooters, Motorbikes, Trail Bikes and Mopeds');
    INSERT INTO ca_body_style_code VALUES(9,'18','Named Non-owner');
    INSERT INTO ca_body_style_code VALUES(10,'19','Sedan 2-door');
    INSERT INTO ca_body_style_code VALUES(11,'20','Sedan 4-door');
    INSERT INTO ca_body_style_code VALUES(12,'21','Semitrailer');
    INSERT INTO ca_body_style_code VALUES(13,'22','Trailer');
    INSERT INTO ca_body_style_code VALUES(14,'23','Trailer - Service or Utility');
    INSERT INTO ca_body_style_code VALUES(15,'24','Truck Tractor (Including Semitractors)');
    INSERT INTO ca_body_style_code VALUES(16,'25','Dump Trucks');
    INSERT INTO ca_body_style_code VALUES(17,'30','Taxis, Limousines or Van Pools');
    INSERT INTO ca_body_style_code VALUES(18,'99','All Other');
    INSERT INTO ca_body_style_code VALUES(19,'01','Sedan (2 or 4 door)*');
    INSERT INTO ca_body_style_code VALUES(20,'02','Station Wagon');
    INSERT INTO ca_body_style_code VALUES(21,'03','Convertible');
    INSERT INTO ca_body_style_code VALUES(22,'04','Vans — Passenger');
    INSERT INTO ca_body_style_code VALUES(23,'05','Vans — Cargo');
    INSERT INTO ca_body_style_code VALUES(24,'06','Pick-Up or Panel Truck');
    INSERT INTO ca_body_style_code VALUES(25,'07','Buses');
    INSERT INTO ca_body_style_code VALUES(26,'08','Truck (Not including Truck Tractors or Dump Trucks)');
    INSERT INTO ca_body_style_code VALUES(27,'09','Motor Homes and Auto Homes (self-propelled)');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_deductible_amount_code) THEN 
    INSERT INTO ca_deductible_amount_code VALUES(1,'0','No Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(2,'1','$50 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(3,'2','$100 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(4,'3','$200 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(5,'4','$250 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(6,'5','$500 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(7,'6','$1,000 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(8,'7','$1,500 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(9,'8','$2,000 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(10,'9','All Other');
    INSERT INTO ca_deductible_amount_code VALUES(11,'A','$25 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(12,'B','$150 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(13,'C','$300 Deductible');
    INSERT INTO ca_deductible_amount_code VALUES(14,'D','$750 Deductible');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_defensive_driver_discount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_defensive_driver_discount_code) THEN 
    INSERT INTO ca_defensive_driver_discount_code VALUES(1,'1','Defensive driver discount applied to this coverage.');
    INSERT INTO ca_defensive_driver_discount_code VALUES(2,'2','Driver does not qualify for the defensive driver discount available on this coverage.');
    INSERT INTO ca_defensive_driver_discount_code VALUES(3,'9','Not Applicable - Program does not offer a defensive driver discount on this coverage.');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_experienced_rating_modification_factor_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_experienced_rating_modification_factor_code) THEN 
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(1,'100','None');
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(2,'090','.900');
    INSERT INTO ca_experienced_rating_modification_factor_code VALUES(3,'067','.665');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_limited_coding_loss_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_limited_coding_loss_transaction_code) THEN 
    INSERT INTO ca_limited_coding_loss_transaction_code VALUES(1,'Y','Loss Limited Coding (includes Paid Loss Limited Coding and Outstanding Loss Limited Coding)');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nc_program_enhancement_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_nc_program_enhancement_code) THEN 
    INSERT INTO ca_nc_program_enhancement_code VALUES(1,'0','Not an enhanced endorsement');
    INSERT INTO ca_nc_program_enhancement_code VALUES(2,'1','Enhanced Endorsement');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_operator_age_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_operator_age_code) THEN 
    INSERT INTO ca_operator_age_code VALUES(1,'0','Not applicable to Commercial Automobile policies');
    INSERT INTO ca_operator_age_code VALUES(2,'1','17 and Under');
    INSERT INTO ca_operator_age_code VALUES(3,'2','18');
    INSERT INTO ca_operator_age_code VALUES(4,'3','19');
    INSERT INTO ca_operator_age_code VALUES(5,'4','20');
    INSERT INTO ca_operator_age_code VALUES(6,'5','21 - 24');
    INSERT INTO ca_operator_age_code VALUES(7,'6','25 - 29');
    INSERT INTO ca_operator_age_code VALUES(8,'7','30 - 54');
    INSERT INTO ca_operator_age_code VALUES(9,'8','55 - 64');
    INSERT INTO ca_operator_age_code VALUES(10,'9','65 and over');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_package_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_package_code) THEN 
    INSERT INTO ca_package_code VALUES(1,'0','Auto coverage written as a separate policy and not an endorsement to another policy.');
    INSERT INTO ca_package_code VALUES(2,'7','Auto coverage written as an endorsement to a CMP, CPP or BOP policy.');
    INSERT INTO ca_package_code VALUES(3,'9','Auto coverage written as an endorsement to any other type of policy.');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_passive_restraint_discount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_passive_restraint_discount_code) THEN 
    INSERT INTO ca_passive_restraint_discount_code VALUES(1,'1','Air Bags for both front seat occupants.');
    INSERT INTO ca_passive_restraint_discount_code VALUES(2,'2','Air Bag for the driver only — No passenger belt passive restraint.');
    INSERT INTO ca_passive_restraint_discount_code VALUES(3,'3','Air Bag for the driver only — With passenger belt passive restraint.');
    INSERT INTO ca_passive_restraint_discount_code VALUES(4,'4','Belt Passive Restraint System for both front seat occupants.');
    INSERT INTO ca_passive_restraint_discount_code VALUES(5,'5','Belt Passive Restraint System for the driver only.');
    INSERT INTO ca_passive_restraint_discount_code VALUES(6,'6','Vehicles with No Passive Restraint System.');
    INSERT INTO ca_passive_restraint_discount_code VALUES(7,'9','Not Applicable');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_commercial_automobile_classification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_commercial_automobile_classification_code) THEN 
    INSERT INTO ca_commercial_automobile_classification_code VALUES(1,'1','Commercial Automobile — Non-fleet including trucks, trailers, and semitrailers.');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(2,'2','Commercial Automobile — Fleet including trucks, trailers, and semitrailers.');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(3,'3','Private Passenger — Non-fleet');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(4,'4','Private Passenger — Fleet');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(5,'5','Garage Risks');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(6,'6','Dealers');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(7,'7','Public — taxicabs, public livery and public buses');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(8,'8','School Buses');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(9,'9','All Other');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(10,'C','Carrier Specific Code for Composite Rated Business');
END IF;
END $$;



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



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nj_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31');

IF NOT EXISTS (SELECT * FROM ca_nj_deductible_code) THEN 
    INSERT INTO ca_nj_deductible_code VALUES(1,'2','$500');
    INSERT INTO ca_nj_deductible_code VALUES(2,'3','$1000');
    INSERT INTO ca_nj_deductible_code VALUES(3,'4','$2500');
    INSERT INTO ca_nj_deductible_code VALUES(4,'5','$250');
    INSERT INTO ca_nj_deductible_code VALUES(5,'9','All Other');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nj_pip_limits_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_nj_pip_limits_deductible_code) THEN 
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(1,'25','Basic PIP coverage - Medical expenses only','Driver Only');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(2,'26','PIP coverage for pedestrian only','Driver Only');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(3,'01','Basic PIP coverage only - No added PIP coverage','Driver Only');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(4,'10','Basic PIP coverage with Option 6','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(5,'11','Basic PIP coverage with Option 7','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(6,'12','Basic PIP coverage with Option 8','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(7,'13','Basic PIP coverage with Option 9','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(8,'14','Basic PIP coverage with Option 10','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(9,'15','Basic PIP coverage with Option 11','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(10,'16','Basic PIP coverage with Option 12','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(11,'17','Basic PIP coverage with Option 13','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(12,'18','Basic PIP coverage with Option 14','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(13,'19','Basic PIP coverage with Option 15','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(14,'20','Basic PIP coverage with Option 16','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(15,'02','Basic PIP coverage with Option 1','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(16,'03','Basic PIP coverage with Option 2','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(17,'04','Basic PIP coverage with Option 3','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(18,'05','Basic PIP coverage with Option 4','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(19,'06','Basic PIP coverage with Option 5','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(20,'09','All Other','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(21,'07','Three or more cars','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(22,'08','Named insurance including spouse and resident relatives (if applicable) and other named insureds - Single or multi-car risks','Named Insurance Including Spouse');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(23,'30','Basic PIP coverage with Option 1','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(24,'31','Basic PIP coverage with Option 2','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(25,'32','Basic PIP coverage with Option 3','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(26,'33','Basic PIP coverage with Option 4','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(27,'34','Basic PIP coverage with Option 5','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(28,'35','Basic PIP coverage with Option 6','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(29,'36','Basic PIP coverage with Option 7','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(30,'37','Basic PIP coverage with Option 8','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(31,'38','Basic PIP coverage with Option 9','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(32,'39','Basic PIP coverage with Option 10','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(33,'40','Basic PIP coverage with Option 11','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(34,'41','Basic PIP coverage with Option 12','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(35,'42','Basic PIP coverage with Option 13','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(36,'43','Basic PIP coverage with Option 14','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(37,'44','Basic PIP coverage with Option 15','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(38,'45','Basic PIP coverage with Option 16','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(39,'09','All Other','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(40,'07','Three or more cars','Named Insured and One or More Resident Relatives');
    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(41,'08','Named insurance including spouse and resident relatives (if applicable) and other named insureds - Single or multi-car risks','Named Insured and One or More Resident Relatives');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_pip_limits_deductible_code (
    id INT,
    fk_state_id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_pip_limits_deductible_code) THEN
    INSERT INTO ca_pip_limits_deductible_code VALUES(1,1,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(2,1,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(3,1,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(4,1,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(5,2,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(6,2,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(7,2,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(8,2,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(9,3,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(10,3,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(11,3,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(12,3,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(13,4,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(14,4,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(15,4,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(16,4,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(17,5,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(18,5,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(19,5,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(20,5,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(21,6,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(22,6,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(23,6,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(24,6,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(25,7,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(26,7,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(27,7,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(28,7,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(29,8,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(30,8,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(31,8,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(32,8,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(33,9,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(34,9,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(35,9,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(36,9,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(37,10,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(38,10,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(39,10,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(40,10,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(41,11,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(42,11,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(43,11,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(44,11,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(45,12,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(46,12,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(47,12,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(48,12,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(49,13,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(50,13,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(51,13,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(52,13,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(53,14,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(54,14,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(55,14,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(56,14,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(57,15,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(58,15,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(59,15,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(60,15,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(61,16,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(62,16,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(63,16,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(64,16,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(65,17,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(66,17,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(67,17,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(68,17,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(69,18,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(70,18,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(71,18,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(72,18,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(73,19,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(74,19,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(75,19,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(76,19,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(77,20,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(78,20,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(79,20,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(80,20,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(81,22,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(82,22,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(83,22,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(84,22,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(85,23,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(86,23,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(87,23,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(88,23,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(89,24,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(90,24,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(91,24,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(92,24,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(93,25,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(94,25,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(95,25,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(96,25,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(97,26,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(98,26,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(99,26,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(100,26,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(101,27,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(102,27,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(103,27,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(104,27,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(105,28,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(106,28,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(107,28,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(108,28,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(109,29,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(110,29,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(111,29,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(112,29,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(113,30,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(114,30,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(115,30,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(116,30,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(117,32,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(118,32,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(119,32,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(120,32,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(121,33,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(122,33,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(123,33,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(124,33,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(125,34,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(126,34,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(127,34,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(128,34,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(129,35,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(130,35,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(131,35,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(132,35,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(133,36,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(134,36,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(135,36,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(136,36,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(137,37,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(138,37,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(139,37,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(140,37,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(141,38,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(142,38,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(143,38,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(144,38,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(145,39,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(146,39,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(147,39,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(148,39,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(149,40,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(150,40,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(151,40,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(152,40,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(153,41,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(154,41,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(155,41,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(156,41,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(157,42,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(158,42,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(159,42,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(160,42,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(161,43,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(162,43,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(163,43,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(164,43,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(165,44,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(166,44,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(167,44,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(168,44,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(169,45,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(170,45,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(171,45,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(172,45,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(173,46,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(174,46,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(175,46,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(176,46,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(177,47,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(178,47,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(179,47,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(180,47,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(181,48,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(182,48,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(183,48,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(184,48,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(185,49,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(186,49,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(187,49,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(188,49,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(189,50,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(190,50,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(191,50,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(192,50,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(193,51,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(194,51,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(195,51,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(196,51,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(197,52,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(198,52,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(199,52,'3','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(200,52,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO ca_pip_limits_deductible_code VALUES(201,21,'1','Full coverage without dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(202,21,'2','Full coverage with dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(203,21,'3','$300 deductible without dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(204,21,'4','$300 deductible with dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(205,21,'5','Full coverage without dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(206,21,'6','Full coverage with dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(207,21,'7','$300 deductible without dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(208,21,'8','$300 deductible with dependents reduction');
    INSERT INTO ca_pip_limits_deductible_code VALUES(209,21,'9','All other PIP coverages (including motorcycle buy back)');
    INSERT INTO ca_pip_limits_deductible_code VALUES(210,31,'1','Basic PIP coverage — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(211,31,'2','Basic and additional PIP — No deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(212,31,'3','$200 deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(213,31,'4','$100 deductible');
    INSERT INTO ca_pip_limits_deductible_code VALUES(214,31,'5','All Other deductibles');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_anti_lock_brakes_discount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_anti_lock_brakes_discount_code) THEN 
    INSERT INTO ca_anti_lock_brakes_discount_code VALUES(1,'1','Anti-Lock Braking System discount applied to this coverage.');
    INSERT INTO ca_anti_lock_brakes_discount_code VALUES(2,'2','Program offers an Anti-Lock Braking System discount on this coverage, but the vehicle does not qualify for the discount.');
    INSERT INTO ca_anti_lock_brakes_discount_code VALUES(3,'9','Not Applicable - Program does not offer an Anti-Lock Braking System discount on this coverage.');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_anti_theft_device_discount_code (
    id INT,
    fk_state_id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_anti_theft_device_discount_code) THEN
    INSERT INTO ca_anti_theft_device_discount_code VALUES(1,1,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(2,1,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(3,1,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(4,1,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(5,1,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(6,1,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(7,1,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(8,2,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(9,2,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(10,2,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(11,2,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(12,2,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(13,2,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(14,2,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(15,3,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(16,3,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(17,3,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(18,3,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(19,3,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(20,3,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(21,3,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(22,4,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(23,4,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(24,4,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(25,4,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(26,4,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(27,4,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(28,4,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(29,5,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(30,5,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(31,5,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(32,5,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(33,5,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(34,5,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(35,5,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(36,6,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(37,6,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(38,6,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(39,6,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(40,6,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(41,6,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(42,6,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(43,7,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(44,7,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(45,7,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(46,7,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(47,7,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(48,7,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(49,7,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(50,8,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(51,8,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(52,8,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(53,8,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(54,8,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(55,8,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(56,8,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(57,9,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(58,9,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(59,9,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(60,9,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(61,9,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(62,9,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(63,9,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(64,10,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(65,10,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(66,10,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(67,10,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(68,10,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(69,10,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(70,10,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(71,11,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(72,11,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(73,11,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(74,11,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(75,11,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(76,11,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(77,11,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(78,12,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(79,12,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(80,12,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(81,12,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(82,12,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(83,12,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(84,12,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(85,13,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(86,13,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(87,13,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(88,13,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(89,13,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(90,13,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(91,13,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(92,14,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(93,14,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(94,14,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(95,14,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(96,14,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(97,14,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(98,14,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(99,15,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(100,15,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(101,15,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(102,15,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(103,15,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(104,15,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(105,15,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(106,16,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(107,16,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(108,16,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(109,16,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(110,16,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(111,16,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(112,16,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(113,17,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(114,17,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(115,17,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(116,17,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(117,17,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(118,17,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(119,17,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(120,18,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(121,18,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(122,18,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(123,18,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(124,18,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(125,18,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(126,18,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(127,19,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(128,19,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(129,19,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(130,19,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(131,19,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(132,19,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(133,19,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(134,20,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(135,20,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(136,20,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(137,20,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(138,20,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(139,20,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(140,20,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(141,21,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(142,21,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(143,21,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(144,21,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(145,21,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(146,21,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(147,21,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(148,22,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(149,22,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(150,22,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(151,22,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(152,22,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(153,22,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(154,22,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(155,23,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(156,23,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(157,23,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(158,23,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(159,23,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(160,23,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(161,23,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(162,24,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(163,24,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(164,24,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(165,24,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(166,24,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(167,24,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(168,24,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(169,25,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(170,25,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(171,25,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(172,25,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(173,25,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(174,25,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(175,25,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(176,26,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(177,26,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(178,26,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(179,26,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(180,26,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(181,26,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(182,26,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(183,27,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(184,27,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(185,27,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(186,27,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(187,27,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(188,27,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(189,27,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(190,28,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(191,28,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(192,28,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(193,28,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(194,28,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(195,28,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(196,28,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(197,30,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(198,30,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(199,30,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(200,30,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(201,30,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(202,30,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(203,30,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(204,32,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(205,32,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(206,32,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(207,32,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(208,32,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(209,32,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(210,32,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(211,33,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(212,33,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(213,33,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(214,33,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(215,33,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(216,33,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(217,33,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(218,34,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(219,34,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(220,34,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(221,34,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(222,34,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(223,34,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(224,34,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(225,35,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(226,35,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(227,35,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(228,35,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(229,35,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(230,35,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(231,35,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(232,36,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(233,36,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(234,36,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(235,36,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(236,36,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(237,36,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(238,36,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(239,37,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(240,37,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(241,37,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(242,37,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(243,37,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(244,37,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(245,37,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(246,38,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(247,38,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(248,38,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(249,38,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(250,38,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(251,38,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(252,38,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(253,39,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(254,39,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(255,39,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(256,39,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(257,39,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(258,39,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(259,39,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(260,40,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(261,40,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(262,40,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(263,40,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(264,40,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(265,40,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(266,40,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(267,41,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(268,41,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(269,41,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(270,41,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(271,41,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(272,41,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(273,41,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(274,42,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(275,42,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(276,42,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(277,42,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(278,42,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(279,42,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(280,42,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(281,43,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(282,43,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(283,43,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(284,43,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(285,43,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(286,43,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(287,43,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(288,44,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(289,44,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(290,44,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(291,44,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(292,44,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(293,44,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(294,44,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(295,45,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(296,45,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(297,45,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(298,45,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(299,45,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(300,45,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(301,45,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(302,46,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(303,46,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(304,46,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(305,46,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(306,46,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(307,46,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(308,46,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(309,47,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(310,47,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(311,47,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(312,47,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(313,47,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(314,47,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(315,47,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(316,48,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(317,48,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(318,48,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(319,48,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(320,48,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(321,48,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(322,48,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(323,49,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(324,49,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(325,49,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(326,49,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(327,49,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(328,49,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(329,49,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(330,50,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(331,50,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(332,50,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(333,50,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(334,50,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(335,50,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(336,50,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(337,51,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(338,51,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(339,51,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(340,51,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(341,51,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(342,51,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(343,51,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(344,52,'99','All other (Vehicles not rated under a discount program)');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(345,52,'01','Vehicles with no discount but rated under a discount program');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(346,52,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(347,52,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(348,52,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(349,52,'05','Vehicles with an alarm and an active device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(350,52,'06','Vehicles with an alarm and a passive device — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(351,31,'10','Vehicles with VIN etched window glass only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(352,31,'11','With discount less than the maximum reduction of 25% per vehicle');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(353,31,'12','With discount equal to the maximum reduction of 25% per vehicle');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(354,31,'01','Vehicles with no discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(355,31,'02','Vehicles with alarm only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(356,31,'03','Vehicles with active devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(357,31,'04','Vehicles with passive devices — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(358,31,'05','Vehicles with electronic homing devices only — with discount');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(359,29,'01','Vehicle qualifies for discount under Category I');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(360,29,'02','Vehicle qualifies for discount under Category II');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(361,29,'03','Vehicle qualifies for discount under Category III');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(362,29,'04','Vehicle qualifies for discount under Category IV');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(363,29,'05','Vehicle qualifies for discount under Category III and IV');
    INSERT INTO ca_anti_theft_device_discount_code VALUES(364,29,'09','Vehicle without an anti-theft device (no discount)');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_transaction_code) THEN 
    INSERT INTO ca_transaction_code VALUES(1,'1','Premium or Cancellation','Premium');
    INSERT INTO ca_transaction_code VALUES(2,'2','Paid Loss','Loss');
    INSERT INTO ca_transaction_code VALUES(3,'3','Outstanding Loss','Loss');
    INSERT INTO ca_transaction_code VALUES(4,'6','Paid Allocated Loss Adjustment Expense','Loss');
    INSERT INTO ca_transaction_code VALUES(5,'7','Outstanding Allocated Loss Adjustment Expense','Loss');
    INSERT INTO ca_transaction_code VALUES(6,'8','Limited Coding','Premium');
END IF;
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_stat_stg(
    ID SERIAL,
    TRANSMITTAL_ID INT,
    CHANGE_COMMENTS VARCHAR(4000) DEFAULT NULL,
    UPDATED_BY INT DEFAULT NULL,
    EFF_START_DATE TIMESTAMP DEFAULT NULL,
    EFF_END_DATE TIMESTAMP,
    LAST_VALIDATED_DATE TIMESTAMP DEFAULT NULL,
    REP_YR_4DIGIT DECIMAL(4,0) DEFAULT NULL,
    LINE VARCHAR(2) DEFAULT NULL,
    REP_MO VARCHAR(2) DEFAULT NULL,
    REP_YR VARCHAR(1) DEFAULT NULL,
    COMP VARCHAR(4) DEFAULT NULL,
    STATE VARCHAR(2) DEFAULT NULL,
    TERRITORY VARCHAR(3) DEFAULT NULL,
    TRANS VARCHAR(1) DEFAULT NULL,
    PREM_AMT DECIMAL(12,2) DEFAULT NULL,
    LOSS_AMT DECIMAL(12,2) DEFAULT NULL,
    PROG_CD VARCHAR(1) DEFAULT NULL,
    COV_CODE VARCHAR(1) DEFAULT NULL,
    SUBLINE VARCHAR(1) DEFAULT NULL,
    RES030 VARCHAR(4) DEFAULT NULL,
    AGE VARCHAR(1) DEFAULT NULL,
    SEX_MARITAL VARCHAR(1) DEFAULT NULL,
    VEHICLE_USE VARCHAR(1) DEFAULT NULL,
    VEHICLE_PERF VARCHAR(1) DEFAULT NULL,
    COMMERCIAL_CLASS VARCHAR(1) DEFAULT NULL,
    DRIV_TRAIN_GOOD_STUDENT VARCHAR(1) DEFAULT NULL,
    COMMERCIAL_USE VARCHAR(1) DEFAULT NULL,
    PENALTY_POINTS VARCHAR(1) DEFAULT NULL,
    LIA_LIM VARCHAR(1) DEFAULT NULL,
    DED_AMT VARCHAR(1) DEFAULT NULL,
    BODY_STYLE VARCHAR(2) DEFAULT NULL,
    BODY_SIZE VARCHAR(1) DEFAULT NULL,
    MODEL_YEAR VARCHAR(2) DEFAULT NULL,
    UM_UIM_MOTORIST VARCHAR(1) DEFAULT NULL,
    EXPOSURE INT DEFAULT NULL,
    CLM_CNT INT DEFAULT NULL,
    COL VARCHAR(1) DEFAULT NULL,
    MOS_COV VARCHAR(2) DEFAULT NULL,
    RES050 VARCHAR(1) DEFAULT NULL,
    TERRORISM VARCHAR(1) DEFAULT NULL,
    RES051 VARCHAR(1) DEFAULT NULL,
    RES052 VARCHAR(4) DEFAULT NULL,
    SING_MULT_CAR VARCHAR(1) DEFAULT NULL,
    ACCIDENT_MON VARCHAR(2) DEFAULT NULL,
    RES057 VARCHAR(3) DEFAULT NULL,
    ACCIDENT_YR VARCHAR(2) DEFAULT NULL,
    RES060 VARCHAR(4) DEFAULT NULL,
    PACKAGE_ID VARCHAR(1) DEFAULT NULL,
    POOL VARCHAR(1) DEFAULT NULL,
    CLAIM_NUM VARCHAR(12) DEFAULT NULL,
    POLICY_NUM VARCHAR(14) DEFAULT NULL,
    CLAIM_ID VARCHAR(2) DEFAULT NULL,
    RES080 VARCHAR(1) DEFAULT NULL,
    ZIP VARCHAR(5) DEFAULT NULL,
    ZIP_SUFF VARCHAR(4) DEFAULT NULL,
    UM_UIM_STACK_IND VARCHAR(1) DEFAULT NULL,
    RES091 VARCHAR(2) DEFAULT NULL,
    SYMBOL VARCHAR(2) DEFAULT NULL,
    PASS_RESTRAINT VARCHAR(1) DEFAULT NULL,
    ANTI_LOCK VARCHAR(1) DEFAULT NULL,
    ANTI_THEFT VARCHAR(2) DEFAULT NULL,
    DEF_DRIVER VARCHAR(1) DEFAULT NULL,
    PIP_LIMIT_DED VARCHAR(1) DEFAULT NULL,
    NJ_PIP_LIMIT VARCHAR(2) DEFAULT NULL,
    RES099 VARCHAR(2) DEFAULT NULL,
    NJ_PIP_DED VARCHAR(1) DEFAULT NULL,
    RAT_TERM_ZONE VARCHAR(3) DEFAULT NULL,
    RES101 VARCHAR(3) DEFAULT NULL,
    ASSIGN_RISK_RATE_CLASS VARCHAR(4) DEFAULT NULL,
    ASSIGN_RISK_PTS_SUR VARCHAR(2) DEFAULT NULL,
    EXP_RATING_MOD VARCHAR(3) DEFAULT NULL,
    RES110 VARCHAR(3) DEFAULT NULL,
    RES113 VARCHAR(1) DEFAULT NULL,
    EXCEPT_A VARCHAR(2) DEFAULT NULL,
    EXCEPT_B VARCHAR(2) DEFAULT NULL,
    EXCEPT_C VARCHAR(2) DEFAULT NULL,
    EXCEPT_D VARCHAR(2) DEFAULT NULL,
    RES122 VARCHAR(15) DEFAULT NULL,
    COUNTY VARCHAR(3) DEFAULT NULL,
    CO_USE VARCHAR(11) DEFAULT NULL,
    STATUS VARCHAR(20) DEFAULT NULL,
    LINE_NUMBER INT DEFAULT NULL,
    NOTES VARCHAR(4000) DEFAULT NULL,
    VERSION INT  DEFAULT '1',
    VAL_VER INT  DEFAULT '1',
    VIN VARCHAR(17) DEFAULT NULL,
    LIMIT_LOSS_CD_ID VARCHAR(1) DEFAULT NULL,
    RES111 VARCHAR(2) DEFAULT NULL,
    OPT_ZIP_CD_IND VARCHAR(1) DEFAULT NULL,
    PRIMARY KEY (ID)
); 
END $$;



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_program_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_program_code) THEN 
    INSERT INTO ca_program_code VALUES(1,'3','ISO Program');
    INSERT INTO ca_program_code VALUES(2,'5','All Other Programs (including independent bureaus)');
    INSERT INTO ca_program_code VALUES(3,'C','Exempt Commercial Risk: ISO forms and class codes');
    INSERT INTO ca_program_code VALUES(4,'F','Exempt Commercial Risk: Independent forms but ISO class codes');
END IF;
END $$;



DO $$ 
BEGIN

CREATE TABLE IF NOT EXISTS ca_coverage_category (
    id INT,
    name VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);


CREATE TABLE IF NOT EXISTS ca_coverage_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    fk_coverage_category_id INT,
    fk_state_id INT 
);


CREATE TABLE IF NOT EXISTS ca_state_coverage_code (
    id INT,
    fk_coverage_code_id INT,
    fk_state_id INT
);


CREATE OR REPLACE VIEW ca_coverage_code_vw
AS
  SELECT a.code        coverage_code,
         b.name        coverage_category,
         a.name        coverage,
         a.id          coverage_id,
         a.fk_state_id state_id_specific,
         b.id          coverage_category_id
  FROM   ca_coverage_code a,
         ca_coverage_category b
  WHERE  a.fk_coverage_category_id = b.id
  ORDER  BY a.id; 

CREATE OR REPLACE VIEW ca_state_coverage_code_vw as (
    SELECT b.code coverage_code, b.id coverage_id, b.name coverage, c.abbreviation state, c.id fk_state_id
        FROM ca_state_coverage_code a, ca_coverage_code b, state_code c
        WHERE a.fk_coverage_code_id = b.id 
        AND a.fk_state_id = c.id
        ORDER BY state,coverage_code
);

IF NOT EXISTS (SELECT * FROM ca_coverage_category) THEN
	INSERT INTO ca_coverage_category (id, name) VALUES (1,'Liability');
	INSERT INTO ca_coverage_category (id, name) VALUES (2,'Physical Damage Coverages');
	INSERT INTO ca_coverage_category (id, name) VALUES (3,'All Other Property and Liability Coverages');
	INSERT INTO ca_coverage_category (id, name) VALUES (4,'Penn Policies Not Subject to Workers Compensation First Party Benefits Coverage ');
	INSERT INTO ca_coverage_category (id, name) VALUES (5,'Penn Policies Subject to Workers Compensation First Party Benefits Coverage');
END IF;

IF NOT EXISTS (select * from ca_coverage_code) THEN
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (1,'1','Bodily Injury Liability',1);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (2,'2','Property Damage Liability',2);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (3,'3','Bodily Injury and Property Damage Liability - Indivisible Premium',3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (4,'4','Personal Injury Protection',4);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (5,'5','Medical Payments',5);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (6,'6','Uninsured/Underinsured Motorists - Indivisible Premium',6);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (7,'7','Physical Damage - Collision',9);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (8,'8','Physical Damage - Other Than Collision',10);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (9,'9','All Other Property and Liability Coverages',12);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (10,'X','Uninsured Motorist',7);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (11,'Y','Underinsured Motorist',8);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (12,'T','Physical Damage - Other Than Collision - Additional Coverage Records',11);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (13,'H','Certified acts of terrorism covered (coverage not excluded) - liability only',13);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (14,'W','Certified acts of terrorism covered (coverage not excluded) - physical damage only',14);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id) VALUES (15,'Z','Certified acts of terrorism covered (coverage not excluded) - liability and physical damage',15);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (16,'1','Bodily Injury Liability',1,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (17,'2','Property Damage Liability',2,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (18,'3','Bodily Injury and Property Damage Liability Combined',13,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (19,'5','Medical Payments',5,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (20,'6','Uninsured/Underinsured Motorists - Indivisible Premium',6,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (21,'7','Physical Damage - Collision',9,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (22,'8','Physical Damage - Other Than Collision',10,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (23,'9','All Other',12,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (24,'X','Uninsured Motorist',7,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (25,'Y','Underinsured Motorist',8,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (26,'S','Medical Benefits',14,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (27,'U','Loss of Income',15,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (28,'V','Accidental Death',16,3);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (29,'1','Bodily Injury Liability',1,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (30,'2','Property Damage Liability',2,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (31,'3','Bodily Injury and Property Damage Liability Combined',17,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (32,'5','Extraordinary Medical Payments',18,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (33,'7','Physical Damage - Collision',9,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (34,'8','Physical Damage - Other Than Collision',10,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (35,'9','All Other',12,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (36,'X','Uninsured Motorist',7,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (37,'Y','Underinsured Motorist',8,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (38,'T','Physical Damage - Other Than Collision - Additional Coverage Records',11,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (39,'A','Medical Benefits',19,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (40,'B','Medical Benefits plus any Funeral Benefits Limit',20,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (41,'C','Loss of Income',21,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (42,'D','Death Benefit',22,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (43,'E','Funeral Benefit',23,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (44,'F','Combined First Party Benefits',24,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (45,'G','Combined First Party Benefits - Indivisible Premium Policies',25,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (46,'J','Medical Benefits',26,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (47,'K','Medical Benefits plus any Funeral Benefits Limit',27,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (48,'L','Loss of Income',28,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (49,'M','Death Benefit',29,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (50,'N','Funeral Benefit',30,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (51,'P','Combined First Party Benefits',31,37);
	INSERT INTO ca_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (52,'R','Combined First Party Benefits - Indivisible Premium Policies',32,37);
END IF;

IF NOT EXISTS (SELECT * FROM ca_state_coverage_code) THEN
	INSERT INTO ca_state_coverage_code VALUES(1,1,1);
	INSERT INTO ca_state_coverage_code VALUES(2,2,1);
	INSERT INTO ca_state_coverage_code VALUES(3,3,1);
	INSERT INTO ca_state_coverage_code VALUES(4,4,1);
	INSERT INTO ca_state_coverage_code VALUES(5,5,1);
	INSERT INTO ca_state_coverage_code VALUES(6,6,1);
	INSERT INTO ca_state_coverage_code VALUES(7,9,1);
	INSERT INTO ca_state_coverage_code VALUES(8,10,1);
	INSERT INTO ca_state_coverage_code VALUES(9,12,1);
	INSERT INTO ca_state_coverage_code VALUES(10,7,1);
	INSERT INTO ca_state_coverage_code VALUES(11,8,1);
	INSERT INTO ca_state_coverage_code VALUES(12,11,1);
	INSERT INTO ca_state_coverage_code VALUES(13,13,1);
	INSERT INTO ca_state_coverage_code VALUES(14,14,1);
	INSERT INTO ca_state_coverage_code VALUES(15,15,1);
	INSERT INTO ca_state_coverage_code VALUES(16,1,2);
	INSERT INTO ca_state_coverage_code VALUES(17,2,2);
	INSERT INTO ca_state_coverage_code VALUES(18,3,2);
	INSERT INTO ca_state_coverage_code VALUES(19,4,2);
	INSERT INTO ca_state_coverage_code VALUES(20,5,2);
	INSERT INTO ca_state_coverage_code VALUES(21,6,2);
	INSERT INTO ca_state_coverage_code VALUES(22,9,2);
	INSERT INTO ca_state_coverage_code VALUES(23,10,2);
	INSERT INTO ca_state_coverage_code VALUES(24,12,2);
	INSERT INTO ca_state_coverage_code VALUES(25,7,2);
	INSERT INTO ca_state_coverage_code VALUES(26,8,2);
	INSERT INTO ca_state_coverage_code VALUES(27,11,2);
	INSERT INTO ca_state_coverage_code VALUES(28,13,2);
	INSERT INTO ca_state_coverage_code VALUES(29,14,2);
	INSERT INTO ca_state_coverage_code VALUES(30,15,2);
	INSERT INTO ca_state_coverage_code VALUES(31,1,4);
	INSERT INTO ca_state_coverage_code VALUES(32,2,4);
	INSERT INTO ca_state_coverage_code VALUES(33,3,4);
	INSERT INTO ca_state_coverage_code VALUES(34,4,4);
	INSERT INTO ca_state_coverage_code VALUES(35,5,4);
	INSERT INTO ca_state_coverage_code VALUES(36,6,4);
	INSERT INTO ca_state_coverage_code VALUES(37,9,4);
	INSERT INTO ca_state_coverage_code VALUES(38,10,4);
	INSERT INTO ca_state_coverage_code VALUES(39,12,4);
	INSERT INTO ca_state_coverage_code VALUES(40,7,4);
	INSERT INTO ca_state_coverage_code VALUES(41,8,4);
	INSERT INTO ca_state_coverage_code VALUES(42,11,4);
	INSERT INTO ca_state_coverage_code VALUES(43,13,4);
	INSERT INTO ca_state_coverage_code VALUES(44,14,4);
	INSERT INTO ca_state_coverage_code VALUES(45,15,4);
	INSERT INTO ca_state_coverage_code VALUES(46,1,5);
	INSERT INTO ca_state_coverage_code VALUES(47,2,5);
	INSERT INTO ca_state_coverage_code VALUES(48,3,5);
	INSERT INTO ca_state_coverage_code VALUES(49,4,5);
	INSERT INTO ca_state_coverage_code VALUES(50,5,5);
	INSERT INTO ca_state_coverage_code VALUES(51,6,5);
	INSERT INTO ca_state_coverage_code VALUES(52,9,5);
	INSERT INTO ca_state_coverage_code VALUES(53,10,5);
	INSERT INTO ca_state_coverage_code VALUES(54,12,5);
	INSERT INTO ca_state_coverage_code VALUES(55,7,5);
	INSERT INTO ca_state_coverage_code VALUES(56,8,5);
	INSERT INTO ca_state_coverage_code VALUES(57,11,5);
	INSERT INTO ca_state_coverage_code VALUES(58,13,5);
	INSERT INTO ca_state_coverage_code VALUES(59,14,5);
	INSERT INTO ca_state_coverage_code VALUES(60,15,5);
	INSERT INTO ca_state_coverage_code VALUES(61,1,6);
	INSERT INTO ca_state_coverage_code VALUES(62,2,6);
	INSERT INTO ca_state_coverage_code VALUES(63,3,6);
	INSERT INTO ca_state_coverage_code VALUES(64,4,6);
	INSERT INTO ca_state_coverage_code VALUES(65,5,6);
	INSERT INTO ca_state_coverage_code VALUES(66,6,6);
	INSERT INTO ca_state_coverage_code VALUES(67,9,6);
	INSERT INTO ca_state_coverage_code VALUES(68,10,6);
	INSERT INTO ca_state_coverage_code VALUES(69,12,6);
	INSERT INTO ca_state_coverage_code VALUES(70,7,6);
	INSERT INTO ca_state_coverage_code VALUES(71,8,6);
	INSERT INTO ca_state_coverage_code VALUES(72,11,6);
	INSERT INTO ca_state_coverage_code VALUES(73,13,6);
	INSERT INTO ca_state_coverage_code VALUES(74,14,6);
	INSERT INTO ca_state_coverage_code VALUES(75,15,6);
	INSERT INTO ca_state_coverage_code VALUES(76,1,7);
	INSERT INTO ca_state_coverage_code VALUES(77,2,7);
	INSERT INTO ca_state_coverage_code VALUES(78,3,7);
	INSERT INTO ca_state_coverage_code VALUES(79,4,7);
	INSERT INTO ca_state_coverage_code VALUES(80,5,7);
	INSERT INTO ca_state_coverage_code VALUES(81,6,7);
	INSERT INTO ca_state_coverage_code VALUES(82,9,7);
	INSERT INTO ca_state_coverage_code VALUES(83,10,7);
	INSERT INTO ca_state_coverage_code VALUES(84,12,7);
	INSERT INTO ca_state_coverage_code VALUES(85,7,7);
	INSERT INTO ca_state_coverage_code VALUES(86,8,7);
	INSERT INTO ca_state_coverage_code VALUES(87,11,7);
	INSERT INTO ca_state_coverage_code VALUES(88,13,7);
	INSERT INTO ca_state_coverage_code VALUES(89,14,7);
	INSERT INTO ca_state_coverage_code VALUES(90,15,7);
	INSERT INTO ca_state_coverage_code VALUES(91,1,8);
	INSERT INTO ca_state_coverage_code VALUES(92,2,8);
	INSERT INTO ca_state_coverage_code VALUES(93,3,8);
	INSERT INTO ca_state_coverage_code VALUES(94,4,8);
	INSERT INTO ca_state_coverage_code VALUES(95,5,8);
	INSERT INTO ca_state_coverage_code VALUES(96,6,8);
	INSERT INTO ca_state_coverage_code VALUES(97,9,8);
	INSERT INTO ca_state_coverage_code VALUES(98,10,8);
	INSERT INTO ca_state_coverage_code VALUES(99,12,8);
	INSERT INTO ca_state_coverage_code VALUES(100,7,8);
	INSERT INTO ca_state_coverage_code VALUES(101,8,8);
	INSERT INTO ca_state_coverage_code VALUES(102,11,8);
	INSERT INTO ca_state_coverage_code VALUES(103,13,8);
	INSERT INTO ca_state_coverage_code VALUES(104,14,8);
	INSERT INTO ca_state_coverage_code VALUES(105,15,8);
	INSERT INTO ca_state_coverage_code VALUES(106,1,9);
	INSERT INTO ca_state_coverage_code VALUES(107,2,9);
	INSERT INTO ca_state_coverage_code VALUES(108,3,9);
	INSERT INTO ca_state_coverage_code VALUES(109,4,9);
	INSERT INTO ca_state_coverage_code VALUES(110,5,9);
	INSERT INTO ca_state_coverage_code VALUES(111,6,9);
	INSERT INTO ca_state_coverage_code VALUES(112,9,9);
	INSERT INTO ca_state_coverage_code VALUES(113,10,9);
	INSERT INTO ca_state_coverage_code VALUES(114,12,9);
	INSERT INTO ca_state_coverage_code VALUES(115,7,9);
	INSERT INTO ca_state_coverage_code VALUES(116,8,9);
	INSERT INTO ca_state_coverage_code VALUES(117,11,9);
	INSERT INTO ca_state_coverage_code VALUES(118,13,9);
	INSERT INTO ca_state_coverage_code VALUES(119,14,9);
	INSERT INTO ca_state_coverage_code VALUES(120,15,9);
	INSERT INTO ca_state_coverage_code VALUES(121,1,10);
	INSERT INTO ca_state_coverage_code VALUES(122,2,10);
	INSERT INTO ca_state_coverage_code VALUES(123,3,10);
	INSERT INTO ca_state_coverage_code VALUES(124,4,10);
	INSERT INTO ca_state_coverage_code VALUES(125,5,10);
	INSERT INTO ca_state_coverage_code VALUES(126,6,10);
	INSERT INTO ca_state_coverage_code VALUES(127,9,10);
	INSERT INTO ca_state_coverage_code VALUES(128,10,10);
	INSERT INTO ca_state_coverage_code VALUES(129,12,10);
	INSERT INTO ca_state_coverage_code VALUES(130,7,10);
	INSERT INTO ca_state_coverage_code VALUES(131,8,10);
	INSERT INTO ca_state_coverage_code VALUES(132,11,10);
	INSERT INTO ca_state_coverage_code VALUES(133,13,10);
	INSERT INTO ca_state_coverage_code VALUES(134,14,10);
	INSERT INTO ca_state_coverage_code VALUES(135,15,10);
	INSERT INTO ca_state_coverage_code VALUES(136,1,11);
	INSERT INTO ca_state_coverage_code VALUES(137,2,11);
	INSERT INTO ca_state_coverage_code VALUES(138,3,11);
	INSERT INTO ca_state_coverage_code VALUES(139,4,11);
	INSERT INTO ca_state_coverage_code VALUES(140,5,11);
	INSERT INTO ca_state_coverage_code VALUES(141,6,11);
	INSERT INTO ca_state_coverage_code VALUES(142,9,11);
	INSERT INTO ca_state_coverage_code VALUES(143,10,11);
	INSERT INTO ca_state_coverage_code VALUES(144,12,11);
	INSERT INTO ca_state_coverage_code VALUES(145,7,11);
	INSERT INTO ca_state_coverage_code VALUES(146,8,11);
	INSERT INTO ca_state_coverage_code VALUES(147,11,11);
	INSERT INTO ca_state_coverage_code VALUES(148,13,11);
	INSERT INTO ca_state_coverage_code VALUES(149,14,11);
	INSERT INTO ca_state_coverage_code VALUES(150,15,11);
	INSERT INTO ca_state_coverage_code VALUES(151,1,12);
	INSERT INTO ca_state_coverage_code VALUES(152,2,12);
	INSERT INTO ca_state_coverage_code VALUES(153,3,12);
	INSERT INTO ca_state_coverage_code VALUES(154,4,12);
	INSERT INTO ca_state_coverage_code VALUES(155,5,12);
	INSERT INTO ca_state_coverage_code VALUES(156,6,12);
	INSERT INTO ca_state_coverage_code VALUES(157,9,12);
	INSERT INTO ca_state_coverage_code VALUES(158,10,12);
	INSERT INTO ca_state_coverage_code VALUES(159,12,12);
	INSERT INTO ca_state_coverage_code VALUES(160,7,12);
	INSERT INTO ca_state_coverage_code VALUES(161,8,12);
	INSERT INTO ca_state_coverage_code VALUES(162,11,12);
	INSERT INTO ca_state_coverage_code VALUES(163,13,12);
	INSERT INTO ca_state_coverage_code VALUES(164,14,12);
	INSERT INTO ca_state_coverage_code VALUES(165,15,12);
	INSERT INTO ca_state_coverage_code VALUES(166,1,13);
	INSERT INTO ca_state_coverage_code VALUES(167,2,13);
	INSERT INTO ca_state_coverage_code VALUES(168,3,13);
	INSERT INTO ca_state_coverage_code VALUES(169,4,13);
	INSERT INTO ca_state_coverage_code VALUES(170,5,13);
	INSERT INTO ca_state_coverage_code VALUES(171,6,13);
	INSERT INTO ca_state_coverage_code VALUES(172,9,13);
	INSERT INTO ca_state_coverage_code VALUES(173,10,13);
	INSERT INTO ca_state_coverage_code VALUES(174,12,13);
	INSERT INTO ca_state_coverage_code VALUES(175,7,13);
	INSERT INTO ca_state_coverage_code VALUES(176,8,13);
	INSERT INTO ca_state_coverage_code VALUES(177,11,13);
	INSERT INTO ca_state_coverage_code VALUES(178,13,13);
	INSERT INTO ca_state_coverage_code VALUES(179,14,13);
	INSERT INTO ca_state_coverage_code VALUES(180,15,13);
	INSERT INTO ca_state_coverage_code VALUES(181,1,14);
	INSERT INTO ca_state_coverage_code VALUES(182,2,14);
	INSERT INTO ca_state_coverage_code VALUES(183,3,14);
	INSERT INTO ca_state_coverage_code VALUES(184,4,14);
	INSERT INTO ca_state_coverage_code VALUES(185,5,14);
	INSERT INTO ca_state_coverage_code VALUES(186,6,14);
	INSERT INTO ca_state_coverage_code VALUES(187,9,14);
	INSERT INTO ca_state_coverage_code VALUES(188,10,14);
	INSERT INTO ca_state_coverage_code VALUES(189,12,14);
	INSERT INTO ca_state_coverage_code VALUES(190,7,14);
	INSERT INTO ca_state_coverage_code VALUES(191,8,14);
	INSERT INTO ca_state_coverage_code VALUES(192,11,14);
	INSERT INTO ca_state_coverage_code VALUES(193,13,14);
	INSERT INTO ca_state_coverage_code VALUES(194,14,14);
	INSERT INTO ca_state_coverage_code VALUES(195,15,14);
	INSERT INTO ca_state_coverage_code VALUES(196,1,15);
	INSERT INTO ca_state_coverage_code VALUES(197,2,15);
	INSERT INTO ca_state_coverage_code VALUES(198,3,15);
	INSERT INTO ca_state_coverage_code VALUES(199,4,15);
	INSERT INTO ca_state_coverage_code VALUES(200,5,15);
	INSERT INTO ca_state_coverage_code VALUES(201,6,15);
	INSERT INTO ca_state_coverage_code VALUES(202,9,15);
	INSERT INTO ca_state_coverage_code VALUES(203,10,15);
	INSERT INTO ca_state_coverage_code VALUES(204,12,15);
	INSERT INTO ca_state_coverage_code VALUES(205,7,15);
	INSERT INTO ca_state_coverage_code VALUES(206,8,15);
	INSERT INTO ca_state_coverage_code VALUES(207,11,15);
	INSERT INTO ca_state_coverage_code VALUES(208,13,15);
	INSERT INTO ca_state_coverage_code VALUES(209,14,15);
	INSERT INTO ca_state_coverage_code VALUES(210,15,15);
	INSERT INTO ca_state_coverage_code VALUES(211,1,16);
	INSERT INTO ca_state_coverage_code VALUES(212,2,16);
	INSERT INTO ca_state_coverage_code VALUES(213,3,16);
	INSERT INTO ca_state_coverage_code VALUES(214,4,16);
	INSERT INTO ca_state_coverage_code VALUES(215,5,16);
	INSERT INTO ca_state_coverage_code VALUES(216,6,16);
	INSERT INTO ca_state_coverage_code VALUES(217,9,16);
	INSERT INTO ca_state_coverage_code VALUES(218,10,16);
	INSERT INTO ca_state_coverage_code VALUES(219,12,16);
	INSERT INTO ca_state_coverage_code VALUES(220,7,16);
	INSERT INTO ca_state_coverage_code VALUES(221,8,16);
	INSERT INTO ca_state_coverage_code VALUES(222,11,16);
	INSERT INTO ca_state_coverage_code VALUES(223,13,16);
	INSERT INTO ca_state_coverage_code VALUES(224,14,16);
	INSERT INTO ca_state_coverage_code VALUES(225,15,16);
	INSERT INTO ca_state_coverage_code VALUES(226,1,17);
	INSERT INTO ca_state_coverage_code VALUES(227,2,17);
	INSERT INTO ca_state_coverage_code VALUES(228,3,17);
	INSERT INTO ca_state_coverage_code VALUES(229,4,17);
	INSERT INTO ca_state_coverage_code VALUES(230,5,17);
	INSERT INTO ca_state_coverage_code VALUES(231,6,17);
	INSERT INTO ca_state_coverage_code VALUES(232,9,17);
	INSERT INTO ca_state_coverage_code VALUES(233,10,17);
	INSERT INTO ca_state_coverage_code VALUES(234,12,17);
	INSERT INTO ca_state_coverage_code VALUES(235,7,17);
	INSERT INTO ca_state_coverage_code VALUES(236,8,17);
	INSERT INTO ca_state_coverage_code VALUES(237,11,17);
	INSERT INTO ca_state_coverage_code VALUES(238,13,17);
	INSERT INTO ca_state_coverage_code VALUES(239,14,17);
	INSERT INTO ca_state_coverage_code VALUES(240,15,17);
	INSERT INTO ca_state_coverage_code VALUES(241,1,18);
	INSERT INTO ca_state_coverage_code VALUES(242,2,18);
	INSERT INTO ca_state_coverage_code VALUES(243,3,18);
	INSERT INTO ca_state_coverage_code VALUES(244,4,18);
	INSERT INTO ca_state_coverage_code VALUES(245,5,18);
	INSERT INTO ca_state_coverage_code VALUES(246,6,18);
	INSERT INTO ca_state_coverage_code VALUES(247,9,18);
	INSERT INTO ca_state_coverage_code VALUES(248,10,18);
	INSERT INTO ca_state_coverage_code VALUES(249,12,18);
	INSERT INTO ca_state_coverage_code VALUES(250,7,18);
	INSERT INTO ca_state_coverage_code VALUES(251,8,18);
	INSERT INTO ca_state_coverage_code VALUES(252,11,18);
	INSERT INTO ca_state_coverage_code VALUES(253,13,18);
	INSERT INTO ca_state_coverage_code VALUES(254,14,18);
	INSERT INTO ca_state_coverage_code VALUES(255,15,18);
	INSERT INTO ca_state_coverage_code VALUES(256,1,19);
	INSERT INTO ca_state_coverage_code VALUES(257,2,19);
	INSERT INTO ca_state_coverage_code VALUES(258,3,19);
	INSERT INTO ca_state_coverage_code VALUES(259,4,19);
	INSERT INTO ca_state_coverage_code VALUES(260,5,19);
	INSERT INTO ca_state_coverage_code VALUES(261,6,19);
	INSERT INTO ca_state_coverage_code VALUES(262,9,19);
	INSERT INTO ca_state_coverage_code VALUES(263,10,19);
	INSERT INTO ca_state_coverage_code VALUES(264,12,19);
	INSERT INTO ca_state_coverage_code VALUES(265,7,19);
	INSERT INTO ca_state_coverage_code VALUES(266,8,19);
	INSERT INTO ca_state_coverage_code VALUES(267,11,19);
	INSERT INTO ca_state_coverage_code VALUES(268,13,19);
	INSERT INTO ca_state_coverage_code VALUES(269,14,19);
	INSERT INTO ca_state_coverage_code VALUES(270,15,19);
	INSERT INTO ca_state_coverage_code VALUES(271,1,20);
	INSERT INTO ca_state_coverage_code VALUES(272,2,20);
	INSERT INTO ca_state_coverage_code VALUES(273,3,20);
	INSERT INTO ca_state_coverage_code VALUES(274,4,20);
	INSERT INTO ca_state_coverage_code VALUES(275,5,20);
	INSERT INTO ca_state_coverage_code VALUES(276,6,20);
	INSERT INTO ca_state_coverage_code VALUES(277,9,20);
	INSERT INTO ca_state_coverage_code VALUES(278,10,20);
	INSERT INTO ca_state_coverage_code VALUES(279,12,20);
	INSERT INTO ca_state_coverage_code VALUES(280,7,20);
	INSERT INTO ca_state_coverage_code VALUES(281,8,20);
	INSERT INTO ca_state_coverage_code VALUES(282,11,20);
	INSERT INTO ca_state_coverage_code VALUES(283,13,20);
	INSERT INTO ca_state_coverage_code VALUES(284,14,20);
	INSERT INTO ca_state_coverage_code VALUES(285,15,20);
	INSERT INTO ca_state_coverage_code VALUES(286,1,21);
	INSERT INTO ca_state_coverage_code VALUES(287,2,21);
	INSERT INTO ca_state_coverage_code VALUES(288,3,21);
	INSERT INTO ca_state_coverage_code VALUES(289,4,21);
	INSERT INTO ca_state_coverage_code VALUES(290,5,21);
	INSERT INTO ca_state_coverage_code VALUES(291,6,21);
	INSERT INTO ca_state_coverage_code VALUES(292,9,21);
	INSERT INTO ca_state_coverage_code VALUES(293,10,21);
	INSERT INTO ca_state_coverage_code VALUES(294,12,21);
	INSERT INTO ca_state_coverage_code VALUES(295,7,21);
	INSERT INTO ca_state_coverage_code VALUES(296,8,21);
	INSERT INTO ca_state_coverage_code VALUES(297,11,21);
	INSERT INTO ca_state_coverage_code VALUES(298,13,21);
	INSERT INTO ca_state_coverage_code VALUES(299,14,21);
	INSERT INTO ca_state_coverage_code VALUES(300,15,21);
	INSERT INTO ca_state_coverage_code VALUES(301,1,22);
	INSERT INTO ca_state_coverage_code VALUES(302,2,22);
	INSERT INTO ca_state_coverage_code VALUES(303,3,22);
	INSERT INTO ca_state_coverage_code VALUES(304,4,22);
	INSERT INTO ca_state_coverage_code VALUES(305,5,22);
	INSERT INTO ca_state_coverage_code VALUES(306,6,22);
	INSERT INTO ca_state_coverage_code VALUES(307,9,22);
	INSERT INTO ca_state_coverage_code VALUES(308,10,22);
	INSERT INTO ca_state_coverage_code VALUES(309,12,22);
	INSERT INTO ca_state_coverage_code VALUES(310,7,22);
	INSERT INTO ca_state_coverage_code VALUES(311,8,22);
	INSERT INTO ca_state_coverage_code VALUES(312,11,22);
	INSERT INTO ca_state_coverage_code VALUES(313,13,22);
	INSERT INTO ca_state_coverage_code VALUES(314,14,22);
	INSERT INTO ca_state_coverage_code VALUES(315,15,22);
	INSERT INTO ca_state_coverage_code VALUES(316,1,23);
	INSERT INTO ca_state_coverage_code VALUES(317,2,23);
	INSERT INTO ca_state_coverage_code VALUES(318,3,23);
	INSERT INTO ca_state_coverage_code VALUES(319,4,23);
	INSERT INTO ca_state_coverage_code VALUES(320,5,23);
	INSERT INTO ca_state_coverage_code VALUES(321,6,23);
	INSERT INTO ca_state_coverage_code VALUES(322,9,23);
	INSERT INTO ca_state_coverage_code VALUES(323,10,23);
	INSERT INTO ca_state_coverage_code VALUES(324,12,23);
	INSERT INTO ca_state_coverage_code VALUES(325,7,23);
	INSERT INTO ca_state_coverage_code VALUES(326,8,23);
	INSERT INTO ca_state_coverage_code VALUES(327,11,23);
	INSERT INTO ca_state_coverage_code VALUES(328,13,23);
	INSERT INTO ca_state_coverage_code VALUES(329,14,23);
	INSERT INTO ca_state_coverage_code VALUES(330,15,23);
	INSERT INTO ca_state_coverage_code VALUES(331,1,24);
	INSERT INTO ca_state_coverage_code VALUES(332,2,24);
	INSERT INTO ca_state_coverage_code VALUES(333,3,24);
	INSERT INTO ca_state_coverage_code VALUES(334,4,24);
	INSERT INTO ca_state_coverage_code VALUES(335,5,24);
	INSERT INTO ca_state_coverage_code VALUES(336,6,24);
	INSERT INTO ca_state_coverage_code VALUES(337,9,24);
	INSERT INTO ca_state_coverage_code VALUES(338,10,24);
	INSERT INTO ca_state_coverage_code VALUES(339,12,24);
	INSERT INTO ca_state_coverage_code VALUES(340,7,24);
	INSERT INTO ca_state_coverage_code VALUES(341,8,24);
	INSERT INTO ca_state_coverage_code VALUES(342,11,24);
	INSERT INTO ca_state_coverage_code VALUES(343,13,24);
	INSERT INTO ca_state_coverage_code VALUES(344,14,24);
	INSERT INTO ca_state_coverage_code VALUES(345,15,24);
	INSERT INTO ca_state_coverage_code VALUES(346,1,25);
	INSERT INTO ca_state_coverage_code VALUES(347,2,25);
	INSERT INTO ca_state_coverage_code VALUES(348,3,25);
	INSERT INTO ca_state_coverage_code VALUES(349,4,25);
	INSERT INTO ca_state_coverage_code VALUES(350,5,25);
	INSERT INTO ca_state_coverage_code VALUES(351,6,25);
	INSERT INTO ca_state_coverage_code VALUES(352,9,25);
	INSERT INTO ca_state_coverage_code VALUES(353,10,25);
	INSERT INTO ca_state_coverage_code VALUES(354,12,25);
	INSERT INTO ca_state_coverage_code VALUES(355,7,25);
	INSERT INTO ca_state_coverage_code VALUES(356,8,25);
	INSERT INTO ca_state_coverage_code VALUES(357,11,25);
	INSERT INTO ca_state_coverage_code VALUES(358,13,25);
	INSERT INTO ca_state_coverage_code VALUES(359,14,25);
	INSERT INTO ca_state_coverage_code VALUES(360,15,25);
	INSERT INTO ca_state_coverage_code VALUES(361,1,26);
	INSERT INTO ca_state_coverage_code VALUES(362,2,26);
	INSERT INTO ca_state_coverage_code VALUES(363,3,26);
	INSERT INTO ca_state_coverage_code VALUES(364,4,26);
	INSERT INTO ca_state_coverage_code VALUES(365,5,26);
	INSERT INTO ca_state_coverage_code VALUES(366,6,26);
	INSERT INTO ca_state_coverage_code VALUES(367,9,26);
	INSERT INTO ca_state_coverage_code VALUES(368,10,26);
	INSERT INTO ca_state_coverage_code VALUES(369,12,26);
	INSERT INTO ca_state_coverage_code VALUES(370,7,26);
	INSERT INTO ca_state_coverage_code VALUES(371,8,26);
	INSERT INTO ca_state_coverage_code VALUES(372,11,26);
	INSERT INTO ca_state_coverage_code VALUES(373,13,26);
	INSERT INTO ca_state_coverage_code VALUES(374,14,26);
	INSERT INTO ca_state_coverage_code VALUES(375,15,26);
	INSERT INTO ca_state_coverage_code VALUES(376,1,27);
	INSERT INTO ca_state_coverage_code VALUES(377,2,27);
	INSERT INTO ca_state_coverage_code VALUES(378,3,27);
	INSERT INTO ca_state_coverage_code VALUES(379,4,27);
	INSERT INTO ca_state_coverage_code VALUES(380,5,27);
	INSERT INTO ca_state_coverage_code VALUES(381,6,27);
	INSERT INTO ca_state_coverage_code VALUES(382,9,27);
	INSERT INTO ca_state_coverage_code VALUES(383,10,27);
	INSERT INTO ca_state_coverage_code VALUES(384,12,27);
	INSERT INTO ca_state_coverage_code VALUES(385,7,27);
	INSERT INTO ca_state_coverage_code VALUES(386,8,27);
	INSERT INTO ca_state_coverage_code VALUES(387,11,27);
	INSERT INTO ca_state_coverage_code VALUES(388,13,27);
	INSERT INTO ca_state_coverage_code VALUES(389,14,27);
	INSERT INTO ca_state_coverage_code VALUES(390,15,27);
	INSERT INTO ca_state_coverage_code VALUES(391,1,28);
	INSERT INTO ca_state_coverage_code VALUES(392,2,28);
	INSERT INTO ca_state_coverage_code VALUES(393,3,28);
	INSERT INTO ca_state_coverage_code VALUES(394,4,28);
	INSERT INTO ca_state_coverage_code VALUES(395,5,28);
	INSERT INTO ca_state_coverage_code VALUES(396,6,28);
	INSERT INTO ca_state_coverage_code VALUES(397,9,28);
	INSERT INTO ca_state_coverage_code VALUES(398,10,28);
	INSERT INTO ca_state_coverage_code VALUES(399,12,28);
	INSERT INTO ca_state_coverage_code VALUES(400,7,28);
	INSERT INTO ca_state_coverage_code VALUES(401,8,28);
	INSERT INTO ca_state_coverage_code VALUES(402,11,28);
	INSERT INTO ca_state_coverage_code VALUES(403,13,28);
	INSERT INTO ca_state_coverage_code VALUES(404,14,28);
	INSERT INTO ca_state_coverage_code VALUES(405,15,28);
	INSERT INTO ca_state_coverage_code VALUES(406,1,29);
	INSERT INTO ca_state_coverage_code VALUES(407,2,29);
	INSERT INTO ca_state_coverage_code VALUES(408,3,29);
	INSERT INTO ca_state_coverage_code VALUES(409,4,29);
	INSERT INTO ca_state_coverage_code VALUES(410,5,29);
	INSERT INTO ca_state_coverage_code VALUES(411,6,29);
	INSERT INTO ca_state_coverage_code VALUES(412,9,29);
	INSERT INTO ca_state_coverage_code VALUES(413,10,29);
	INSERT INTO ca_state_coverage_code VALUES(414,12,29);
	INSERT INTO ca_state_coverage_code VALUES(415,7,29);
	INSERT INTO ca_state_coverage_code VALUES(416,8,29);
	INSERT INTO ca_state_coverage_code VALUES(417,11,29);
	INSERT INTO ca_state_coverage_code VALUES(418,13,29);
	INSERT INTO ca_state_coverage_code VALUES(419,14,29);
	INSERT INTO ca_state_coverage_code VALUES(420,15,29);
	INSERT INTO ca_state_coverage_code VALUES(421,1,30);
	INSERT INTO ca_state_coverage_code VALUES(422,2,30);
	INSERT INTO ca_state_coverage_code VALUES(423,3,30);
	INSERT INTO ca_state_coverage_code VALUES(424,4,30);
	INSERT INTO ca_state_coverage_code VALUES(425,5,30);
	INSERT INTO ca_state_coverage_code VALUES(426,6,30);
	INSERT INTO ca_state_coverage_code VALUES(427,9,30);
	INSERT INTO ca_state_coverage_code VALUES(428,10,30);
	INSERT INTO ca_state_coverage_code VALUES(429,12,30);
	INSERT INTO ca_state_coverage_code VALUES(430,7,30);
	INSERT INTO ca_state_coverage_code VALUES(431,8,30);
	INSERT INTO ca_state_coverage_code VALUES(432,11,30);
	INSERT INTO ca_state_coverage_code VALUES(433,13,30);
	INSERT INTO ca_state_coverage_code VALUES(434,14,30);
	INSERT INTO ca_state_coverage_code VALUES(435,15,30);
	INSERT INTO ca_state_coverage_code VALUES(436,1,31);
	INSERT INTO ca_state_coverage_code VALUES(437,2,31);
	INSERT INTO ca_state_coverage_code VALUES(438,3,31);
	INSERT INTO ca_state_coverage_code VALUES(439,4,31);
	INSERT INTO ca_state_coverage_code VALUES(440,5,31);
	INSERT INTO ca_state_coverage_code VALUES(441,6,31);
	INSERT INTO ca_state_coverage_code VALUES(442,9,31);
	INSERT INTO ca_state_coverage_code VALUES(443,10,31);
	INSERT INTO ca_state_coverage_code VALUES(444,12,31);
	INSERT INTO ca_state_coverage_code VALUES(445,7,31);
	INSERT INTO ca_state_coverage_code VALUES(446,8,31);
	INSERT INTO ca_state_coverage_code VALUES(447,11,31);
	INSERT INTO ca_state_coverage_code VALUES(448,13,31);
	INSERT INTO ca_state_coverage_code VALUES(449,14,31);
	INSERT INTO ca_state_coverage_code VALUES(450,15,31);
	INSERT INTO ca_state_coverage_code VALUES(451,1,32);
	INSERT INTO ca_state_coverage_code VALUES(452,2,32);
	INSERT INTO ca_state_coverage_code VALUES(453,3,32);
	INSERT INTO ca_state_coverage_code VALUES(454,4,32);
	INSERT INTO ca_state_coverage_code VALUES(455,5,32);
	INSERT INTO ca_state_coverage_code VALUES(456,6,32);
	INSERT INTO ca_state_coverage_code VALUES(457,9,32);
	INSERT INTO ca_state_coverage_code VALUES(458,10,32);
	INSERT INTO ca_state_coverage_code VALUES(459,12,32);
	INSERT INTO ca_state_coverage_code VALUES(460,7,32);
	INSERT INTO ca_state_coverage_code VALUES(461,8,32);
	INSERT INTO ca_state_coverage_code VALUES(462,11,32);
	INSERT INTO ca_state_coverage_code VALUES(463,13,32);
	INSERT INTO ca_state_coverage_code VALUES(464,14,32);
	INSERT INTO ca_state_coverage_code VALUES(465,15,32);
	INSERT INTO ca_state_coverage_code VALUES(466,1,33);
	INSERT INTO ca_state_coverage_code VALUES(467,2,33);
	INSERT INTO ca_state_coverage_code VALUES(468,3,33);
	INSERT INTO ca_state_coverage_code VALUES(469,4,33);
	INSERT INTO ca_state_coverage_code VALUES(470,5,33);
	INSERT INTO ca_state_coverage_code VALUES(471,6,33);
	INSERT INTO ca_state_coverage_code VALUES(472,9,33);
	INSERT INTO ca_state_coverage_code VALUES(473,10,33);
	INSERT INTO ca_state_coverage_code VALUES(474,12,33);
	INSERT INTO ca_state_coverage_code VALUES(475,7,33);
	INSERT INTO ca_state_coverage_code VALUES(476,8,33);
	INSERT INTO ca_state_coverage_code VALUES(477,11,33);
	INSERT INTO ca_state_coverage_code VALUES(478,13,33);
	INSERT INTO ca_state_coverage_code VALUES(479,14,33);
	INSERT INTO ca_state_coverage_code VALUES(480,15,33);
	INSERT INTO ca_state_coverage_code VALUES(481,1,34);
	INSERT INTO ca_state_coverage_code VALUES(482,2,34);
	INSERT INTO ca_state_coverage_code VALUES(483,3,34);
	INSERT INTO ca_state_coverage_code VALUES(484,4,34);
	INSERT INTO ca_state_coverage_code VALUES(485,5,34);
	INSERT INTO ca_state_coverage_code VALUES(486,6,34);
	INSERT INTO ca_state_coverage_code VALUES(487,9,34);
	INSERT INTO ca_state_coverage_code VALUES(488,10,34);
	INSERT INTO ca_state_coverage_code VALUES(489,12,34);
	INSERT INTO ca_state_coverage_code VALUES(490,7,34);
	INSERT INTO ca_state_coverage_code VALUES(491,8,34);
	INSERT INTO ca_state_coverage_code VALUES(492,11,34);
	INSERT INTO ca_state_coverage_code VALUES(493,13,34);
	INSERT INTO ca_state_coverage_code VALUES(494,14,34);
	INSERT INTO ca_state_coverage_code VALUES(495,15,34);
	INSERT INTO ca_state_coverage_code VALUES(496,1,35);
	INSERT INTO ca_state_coverage_code VALUES(497,2,35);
	INSERT INTO ca_state_coverage_code VALUES(498,3,35);
	INSERT INTO ca_state_coverage_code VALUES(499,4,35);
	INSERT INTO ca_state_coverage_code VALUES(500,5,35);
	INSERT INTO ca_state_coverage_code VALUES(501,6,35);
	INSERT INTO ca_state_coverage_code VALUES(502,9,35);
	INSERT INTO ca_state_coverage_code VALUES(503,10,35);
	INSERT INTO ca_state_coverage_code VALUES(504,12,35);
	INSERT INTO ca_state_coverage_code VALUES(505,7,35);
	INSERT INTO ca_state_coverage_code VALUES(506,8,35);
	INSERT INTO ca_state_coverage_code VALUES(507,11,35);
	INSERT INTO ca_state_coverage_code VALUES(508,13,35);
	INSERT INTO ca_state_coverage_code VALUES(509,14,35);
	INSERT INTO ca_state_coverage_code VALUES(510,15,35);
	INSERT INTO ca_state_coverage_code VALUES(511,1,36);
	INSERT INTO ca_state_coverage_code VALUES(512,2,36);
	INSERT INTO ca_state_coverage_code VALUES(513,3,36);
	INSERT INTO ca_state_coverage_code VALUES(514,4,36);
	INSERT INTO ca_state_coverage_code VALUES(515,5,36);
	INSERT INTO ca_state_coverage_code VALUES(516,6,36);
	INSERT INTO ca_state_coverage_code VALUES(517,9,36);
	INSERT INTO ca_state_coverage_code VALUES(518,10,36);
	INSERT INTO ca_state_coverage_code VALUES(519,12,36);
	INSERT INTO ca_state_coverage_code VALUES(520,7,36);
	INSERT INTO ca_state_coverage_code VALUES(521,8,36);
	INSERT INTO ca_state_coverage_code VALUES(522,11,36);
	INSERT INTO ca_state_coverage_code VALUES(523,13,36);
	INSERT INTO ca_state_coverage_code VALUES(524,14,36);
	INSERT INTO ca_state_coverage_code VALUES(525,15,36);
	INSERT INTO ca_state_coverage_code VALUES(526,1,38);
	INSERT INTO ca_state_coverage_code VALUES(527,2,38);
	INSERT INTO ca_state_coverage_code VALUES(528,3,38);
	INSERT INTO ca_state_coverage_code VALUES(529,4,38);
	INSERT INTO ca_state_coverage_code VALUES(530,5,38);
	INSERT INTO ca_state_coverage_code VALUES(531,6,38);
	INSERT INTO ca_state_coverage_code VALUES(532,9,38);
	INSERT INTO ca_state_coverage_code VALUES(533,10,38);
	INSERT INTO ca_state_coverage_code VALUES(534,12,38);
	INSERT INTO ca_state_coverage_code VALUES(535,7,38);
	INSERT INTO ca_state_coverage_code VALUES(536,8,38);
	INSERT INTO ca_state_coverage_code VALUES(537,11,38);
	INSERT INTO ca_state_coverage_code VALUES(538,13,38);
	INSERT INTO ca_state_coverage_code VALUES(539,14,38);
	INSERT INTO ca_state_coverage_code VALUES(540,15,38);
	INSERT INTO ca_state_coverage_code VALUES(541,1,39);
	INSERT INTO ca_state_coverage_code VALUES(542,2,39);
	INSERT INTO ca_state_coverage_code VALUES(543,3,39);
	INSERT INTO ca_state_coverage_code VALUES(544,4,39);
	INSERT INTO ca_state_coverage_code VALUES(545,5,39);
	INSERT INTO ca_state_coverage_code VALUES(546,6,39);
	INSERT INTO ca_state_coverage_code VALUES(547,9,39);
	INSERT INTO ca_state_coverage_code VALUES(548,10,39);
	INSERT INTO ca_state_coverage_code VALUES(549,12,39);
	INSERT INTO ca_state_coverage_code VALUES(550,7,39);
	INSERT INTO ca_state_coverage_code VALUES(551,8,39);
	INSERT INTO ca_state_coverage_code VALUES(552,11,39);
	INSERT INTO ca_state_coverage_code VALUES(553,13,39);
	INSERT INTO ca_state_coverage_code VALUES(554,14,39);
	INSERT INTO ca_state_coverage_code VALUES(555,15,39);
	INSERT INTO ca_state_coverage_code VALUES(556,1,40);
	INSERT INTO ca_state_coverage_code VALUES(557,2,40);
	INSERT INTO ca_state_coverage_code VALUES(558,3,40);
	INSERT INTO ca_state_coverage_code VALUES(559,4,40);
	INSERT INTO ca_state_coverage_code VALUES(560,5,40);
	INSERT INTO ca_state_coverage_code VALUES(561,6,40);
	INSERT INTO ca_state_coverage_code VALUES(562,9,40);
	INSERT INTO ca_state_coverage_code VALUES(563,10,40);
	INSERT INTO ca_state_coverage_code VALUES(564,12,40);
	INSERT INTO ca_state_coverage_code VALUES(565,7,40);
	INSERT INTO ca_state_coverage_code VALUES(566,8,40);
	INSERT INTO ca_state_coverage_code VALUES(567,11,40);
	INSERT INTO ca_state_coverage_code VALUES(568,13,40);
	INSERT INTO ca_state_coverage_code VALUES(569,14,40);
	INSERT INTO ca_state_coverage_code VALUES(570,15,40);
	INSERT INTO ca_state_coverage_code VALUES(571,1,41);
	INSERT INTO ca_state_coverage_code VALUES(572,2,41);
	INSERT INTO ca_state_coverage_code VALUES(573,3,41);
	INSERT INTO ca_state_coverage_code VALUES(574,4,41);
	INSERT INTO ca_state_coverage_code VALUES(575,5,41);
	INSERT INTO ca_state_coverage_code VALUES(576,6,41);
	INSERT INTO ca_state_coverage_code VALUES(577,9,41);
	INSERT INTO ca_state_coverage_code VALUES(578,10,41);
	INSERT INTO ca_state_coverage_code VALUES(579,12,41);
	INSERT INTO ca_state_coverage_code VALUES(580,7,41);
	INSERT INTO ca_state_coverage_code VALUES(581,8,41);
	INSERT INTO ca_state_coverage_code VALUES(582,11,41);
	INSERT INTO ca_state_coverage_code VALUES(583,13,41);
	INSERT INTO ca_state_coverage_code VALUES(584,14,41);
	INSERT INTO ca_state_coverage_code VALUES(585,15,41);
	INSERT INTO ca_state_coverage_code VALUES(586,1,42);
	INSERT INTO ca_state_coverage_code VALUES(587,2,42);
	INSERT INTO ca_state_coverage_code VALUES(588,3,42);
	INSERT INTO ca_state_coverage_code VALUES(589,4,42);
	INSERT INTO ca_state_coverage_code VALUES(590,5,42);
	INSERT INTO ca_state_coverage_code VALUES(591,6,42);
	INSERT INTO ca_state_coverage_code VALUES(592,9,42);
	INSERT INTO ca_state_coverage_code VALUES(593,10,42);
	INSERT INTO ca_state_coverage_code VALUES(594,12,42);
	INSERT INTO ca_state_coverage_code VALUES(595,7,42);
	INSERT INTO ca_state_coverage_code VALUES(596,8,42);
	INSERT INTO ca_state_coverage_code VALUES(597,11,42);
	INSERT INTO ca_state_coverage_code VALUES(598,13,42);
	INSERT INTO ca_state_coverage_code VALUES(599,14,42);
	INSERT INTO ca_state_coverage_code VALUES(600,15,42);
	INSERT INTO ca_state_coverage_code VALUES(601,1,43);
	INSERT INTO ca_state_coverage_code VALUES(602,2,43);
	INSERT INTO ca_state_coverage_code VALUES(603,3,43);
	INSERT INTO ca_state_coverage_code VALUES(604,4,43);
	INSERT INTO ca_state_coverage_code VALUES(605,5,43);
	INSERT INTO ca_state_coverage_code VALUES(606,6,43);
	INSERT INTO ca_state_coverage_code VALUES(607,9,43);
	INSERT INTO ca_state_coverage_code VALUES(608,10,43);
	INSERT INTO ca_state_coverage_code VALUES(609,12,43);
	INSERT INTO ca_state_coverage_code VALUES(610,7,43);
	INSERT INTO ca_state_coverage_code VALUES(611,8,43);
	INSERT INTO ca_state_coverage_code VALUES(612,11,43);
	INSERT INTO ca_state_coverage_code VALUES(613,13,43);
	INSERT INTO ca_state_coverage_code VALUES(614,14,43);
	INSERT INTO ca_state_coverage_code VALUES(615,15,43);
	INSERT INTO ca_state_coverage_code VALUES(616,1,44);
	INSERT INTO ca_state_coverage_code VALUES(617,2,44);
	INSERT INTO ca_state_coverage_code VALUES(618,3,44);
	INSERT INTO ca_state_coverage_code VALUES(619,4,44);
	INSERT INTO ca_state_coverage_code VALUES(620,5,44);
	INSERT INTO ca_state_coverage_code VALUES(621,6,44);
	INSERT INTO ca_state_coverage_code VALUES(622,9,44);
	INSERT INTO ca_state_coverage_code VALUES(623,10,44);
	INSERT INTO ca_state_coverage_code VALUES(624,12,44);
	INSERT INTO ca_state_coverage_code VALUES(625,7,44);
	INSERT INTO ca_state_coverage_code VALUES(626,8,44);
	INSERT INTO ca_state_coverage_code VALUES(627,11,44);
	INSERT INTO ca_state_coverage_code VALUES(628,13,44);
	INSERT INTO ca_state_coverage_code VALUES(629,14,44);
	INSERT INTO ca_state_coverage_code VALUES(630,15,44);
	INSERT INTO ca_state_coverage_code VALUES(631,1,45);
	INSERT INTO ca_state_coverage_code VALUES(632,2,45);
	INSERT INTO ca_state_coverage_code VALUES(633,3,45);
	INSERT INTO ca_state_coverage_code VALUES(634,4,45);
	INSERT INTO ca_state_coverage_code VALUES(635,5,45);
	INSERT INTO ca_state_coverage_code VALUES(636,6,45);
	INSERT INTO ca_state_coverage_code VALUES(637,9,45);
	INSERT INTO ca_state_coverage_code VALUES(638,10,45);
	INSERT INTO ca_state_coverage_code VALUES(639,12,45);
	INSERT INTO ca_state_coverage_code VALUES(640,7,45);
	INSERT INTO ca_state_coverage_code VALUES(641,8,45);
	INSERT INTO ca_state_coverage_code VALUES(642,11,45);
	INSERT INTO ca_state_coverage_code VALUES(643,13,45);
	INSERT INTO ca_state_coverage_code VALUES(644,14,45);
	INSERT INTO ca_state_coverage_code VALUES(645,15,45);
	INSERT INTO ca_state_coverage_code VALUES(646,1,46);
	INSERT INTO ca_state_coverage_code VALUES(647,2,46);
	INSERT INTO ca_state_coverage_code VALUES(648,3,46);
	INSERT INTO ca_state_coverage_code VALUES(649,4,46);
	INSERT INTO ca_state_coverage_code VALUES(650,5,46);
	INSERT INTO ca_state_coverage_code VALUES(651,6,46);
	INSERT INTO ca_state_coverage_code VALUES(652,9,46);
	INSERT INTO ca_state_coverage_code VALUES(653,10,46);
	INSERT INTO ca_state_coverage_code VALUES(654,12,46);
	INSERT INTO ca_state_coverage_code VALUES(655,7,46);
	INSERT INTO ca_state_coverage_code VALUES(656,8,46);
	INSERT INTO ca_state_coverage_code VALUES(657,11,46);
	INSERT INTO ca_state_coverage_code VALUES(658,13,46);
	INSERT INTO ca_state_coverage_code VALUES(659,14,46);
	INSERT INTO ca_state_coverage_code VALUES(660,15,46);
	INSERT INTO ca_state_coverage_code VALUES(661,1,47);
	INSERT INTO ca_state_coverage_code VALUES(662,2,47);
	INSERT INTO ca_state_coverage_code VALUES(663,3,47);
	INSERT INTO ca_state_coverage_code VALUES(664,4,47);
	INSERT INTO ca_state_coverage_code VALUES(665,5,47);
	INSERT INTO ca_state_coverage_code VALUES(666,6,47);
	INSERT INTO ca_state_coverage_code VALUES(667,9,47);
	INSERT INTO ca_state_coverage_code VALUES(668,10,47);
	INSERT INTO ca_state_coverage_code VALUES(669,12,47);
	INSERT INTO ca_state_coverage_code VALUES(670,7,47);
	INSERT INTO ca_state_coverage_code VALUES(671,8,47);
	INSERT INTO ca_state_coverage_code VALUES(672,11,47);
	INSERT INTO ca_state_coverage_code VALUES(673,13,47);
	INSERT INTO ca_state_coverage_code VALUES(674,14,47);
	INSERT INTO ca_state_coverage_code VALUES(675,15,47);
	INSERT INTO ca_state_coverage_code VALUES(676,1,48);
	INSERT INTO ca_state_coverage_code VALUES(677,2,48);
	INSERT INTO ca_state_coverage_code VALUES(678,3,48);
	INSERT INTO ca_state_coverage_code VALUES(679,4,48);
	INSERT INTO ca_state_coverage_code VALUES(680,5,48);
	INSERT INTO ca_state_coverage_code VALUES(681,6,48);
	INSERT INTO ca_state_coverage_code VALUES(682,9,48);
	INSERT INTO ca_state_coverage_code VALUES(683,10,48);
	INSERT INTO ca_state_coverage_code VALUES(684,12,48);
	INSERT INTO ca_state_coverage_code VALUES(685,7,48);
	INSERT INTO ca_state_coverage_code VALUES(686,8,48);
	INSERT INTO ca_state_coverage_code VALUES(687,11,48);
	INSERT INTO ca_state_coverage_code VALUES(688,13,48);
	INSERT INTO ca_state_coverage_code VALUES(689,14,48);
	INSERT INTO ca_state_coverage_code VALUES(690,15,48);
	INSERT INTO ca_state_coverage_code VALUES(691,1,49);
	INSERT INTO ca_state_coverage_code VALUES(692,2,49);
	INSERT INTO ca_state_coverage_code VALUES(693,3,49);
	INSERT INTO ca_state_coverage_code VALUES(694,4,49);
	INSERT INTO ca_state_coverage_code VALUES(695,5,49);
	INSERT INTO ca_state_coverage_code VALUES(696,6,49);
	INSERT INTO ca_state_coverage_code VALUES(697,9,49);
	INSERT INTO ca_state_coverage_code VALUES(698,10,49);
	INSERT INTO ca_state_coverage_code VALUES(699,12,49);
	INSERT INTO ca_state_coverage_code VALUES(700,7,49);
	INSERT INTO ca_state_coverage_code VALUES(701,8,49);
	INSERT INTO ca_state_coverage_code VALUES(702,11,49);
	INSERT INTO ca_state_coverage_code VALUES(703,13,49);
	INSERT INTO ca_state_coverage_code VALUES(704,14,49);
	INSERT INTO ca_state_coverage_code VALUES(705,15,49);
	INSERT INTO ca_state_coverage_code VALUES(706,1,50);
	INSERT INTO ca_state_coverage_code VALUES(707,2,50);
	INSERT INTO ca_state_coverage_code VALUES(708,3,50);
	INSERT INTO ca_state_coverage_code VALUES(709,4,50);
	INSERT INTO ca_state_coverage_code VALUES(710,5,50);
	INSERT INTO ca_state_coverage_code VALUES(711,6,50);
	INSERT INTO ca_state_coverage_code VALUES(712,9,50);
	INSERT INTO ca_state_coverage_code VALUES(713,10,50);
	INSERT INTO ca_state_coverage_code VALUES(714,12,50);
	INSERT INTO ca_state_coverage_code VALUES(715,7,50);
	INSERT INTO ca_state_coverage_code VALUES(716,8,50);
	INSERT INTO ca_state_coverage_code VALUES(717,11,50);
	INSERT INTO ca_state_coverage_code VALUES(718,13,50);
	INSERT INTO ca_state_coverage_code VALUES(719,14,50);
	INSERT INTO ca_state_coverage_code VALUES(720,15,50);
	INSERT INTO ca_state_coverage_code VALUES(721,1,51);
	INSERT INTO ca_state_coverage_code VALUES(722,2,51);
	INSERT INTO ca_state_coverage_code VALUES(723,3,51);
	INSERT INTO ca_state_coverage_code VALUES(724,4,51);
	INSERT INTO ca_state_coverage_code VALUES(725,5,51);
	INSERT INTO ca_state_coverage_code VALUES(726,6,51);
	INSERT INTO ca_state_coverage_code VALUES(727,9,51);
	INSERT INTO ca_state_coverage_code VALUES(728,10,51);
	INSERT INTO ca_state_coverage_code VALUES(729,12,51);
	INSERT INTO ca_state_coverage_code VALUES(730,7,51);
	INSERT INTO ca_state_coverage_code VALUES(731,8,51);
	INSERT INTO ca_state_coverage_code VALUES(732,11,51);
	INSERT INTO ca_state_coverage_code VALUES(733,13,51);
	INSERT INTO ca_state_coverage_code VALUES(734,14,51);
	INSERT INTO ca_state_coverage_code VALUES(735,15,51);
	INSERT INTO ca_state_coverage_code VALUES(736,1,52);
	INSERT INTO ca_state_coverage_code VALUES(737,2,52);
	INSERT INTO ca_state_coverage_code VALUES(738,3,52);
	INSERT INTO ca_state_coverage_code VALUES(739,4,52);
	INSERT INTO ca_state_coverage_code VALUES(740,5,52);
	INSERT INTO ca_state_coverage_code VALUES(741,6,52);
	INSERT INTO ca_state_coverage_code VALUES(742,9,52);
	INSERT INTO ca_state_coverage_code VALUES(743,10,52);
	INSERT INTO ca_state_coverage_code VALUES(744,12,52);
	INSERT INTO ca_state_coverage_code VALUES(745,7,52);
	INSERT INTO ca_state_coverage_code VALUES(746,8,52);
	INSERT INTO ca_state_coverage_code VALUES(747,11,52);
	INSERT INTO ca_state_coverage_code VALUES(748,13,52);
	INSERT INTO ca_state_coverage_code VALUES(749,14,52);
	INSERT INTO ca_state_coverage_code VALUES(750,15,52);
	INSERT INTO ca_state_coverage_code VALUES(751,1,3);
	INSERT INTO ca_state_coverage_code VALUES(752,2,3);
	INSERT INTO ca_state_coverage_code VALUES(753,13,3);
	INSERT INTO ca_state_coverage_code VALUES(754,5,3);
	INSERT INTO ca_state_coverage_code VALUES(755,6,3);
	INSERT INTO ca_state_coverage_code VALUES(756,9,3);
	INSERT INTO ca_state_coverage_code VALUES(757,10,3);
	INSERT INTO ca_state_coverage_code VALUES(758,12,3);
	INSERT INTO ca_state_coverage_code VALUES(759,7,3);
	INSERT INTO ca_state_coverage_code VALUES(760,8,3);
	INSERT INTO ca_state_coverage_code VALUES(761,14,3);
	INSERT INTO ca_state_coverage_code VALUES(762,15,3);
	INSERT INTO ca_state_coverage_code VALUES(763,16,3);
	INSERT INTO ca_state_coverage_code VALUES(764,1,37);
	INSERT INTO ca_state_coverage_code VALUES(765,2,37);
	INSERT INTO ca_state_coverage_code VALUES(766,17,37);
	INSERT INTO ca_state_coverage_code VALUES(767,18,37);
	INSERT INTO ca_state_coverage_code VALUES(768,9,37);
	INSERT INTO ca_state_coverage_code VALUES(769,10,37);
	INSERT INTO ca_state_coverage_code VALUES(770,12,37);
	INSERT INTO ca_state_coverage_code VALUES(771,7,37);
	INSERT INTO ca_state_coverage_code VALUES(772,8,37);
	INSERT INTO ca_state_coverage_code VALUES(773,11,37);
	INSERT INTO ca_state_coverage_code VALUES(774,19,37);
	INSERT INTO ca_state_coverage_code VALUES(775,20,37);
	INSERT INTO ca_state_coverage_code VALUES(776,21,37);
	INSERT INTO ca_state_coverage_code VALUES(777,22,37);
	INSERT INTO ca_state_coverage_code VALUES(778,23,37);
	INSERT INTO ca_state_coverage_code VALUES(779,24,37);
	INSERT INTO ca_state_coverage_code VALUES(780,25,37);
	INSERT INTO ca_state_coverage_code VALUES(781,26,37);
	INSERT INTO ca_state_coverage_code VALUES(782,27,37);
	INSERT INTO ca_state_coverage_code VALUES(783,28,37);
	INSERT INTO ca_state_coverage_code VALUES(784,29,37);
	INSERT INTO ca_state_coverage_code VALUES(785,30,37);
	INSERT INTO ca_state_coverage_code VALUES(786,31,37);
	INSERT INTO ca_state_coverage_code VALUES(787,32,37);
END IF; 
END $$;



DO $$
BEGIN 
CREATE TABLE IF NOT EXISTS ca_cause_of_loss_code (
    id INT,
    fk_coverage_code_id INT,
    loss_code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (select * from ca_cause_of_loss_code) THEN
  INSERT INTO ca_cause_of_loss_code VALUES (1,1,1,'Bodily Injury');
  INSERT INTO ca_cause_of_loss_code VALUES (2,1,2,'Death Limit Claim (New York only)');
  INSERT INTO ca_cause_of_loss_code VALUES (3,2,2,'Property Damage');
  INSERT INTO ca_cause_of_loss_code VALUES (4,3,1,'Bodily Injury');
  INSERT INTO ca_cause_of_loss_code VALUES (5,3,2,'Property Damage');
  INSERT INTO ca_cause_of_loss_code VALUES (6,4,1,'Medical Expenses — Basic');
  INSERT INTO ca_cause_of_loss_code VALUES (7,4,2,'Loss of Income — Basic');
  INSERT INTO ca_cause_of_loss_code VALUES (8,4,3,'Survivors Benefits — Basic');
  INSERT INTO ca_cause_of_loss_code VALUES (9,4,4,'Funeral Expenses — Basic');
  INSERT INTO ca_cause_of_loss_code VALUES (10,4,5,'Medical Expenses — Excess');
  INSERT INTO ca_cause_of_loss_code VALUES (11,4,6,'Loss of Income — Excess');
  INSERT INTO ca_cause_of_loss_code VALUES (12,4,8,'All Other — Excess');
  INSERT INTO ca_cause_of_loss_code VALUES (13,4,9,'All Other — Basic');
  INSERT INTO ca_cause_of_loss_code VALUES (14,5,1,'Medical Payments');
  INSERT INTO ca_cause_of_loss_code VALUES (15,6,1,'Bodily Injury');
  INSERT INTO ca_cause_of_loss_code VALUES (16,6,2,'Property Damage');
  INSERT INTO ca_cause_of_loss_code VALUES (17,6,3,'Bodily Injury');
  INSERT INTO ca_cause_of_loss_code VALUES (18,6,4,'Property Damage');
  INSERT INTO ca_cause_of_loss_code VALUES (19,6,5,'Other than death limit claims (New York only)');
  INSERT INTO ca_cause_of_loss_code VALUES (20,6,6,'Death limit claims (New York only)');
  INSERT INTO ca_cause_of_loss_code VALUES (21,6,7,'Voluntary Coverage (Risk state = NY) (NY only)');
  INSERT INTO ca_cause_of_loss_code VALUES (22,6,8,'All Other');
  INSERT INTO ca_cause_of_loss_code VALUES (23,6,9,'All Other');
  INSERT INTO ca_cause_of_loss_code VALUES (24,9,1,'Collision');
  INSERT INTO ca_cause_of_loss_code VALUES (25,10,0,'Personal Effects');
  INSERT INTO ca_cause_of_loss_code VALUES (26,10,1,'Fire');
  INSERT INTO ca_cause_of_loss_code VALUES (27,10,2,'Theft');
  INSERT INTO ca_cause_of_loss_code VALUES (28,10,3,'Vandalism');
  INSERT INTO ca_cause_of_loss_code VALUES (29,10,4,'Glass Breakage');
  INSERT INTO ca_cause_of_loss_code VALUES (30,10,5,'Wind and Hail');
  INSERT INTO ca_cause_of_loss_code VALUES (31,10,6,'Earthquake');
  INSERT INTO ca_cause_of_loss_code VALUES (32,10,7,'Water');
  INSERT INTO ca_cause_of_loss_code VALUES (33,10,8,'Towing and Labor or Other Transportation');
  INSERT INTO ca_cause_of_loss_code VALUES (34,10,9,'All Other');
  INSERT INTO ca_cause_of_loss_code VALUES (35,12,9,'Any Cause of Loss for Coverage Code 9');
  INSERT INTO ca_cause_of_loss_code VALUES (36,7,1,'Bodily Injury');
  INSERT INTO ca_cause_of_loss_code VALUES (37,7,2,'Property Damage');
  INSERT INTO ca_cause_of_loss_code VALUES (38,7,5,'Other than death limit claims (New York only)');
  INSERT INTO ca_cause_of_loss_code VALUES (39,7,6,'Death limit claims (New York only)');
  INSERT INTO ca_cause_of_loss_code VALUES (40,7,7,'Voluntary Coverage (Risk state = NY) (NY only)');
  INSERT INTO ca_cause_of_loss_code VALUES (41,7,8,'All Other');
  INSERT INTO ca_cause_of_loss_code VALUES (42,8,3,'Bodily Injury');
  INSERT INTO ca_cause_of_loss_code VALUES (43,8,4,'Property Damage');
  INSERT INTO ca_cause_of_loss_code VALUES (44,8,9,'All Other');
  INSERT INTO ca_cause_of_loss_code VALUES (45,11,0,'Personal Effects');
  INSERT INTO ca_cause_of_loss_code VALUES (46,11,1,'Fire');
  INSERT INTO ca_cause_of_loss_code VALUES (47,11,2,'Theft');
  INSERT INTO ca_cause_of_loss_code VALUES (48,11,3,'Vandalism');
  INSERT INTO ca_cause_of_loss_code VALUES (49,11,4,'Glass Breakage');
  INSERT INTO ca_cause_of_loss_code VALUES (50,11,5,'Wind and Hail');
  INSERT INTO ca_cause_of_loss_code VALUES (51,11,6,'Earthquake');
  INSERT INTO ca_cause_of_loss_code VALUES (52,11,7,'Water');
  INSERT INTO ca_cause_of_loss_code VALUES (53,11,8,'Towing and Labor or Other Transportation');
  INSERT INTO ca_cause_of_loss_code VALUES (54,11,9,'All Other');
  INSERT INTO ca_cause_of_loss_code VALUES (55,19,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (56,19,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (57,19,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (58,19,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (59,20,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (60,20,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (61,20,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (62,20,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (63,21,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (64,21,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (65,21,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (66,21,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (67,22,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (68,22,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (69,22,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (70,22,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (71,23,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (72,23,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (73,23,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (74,23,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (75,24,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (76,24,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (77,24,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (78,24,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (79,25,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (80,25,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (81,25,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (82,25,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (83,26,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (84,26,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (85,26,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (86,26,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (87,27,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (88,27,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (89,27,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (90,27,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (91,28,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (92,28,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (93,28,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (94,28,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (95,29,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (96,29,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (97,29,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (98,29,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (99,30,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (100,30,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (101,30,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (102,30,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (103,31,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (104,31,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (105,31,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (106,31,4,'Funeral Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (107,32,1,'Medical Expenses');
  INSERT INTO ca_cause_of_loss_code VALUES (108,32,2,'Loss of Income');
  INSERT INTO ca_cause_of_loss_code VALUES (109,32,3,'Survivors Benefits');
  INSERT INTO ca_cause_of_loss_code VALUES (110,32,4,'Funeral Expenses');
END IF;
END $$;


