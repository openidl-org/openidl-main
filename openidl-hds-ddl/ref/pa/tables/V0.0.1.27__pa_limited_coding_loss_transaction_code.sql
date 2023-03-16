
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_limited_coding_loss_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_limited_coding_loss_transaction_code) THEN 
    INSERT INTO pa_limited_coding_loss_transaction_code VALUES(1,'Y','Loss Limited Coding (includes Paid Loss Limited Coding and Outstanding Loss Limited Coding)');
END IF;
END $$;
