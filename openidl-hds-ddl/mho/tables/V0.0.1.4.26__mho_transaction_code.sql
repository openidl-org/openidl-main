
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_transaction_code) THEN 
    INSERT INTO mho_transaction_code VALUES(1,'1','Premium or Cancellation','Premium');
    INSERT INTO mho_transaction_code VALUES(2,'2','Paid Loss','Loss');
    INSERT INTO mho_transaction_code VALUES(3,'3','Outstanding Loss','Loss');
    INSERT INTO mho_transaction_code VALUES(4,'6','Paid Allocated Loss Adjustment Expense','Loss');
    INSERT INTO mho_transaction_code VALUES(5,'7','Outstanding Allocated Loss Adjustment Expense','Loss');
    INSERT INTO mho_transaction_code VALUES(6,'8','Limited Coding','Premium');
END IF;
END $$;
