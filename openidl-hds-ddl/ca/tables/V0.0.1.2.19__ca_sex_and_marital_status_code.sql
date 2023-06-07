
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_sex_and_marital_status_code (
    id INT,
    code VARCHAR,
    marital_status VARCHAR,
    gender VARCHAR,
    principal_secondary VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_sex_and_marital_status_code) THEN 
    INSERT INTO ca_sex_and_marital_status_code VALUES(1,'0','Not Applicable to Commercial Automobile policies','Not Applicable to Commercial Automobile policies','Not Applicable to Commercial Automobile policies');
    INSERT INTO ca_sex_and_marital_status_code VALUES(2,'1','Married','Male','Does Not Apply');
    INSERT INTO ca_sex_and_marital_status_code VALUES(3,'2','Single','Male','Principal');
    INSERT INTO ca_sex_and_marital_status_code VALUES(4,'3','Single','Male','Secondary');
    INSERT INTO ca_sex_and_marital_status_code VALUES(5,'4','Married','Female','Does Not Apply');
    INSERT INTO ca_sex_and_marital_status_code VALUES(6,'5','Single','Female','Principal');
    INSERT INTO ca_sex_and_marital_status_code VALUES(7,'6','Single','Female','Secondary');
    INSERT INTO ca_sex_and_marital_status_code VALUES(8,'7','Married','Does Not Apply','Does Not Apply');
    INSERT INTO ca_sex_and_marital_status_code VALUES(9,'8','Single','Does Not Apply','Does Not Apply');
END IF;
END $$;
