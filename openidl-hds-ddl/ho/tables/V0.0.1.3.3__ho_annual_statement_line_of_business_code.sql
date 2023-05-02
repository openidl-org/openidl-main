
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_annual_statement_line_of_business_code) THEN 
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(1,'120','Earthquake');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(2,'170','Other Liability (excluding Products Liability)');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(3,'180','Products Liability');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(4,'191','Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(5,'192','Other Private Passenger Auto Liability');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(6,'193','Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(7,'194','Other Commercial Auto Liability');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(8,'211','Private Passenger Auto Physical Damage');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(9,'212','Commercial Auto Physical Damage');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(10,'260','Burglary and Theft');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(11,'270','Boiler and Machinery');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(12,'010','Fire');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(13,'021','Allied Lines, including Glass');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(14,'022','Multiple Peril Crop');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(15,'030','Farmowners Multiple Peril');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(16,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(17,'050','Commercial Multiple Peril');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(18,'051','Commercial Multiple Peril (Non-Liability portion)');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(19,'052','Commercial Multiple Peril (Liability portion)');
    INSERT INTO ho_annual_statement_line_of_business_code VALUES(20,'090','Inland Marine');
END IF;
END $$;
