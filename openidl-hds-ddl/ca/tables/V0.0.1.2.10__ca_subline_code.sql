
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_subline_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    category VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_subline_code) THEN 
    INSERT INTO ca_subline_code VALUES(1,'1','Private Passenger Auto','Personal');
    INSERT INTO ca_subline_code VALUES(2,'2','Commercial Auto','Commercial');
END IF;
END $$;
