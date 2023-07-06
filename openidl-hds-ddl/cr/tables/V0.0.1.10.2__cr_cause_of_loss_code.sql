
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_cause_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_cause_of_loss_code) THEN 
    INSERT INTO cr_cause_of_loss_code VALUES(1,'16','Riot and civil commotion');
    INSERT INTO cr_cause_of_loss_code VALUES(2,'18','Theft (burglary and robbery) - From auto');
    INSERT INTO cr_cause_of_loss_code VALUES(3,'19','Theft (burglary and robbery) - On premises');
    INSERT INTO cr_cause_of_loss_code VALUES(4,'20','Theft (burglary and robbery) - Off premises');
    INSERT INTO cr_cause_of_loss_code VALUES(5,'21','Vandalism');
    INSERT INTO cr_cause_of_loss_code VALUES(6,'25','All other causes of loss');
    INSERT INTO cr_cause_of_loss_code VALUES(7,'04','Credit card - Theft or unauthorized use of credit cards, debit cards, or fund transfer cards and loss due to forgery or acceptance of counterfeit money');
END IF;
END $$;
