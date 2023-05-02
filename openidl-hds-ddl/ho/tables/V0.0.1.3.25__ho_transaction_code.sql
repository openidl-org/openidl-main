
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_transaction_code) THEN 
    INSERT INTO ho_transaction_code VALUES(1,'1','Premium or Cancellation','Premium');
    INSERT INTO ho_transaction_code VALUES(2,'2','Paid Loss','Loss');
    INSERT INTO ho_transaction_code VALUES(3,'3','Outstanding Loss','Loss');
    INSERT INTO ho_transaction_code VALUES(4,'6','Paid Allocated Loss Adjustment Expense','Loss');
    INSERT INTO ho_transaction_code VALUES(5,'7','Outstanding Allocated Loss Adjustment Expense','Loss');
    INSERT INTO ho_transaction_code VALUES(6,'8','Limited Coding','Premium');
END IF;
END $$;
