
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS pa_vehicle_performance_code (
    id INT
    code VARCHAR
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_vehicle_performance_code) THEN 
    INSERT INTO pa_vehicle_performance_code VALUES(1,'0','Not applicable to Commercial Auto Policies');
    INSERT INTO pa_vehicle_performance_code VALUES(2,'1','Standard');
    INSERT INTO pa_vehicle_performance_code VALUES(3,'2','Intermediate');
    INSERT INTO pa_vehicle_performance_code VALUES(4,'3','High');
    INSERT INTO pa_vehicle_performance_code VALUES(5,'4','Sports Car');
    INSERT INTO pa_vehicle_performance_code VALUES(6,'5','Sports Premium (New Jersey Only)');
    INSERT INTO pa_vehicle_performance_code VALUES(7,'9','All Other');
END IF;
END $$
