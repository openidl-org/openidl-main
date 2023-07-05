
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_premium_base_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_premium_base_code) THEN 
    INSERT INTO im_premium_base_code VALUES(1,'0','Does Not Apply');
    INSERT INTO im_premium_base_code VALUES(2,'1','Per Vehicle Limit');
    INSERT INTO im_premium_base_code VALUES(3,'2','Gross Receipts');
    INSERT INTO im_premium_base_code VALUES(4,'3','Limit of Insurance - Equipment and Property  Rating');
    INSERT INTO im_premium_base_code VALUES(5,'4','Limit of Insurance - Trailer Rating');
    INSERT INTO im_premium_base_code VALUES(6,'9','Other (May Only Be Used With Prior Permission from AAIS)');
END IF;
END $$;
