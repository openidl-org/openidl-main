
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_construction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_construction_code) THEN 
    INSERT INTO im_construction_code VALUES(1,'10','Earth Homes','Miscellaneous Building Types');
    INSERT INTO im_construction_code VALUES(2,'11','Wind Resistive','Buildings of Superior Construction');
    INSERT INTO im_construction_code VALUES(3,'12','Semi-Wind Resistive','Buildings of Superior Construction');
    INSERT INTO im_construction_code VALUES(4,'14','Modified Fire Resistive','Buildings of Superior Construction');
    INSERT INTO im_construction_code VALUES(5,'99','All Other Construction Types','Miscellaneous Building Types');
    INSERT INTO im_construction_code VALUES(6,'00','Does Not Apply','Does Not Apply');
    INSERT INTO im_construction_code VALUES(7,'01','Frame','Frame Buildings');
    INSERT INTO im_construction_code VALUES(8,'05','Aluminum, Plastic, or Steel Siding Over Frame','Frame Buildings');
    INSERT INTO im_construction_code VALUES(9,'06','Stucco','Frame Buildings');
    INSERT INTO im_construction_code VALUES(10,'02','Veneer (Brick, Stone, or Masonry)','Joisted Masonry Buildings');
    INSERT INTO im_construction_code VALUES(11,'03','Joisted Masonry','Joisted Masonry Buildings');
    INSERT INTO im_construction_code VALUES(12,'04','Fire Resistive','Buildings of Superior Construction');
    INSERT INTO im_construction_code VALUES(13,'08','Non-combustible (Exposed Metal Construction)','Buildings of Superior Construction');
    INSERT INTO im_construction_code VALUES(14,'09','Masonry Non-Combustible (Non-Combustible Construction With Masonry Walls)','Buildings of Superior Construction');
    INSERT INTO im_construction_code VALUES(15,'07','Mobilehomes','Miscellaneous Building Types');
END IF;
END $$;
