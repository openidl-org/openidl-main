
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_deductible_code) THEN 
    INSERT INTO pa_deductible_code VALUES(1,'0','No Deductible');
    INSERT INTO pa_deductible_code VALUES(2,'1','$50');
    INSERT INTO pa_deductible_code VALUES(3,'2','$100');
    INSERT INTO pa_deductible_code VALUES(4,'3','$200');
    INSERT INTO pa_deductible_code VALUES(5,'4','$250');
    INSERT INTO pa_deductible_code VALUES(6,'5','$500');
    INSERT INTO pa_deductible_code VALUES(7,'6','$1,000');
    INSERT INTO pa_deductible_code VALUES(8,'7','$1,500');
    INSERT INTO pa_deductible_code VALUES(9,'8','$2,000');
    INSERT INTO pa_deductible_code VALUES(10,'9','All Other');
    INSERT INTO pa_deductible_code VALUES(11,'A','$25');
    INSERT INTO pa_deductible_code VALUES(12,'B','$150');
    INSERT INTO pa_deductible_code VALUES(13,'C','$300');
    INSERT INTO pa_deductible_code VALUES(14,'D','$750');
END IF;
END $$;
