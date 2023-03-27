
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_deductible_type_code) THEN 
    INSERT INTO ho_deductible_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO ho_deductible_type_code VALUES(2,'1','No deductible ($0)');
    INSERT INTO ho_deductible_type_code VALUES(3,'2','Flat, with a higher (flat or percentage) hurricane or catastrophic windstorm deductible');
    INSERT INTO ho_deductible_type_code VALUES(4,'4','Disappearing deductible');
    INSERT INTO ho_deductible_type_code VALUES(5,'5','Percentage deductible on all perils');
    INSERT INTO ho_deductible_type_code VALUES(6,'6','Flat deductible');
    INSERT INTO ho_deductible_type_code VALUES(7,'7','Flat, with a higher (flat or percentage) non-hurricane/catastrophic windstorm deductible');
    INSERT INTO ho_deductible_type_code VALUES(8,'9','All other deductible types');
END IF;
END $$;
