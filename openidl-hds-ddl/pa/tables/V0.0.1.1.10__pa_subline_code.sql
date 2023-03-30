
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_subline_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    category VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_subline_code) THEN 
    INSERT INTO pa_subline_code VALUES(1,'1','Private Passenger Auto','Personal');
    INSERT INTO pa_subline_code VALUES(2,'2','Commercial Auto','Commercial');
END IF;
END $$;
