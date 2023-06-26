
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_sprinkler_system_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_sprinkler_system_code) THEN 
    INSERT INTO cp_sprinkler_system_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_sprinkler_system_code VALUES(2,'1','Property without automatic sprinklers');
    INSERT INTO cp_sprinkler_system_code VALUES(3,'2','Property with automatic sprinklers');
END IF;
END $$;
