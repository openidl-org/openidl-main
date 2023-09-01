
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_deductible_type_code) THEN 
    INSERT INTO bt_deductible_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_deductible_type_code VALUES(2,'1','No deductible');
    INSERT INTO bt_deductible_type_code VALUES(3,'2','Flat deductible');
    INSERT INTO bt_deductible_type_code VALUES(4,'4','Percentage deductible');
    INSERT INTO bt_deductible_type_code VALUES(5,'8','All other deductible types');
    INSERT INTO bt_deductible_type_code VALUES(6,'9','Split Deductible (boating equipment / boats, motors, and additional property coverages for the Boatowners Program OR personal property and equipment / yachts, property coverage extensions, and supplemental property for the Yacht Program)');
END IF;
END $$;
