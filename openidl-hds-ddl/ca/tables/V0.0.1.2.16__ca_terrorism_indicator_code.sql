
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_terrorism_indicator_code) THEN 
    INSERT INTO ca_terrorism_indicator_code VALUES(1,'7','Certified acts of terrorism not excluded');
    INSERT INTO ca_terrorism_indicator_code VALUES(2,'8','Certified acts of terrorism excluded');
END IF;
END $$;
