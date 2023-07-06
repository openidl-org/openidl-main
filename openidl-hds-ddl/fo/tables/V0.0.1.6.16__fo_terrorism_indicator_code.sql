
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_terrorism_indicator_code) THEN 
    INSERT INTO fo_terrorism_indicator_code VALUES(1,'0','Does not apply');
    INSERT INTO fo_terrorism_indicator_code VALUES(2,'1','Certified acts of terrorism not excluded/non-certified acts of terrorism not excluded');
    INSERT INTO fo_terrorism_indicator_code VALUES(3,'2','Certified acts of terrorism not excluded/non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded');
    INSERT INTO fo_terrorism_indicator_code VALUES(4,'3','Certified acts of terrorism not excluded/non-certified acts of terrorism excluded, subject to limitations');
    INSERT INTO fo_terrorism_indicator_code VALUES(5,'4','Certified terrorism loss excluded/non-certified acts of terrorism not excluded');
    INSERT INTO fo_terrorism_indicator_code VALUES(6,'5','Certified terrorism loss excluded/non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded');
    INSERT INTO fo_terrorism_indicator_code VALUES(7,'6','Certified terrorism loss excluded/non-certified acts of terrorism excluded');
END IF;
END $$;