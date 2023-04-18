
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_limited_coding_loss_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_limited_coding_loss_transaction_code) THEN 
    INSERT INTO dp_limited_coding_loss_transaction_code VALUES(1,'Y','Loss Limited Coding (includes Paid Loss Limited Coding and Outstanding Loss Limited Coding)');
END IF;
END $$;
