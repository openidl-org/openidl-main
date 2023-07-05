
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_annual_statement_line_of_business (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_annual_statement_line_of_business) THEN
    INSERT INTO fo_annual_statement_line_of_business VALUES(1,'120', 'Earthquake');
    INSERT INTO fo_annual_statement_line_of_business VALUES(2,'170', 'Other Liability (excluding Products Liability)');
    INSERT INTO fo_annual_statement_line_of_business VALUES(3,'171', 'Other Liability - Occurrence Only');
    INSERT INTO fo_annual_statement_line_of_business VALUES(4,'172', 'Other Liability - Claims Made Only');
    INSERT INTO fo_annual_statement_line_of_business VALUES(5,'173', 'Excess Workers Compensation');
    INSERT INTO fo_annual_statement_line_of_business VALUES(6,'180', 'Products Liability');
    INSERT INTO fo_annual_statement_line_of_business VALUES(7,'181', 'Products Liability - Occurrence Only');
    INSERT INTO fo_annual_statement_line_of_business VALUES(8,'182', 'Products Liability - Claims Made Only');
    INSERT INTO fo_annual_statement_line_of_business VALUES(9,'191', 'Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO fo_annual_statement_line_of_business VALUES(10,'192', 'Other Private Passenger Auto Liability');
    INSERT INTO fo_annual_statement_line_of_business VALUES(11,'193', 'Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO fo_annual_statement_line_of_business VALUES(12,'194', 'Other Commercial Auto Liability');
    INSERT INTO fo_annual_statement_line_of_business VALUES(13,'211', 'Private Passenger Auto Physical Damage');
    INSERT INTO fo_annual_statement_line_of_business VALUES(14,'212', 'Commercial Auto Physical Damage');
    INSERT INTO fo_annual_statement_line_of_business VALUES(15,'260', 'Burglary and Theft');
    INSERT INTO fo_annual_statement_line_of_business VALUES(16,'270', 'Boiler and Machinery');
    INSERT INTO fo_annual_statement_line_of_business VALUES(17,'010', 'Fire');
    INSERT INTO fo_annual_statement_line_of_business VALUES(18,'021', 'Allied Lines, including Glass');
    INSERT INTO fo_annual_statement_line_of_business VALUES(19,'022', 'Multiple Peril Crop');
    INSERT INTO fo_annual_statement_line_of_business VALUES(20,'030', 'Farmowners Multiple Peril');
    INSERT INTO fo_annual_statement_line_of_business VALUES(21,'040', 'Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO fo_annual_statement_line_of_business VALUES(22,'050', 'Commercial Multiple Peril');
    INSERT INTO fo_annual_statement_line_of_business VALUES(23,'051', 'Commercial Multiple Peril (Non-Liability portion)');
    INSERT INTO fo_annual_statement_line_of_business VALUES(24,'052', 'Commercial Multiple Peril (Liability portion)');
    INSERT INTO fo_annual_statement_line_of_business VALUES(25,'090', 'Inland Marine');
END IF;
END $$;
