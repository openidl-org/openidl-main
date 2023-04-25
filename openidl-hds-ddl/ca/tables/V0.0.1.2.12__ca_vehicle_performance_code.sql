
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_vehicle_performance_code (
    id INT
    code VARCHAR
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_vehicle_performance_code) THEN 
    INSERT INTO ca_vehicle_performance_code VALUES(1,'0','Not applicable to Commercial Auto Policies');
    INSERT INTO ca_vehicle_performance_code VALUES(2,'1','Standard');
    INSERT INTO ca_vehicle_performance_code VALUES(3,'2','Intermediate');
    INSERT INTO ca_vehicle_performance_code VALUES(4,'3','High');
    INSERT INTO ca_vehicle_performance_code VALUES(5,'4','Sports Car');
    INSERT INTO ca_vehicle_performance_code VALUES(6,'5','Sports Premium (New Jersey Only)');
    INSERT INTO ca_vehicle_performance_code VALUES(7,'9','All Other');
END IF;
END $$
