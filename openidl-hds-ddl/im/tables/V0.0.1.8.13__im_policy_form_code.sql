
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_policy_form_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_policy_form_code) THEN 
    INSERT INTO im_policy_form_code VALUES(1,'90','Certified Acts of Terrorism Covered (Coverage Not Excluded');
    INSERT INTO im_policy_form_code VALUES(2,'91','Certified Acts of Terrorism Excluded Subject to Standard Fire Policy Statutes when Applicable, Producing Fire Only Coverage for Certified Acts of Terrorism');
    INSERT INTO im_policy_form_code VALUES(3,'99','Minimum Premium record subjected to SECTION I, PART C, Rule 3.b');
    INSERT INTO im_policy_form_code VALUES(4,'00','Does not Apply');
    INSERT INTO im_policy_form_code VALUES(5,'92a','Non Certified Acts of Terrorism Covered (Coverage Not Excluded)a');
    INSERT INTO im_policy_form_code VALUES(6,'93a','Non-Certified Acts of Terrorism Covered, Except Acts of Terrorism Arising Out of Nuclear, Biological or Chemical Events a');
END IF;
END $$;
