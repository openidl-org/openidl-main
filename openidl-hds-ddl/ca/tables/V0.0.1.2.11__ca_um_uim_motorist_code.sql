
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