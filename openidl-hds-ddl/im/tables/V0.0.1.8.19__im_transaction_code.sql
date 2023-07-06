
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_transaction_code) THEN 
    INSERT INTO im_transaction_code VALUES(1,'1','Premium or Cancellation','Premium Transactions');
    INSERT INTO im_transaction_code VALUES(2,'2','Paid Loss','Loss Transactions');
    INSERT INTO im_transaction_code VALUES(3,'3','Outstanding Loss','Loss Transactions');
    INSERT INTO im_transaction_code VALUES(4,'6','Paid Allocated Loss Adjustment Expense','Loss Transactions');
    INSERT INTO im_transaction_code VALUES(5,'7','Outstanding Allocated Loss Adjustment Expense','Loss Transactions');
    INSERT INTO im_transaction_code VALUES(6,'8','Limited Coding','Premium Transactions');
END IF;
END $$;
