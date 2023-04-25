
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS mho_tie_down_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_tie_down_code) THEN 
    INSERT INTO mho_tie_down_code VALUES(1,'0','Does not apply');
    INSERT INTO mho_tie_down_code VALUES(2,'1','Without Tie Down');
    INSERT INTO mho_tie_down_code VALUES(3,'2','With Tie Down: Over the top and chassis');
    INSERT INTO mho_tie_down_code VALUES(4,'3','With Tie Down: Over the top only');
    INSERT INTO mho_tie_down_code VALUES(5,'4','With Tie Down: Chassis only');
END IF;
END $$;
