DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_terrorism_indicator_code) THEN 
INSERT INTO pa_terrorism_indicator_code (id, code, description) VALUES( 1,'7','Certified acts of terrorism not excluded' );
INSERT INTO pa_terrorism_indicator_code VALUES( 2,'8','Certified acts of terrorism excluded' );
END IF;

END $$;