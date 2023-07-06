
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_class_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM mho_class_code) THEN 
    INSERT INTO mho_class_code VALUES(1,'10010','Crafts: Baskets','Home-Based Business');
    INSERT INTO mho_class_code VALUES(2,'10020','Crafts: Candles','Home-Based Business');
    INSERT INTO mho_class_code VALUES(3,'10030','Crafts: Ceramics','Home-Based Business');
    INSERT INTO mho_class_code VALUES(4,'10040','Crafts: Decorative Clothing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(5,'10050','Crafts: Dolls','Home-Based Business');
    INSERT INTO mho_class_code VALUES(6,'10060','Crafts: Fabrics','Home-Based Business');
    INSERT INTO mho_class_code VALUES(7,'10070','Crafts: Flower Arrangements','Home-Based Business');
    INSERT INTO mho_class_code VALUES(8,'10080','Crafts: Glass','Home-Based Business');
    INSERT INTO mho_class_code VALUES(9,'10085','Crafts: Hobby Stores','Home-Based Business');
    INSERT INTO mho_class_code VALUES(10,'10090','Crafts: Jewelry','Home-Based Business');
    INSERT INTO mho_class_code VALUES(11,'10100','Crafts: Metalwork','Home-Based Business');
    INSERT INTO mho_class_code VALUES(12,'10110','Crafts: Needlework','Home-Based Business');
    INSERT INTO mho_class_code VALUES(13,'10120','Crafts: Quilts','Home-Based Business');
    INSERT INTO mho_class_code VALUES(14,'10130','Crafts: Sculptures','Home-Based Business');
    INSERT INTO mho_class_code VALUES(15,'10140','Crafts: Wall Hangings','Home-Based Business');
    INSERT INTO mho_class_code VALUES(16,'10150','Crafts: Wind Chimes','Home-Based Business');
    INSERT INTO mho_class_code VALUES(17,'10160','Crafts: Wood Products','Home-Based Business');
    INSERT INTO mho_class_code VALUES(18,'10170','Crafts: Wreaths','Home-Based Business');
    INSERT INTO mho_class_code VALUES(19,'10999','Crafts: Not otherwise classified','Home-Based Business');
    INSERT INTO mho_class_code VALUES(20,'20010','Foods: Baked Goods','Home-Based Business');
    INSERT INTO mho_class_code VALUES(21,'20020','Foods: Beverages (i.e. Coffee and Tea','Home-Based Business');
    INSERT INTO mho_class_code VALUES(22,'20030','Foods: Candy, Nuts, or Confections','Home-Based Business');
    INSERT INTO mho_class_code VALUES(23,'20040','Foods: Canning (i.e. Jellies and Jams','Home-Based Business');
    INSERT INTO mho_class_code VALUES(24,'20050','Foods: Deli Foods','Home-Based Business');
    INSERT INTO mho_class_code VALUES(25,'20060','Foods: Fruit and Vegetable Stand (No Pick-your-own Operations)','Home-Based Business');
    INSERT INTO mho_class_code VALUES(26,'20070','Foods: Gourmet Foods','Home-Based Business');
    INSERT INTO mho_class_code VALUES(27,'20080','Foods: Picnic Baskets','Home-Based Business');
    INSERT INTO mho_class_code VALUES(28,'20090','Foods: Smoked and Dressed Meats, Poultry, and Fish','Home-Based Business');
    INSERT INTO mho_class_code VALUES(29,'20100','Foods: Wine and Spirits','Home-Based Business');
    INSERT INTO mho_class_code VALUES(30,'20999','Foods: Not Otherwise Classified','Home-Based Business');
    INSERT INTO mho_class_code VALUES(31,'30010','Offices - Accounting','Home-Based Business');
    INSERT INTO mho_class_code VALUES(32,'30020','Offices - Billing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(33,'30030','Offices - Bookkeeping','Home-Based Business');
    INSERT INTO mho_class_code VALUES(34,'30040','Offices - Business Consulting','Home-Based Business');
    INSERT INTO mho_class_code VALUES(35,'30050','Offices - Calligraphy','Home-Based Business');
    INSERT INTO mho_class_code VALUES(36,'30060','Offices - Career Consulting','Home-Based Business');
    INSERT INTO mho_class_code VALUES(37,'30070','Offices - Computer Consulting','Home-Based Business');
    INSERT INTO mho_class_code VALUES(38,'30080','Offices - Counseling','Home-Based Business');
    INSERT INTO mho_class_code VALUES(39,'30090','Offices - Desktop Publishing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(40,'30095','Offices - Employment Agencies','Home-Based Business');
    INSERT INTO mho_class_code VALUES(41,'30100','Offices - Financial Planning','Home-Based Business');
    INSERT INTO mho_class_code VALUES(42,'30110','Offices - Freelance Writing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(43,'30120','Offices - Graphic Art','Home-Based Business');
    INSERT INTO mho_class_code VALUES(44,'30130','Offices - Insurance Agent','Home-Based Business');
    INSERT INTO mho_class_code VALUES(45,'30140','Offices - Mailing and Addressing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(46,'30150','Offices - Public Relations','Home-Based Business');
    INSERT INTO mho_class_code VALUES(47,'30160','Offices - Real Estate Agent','Home-Based Business');
    INSERT INTO mho_class_code VALUES(48,'30170','Offices - Resume Writing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(49,'30180','Offices - Telephone Answering','Home-Based Business');
    INSERT INTO mho_class_code VALUES(50,'30190','Offices - Tutoring','Home-Based Business');
    INSERT INTO mho_class_code VALUES(51,'30200','Offices - Word Processing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(52,'30999','Offices - Not Otherwise Classified','Home-Based Business');
    INSERT INTO mho_class_code VALUES(53,'40001','Trust/Trustee only (beneficiary and grantor not named in the endorsement)','Owners and Condo Beneficiary');
    INSERT INTO mho_class_code VALUES(54,'40002','Beneficiary OR grantor named in the endorsement; AND Trustee resides on the residence premises','Owners and Condo Beneficiary');
    INSERT INTO mho_class_code VALUES(55,'40003','Beneficiary OR grantor named in the endorsement; AND Trustee DOES NOT reside on the residence premises','Owners and Condo Beneficiary');
    INSERT INTO mho_class_code VALUES(56,'40004','Beneficiary AND grantor named in the endorsement; AND Trustee resides on the residence premises','Owners and Condo Beneficiary');
    INSERT INTO mho_class_code VALUES(57,'40005','Beneficiary AND grantor named in the endorsement; AND Trustee DOES NOT reside on the residence premises','Owners and Condo Beneficiary');
    INSERT INTO mho_class_code VALUES(58,'40010','Retail - Antiques','Home-Based Business');
    INSERT INTO mho_class_code VALUES(59,'40020','Retail - Art Supplies','Home-Based Business');
    INSERT INTO mho_class_code VALUES(60,'40030','Retail - Art Work','Home-Based Business');
    INSERT INTO mho_class_code VALUES(61,'40034','Retail - Barber / Beauty Supply Stores','Home-Based Business');
    INSERT INTO mho_class_code VALUES(62,'40037','Retail - Bicycle Stores','Home-Based Business');
    INSERT INTO mho_class_code VALUES(63,'40040','Retail - Books, Magazines, and Videos','Home-Based Business');
    INSERT INTO mho_class_code VALUES(64,'40045','Retail - Camera Stores','Home-Based Business');
    INSERT INTO mho_class_code VALUES(65,'40050','Retail - Candles','Home-Based Business');
    INSERT INTO mho_class_code VALUES(66,'40060','Retail - Clothing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(67,'40070','Retail - Coins and Stamps','Home-Based Business');
    INSERT INTO mho_class_code VALUES(68,'40080','Retail - Collectibles','Home-Based Business');
    INSERT INTO mho_class_code VALUES(69,'40090','Retail - Cosmetics','Home-Based Business');
    INSERT INTO mho_class_code VALUES(70,'40100','Retail - Costume Jewelry','Home-Based Business');
    INSERT INTO mho_class_code VALUES(71,'40110','Retail - Decorative Housewares','Home-Based Business');
    INSERT INTO mho_class_code VALUES(72,'40120','Retail - Gifts','Home-Based Business');
    INSERT INTO mho_class_code VALUES(73,'40130','Retail - Household and Kitchen Products','Home-Based Business');
    INSERT INTO mho_class_code VALUES(74,'40140','Retail - Personal Care Products','Home-Based Business');
    INSERT INTO mho_class_code VALUES(75,'40150','Retail - Plants and Flowers','Home-Based Business');
    INSERT INTO mho_class_code VALUES(76,'40160','Retail - Stationary and Paper Products','Home-Based Business');
    INSERT INTO mho_class_code VALUES(77,'40170','Retail - Tackle and Bait','Home-Based Business');
    INSERT INTO mho_class_code VALUES(78,'40180','Retail - Toys','Home-Based Business');
    INSERT INTO mho_class_code VALUES(79,'40190','Retail - Vitamins and Health Care Products','Home-Based Business');
    INSERT INTO mho_class_code VALUES(80,'40851','Out-servant domestic employee','Type of Domestic Employee');
    INSERT INTO mho_class_code VALUES(81,'40852','In-servant domestic employee','Type of Domestic Employee');
    INSERT INTO mho_class_code VALUES(82,'40999','Retail - Not Otherwise Classified','Home-Based Business');
    INSERT INTO mho_class_code VALUES(83,'50010','Services - Aesthetician','Home-Based Business');
    INSERT INTO mho_class_code VALUES(84,'50015','Services - Appliance Repair','Home-Based Business');
    INSERT INTO mho_class_code VALUES(85,'50020','Services - Barber','Home-Based Business');
    INSERT INTO mho_class_code VALUES(86,'50030','Services - Beautician','Home-Based Business');
    INSERT INTO mho_class_code VALUES(87,'50040','Services - Bicycle Repair','Home-Based Business');
    INSERT INTO mho_class_code VALUES(88,'50050','Services - Camera Repair','Home-Based Business');
    INSERT INTO mho_class_code VALUES(89,'50060','Services - Carpet and Upholstery Cleaning','Home-Based Business');
    INSERT INTO mho_class_code VALUES(90,'50070','Services - Clock, Jewelry, or Watch Repair','Home-Based Business');
    INSERT INTO mho_class_code VALUES(91,'50080','Services - Computer Repair','Home-Based Business');
    INSERT INTO mho_class_code VALUES(92,'50085','Services - Copying / Duplicating','Home-Based Business');
    INSERT INTO mho_class_code VALUES(93,'50090','Services - Dog or Cat Boarding, Breeding, or Training','Home-Based Business');
    INSERT INTO mho_class_code VALUES(94,'50100','Services - Dressmaker, Seamstress, or Tailor','Home-Based Business');
    INSERT INTO mho_class_code VALUES(95,'50110','Services - Flower Arranging','Home-Based Business');
    INSERT INTO mho_class_code VALUES(96,'50120','Services - Furniture Upholstering','Home-Based Business');
    INSERT INTO mho_class_code VALUES(97,'50125','Services - Furniture / Woodwork Stripping','Home-Based Business');
    INSERT INTO mho_class_code VALUES(98,'50130','Services - Gift Delivery Service','Home-Based Business');
    INSERT INTO mho_class_code VALUES(99,'50140','Services - Hair Stylist','Home-Based Business');
    INSERT INTO mho_class_code VALUES(100,'50150','Services - House Cleaning','Home-Based Business');
    INSERT INTO mho_class_code VALUES(101,'50160','Services - House Sitting','Home-Based Business');
    INSERT INTO mho_class_code VALUES(102,'50170','Services - Instruction (Music, Etiquette, etc.)','Home-Based Business');
    INSERT INTO mho_class_code VALUES(103,'50180','Services - Interior Decorating','Home-Based Business');
    INSERT INTO mho_class_code VALUES(104,'50182','Services - Janitorial Services','Home-Based Business');
    INSERT INTO mho_class_code VALUES(105,'50185','Services - Landscape Gardening','Home-Based Business');
    INSERT INTO mho_class_code VALUES(106,'50188','Services - Mailing or Addressing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(107,'50190','Services - Manicurist','Home-Based Business');
    INSERT INTO mho_class_code VALUES(108,'50200','Services - Musical Instrument Repair','Home-Based Business');
    INSERT INTO mho_class_code VALUES(109,'50205','Services - Painting','Home-Based Business');
    INSERT INTO mho_class_code VALUES(110,'50210','Services - Personal Shopper','Home-Based Business');
    INSERT INTO mho_class_code VALUES(111,'50215','Services - Pet Grooming','Home-Based Business');
    INSERT INTO mho_class_code VALUES(112,'50220','Services - Pet Sitting and Walking','Home-Based Business');
    INSERT INTO mho_class_code VALUES(113,'50230','Services - Photography','Home-Based Business');
    INSERT INTO mho_class_code VALUES(114,'50240','Services - Picture Framing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(115,'50245','Services - Plumbing','Home-Based Business');
    INSERT INTO mho_class_code VALUES(116,'50250','Services - Printer','Home-Based Business');
    INSERT INTO mho_class_code VALUES(117,'50260','Services - Shoe Repair','Home-Based Business');
    INSERT INTO mho_class_code VALUES(118,'50270','Services - Videotaping','Home-Based Business');
    INSERT INTO mho_class_code VALUES(119,'50280','Services - Wedding or Party Planning','Home-Based Business');
    INSERT INTO mho_class_code VALUES(120,'50999','Services - Not Otherwise Listed','Home-Based Business');
    INSERT INTO mho_class_code VALUES(121,'54001','Below ground tank','Tank Classification');
    INSERT INTO mho_class_code VALUES(122,'54002','Above ground tank, inside the insured premises','Tank Classification');
    INSERT INTO mho_class_code VALUES(123,'54003','Above ground tank, outside the insured premises','Tank Classification');
    INSERT INTO mho_class_code VALUES(124,'60001','Bed and Breakfast - B&B Operations - One Guest Room','Home-Based Business');
    INSERT INTO mho_class_code VALUES(125,'60002','Bed and Breakfast - B&B Operations - Two Guest Rooms','Home-Based Business');
    INSERT INTO mho_class_code VALUES(126,'60003','Bed and Breakfast - B&B Operations - Three Guest Rooms','Home-Based Business');
    INSERT INTO mho_class_code VALUES(127,'60004','Bed and Breakfast - B&B Operations - Four Guest Rooms','Home-Based Business');
    INSERT INTO mho_class_code VALUES(128,'60005','Bed and Breakfast - B&B Operations - Five Guest Rooms','Home-Based Business');
    INSERT INTO mho_class_code VALUES(129,'60006','Bed and Breakfast - B&B Operations - Six Guest Rooms','Home-Based Business');
    INSERT INTO mho_class_code VALUES(130,'60999','Bed and Breakfast - B&B Operations - More Than Six Guest Rooms','Home-Based Business');
    INSERT INTO mho_class_code VALUES(131,'61721','Earthquake Coverage - AAIS Endorsement ML 0054, HO 0054, or equivalent','Earthquake Coverage');
    INSERT INTO mho_class_code VALUES(132,'61722','Limited Earthquake Coverage - AAIS Endorsement ML 0498, HO 0498, or equivalent','Earthquake Coverage');
    INSERT INTO mho_class_code VALUES(133,'61723','Reconstruction Cost Coverage - AAIS Endorsement ML 0678, HO 0678, or equivalent','Earthquake Coverage');
    INSERT INTO mho_class_code VALUES(134,'63401','With collision','Motorized Golf Carts');
    INSERT INTO mho_class_code VALUES(135,'63402','Without collision','Motorized Golf Carts');
    INSERT INTO mho_class_code VALUES(136,'73501','Inboard / Inboard-outboard / sailboats with auxiliary power ─ Less than 26 feet and under 16 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(137,'73502','Inboard / Inboard-outboard / sailboats with auxiliary power ─ Less than 26 feet and 16-30 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(138,'73503','Inboard / Inboard-outboard / sailboats with auxiliary power ─ Less than 26 feet and over 30 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(139,'73601','Inboard / Inboard-outboard / sailboats with auxiliary power ─ 26 to 40 feet and under 16 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(140,'73602','Inboard / Inboard-outboard / sailboats with auxiliary power ─ 26 to 40 feet and 16-30 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(141,'73603','Inboard / Inboard-outboard / sailboats with auxiliary power ─ 26 to 40 feet and over 30 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(142,'73701','Inboard / Inboard-outboard / sailboats with auxiliary power ─ Over 40 feet and under 16 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(143,'73702','Inboard / Inboard-outboard / sailboats with auxiliary power ─ Over 40 feet and 16-30 MPH','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(144,'74101','Sailboats with no auxiliary power ─ 26 to 40 feet','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(145,'74201','Each outboard motor ─ 25-50HP','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(146,'74202','Each outboard motor ─ over 50HP','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(147,'74299','Each outboard motor ─ all watercraft powered by outboard engines or motors, regardless of HP (New Hampshire only)','Watercraft (AAIS)');
    INSERT INTO mho_class_code VALUES(148,'75001','1 - 160 acres','Farm Liability Exposure');
    INSERT INTO mho_class_code VALUES(149,'75011','1 - 1000 acres','Farm Liability Exposure');
    INSERT INTO mho_class_code VALUES(150,'75101','161 - 500 acres','Farm Liability Exposure');
    INSERT INTO mho_class_code VALUES(151,'75111','1,001 - 2,000 acres','Farm Liability Exposure');
    INSERT INTO mho_class_code VALUES(152,'75201','over 500 acres','Farm Liability Exposure');
    INSERT INTO mho_class_code VALUES(153,'75211','over 2,000 acres','Farm Liability Exposure');
    INSERT INTO mho_class_code VALUES(154,'00000','Does Not Apply','Does Not Apply');
    INSERT INTO mho_class_code VALUES(155,'00780','Outboard, Inboard or Inboard-Outdrive Motors ─ Up to 15 feet and up to 50 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(156,'00781','Outboard, Inboard or Inboard-Outdrive Motors ─ Up to 15 feet and 51-100 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(157,'00782','Outboard, Inboard or Inboard-Outdrive Motors ─ Up to 15 feet and 101-150 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(158,'00783','Outboard, Inboard or Inboard-Outdrive Motors ─ Up to 15 feet and 151-200 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(159,'00784','Outboard, Inboard or Inboard-Outdrive Motors ─ Up to 15 feet and over 200 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(160,'00785','Outboard, Inboard or Inboard-Outdrive Motors ─ Over 15 to 26 feet and up to 50 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(161,'00786','Outboard, Inboard or Inboard-Outdrive Motors ─ Over 15 to 26 feet and 51-100 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(162,'00787','Outboard, Inboard or Inboard-Outdrive Motors ─ Over 15 to 26 feet and 101-150 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(163,'00788','Outboard, Inboard or Inboard-Outdrive Motors ─ Over 15 to 26 feet and 151-200 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(164,'00789','Outboard, Inboard or Inboard-Outdrive Motors ─ Over 15 to 26 feet and over 200 hp','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(165,'00763','Sailboats with or without Auxiliary Power ─ 26 to 40 feet','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(166,'00764','Sailboats with or without Auxiliary Power ─ Over 40 feet','Watercraft (ISO)');
    INSERT INTO mho_class_code VALUES(167,'00999','All other (applicable to liability coverage for any type of watercraft under an AAIS, ISO, or Independent Program not identified through one of the above listed codes)','Watercraft (Independent Program Users should report from the most appropriate set of Class Codes above (AAIS or ISO))');
END IF;
END $$;