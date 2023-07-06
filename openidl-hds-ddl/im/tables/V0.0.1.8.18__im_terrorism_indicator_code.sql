
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_terrorism_indicator_code) THEN 
    INSERT INTO im_terrorism_indicator_code VALUES(1,'0','Does Not Apply');
    INSERT INTO im_terrorism_indicator_code VALUES(2,'1','Certified Acts of Terrorism not Excluded / Non-Certified Acts of Terrorism not Excluded');
    INSERT INTO im_terrorism_indicator_code VALUES(3,'2','Certified Acts of Terrorism not Excluded / Non-Certified Acts of Terrorism Arising from Nuclear, Biological, or Chemical Events Excluded');
    INSERT INTO im_terrorism_indicator_code VALUES(4,'3','Certified Acts of Terrorism not Excluded / Non-Certified Acts of Terrorism Excluded, Subject to Limitations');
    INSERT INTO im_terrorism_indicator_code VALUES(5,'4a','Certified Terrorism Loss Excludeda / Non-Certified Acts of Terrorism not Excluded');
    INSERT INTO im_terrorism_indicator_code VALUES(6,'5a','Certified Terrorism Loss Excludeda / Non-Certified Acts of Terrorism Arising from Nuclear, Biological, or Chemical Events Excluded');
    INSERT INTO im_terrorism_indicator_code VALUES(7,'6a','Certified Terrorism Loss Excludeda / Non-Certified Acts of Terrorism Excludeda');
END IF;
END $$;
