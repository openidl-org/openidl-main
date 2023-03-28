
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_annual_statement_line_of_business_code) THEN 
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(1,'120','Earthquake');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(2,'170','Other Liability (excluding Products Liability)');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(3,'171','Other Liability - Occurrence Only');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(4,'172','Other Liability - Claims Made Only');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(5,'173','Excess Workers Compensation');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(6,'180','Products Liability');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(7,'181','Products Liability - Occurrence Only');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(8,'182','Products Liability - Claims Made Only');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(9,'191','Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(10,'192','Other Private Passenger Auto Liability');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(11,'193','Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(12,'194','Other Commercial Auto Liability');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(13,'211','Private Passenger Auto Physical Damage');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(14,'212','Commercial Auto Physical Damage');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(15,'260','Burglary and Theft');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(16,'270','Boiler and Machinery');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(17,'010','Fire');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(18,'021','Allied Lines, including Glass');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(19,'022','Multiple Peril Crop');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(20,'030','Farmowners Multiple Peril');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(21,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(22,'050','Commercial Multiple Peril');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(23,'051','Commercial Multiple Peril (Non-Liability portion)');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(24,'052','Commercial Multiple Peril (Liability portion)');
    INSERT INTO mho_annual_statement_line_of_business_code VALUES(25,'090','Inland Marine');
END IF;
END $$;