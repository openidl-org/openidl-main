
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_loss_settlement_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_loss_settlement_indicator_code) THEN 
    INSERT INTO mho_loss_settlement_indicator_code VALUES(1,'0','No modifications to loss settlement terms of underlying policy OR Does not apply');
    INSERT INTO mho_loss_settlement_indicator_code VALUES(2,'6','Modification to Coverage A (building), but not Coverage C (personal property): Actual Cash Value Coverage (Coverages A) - not applicable to AAIS Program ISO Endorsement MH 04 02');
    INSERT INTO mho_loss_settlement_indicator_code VALUES(3,'7','Modification to Coverage C (personal property), but not Coverage A (building): Replacement Value (Coverage C - Personal Property) - AAIS Endorsement ML-55 or equivalent / ISO Endorsement HO-290 or HO 04 90 --OR-- Modifications to both Coverage A (building) and Coverage C (personal property): With Replacement Cost on Coverage C - AAIS ML-55, ML 0055, HO 0055, or equivalent / ISO HO 290, HO 04 90, or equivalent');
    INSERT INTO mho_loss_settlement_indicator_code VALUES(4,'8','Modification to Coverage A (building), but not Coverage C (personal property): Replacement Cost Terms (Coverages A) - not applicable to ISO Program AAIS Endorsement ML-200 or equivalent');
    INSERT INTO mho_loss_settlement_indicator_code VALUES(5,'A','Actual Cash Value Coverage (Coverages A) - not applicable to AAIS Program ISO Endorsement MH 04 02');
    INSERT INTO mho_loss_settlement_indicator_code VALUES(6,'B','Replacement Cost Terms (Coverages A) - not applicable to ISO Program AAIS Endorsement ML-200 or equivalent');
END IF;
END $$;
