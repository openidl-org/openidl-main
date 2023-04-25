DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_deductible_amount_code (
    id INT,
    deductible_type VARCHAR,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_deductible_amount_code) THEN 
INSERT INTO ho_deductible_amount_code (id, deductible_type, code, description) VALUES( 1,'6','00','Does not apply' );
INSERT INTO ho_deductible_amount_code VALUES( 2,'6','41','None ($0)' );
INSERT INTO ho_deductible_amount_code VALUES( 3,'6','42','$50' );
INSERT INTO ho_deductible_amount_code VALUES( 4,'6','43','100' );
INSERT INTO ho_deductible_amount_code VALUES( 5,'5','00','Does not apply' );
INSERT INTO ho_deductible_amount_code VALUES( 6,'5','01','1%' );
INSERT INTO ho_deductible_amount_code VALUES( 7,'5','02','2%' );
INSERT INTO ho_deductible_amount_code VALUES( 8,'5','03','3%' );
END IF;

END $$;