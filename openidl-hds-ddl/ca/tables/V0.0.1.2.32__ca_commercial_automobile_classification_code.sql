
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_commercial_automobile_classification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_commercial_automobile_classification_code) THEN 
    INSERT INTO ca_commercial_automobile_classification_code VALUES(1,'1','Commercial Automobile — Non-fleet including trucks, trailers, and semitrailers.');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(2,'2','Commercial Automobile — Fleet including trucks, trailers, and semitrailers.');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(3,'3','Private Passenger — Non-fleet');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(4,'4','Private Passenger — Fleet');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(5,'5','Garage Risks');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(6,'6','Dealers');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(7,'7','Public — taxicabs, public livery and public buses');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(8,'8','School Buses');
    INSERT INTO ca_commercial_automobile_classification_code VALUES(9,'9','All other');
END IF;
END $$;
