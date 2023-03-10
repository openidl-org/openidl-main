DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_sex_and_marital_status_code (
    id INT,
    code VARCHAR,
    marital_status VARCHAR,
    gender VARCHAR,
    principal_secondary VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_sex_and_marital_status_code) THEN 
INSERT INTO pa_sex_and_marital_status_code (id, code, marital_status, gender, principal_secondary) VALUES( 1,'1','Married','Male','N/A' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 2,'2','Single','Male','Principal' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 3,'3','Single','Male','Secondary' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 4,'4','Married','Female','N/A' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 5,'5','Single','Female','Principal' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 6,'6','Single','Female','Secondary' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 7,'7','Married','N/A','N/A' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 8,'8','Single','N/A','N/A' );
INSERT INTO pa_sex_and_marital_status_code VALUES( 9,'0','N/A','N/A','N/A' );
END IF;

END $$;