
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_limited_coding_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_limited_coding_transaction_code) THEN 
    INSERT INTO cr_limited_coding_transaction_code VALUES(1,'Y','Loss Limited Coding (Includes Paid Loss Limited Coding and Outstanding Loss Limited Coding)');
END IF;
END $$;
