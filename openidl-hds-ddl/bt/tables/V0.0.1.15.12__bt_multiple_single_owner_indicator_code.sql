
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_multiple_single_owner_indicator_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_multiple_single_owner_indicator_code) THEN 
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(2,'1','Single Owner','Single Owner');
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(3,'2','Residing in Same Household','Multiple Owners');
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(4,'3','Residing in Different Households','Multiple Owners');
END IF;
END $$;
