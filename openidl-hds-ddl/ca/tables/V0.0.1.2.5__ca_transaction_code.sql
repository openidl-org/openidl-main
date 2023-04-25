
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_transaction_code) THEN 
    INSERT INTO ca_transaction_code VALUES(1,'1','Premium or Cancellation','Premium');
    INSERT INTO ca_transaction_code VALUES(2,'2','Paid Loss','Loss');
    INSERT INTO ca_transaction_code VALUES(3,'3','Outstanding Loss','Loss');
    INSERT INTO ca_transaction_code VALUES(4,'6','Paid Allocated Loss Adjustment Expense','Loss');
    INSERT INTO ca_transaction_code VALUES(5,'7','Outstanding Allocated Loss Adjustment Expense','Loss');
    INSERT INTO ca_transaction_code VALUES(6,'8','Limited Coding','Premium');
END IF;
END $$;
