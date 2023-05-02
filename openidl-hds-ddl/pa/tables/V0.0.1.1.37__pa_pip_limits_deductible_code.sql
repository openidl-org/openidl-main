DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_pip_limits_deductible_code (
    id INT,
    fk_state_id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);
IF NOT EXISTS (SELECT * FROM pa_pip_limits_deductible_code) THEN

    INSERT INTO pa_pip_limits_deductible_code VALUES(1,1,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(2,1,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(3,1,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(4,1,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(5,2,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(6,2,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(7,2,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(8,2,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(9,3,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(10,3,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(11,3,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(12,3,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(13,4,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(14,4,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(15,4,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(16,4,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(17,5,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(18,5,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(19,5,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(20,5,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(21,6,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(22,6,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(23,6,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(24,6,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(25,7,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(26,7,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(27,7,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(28,7,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(29,8,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(30,8,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(31,8,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(32,8,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(33,9,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(34,9,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(35,9,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(36,9,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(37,10,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(38,10,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(39,10,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(40,10,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(41,11,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(42,11,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(43,11,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(44,11,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(45,12,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(46,12,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(47,12,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(48,12,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(49,13,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(50,13,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(51,13,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(52,13,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(53,14,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(54,14,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(55,14,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(56,14,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(57,15,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(58,15,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(59,15,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(60,15,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(61,16,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(62,16,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(63,16,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(64,16,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(65,17,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(66,17,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(67,17,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(68,17,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(69,18,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(70,18,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(71,18,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(72,18,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(73,19,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(74,19,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(75,19,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(76,19,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(77,20,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(78,20,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(79,20,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(80,20,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(81,22,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(82,22,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(83,22,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(84,22,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(85,23,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(86,23,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(87,23,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(88,23,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(89,24,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(90,24,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(91,24,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(92,24,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(93,25,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(94,25,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(95,25,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(96,25,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(97,26,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(98,26,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(99,26,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(100,26,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(101,27,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(102,27,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(103,27,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(104,27,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(105,28,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(106,28,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(107,28,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(108,28,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(109,29,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(110,29,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(111,29,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(112,29,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(113,30,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(114,30,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(115,30,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(116,30,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(117,32,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(118,32,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(119,32,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(120,32,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(121,33,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(122,33,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(123,33,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(124,33,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(125,34,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(126,34,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(127,34,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(128,34,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(129,35,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(130,35,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(131,35,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(132,35,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(133,36,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(134,36,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(135,36,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(136,36,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(137,37,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(138,37,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(139,37,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(140,37,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(141,38,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(142,38,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(143,38,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(144,38,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(145,39,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(146,39,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(147,39,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(148,39,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(149,40,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(150,40,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(151,40,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(152,40,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(153,41,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(154,41,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(155,41,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(156,41,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(157,42,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(158,42,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(159,42,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(160,42,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(161,43,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(162,43,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(163,43,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(164,43,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(165,44,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(166,44,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(167,44,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(168,44,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(169,45,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(170,45,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(171,45,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(172,45,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(173,46,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(174,46,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(175,46,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(176,46,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(177,47,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(178,47,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(179,47,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(180,47,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(181,48,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(182,48,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(183,48,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(184,48,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(185,49,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(186,49,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(187,49,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(188,49,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(189,50,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(190,50,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(191,50,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(192,50,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(193,51,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(194,51,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(195,51,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(196,51,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(197,52,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(198,52,'2','Basic PIP coverage — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(199,52,'3','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(200,52,'4','Basic and additional PIP — Deductible applies');
    INSERT INTO pa_pip_limits_deductible_code VALUES(201,21,'1','Full coverage without dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(202,21,'2','Full coverage with dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(203,21,'3','$300 deductible without dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(204,21,'4','$300 deductible with dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(205,21,'5','Full coverage without dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(206,21,'6','Full coverage with dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(207,21,'7','$300 deductible without dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(208,21,'8','$300 deductible with dependents reduction');
    INSERT INTO pa_pip_limits_deductible_code VALUES(209,21,'9','All other PIP coverages (including motorcycle buy back)');
    INSERT INTO pa_pip_limits_deductible_code VALUES(210,31,'1','Basic PIP coverage — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(211,31,'2','Basic and additional PIP — No deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(212,31,'3','$200 deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(213,31,'4','$100 deductible');
    INSERT INTO pa_pip_limits_deductible_code VALUES(214,31,'5','All Other deductibles');

END IF;

END $$
