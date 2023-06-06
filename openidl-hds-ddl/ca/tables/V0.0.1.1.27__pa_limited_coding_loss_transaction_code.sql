
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_limited_coding_loss_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_limited_coding_loss_transaction_code) THEN 
    INSERT INTO pa_limited_coding_loss_transaction_code VALUES(1,'Y','Loss Limited Coding (includes Paid Loss Limited Coding and Outstanding Loss Limited Coding)');
END IF;
END $$;
