
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_deductible_code) THEN 
    INSERT INTO pa_deductible_code values(1,'0','No Deductible');
    INSERT INTO pa_deductible_code values(2,'1','$50');
    INSERT INTO pa_deductible_code values(3,'2','$100');
    INSERT INTO pa_deductible_code values(4,'3','$200');
    INSERT INTO pa_deductible_code values(5,'4','$250');
    INSERT INTO pa_deductible_code values(6,'5','$500');
    INSERT INTO pa_deductible_code values(7,'6','$1,000');
    INSERT INTO pa_deductible_code values(8,'7','$1,500');
    INSERT INTO pa_deductible_code values(9,'8','$2,000');
    INSERT INTO pa_deductible_code values(10,'9','All Other');
    INSERT INTO pa_deductible_code values(11,'A','$25');
    INSERT INTO pa_deductible_code values(12,'B','$150');
    INSERT INTO pa_deductible_code values(13,'C','$300');
    INSERT INTO pa_deductible_code values(14,'D','$750');
END IF;
END $$;
