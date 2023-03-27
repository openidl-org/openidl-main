
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_subline_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    category VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_subline_code) THEN 
    INSERT INTO pa_subline_code VALUES(1,'1','Private Passenger Auto','Personal');
    INSERT INTO pa_subline_code VALUES(2,'2','Commercial Auto','Commercial');
END IF;
END $$;
