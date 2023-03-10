DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_vehicle_performance_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_vehicle_performance_code) THEN 
INSERT INTO pa_vehicle_performance_code (id, code, description) VALUES( 1,'1','Standard' );
INSERT INTO pa_vehicle_performance_code VALUES( 2,'2','Intermediate' );
INSERT INTO pa_vehicle_performance_code VALUES( 3,'3','High' );
INSERT INTO pa_vehicle_performance_code VALUES( 4,'4','Sports Car' );
INSERT INTO pa_vehicle_performance_code VALUES( 5,'5','Sports Premium (New Jersey Only)' );
INSERT INTO pa_vehicle_performance_code VALUES( 6,'9','All Other' );
INSERT INTO pa_vehicle_performance_code VALUES( 7,'0','Not applicable to Commercial Auto Policies' );
END IF;

END $$;