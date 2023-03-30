
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_construction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_construction_code) THEN 
    INSERT INTO ho_construction_code VALUES(1,'10','Earth Homes','Miscellaneous Dwelling Types');
    INSERT INTO ho_construction_code VALUES(2,'11','Wind Resistive','Dwellings of Superior Construction');
    INSERT INTO ho_construction_code VALUES(3,'12','Semi-Wind Resistive','Dwellings of Superior Construction');
    INSERT INTO ho_construction_code VALUES(4,'14','Modified Fire Resistive','Dwellings of Superior Construction');
    INSERT INTO ho_construction_code VALUES(5,'99','All Other Construction Types','Miscellaneous Dwelling Types');
    INSERT INTO ho_construction_code VALUES(6,'00','Does Not Apply','N/A');
    INSERT INTO ho_construction_code VALUES(7,'01','Frame','Frame Dwellings');
    INSERT INTO ho_construction_code VALUES(8,'05','Aluminum, Plastic, or Steel Sliding Over Frame','Frame Dwellings');
    INSERT INTO ho_construction_code VALUES(9,'06','Stucco','Frame Dwellings');
    INSERT INTO ho_construction_code VALUES(10,'02','Veneer (Brick, Stone, or Masonry)','Joisted Masonry Dwellings');
    INSERT INTO ho_construction_code VALUES(11,'03','Joisted Masonry','Joisted Masonry Dwellings');
    INSERT INTO ho_construction_code VALUES(12,'04','Fire Resistive','Dwellings of Superior Construction');
    INSERT INTO ho_construction_code VALUES(13,'08','Non-Combustible (Exposed Metal Construction)','Dwellings of Superior Construction');
    INSERT INTO ho_construction_code VALUES(14,'09','Masonry Non-Combustive (Non-combustible Construction with Masonry Walls)','Dwellings of Superior Construction');
    INSERT INTO ho_construction_code VALUES(15,'07','Mobile Homes','Miscellaneous Dwelling Types');
END IF;
END $$;
