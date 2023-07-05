
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_deductible_type_code) THEN 
    INSERT INTO cr_deductible_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cr_deductible_type_code VALUES(2,'1','No Deductible ($0)');
    INSERT INTO cr_deductible_type_code VALUES(3,'4','Disappearing Deductible');
    INSERT INTO cr_deductible_type_code VALUES(4,'5','Percentage Deductible');
    INSERT INTO cr_deductible_type_code VALUES(5,'6','Flat Deductible');
    INSERT INTO cr_deductible_type_code VALUES(6,'9','All Other Deductible Types');
END IF;
END $$;
