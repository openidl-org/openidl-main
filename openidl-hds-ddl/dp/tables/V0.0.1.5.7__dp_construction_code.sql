
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_construction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_construction_code) THEN 
    INSERT INTO dp_construction_code VALUES(1,'10','Earth homes','Miscellaneous Dwelling Types');
    INSERT INTO dp_construction_code VALUES(2,'11','Wind resistive','Dwellings of Superior Construction');
    INSERT INTO dp_construction_code VALUES(3,'12','Semi-wind resistive','Dwellings of Superior Construction');
    INSERT INTO dp_construction_code VALUES(4,'14','Modified fire resistive','Dwellings of Superior Construction');
    INSERT INTO dp_construction_code VALUES(5,'99','All other construction types','Miscellaneous Dwelling Types');
    INSERT INTO dp_construction_code VALUES(6,'00','Does not apply','Does not apply');
    INSERT INTO dp_construction_code VALUES(7,'01','Frame','Frame Dwellings');
    INSERT INTO dp_construction_code VALUES(8,'05','Aluminum, plastic, or steel siding over frame','Frame Dwellings');
    INSERT INTO dp_construction_code VALUES(9,'06','Stucco','Frame Dwellings');
    INSERT INTO dp_construction_code VALUES(10,'02','Veneer (Brick, stone, or masonry)','Joisted Masonry Dwellings');
    INSERT INTO dp_construction_code VALUES(11,'03','Joisted masonry','Joisted Masonry Dwellings');
    INSERT INTO dp_construction_code VALUES(12,'04','Fire resistive','Dwellings of Superior Construction');
    INSERT INTO dp_construction_code VALUES(13,'08','Non-combustible (Exposed metal construction)','Dwellings of Superior Construction');
    INSERT INTO dp_construction_code VALUES(14,'09','Masonry non-combustible (Non-combustible construction with masonry walls)','Dwellings of Superior Construction');
    INSERT INTO dp_construction_code VALUES(15,'07','Mobile homes','Miscellaneous Dwelling Types');
END IF;
END $$;
