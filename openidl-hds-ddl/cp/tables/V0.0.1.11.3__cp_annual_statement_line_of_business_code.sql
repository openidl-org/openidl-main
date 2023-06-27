
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_annual_statement_line_of_business_code) THEN 
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(1,'110','Medical Malpractice');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(2,'111','Medical Malpractice (Occurrence Only)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(3,'112','Medical Malpractice (Claims Only)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(4,'120','Earthquake');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(5,'170','Other Liability (excluding Products Liability)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(6,'171','Other Liability - Occurrence Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(7,'172','Other Liability - Claims Made Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(8,'173','Excess Workers Compensation');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(9,'180','Products Liability');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(10,'181','Products Liability - Occurrence Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(11,'182','Products Liability - Claims Made Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(12,'191','Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(13,'192','Other Private Passenger Auto Liability');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(14,'193','Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(15,'194','Other Commercial Auto Liability');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(16,'211','Private Passenger Auto Physical Damage');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(17,'212','Commercial Auto Physical Damage');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(18,'260','Burglary and Theft');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(19,'270','Boiler and Machinery');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(20,'010','Fire');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(21,'021','Allied Lines, including Glass');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(22,'022','Multiple Peril Crop');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(23,'030','Farmowners Multiple Peril');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(24,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(25,'050','Commercial Multiple Peril');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(26,'051','Commercial Multiple Peril (Non-Liability portion)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(27,'052','Commercial Multiple Peril (Liability portion)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(28,'090','Inland Marine');
END IF;
END $$;
