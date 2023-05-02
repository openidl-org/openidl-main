
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_number_of_families_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_number_of_families_code) THEN 
    INSERT INTO ho_number_of_families_code VALUES(1,'0','Does Not Apply','Does Not Apply','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(2,'1','One Family','Not a Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(3,'2','Two Families','Not a Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(4,'3','Three Families','Not a Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(5,'4','Four Families','Not a Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(6,'5','One Unit','Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(7,'6','Two Units','Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(8,'7','Three or Four Units','Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(9,'8','Five through Eight Units','Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(10,'9','Nine of More Units','Townhouse or Row House','POLICY FORM CODES 01, 02, 03, 05, AND 08');
    INSERT INTO ho_number_of_families_code VALUES(11,'0','Does Not Apply','Does Not Apply','POLICY FORM CODES 04, 06, 84, AND 86');
    INSERT INTO ho_number_of_families_code VALUES(12,'1','One through Four Families','Number of Families','POLICY FORM CODES 04, 06, 84, AND 86');
    INSERT INTO ho_number_of_families_code VALUES(13,'2','Five or More Families','Number of Families','POLICY FORM CODES 04, 06, 84, AND 86');
END IF;
END $$;
