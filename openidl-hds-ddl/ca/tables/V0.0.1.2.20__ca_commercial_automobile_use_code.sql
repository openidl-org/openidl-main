
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_commercial_automobile_use_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_commercial_automobile_use_code) THEN 
    INSERT INTO ca_commercial_automobile_use_code VALUES(1,'1','Service — 50 miles or less');
    INSERT INTO ca_commercial_automobile_use_code VALUES(2,'2','Service — 51 - 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(3,'3','Service — over 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(4,'4','Retail — 50 miles or less');
    INSERT INTO ca_commercial_automobile_use_code VALUES(5,'5','Retail — 51 - 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(6,'6','Retail — over 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(7,'7','Commercial — 50 miles or less');
    INSERT INTO ca_commercial_automobile_use_code VALUES(8,'8','Commercial — 51 - 200 miles');
    INSERT INTO ca_commercial_automobile_use_code VALUES(9,'9','Commercial — over 200 miles');
END IF;
END $$;
