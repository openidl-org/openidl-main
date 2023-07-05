
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_radius_of_operations_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_radius_of_operations_code) THEN 
    INSERT INTO im_radius_of_operations_code VALUES(1,'0','Does Not Apply');
    INSERT INTO im_radius_of_operations_code VALUES(2,'1','Up to 50 Miles (Local)');
    INSERT INTO im_radius_of_operations_code VALUES(3,'2','51-200 Miles (Intermediate)');
    INSERT INTO im_radius_of_operations_code VALUES(4,'3','200-500 Miles (Long Haul - 1)');
    INSERT INTO im_radius_of_operations_code VALUES(5,'4','501 - 1,000 Miles (Long Haul - 2)');
    INSERT INTO im_radius_of_operations_code VALUES(6,'5','1,001 or more miles (Long Haul - 3)');
END IF;
END $$;
