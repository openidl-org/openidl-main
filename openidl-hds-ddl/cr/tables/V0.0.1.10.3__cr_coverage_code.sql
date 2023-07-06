
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_coverage_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_coverage_code) THEN 
    INSERT INTO cr_coverage_code VALUES(1,'11','Computer Fraud Coverage','CR 0311');
    INSERT INTO cr_coverage_code VALUES(2,'12','Premises Liability for Guests Property','CR 0312');
    INSERT INTO cr_coverage_code VALUES(3,'13','Counterfeit Money, Money Orders, and Travelers Checks','CR 0313');
    INSERT INTO cr_coverage_code VALUES(4,'14','Forgery Coverage','CR 0314');
    INSERT INTO cr_coverage_code VALUES(5,'99','All Other','Does not apply');
    INSERT INTO cr_coverage_code VALUES(6,'00','Does not apply','Does not apply');
    INSERT INTO cr_coverage_code VALUES(7,'02','Premises Burglary and Robbery Coverage','CR 0302 / CR-302');
    INSERT INTO cr_coverage_code VALUES(8,'03','Burglary & Robbery Coverage -- Safe Burglary and Messenger','CR 0303 / CR-303');
    INSERT INTO cr_coverage_code VALUES(9,'04','Money and Securities Coverage','CR 0304 / CR-304');
    INSERT INTO cr_coverage_code VALUES(10,'06','Theft Coverage -- Property Other Than Money & Securities','CR 0306 / CR-306');
    INSERT INTO cr_coverage_code VALUES(11,'07','Theft Coverage -- Churches','CR 0307 / CR-307');
    INSERT INTO cr_coverage_code VALUES(12,'08','Employee Dishonesty Coverage','CR 0308 / CR-308');
END IF;
END $$;
