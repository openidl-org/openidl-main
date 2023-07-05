
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_terrorism_indicator_code) THEN 
    INSERT INTO cr_terrorism_indicator_code VALUES(1,'0','Does not apply','Does not apply');
    INSERT INTO cr_terrorism_indicator_code VALUES(2,'1','Certified acts of terrorism not excluded / non-certified acts of terrorism not excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(3,'2','Certified acts of terrorism not excluded / non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(4,'3','Certified acts of terrorism not excluded / non-certified acts of terrorism excluded, subject to limitations','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(5,'4a','Certified terrorism loss excludeda / non-certified acts of terrorism not excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(6,'5a','Certified terrorism loss excludeda / non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(7,'6a','Certified terrorism loss excludeda / non-certified acts of terrorism excludeda','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(8,'A','Total exclusion for all terrorism','Terrorism Options Post-TRIA');
    INSERT INTO cr_terrorism_indicator_code VALUES(9,'B','Terrorism is covered, but only when the total property damage for terrorism event is $25,000,000 or less','Terrorism Options Post-TRIA');
    INSERT INTO cr_terrorism_indicator_code VALUES(10,'C','All terrorism events are covered, except those attributed to nuclear, biological, or chemical events','Terrorism Options Post-TRIA');
    INSERT INTO cr_terrorism_indicator_code VALUES(11,'D','Terrorism not excluded','Terrorism Options Post-TRIA');
END IF;
END $$;
