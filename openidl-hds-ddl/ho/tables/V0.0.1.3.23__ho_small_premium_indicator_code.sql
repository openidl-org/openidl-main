
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_small_premium_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_small_premium_indicator_code) THEN 
    INSERT INTO ho_small_premium_indicator_code VALUES(1,'Y','Small Premium Amount');
    INSERT INTO ho_small_premium_indicator_code VALUES(2,'','Does Not Apply');
END IF;
END $$;
