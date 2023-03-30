
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_sex_and_marital_status_code (
    id INT,
    code VARCHAR,
    marital_status VARCHAR,
    gender VARCHAR,
    principal_secondary VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_sex_and_marital_status_code) THEN 
    INSERT INTO ca_sex_and_marital_status_code VALUES(1,'0','N/A','N/A','N/A');
    INSERT INTO ca_sex_and_marital_status_code VALUES(2,'1','Married','Male','N/A');
    INSERT INTO ca_sex_and_marital_status_code VALUES(3,'2','Single','Male','Principal');
    INSERT INTO ca_sex_and_marital_status_code VALUES(4,'3','Single','Male','Secondary');
    INSERT INTO ca_sex_and_marital_status_code VALUES(5,'4','Married','Female','N/A');
    INSERT INTO ca_sex_and_marital_status_code VALUES(6,'5','Single','Female','Principal');
    INSERT INTO ca_sex_and_marital_status_code VALUES(7,'6','Single','Female','Secondary');
    INSERT INTO ca_sex_and_marital_status_code VALUES(8,'7','Married','N/A','N/A');
    INSERT INTO ca_sex_and_marital_status_code VALUES(9,'8','Single','N/A','N/A');
END IF;
END $$;
