
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_annual_statement_line_of_business_code) THEN 
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(1,'120','Earthquake');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(2,'171','Other Liability - Occurrence Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(3,'172','Other Liability - Claims Made Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(4,'173','Excess Workers Compensation');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(5,'180','Products Liability');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(6,'181','Products Liability - Occurrence Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(7,'182','Products Liability - Claims Made Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(8,'191','Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(9,'192','Other Private Passenger Auto Liability');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(10,'193','Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(11,'194','Other Commercial Auto Liability');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(12,'211','Private Passenger Auto Physical Damage');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(13,'212','Commercial Auto Physical Damage');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(14,'260','Burglary and Theft');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(15,'270','Boiler and Machinery');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(16,'010','Fire');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(17,'021','Allied Lines, including Glass');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(18,'022','Multiple Peril Crop');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(19,'030','Farmowners Multiple Peril');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(20,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(21,'050','Commercial Multiple Peril');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(22,'051','Commercial Multiple Peril Non-Liability portion)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(23,'052','Commercial Multiple Peril (Liability portion)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(24,'090','Inland Marine');
END IF;
END $$;
