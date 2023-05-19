
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_class_code (
    id INT,
    code VARCHAR,
    sub_line VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_class_code) THEN 
    INSERT INTO gl_class_code VALUES(1,'99985','04 or 11','Lead poisoning coverage');
    INSERT INTO gl_class_code VALUES(2,'99994','Any','Not otherwise classified - when AAIS or ISO class codes are not available');
    INSERT INTO gl_class_code VALUES(3,'99996','19','Personal excess policy');
    INSERT INTO gl_class_code VALUES(4,'99997','19','Commercial excess policy');
    INSERT INTO gl_class_code VALUES(5,'99998','19','Personal umbrella policy');
    INSERT INTO gl_class_code VALUES(6,'99999','19','Commercial umbrella policy');
END IF;
END $$;
