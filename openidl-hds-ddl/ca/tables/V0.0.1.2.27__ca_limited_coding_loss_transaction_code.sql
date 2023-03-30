
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_limited_coding_loss_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_limited_coding_loss_transaction_code) THEN 
    INSERT INTO ca_limited_coding_loss_transaction_code VALUES(1,'Y','Loss Limited Coding (includes Paid Loss Limited Coding and Outstanding Loss Limited Coding)');
END IF;
END $$;
