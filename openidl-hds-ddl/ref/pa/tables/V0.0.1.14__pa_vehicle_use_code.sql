DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_vehicle_use_code (
    id INT,
    code VARCHAR,
    use VARCHAR,
    commuteDistance VARCHAR,
    annualDistance VARCHAR,
    operator VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_vehicle_use_code) THEN 
INSERT INTO pa_vehicle_use_code (id, code, use, commuteDistance, annualDistance, operator) VALUES( 1,'1','Work/School', 'Under 15 Miles', 'N/A', 'N/A' );
INSERT INTO pa_vehicle_use_code VALUES( 2,'2','Work/School', 'Over 15 Miles', 'N/A', 'N/A' );
INSERT INTO pa_vehicle_use_code VALUES( 3,'3','Pleasure', 'N/A', 'Under 7500 Miles', 'N/A' );
INSERT INTO pa_vehicle_use_code VALUES( 4,'4','Pleasure', 'Over 15 Miles', 'N/A', 'N/A' );
INSERT INTO pa_vehicle_use_code VALUES( 5,'5','Business', 'N/A', 'N/A', 'No Youthful Operator' );
INSERT INTO pa_vehicle_use_code VALUES( 6,'6','Business', 'N/A', 'N/A', 'Youthful Operator' );
INSERT INTO pa_vehicle_use_code VALUES( 7,'B','Business', 'N/A', 'N/A', 'Operator Age Unspecified' );
INSERT INTO pa_vehicle_use_code VALUES( 8,'7','Farm', 'N/A', 'N/A', 'No Youthful Operator' );
INSERT INTO pa_vehicle_use_code VALUES( 9,'8','Farm', 'N/A', 'N/A', 'Youthful Operator' );
INSERT INTO pa_vehicle_use_code VALUES( 10,'F','Farm', 'N/A', 'N/A', 'Operator Age Unspecified' );
INSERT INTO pa_vehicle_use_code VALUES( 11,'0','Not Applicable to Private Passenger Assigned Risks', 'N/A', 'N/A', 'N/A' );
INSERT INTO pa_vehicle_use_code VALUES( 12,'9','Erroneous Data', 'Erroneous Data', 'Erroneous Data', 'Erroneous Data' );
END IF;

END $$;