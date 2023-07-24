
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_coverage_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_coverage_code) THEN 
    INSERT INTO bt_coverage_code VALUES(1,'1','Physical Damage/Property Coverage with Theft','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(2,'2','Physical Damage/Property Coverage without Theft','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(3,'3','Liability with Uninsured Boater Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(4,'4','Liability without Uninsured Boater Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(5,'5','Uninsured Boater Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(6,'6','Trailer Coverage','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(7,'7','All Other Property Coverage','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(8,'8','All Other Liability Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(9,'9','Minimum Premium record subject to SECTION I, PART C, Rule 3.b','Does Not Apply');
    INSERT INTO bt_coverage_code VALUES(10,'A','Physical Damage - Collision','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(11,'B','Physical Damage - Comprehensive','Property Coverage');
END IF;
END $$;
