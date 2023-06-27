
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_vehicle_use_code (
    id INT,
    code VARCHAR,
    use VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_vehicle_use_code) THEN 
    INSERT INTO ca_vehicle_use_code VALUES(1,'0','Not Applicable to Commercial Automobile policies','Does Not Apply');
    INSERT INTO ca_vehicle_use_code VALUES(2,'1','Work/School','Under 15 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(3,'2','Work/School','Over 15 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(4,'3','Pleasure','Under 7500 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(5,'4','Pleasure','Over 7500 Miles');
    INSERT INTO ca_vehicle_use_code VALUES(6,'5','Business','No Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(7,'6','Business','Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(8,'7','Farm','No Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(9,'8','Farm','Youthful Operator');
    INSERT INTO ca_vehicle_use_code VALUES(10,'9','Error!-showed up in data/does not exist in stat plan','Error!-showed up in data/does not exist in stat plan');
    INSERT INTO ca_vehicle_use_code VALUES(11,'B','Business','Operator Age Unspecified');
    INSERT INTO ca_vehicle_use_code VALUES(12,'F','Farm','Operator Age Unspecified');
END IF;
END $$;
