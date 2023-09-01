
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_hull_material_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_hull_material_code) THEN 
    INSERT INTO bt_hull_material_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_hull_material_code VALUES(2,'1','Fiberglass');
    INSERT INTO bt_hull_material_code VALUES(3,'2','Wood');
    INSERT INTO bt_hull_material_code VALUES(4,'4','Aluminum');
    INSERT INTO bt_hull_material_code VALUES(5,'5','Steel');
    INSERT INTO bt_hull_material_code VALUES(6,'9','All Other');
END IF;
END $$;
