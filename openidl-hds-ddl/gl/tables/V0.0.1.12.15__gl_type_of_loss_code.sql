
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_type_of_loss_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_type_of_loss_code) THEN 
    INSERT INTO gl_type_of_loss_code VALUES(1,'26','Bodily Injury','Bodily Injury');
    INSERT INTO gl_type_of_loss_code VALUES(2,'27','Property Damage','Property Damage');
    INSERT INTO gl_type_of_loss_code VALUES(3,'28','Fire Legal','Fire Legal');
    INSERT INTO gl_type_of_loss_code VALUES(4,'29','All Other Liability','All Other Liability');
    INSERT INTO gl_type_of_loss_code VALUES(5,'30','Medical Payments','Medical Payments');
    INSERT INTO gl_type_of_loss_code VALUES(6,'50','Products Liability','Products Liability');
    INSERT INTO gl_type_of_loss_code VALUES(7,'51','Personal Injury','Personal Injury');
    INSERT INTO gl_type_of_loss_code VALUES(8,'52','Advertising Injury','Advertising Injury');
    INSERT INTO gl_type_of_loss_code VALUES(9,'53','Dog Bite','Liability (BI, PD, Med-Pay)');
    INSERT INTO gl_type_of_loss_code VALUES(10,'54','Mold','Liability (BI, PD, Med-Pay)');
    INSERT INTO gl_type_of_loss_code VALUES(11,'55','Swimming Pool','Liability (BI, PD, Med-Pay)');
    INSERT INTO gl_type_of_loss_code VALUES(12,'56','Trampoline','Liability (BI, PD, Med-Pay)');
    INSERT INTO gl_type_of_loss_code VALUES(13,'57','Escaped Liquid Fuel','Pollution liability (BI, PD, Med-Pay)');
    INSERT INTO gl_type_of_loss_code VALUES(14,'58','Lead Poisoning','Pollution liability (BI, PD, Med-Pay)');
    INSERT INTO gl_type_of_loss_code VALUES(15,'59','Pollution other than Escaped Liquid Fuel and Lead Poisoning','Pollution liability (BI, PD, Med-Pay)');
END IF;
END $$;
