
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_class_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_class_code) THEN 
    INSERT INTO cp_class_code VALUES(1,'10010','Agricultural chemicals, mixing and storage');
    INSERT INTO cp_class_code VALUES(2,'10020','Agricultural machinery, dealers');
    INSERT INTO cp_class_code VALUES(3,'10030','Alcohol, manufacture, storage and distribution');
    INSERT INTO cp_class_code VALUES(4,'10040','Alkaline and saline products');
    INSERT INTO cp_class_code VALUES(5,'10050','Animal products, including glue and gelatin');
    INSERT INTO cp_class_code VALUES(6,'10060','Auction barn');
    INSERT INTO cp_class_code VALUES(7,'10070','Baked products');
    INSERT INTO cp_class_code VALUES(8,'10080','Beans, edible; storage and processing');
    INSERT INTO cp_class_code VALUES(9,'10090','Beer');
    INSERT INTO cp_class_code VALUES(10,'10100','Beverages, NOC');
    INSERT INTO cp_class_code VALUES(11,'10110','Cereal mill');
    INSERT INTO cp_class_code VALUES(12,'10120','Cereal products storage');
    INSERT INTO cp_class_code VALUES(13,'10130','Chemical colors and finishes, NOC');
    INSERT INTO cp_class_code VALUES(14,'10140','Chemical, agricultural; mixing, storage and distribution');
    INSERT INTO cp_class_code VALUES(15,'10150','Chicle and chicle products');
    INSERT INTO cp_class_code VALUES(16,'10160','Chocolate products');
    INSERT INTO cp_class_code VALUES(17,'10170','Cloth products');
    INSERT INTO cp_class_code VALUES(18,'10180','Cocoa products');
    INSERT INTO cp_class_code VALUES(19,'10190','Coffee');
    INSERT INTO cp_class_code VALUES(20,'10200','Cold storage');
    INSERT INTO cp_class_code VALUES(21,'10210','Condiments');
    INSERT INTO cp_class_code VALUES(22,'10220','Confectionery products, NOC');
    INSERT INTO cp_class_code VALUES(23,'10230','Corn mill');
    INSERT INTO cp_class_code VALUES(24,'10240','Cotton products');
    INSERT INTO cp_class_code VALUES(25,'10250','Cotton Ginning');
    INSERT INTO cp_class_code VALUES(26,'10260','Cotton warehouse, baled');
    INSERT INTO cp_class_code VALUES(27,'10270','Crackers');
    INSERT INTO cp_class_code VALUES(28,'10280','Dairy products (cream, cheese, ice cream, butter)');
    INSERT INTO cp_class_code VALUES(29,'10290','Dehydrating plants');
    INSERT INTO cp_class_code VALUES(30,'10300','Detergents');
    INSERT INTO cp_class_code VALUES(31,'10310','Dyestuffs');
    INSERT INTO cp_class_code VALUES(32,'10320','Egg processing');
    INSERT INTO cp_class_code VALUES(33,'10330','Farm supplies, retail store');
    INSERT INTO cp_class_code VALUES(34,'10340','Farming (dairy, grain, orchards, and other crops)');
    INSERT INTO cp_class_code VALUES(35,'10350','Feather processing');
    INSERT INTO cp_class_code VALUES(36,'10360','Feed lot');
    INSERT INTO cp_class_code VALUES(37,'10370','Feed mill');
    INSERT INTO cp_class_code VALUES(38,'10380','Feed warehouse');
    INSERT INTO cp_class_code VALUES(39,'10390','Fertilizer, animal');
    INSERT INTO cp_class_code VALUES(40,'10400','Fertilizer, blending and storage and distributing');
    INSERT INTO cp_class_code VALUES(41,'10410','Fertilizer, mineral');
    INSERT INTO cp_class_code VALUES(42,'10420','Flour mill');
    INSERT INTO cp_class_code VALUES(43,'10430','Flour storage');
    INSERT INTO cp_class_code VALUES(44,'10440','Foods (processed, preserved, canned and frozen)');
    INSERT INTO cp_class_code VALUES(45,'10450','Fruits, storage and processing');
    INSERT INTO cp_class_code VALUES(46,'10460','Fuel distributing (bulk)');
    INSERT INTO cp_class_code VALUES(47,'10470','Gelatins');
    INSERT INTO cp_class_code VALUES(48,'10480','Glucose');
    INSERT INTO cp_class_code VALUES(49,'10490','Glycerin');
    INSERT INTO cp_class_code VALUES(50,'10500','Grain elevator');
    INSERT INTO cp_class_code VALUES(51,'10510','Grain, storage and processing');
    INSERT INTO cp_class_code VALUES(52,'10520','Grain warehouse');
    INSERT INTO cp_class_code VALUES(53,'10530','Hatchery, fish');
    INSERT INTO cp_class_code VALUES(54,'10540','Hatchery, poultry');
    INSERT INTO cp_class_code VALUES(55,'10550','Hay storage');
    INSERT INTO cp_class_code VALUES(56,'10560','Liquid protein plant');
    INSERT INTO cp_class_code VALUES(57,'10570','Livestock auction');
    INSERT INTO cp_class_code VALUES(58,'10580','Livestock buildings');
    INSERT INTO cp_class_code VALUES(59,'10590','Livestock feed');
    INSERT INTO cp_class_code VALUES(60,'10600','L P G Storage');
    INSERT INTO cp_class_code VALUES(61,'10610','Macaroni');
    INSERT INTO cp_class_code VALUES(62,'10620','Malt products');
    INSERT INTO cp_class_code VALUES(63,'10630','Meat products, including frozen meats');
    INSERT INTO cp_class_code VALUES(64,'10640','Milk, condensed or powdered');
    INSERT INTO cp_class_code VALUES(65,'10650','Milling - corn, rice, feed and cereal');
    INSERT INTO cp_class_code VALUES(66,'10660','Nursery, plant');
    INSERT INTO cp_class_code VALUES(67,'10670','Nut storage and processing');
    INSERT INTO cp_class_code VALUES(68,'10680','Oils extraction compression');
    INSERT INTO cp_class_code VALUES(69,'10690','Oil extraction, solvent');
    INSERT INTO cp_class_code VALUES(70,'10700','Oil, petroleum (check NFPA)');
    INSERT INTO cp_class_code VALUES(71,'10710','Oil, vegetable');
    INSERT INTO cp_class_code VALUES(72,'10720','Pesticide mixing and storage');
    INSERT INTO cp_class_code VALUES(73,'10730','Poultry buildings');
    INSERT INTO cp_class_code VALUES(74,'10740','Poultry processing');
    INSERT INTO cp_class_code VALUES(75,'10750','Rendering');
    INSERT INTO cp_class_code VALUES(76,'10760','Rice mill');
    INSERT INTO cp_class_code VALUES(77,'10770','Sale barn');
    INSERT INTO cp_class_code VALUES(78,'10780','Seafood products including fish');
    INSERT INTO cp_class_code VALUES(79,'10790','Seed storage and processing (high damagability)');
    INSERT INTO cp_class_code VALUES(80,'10800','Slaughtering products');
    INSERT INTO cp_class_code VALUES(81,'10810','Soap');
    INSERT INTO cp_class_code VALUES(82,'10820','Sugar refining products');
    INSERT INTO cp_class_code VALUES(83,'10830','Tea');
    INSERT INTO cp_class_code VALUES(84,'10840','Tobacco, auction/storage warehouse');
    INSERT INTO cp_class_code VALUES(85,'10850','Tobacco in hogshead');
    INSERT INTO cp_class_code VALUES(86,'10860','Tobacco, leaf');
    INSERT INTO cp_class_code VALUES(87,'10870','Tobacco products, manufactured');
    INSERT INTO cp_class_code VALUES(88,'10880','Vegetables, storage, processing, and distributing');
    INSERT INTO cp_class_code VALUES(89,'10890','Wine products');
END IF;
END $$;
