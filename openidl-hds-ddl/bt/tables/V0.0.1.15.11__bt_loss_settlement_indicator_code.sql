
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_loss_settlement_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_loss_settlement_indicator_code) THEN 
    INSERT INTO bt_loss_settlement_indicator_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_loss_settlement_indicator_code VALUES(2,'1','Actual Cash Value');
    INSERT INTO bt_loss_settlement_indicator_code VALUES(3,'2','Replacement Cost');
    INSERT INTO bt_loss_settlement_indicator_code VALUES(4,'3','Agreed Value');
END IF;
END $$;
