
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_commodity_classification_index_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_commodity_classification_index_code) THEN 
    INSERT INTO im_commodity_classification_index_code VALUES(1,'0','Does Not Apply');
    INSERT INTO im_commodity_classification_index_code VALUES(2,'1','1');
    INSERT INTO im_commodity_classification_index_code VALUES(3,'2','2');
    INSERT INTO im_commodity_classification_index_code VALUES(4,'3','3');
    INSERT INTO im_commodity_classification_index_code VALUES(5,'4','4');
    INSERT INTO im_commodity_classification_index_code VALUES(6,'5','5');
END IF;
END $$;
