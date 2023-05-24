
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fp_construction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fp_construction_code) THEN 
    INSERT INTO fp_construction_code VALUES(1,'10','Earth homes','Miscellaneous Dwelling Types');
    INSERT INTO fp_construction_code VALUES(2,'11','Wind resistive','Dwellings of Superior Construction');
    INSERT INTO fp_construction_code VALUES(3,'12','Semi-wind resistive','Dwellings of Superior Construction');
    INSERT INTO fp_construction_code VALUES(4,'14','Modified fire resistive','Dwellings of Superior Construction');
    INSERT INTO fp_construction_code VALUES(5,'99','All other construction types','Miscellaneous Dwelling Types');
    INSERT INTO fp_construction_code VALUES(6,'00','Does Not Apply','Does Not Apply');
    INSERT INTO fp_construction_code VALUES(7,'01','Frame','Frame Dwellings');
    INSERT INTO fp_construction_code VALUES(8,'05','Aluminum, plastic, or steel siding over frame','Frame Dwellings');
    INSERT INTO fp_construction_code VALUES(9,'06','Stucco','Frame Dwellings');
    INSERT INTO fp_construction_code VALUES(10,'02','Veneer (Brick, stone, or masonry)','Joisted Masonry Dwellings');
    INSERT INTO fp_construction_code VALUES(11,'03','Joisted masonry','Joisted Masonry Dwellings');
    INSERT INTO fp_construction_code VALUES(12,'04','Fire resistive','Dwellings of Superior Construction');
    INSERT INTO fp_construction_code VALUES(13,'08','Non-combustible (Exposed metal construction)','Dwellings of Superior Construction');
    INSERT INTO fp_construction_code VALUES(14,'09','Masonry non-combustible (Non-combustible construction with masonry walls)','Dwellings of Superior Construction');
    INSERT INTO fp_construction_code VALUES(15,'07','Mobile homes','Miscellaneous Dwelling Types');
END IF;
END $$;
