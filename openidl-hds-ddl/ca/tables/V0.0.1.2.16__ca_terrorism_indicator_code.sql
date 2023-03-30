
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_terrorism_indicator_code (
    id INT
    code VARCHAR
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_terrorism_indicator_code) THEN 
    INSERT INTO ca_terrorism_indicator_code VALUES(1,'7','Certified acts of terrorism not excluded');
    INSERT INTO ca_terrorism_indicator_code VALUES(2,'8','Certified acts of terrorism excluded');
END IF;
END $$
