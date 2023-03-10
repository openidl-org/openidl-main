DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_annual_statement_line_of_business_code) THEN 
INSERT INTO ho_annual_statement_line_of_business_code (id, code, description) VALUES( 1,'010','Fire' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 2,'021','Allied Lines, including Glass' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 3,'022','Multiple Peril Crop' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 4,'030','Farmowners Multiple Peril' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 5,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 6,'050','Commercial Multiple Peril' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 7,'051','Commercial Multiple Peril (Non-Liability portion)' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 8,'052','Commercial Multiple Peril (Liability portion)' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 9,'090','Inland Marine' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 10,'120','Earthquake' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 11,'170','Other Liability (excluding Products Liability)' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 12,'180','Products Liability' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 13,'191','Private Passenger Auto No-Fault (Personal Injury Protection)' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 14,'192','Other Private Passenger Auto Liability' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 15,'193','Commercial Auto No-Fault (Personal Injury Protection)' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 16,'194','Other Commercial Auto Liability' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 17,'211','Private Passenger Auto Physical Damage' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 18,'212','Commercial Auto Physical Damage' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 19,'260','Burglary and Theft' );
INSERT INTO ho_annual_statement_line_of_business_code VALUES( 20,'270','Boiler and Machinery' );
END IF;

END $$;