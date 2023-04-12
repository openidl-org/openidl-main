
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
	type VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_deductible_type_code) THEN 
    INSERT INTO dp_construction_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO dp_construction_code VALUES(2,'1','No Deductible ($0)','Does Not Apply');
    INSERT INTO dp_construction_code VALUES(3,'2','Flat, With a Higher (Flat or Percentage) Hurricane or Catastrophic Windstorm Deductible','Flat');
    INSERT INTO dp_construction_code VALUES(4,'4','Disappearing Deductible','Does Not Apply');
    INSERT INTO dp_construction_code VALUES(5,'5','Percentage Deductible on All Perils','Percentage');
    INSERT INTO dp_construction_code VALUES(6,'6','Flat Deductible','Flat');
    INSERT INTO dp_construction_code VALUES(7,'7','Flat, With a Higher (Flat or Percentage) Non-Hurricane/Catastrophic Windstorm Deductible','Flat');
    INSERT INTO dp_construction_code VALUES(8,'9','All Other Deductible Types','Does Not Apply');
END IF;
END $$;
