
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_construction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_construction_code) THEN 
    INSERT INTO cp_construction_code VALUES(1,'11','Wind resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(2,'12','Semi-wind resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(3,'13','Heavy timber joisted masonry','Joisted Masonry Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(4,'14','Modified fire resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(5,'60','Earthquake Resistive Buildings - Class 6','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(6,'70','Special Structures - Class 7','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(7,'99','All other construction types','Miscellaneous Building Types','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(8,'00','Does Not Apply','Does Not Apply','Does Not Apply');
    INSERT INTO cp_construction_code VALUES(9,'01','Frame','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(10,'05','Aluminum, plastic, or steel siding over frame','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(11,'06','Stucco','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(12,'02','Veneer (Brick, stone, or masonry)','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(13,'03','Joisted masonry','Joisted Masonry Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(14,'04','Fire resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(15,'08','Non-combustible (Exposed metal construction)','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(16,'09','Masonry non-combustible (Non-combustible construction with masonry walls)','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(17,'1C','Wood Frame Buildings - Class 1C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(18,'1D','Wood Frame Buildings - Class 1D','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(19,'2A','All Metal Buildings - Class 2A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(20,'2B','All Metal Buildings - Class 2B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(21,'3A','Steel Frame Buildings - Class 3A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(22,'3B','Steel Frame Buildings - Class 3B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(23,'3C','Steel Frame Buildings - Class 3C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(24,'4A','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(25,'4B','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(26,'4C','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(27,'4D','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4D','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(28,'5A','Concrete, Brick, or Block Building - Class 5A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(29,'5Z','Concrete, Brick, or Block Building - Class 5AA','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(30,'5B','Concrete, Brick, or Block Building - Class 5B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(31,'5C','Concrete, Brick, or Block Building - Class 5C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(32,'5D','Concrete, Brick, or Block Building - Class 5D','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
END IF;
END $$;
