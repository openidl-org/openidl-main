
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_class_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category_code VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM dp_class_code) THEN 
    INSERT INTO dp_class_code VALUES(1,'10','Computers','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(2,'11','Livestock -- Additional Perils (FO-356) - excluding sheep','Livestock Perils Options','Major Peril Code 77');
    INSERT INTO dp_class_code VALUES(3,'12','Livestock -- Additional Perils (FO-356) - including sheep','Livestock Perils Options','Major Peril Code 77');
    INSERT INTO dp_class_code VALUES(4,'13','Livestock -- Winter Perils (FO-324)','Livestock Perils Options','Major Peril Code 77');
    INSERT INTO dp_class_code VALUES(5,'14','Livestock -- Loading and Unloading Accidents (FL-334) - excluding sheep','Livestock Perils Options','Major Peril Code 77');
    INSERT INTO dp_class_code VALUES(6,'15','Livestock -- Loading and Unloading Accidents (FL-334) - including sheep','Livestock Perils Options','Major Peril Code 77');
    INSERT INTO dp_class_code VALUES(7,'18','Farm products (including dairy) and supplies - Including loss to dairy and farm products in the open caused by wind/hail (FO-347)','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(8,'21','Earthquake Coverage (FL-56)','Earthquake Coverage - California Only','Major Peril Code 61');
    INSERT INTO dp_class_code VALUES(9,'23','Reconstruction Cost Coverage (FL 0678)','Earthquake Coverage - California Only','Major Peril Code 61');
    INSERT INTO dp_class_code VALUES(10,'31','Broad on-premises theft coverage (AAIS FL-34, ISO DP 04 72, or equivalent)','Theft of Dwelling Contents','Major Peril Code 70');
    INSERT INTO dp_class_code VALUES(11,'32','Broad off-premises theft coverage (AAIS FL-34, ISO DP 04 72, or equivalent)','Theft of Dwelling Contents','Major Peril Code 70');
    INSERT INTO dp_class_code VALUES(12,'33','Limited on-premises theft coverage (AAIS FL-35, ISO DP 04 73, or equivalent)','Theft of Dwelling Contents','Major Peril Code 70');
    INSERT INTO dp_class_code VALUES(13,'36','With collision','Motorized golf cart - physical damage coverage','Major Peril Code 63');
    INSERT INTO dp_class_code VALUES(14,'37','Without collision','Motorized golf cart - physical damage coverage','Major Peril Code 63');
    INSERT INTO dp_class_code VALUES(15,'49','All other property','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(16,'51','Dwellings','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(17,'52','Barns/Outbuildings','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(18,'53','Silos','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(19,'54','Sheds - Implement, machine, tool, etc.','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(20,'55','Houses - Incubator, brooder, milk, hen, etc.','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(21,'56','Windmills and windchargers','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(22,'57','Outdoor radio & TV equipment and private power & light poles','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(23,'58','Granaries','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(24,'59','Dairy barns','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(25,'60','Hog confinement buildings','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(26,'61','Potato houses','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(27,'62','Fences, corrals, chutes, power and light poles, wiring','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(28,'64','Tanks','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(29,'65','Greenhouses','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(30,'99','All other structures','Farm Barns, Buildings, and Other Structures','Coverage Code 14');
    INSERT INTO dp_class_code VALUES(31,'00','Does Not Apply','Does Not Apply','Does Not Apply');
    INSERT INTO dp_class_code VALUES(32,'01','Livestock - basic only','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(33,'02','Equipment and machinery','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(34,'03','Poultry','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(35,'04','Turkeys','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(36,'05','Hay/Straw/Fodder in buildings','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(37,'06','Hay/Straw/Fodder in the open','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(38,'07','Household contents','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(39,'08','Farm products (including dairy) and supplies - Excluding loss to dairy/farm products in the open caused by wind/hail (w/o FO-347)','Scheduled Farm Personal Property','Coverage Code 16');
    INSERT INTO dp_class_code VALUES(40,'09','Grain','Scheduled Farm Personal Property','Coverage Code 16');
END IF;
END $$;
