
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_type_of_hull_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_type_of_hull_code) THEN 
    INSERT INTO bt_type_of_hull_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_type_of_hull_code VALUES(2,'1','Cabin Motorboat');
    INSERT INTO bt_type_of_hull_code VALUES(3,'2','Open Motorboat');
    INSERT INTO bt_type_of_hull_code VALUES(4,'3','Sailboat');
    INSERT INTO bt_type_of_hull_code VALUES(5,'6','Canoe/Kayak/Rowboat');
    INSERT INTO bt_type_of_hull_code VALUES(6,'7','Bass Boat');
    INSERT INTO bt_type_of_hull_code VALUES(7,'8','Personal Watercraft');
    INSERT INTO bt_type_of_hull_code VALUES(8,'9','All Other');
    INSERT INTO bt_type_of_hull_code VALUES(9,'A','Houseboat');
    INSERT INTO bt_type_of_hull_code VALUES(10,'B','Pontoon');
END IF;
END $$;
