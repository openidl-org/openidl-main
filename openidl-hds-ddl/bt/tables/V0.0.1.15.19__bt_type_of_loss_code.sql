
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_type_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_type_of_loss_code) THEN 
    INSERT INTO bt_type_of_loss_code VALUES(1,'1','Property Coverage - Boat/Yacht and motor or trailer');
    INSERT INTO bt_type_of_loss_code VALUES(2,'2','All Other Property (e.g. boating equipment, miscellaneous property, personal effects, etc.)Emergency');
    INSERT INTO bt_type_of_loss_code VALUES(3,'3','Service');
    INSERT INTO bt_type_of_loss_code VALUES(4,'4','Liability - Bodily Injury');
    INSERT INTO bt_type_of_loss_code VALUES(5,'5','Liability - Property Damage');
    INSERT INTO bt_type_of_loss_code VALUES(6,'6','Liability - Medical Payments');
    INSERT INTO bt_type_of_loss_code VALUES(7,'7','Uninsured Boater - Bodily Injury');
    INSERT INTO bt_type_of_loss_code VALUES(8,'8','Uninsured Boater - Property Damage');
    INSERT INTO bt_type_of_loss_code VALUES(9,'9','Uninsured Boater - Other');
    INSERT INTO bt_type_of_loss_code VALUES(10,'F','Storm Protection Coverage');
    INSERT INTO bt_type_of_loss_code VALUES(11,'A','Liability - Removal of Wrecked or Sunken Property');
    INSERT INTO bt_type_of_loss_code VALUES(12,'B','Liability - Other');
END IF;
END $$;
