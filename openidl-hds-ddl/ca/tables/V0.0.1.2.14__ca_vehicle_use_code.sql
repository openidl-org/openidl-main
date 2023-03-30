
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_vehicle_use_code (
    id INT,
    code VARCHAR,
    use VARCHAR,
    commute_distance VARCHAR,
    annual_distance VARCHAR,
    operator VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_vehicle_use_code) THEN 
    INSERT INTO ca_vehicle_use_code VALUES(1,'0','Not Applicable to Private Passenger Assigned Risks','N/A','N/A','N/A');
    INSERT INTO ca_vehicle_use_code VALUES(2,'1','Work/School','Under 15 Miles','N/A','N/A');
    INSERT INTO ca_vehicle_use_code VALUES(3,'2','Work/School','Over 15 Miles','N/A','N/A');
    INSERT INTO ca_vehicle_use_code VALUES(4,'3','Pleasure','N/A','Under 7500 Miles','N/A');
    INSERT INTO ca_vehicle_use_code VALUES(5,'4','Pleasure','Over 15 Miles','N/A','N/A');
    INSERT INTO ca_vehicle_use_code VALUES(6,'5','Business','N/A','N/A','No Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(7,'6','Business','N/A','N/A','Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(8,'7','Farm','N/A','N/A','No Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(9,'8','Farm','N/A','N/A','Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(10,'9','Error!-showed up in data/does not exist in stat plan','Error!-showed up in data/does not exist in stat plan','Error!-showed up in data/does not exist in stat plan','Error!-showed up in data/does not exist in stat plan');
    INSERT INTO ca_vehicle_use_code VALUES(11,'B','Business','N/A','N/A','Operator Age Unspecified');
    INSERT INTO ca_vehicle_use_code VALUES(12,'F','Farm','N/A','N/A','Operator Age Unspecified');
END IF;
END $$;
