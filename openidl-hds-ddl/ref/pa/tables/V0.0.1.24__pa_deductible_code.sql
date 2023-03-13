DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_deductible_code) THEN 
INSERT INTO pa_deductible_code (id, code, description) VALUES( 1,'0','No Deductible' );
INSERT INTO pa_deductible_code VALUES( 2,'A','$25' );
INSERT INTO pa_deductible_code VALUES( 3,'1','$50' );
INSERT INTO pa_deductible_code VALUES( 4,'2','$100' );
INSERT INTO pa_deductible_code VALUES( 5,'B','$150' );
INSERT INTO pa_deductible_code VALUES( 6,'3','$200' );
INSERT INTO pa_deductible_code VALUES( 7,'4','$250' );
INSERT INTO pa_deductible_code VALUES( 8,'C','$300' );
INSERT INTO pa_deductible_code VALUES( 9,'5','$500' );
INSERT INTO pa_deductible_code VALUES( 10,'D','$750' );
INSERT INTO pa_deductible_code VALUES( 11,'6','$1,000' );
INSERT INTO pa_deductible_code VALUES( 12,'7','$1,500' );
INSERT INTO pa_deductible_code VALUES( 13,'8','$2,000' );
INSERT INTO pa_deductible_code VALUES( 14,'9','All Other' );
END IF;

END $$;