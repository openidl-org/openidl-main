
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_body_size_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_body_size_code) THEN 
    INSERT INTO ca_body_size_code VALUES(1,'1','Private Passenger');
    INSERT INTO ca_body_size_code VALUES(2,'2','Sports Car');
    INSERT INTO ca_body_size_code VALUES(3,'3','Oversized Car or Limousine');
    INSERT INTO ca_body_size_code VALUES(4,'4','Light Truck (10,000 lbs. or less empty weight) or Bus');
    INSERT INTO ca_body_size_code VALUES(5,'5','Medium Truck (10,001 - 20,000 lbs. empty weight)');
    INSERT INTO ca_body_size_code VALUES(6,'6','Heavy Truck (20,001 - 45,000 lbs. empty weight)');
    INSERT INTO ca_body_size_code VALUES(7,'7','Extra Heavy Truck (Over 45,000 lbs. empty weight)');
    INSERT INTO ca_body_size_code VALUES(8,'9','All Other');
END IF;
END $$;
