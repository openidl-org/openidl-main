
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_rating_basis_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_rating_basis_code) THEN 
    INSERT INTO gl_rating_basis_code VALUES(1,'0','None','Does Not Apply');
    INSERT INTO gl_rating_basis_code VALUES(2,'1','Admissions','Total number of persons admitted to the event(s) insured excluding insureds employees');
    INSERT INTO gl_rating_basis_code VALUES(3,'2','Area','Square footage of floor space');
    INSERT INTO gl_rating_basis_code VALUES(4,'3','Frontage','The number of linear feet of the premises bordering a street or public highway');
    INSERT INTO gl_rating_basis_code VALUES(5,'4','Payroll','Entire payment by the insured for the services of the insureds employees');
    INSERT INTO gl_rating_basis_code VALUES(6,'5','Receipts','Gross amount of money charged by the insured for the insureds operations or services rendered');
    INSERT INTO gl_rating_basis_code VALUES(7,'6','Sales','Gross amount of money charged by the insured, concessionaires of the insured, or others trading under the insureds name for products sold or distributed');
    INSERT INTO gl_rating_basis_code VALUES(8,'7','Total cost','Total cost to the insured for each specific project');
    INSERT INTO gl_rating_basis_code VALUES(9,'8','Units/Each','Those exposure bases not mentioned above which are on a per unit or per item basis. (i.e. per acre, per teacher, per landing, per policy, per rental unit, each dwelling, each canoe, per each item at a flat charge, etc.)');
    INSERT INTO gl_rating_basis_code VALUES(10,'9','All other','All those exposure bases as defined in the rating manual that are not listed above');
    INSERT INTO gl_rating_basis_code VALUES(11,'F','Tons','Total number of tons of solid substance');
    INSERT INTO gl_rating_basis_code VALUES(12,'G','Gallons','Total number of gallons of liquid substance. (i.e. oil, gasoline, kerosene, etc.)');
    INSERT INTO gl_rating_basis_code VALUES(13,'H','Total Assets','Total dollar amount of all assets');
END IF;
END $$;
