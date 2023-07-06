
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_exposure_code (
    id INT,
    code VARCHAR,
    vehicleLim VARCHAR,
    grossRecipients VARCHAR,
    limitInsurance VARCHAR,
    other VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_exposure_code) THEN 
    INSERT INTO im_exposure_code VALUES(1, 'motorTruckCargoRisks', 'Number of Vehicles', 'Annual Gross Recipients', '0001', '0001');
END IF;
END $$;
