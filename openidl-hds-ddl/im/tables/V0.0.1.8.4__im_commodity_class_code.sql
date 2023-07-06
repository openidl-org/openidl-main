
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_commodity_class_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_commodity_class_code) THEN 
    INSERT INTO im_commodity_class_code VALUES(1,'10','Cement, Sand, or Gravel');
    INSERT INTO im_commodity_class_code VALUES(2,'16','China and Ceramics');
    INSERT INTO im_commodity_class_code VALUES(3,'17','Cigarettes and Cigar');
    INSERT INTO im_commodity_class_code VALUES(4,'18','Clothing - Ladies and Mens Dress apparel');
    INSERT INTO im_commodity_class_code VALUES(5,'19','Clothing - Other');
    INSERT INTO im_commodity_class_code VALUES(6,'20','Computers');
    INSERT INTO im_commodity_class_code VALUES(7,'21','Contractors heave equipment');
    INSERT INTO im_commodity_class_code VALUES(8,'22','Cosmetics and perfume');
    INSERT INTO im_commodity_class_code VALUES(9,'23','Dangerous Articles, Explosive, Corrosives, Flammable, Acids');
    INSERT INTO im_commodity_class_code VALUES(10,'24','Dairy Products');
    INSERT INTO im_commodity_class_code VALUES(11,'25','Drugs (Except Narcotics');
    INSERT INTO im_commodity_class_code VALUES(12,'31','Dry Goods');
    INSERT INTO im_commodity_class_code VALUES(13,'32','Eggs (Shell)');
    INSERT INTO im_commodity_class_code VALUES(14,'33','Electrical Supplies and Fixtures');
    INSERT INTO im_commodity_class_code VALUES(15,'34','Farm Products');
    INSERT INTO im_commodity_class_code VALUES(16,'35','Fertilizer');
    INSERT INTO im_commodity_class_code VALUES(17,'36','Fine Arts');
    INSERT INTO im_commodity_class_code VALUES(18,'37','Food Products - Frozen or Refrigerated');
    INSERT INTO im_commodity_class_code VALUES(19,'38','Food Products - Meat of Seafood');
    INSERT INTO im_commodity_class_code VALUES(20,'39','Food Products - Other');
    INSERT INTO im_commodity_class_code VALUES(21,'40','Furniture');
    INSERT INTO im_commodity_class_code VALUES(22,'46','Furs');
    INSERT INTO im_commodity_class_code VALUES(23,'47','General Merchandise');
    INSERT INTO im_commodity_class_code VALUES(24,'48','Glassware');
    INSERT INTO im_commodity_class_code VALUES(25,'49','Grain, Hay, Feed');
    INSERT INTO im_commodity_class_code VALUES(26,'50','Hardware and Paint');
    INSERT INTO im_commodity_class_code VALUES(27,'51','Household Effects');
    INSERT INTO im_commodity_class_code VALUES(28,'52','Jewelry');
    INSERT INTO im_commodity_class_code VALUES(29,'53','Leather Goods (Except Shoes)');
    INSERT INTO im_commodity_class_code VALUES(30,'54','Livestock and Live Poultry');
    INSERT INTO im_commodity_class_code VALUES(31,'55','Liquid Haulers (Bulk Nonflammable)');
    INSERT INTO im_commodity_class_code VALUES(32,'61','Lumber');
    INSERT INTO im_commodity_class_code VALUES(33,'62','Machinery and Heavy Equipment - Power Tools');
    INSERT INTO im_commodity_class_code VALUES(34,'63','Machinery and Heavy Equipment - Specialized Heavy Haulers');
    INSERT INTO im_commodity_class_code VALUES(35,'64','Machinery and Heavy Equipment - Other');
    INSERT INTO im_commodity_class_code VALUES(36,'65','Metal and Steel');
    INSERT INTO im_commodity_class_code VALUES(37,'66','Narcotics');
    INSERT INTO im_commodity_class_code VALUES(38,'67','Office Equipment');
    INSERT INTO im_commodity_class_code VALUES(39,'68','Paper and Paper Products');
    INSERT INTO im_commodity_class_code VALUES(40,'69','Petroleum Products - Under 140 Degree Flashpoint');
    INSERT INTO im_commodity_class_code VALUES(41,'70','Petroleum Products - Other');
    INSERT INTO im_commodity_class_code VALUES(42,'76','Pipe, Cable, and Wire');
    INSERT INTO im_commodity_class_code VALUES(43,'77','Plumbing Supplies');
    INSERT INTO im_commodity_class_code VALUES(44,'78','Poultry (Dressed)');
    INSERT INTO im_commodity_class_code VALUES(45,'79','Precious Metals');
    INSERT INTO im_commodity_class_code VALUES(46,'80','Rugs and Carpets - Oriental');
    INSERT INTO im_commodity_class_code VALUES(47,'81','Rugs and Carpets - Other');
    INSERT INTO im_commodity_class_code VALUES(48,'82','Shoes');
    INSERT INTO im_commodity_class_code VALUES(49,'83','Sporting Goods and Toys');
    INSERT INTO im_commodity_class_code VALUES(50,'84','Textiles');
    INSERT INTO im_commodity_class_code VALUES(51,'85','Tires and Tubes');
    INSERT INTO im_commodity_class_code VALUES(52,'91','TV, Radios, and Stereo Equipment');
    INSERT INTO im_commodity_class_code VALUES(53,'92','Video Equipment and Tapes');
    INSERT INTO im_commodity_class_code VALUES(54,'00','Does Not Apply');
    INSERT INTO im_commodity_class_code VALUES(55,'01','Agricultural Equipment');
    INSERT INTO im_commodity_class_code VALUES(56,'02','Alcoholic Beverages (Except Beer and Wine)');
    INSERT INTO im_commodity_class_code VALUES(57,'03','Appliances (Except TV and Stereotype)');
    INSERT INTO im_commodity_class_code VALUES(58,'04','Automobile Parts and Accessories');
    INSERT INTO im_commodity_class_code VALUES(59,'05','Beer and Wine');
    INSERT INTO im_commodity_class_code VALUES(60,'06','Beverages (Nonalcoholic)');
    INSERT INTO im_commodity_class_code VALUES(61,'07','Building Materials');
    INSERT INTO im_commodity_class_code VALUES(62,'08','Cameras and Film');
    INSERT INTO im_commodity_class_code VALUES(63,'09','Canned Goods');
END IF;
END $$;
