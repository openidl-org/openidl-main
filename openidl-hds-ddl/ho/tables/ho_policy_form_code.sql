DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_policy_form_code (
    id INT,
    code VARCHAR,
    type VARCHAR,
    category VARCHAR,
    reporting_form VARCHAR,
    reporting_category VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_policy_form_code) THEN 
INSERT INTO ho_policy_form_code (id, code, type, category, reporting_form, reporting_category) VALUES( 1,'01','AAIS - ML-1, ML-1R, ML 0001, Form 1, or HO 0001 / ISO - HO 00 01','Basic Policy Forms','Form 1','Owners Policy Forms' );
INSERT INTO ho_policy_form_code VALUES( 2,'02','AAIS - ML-2, ML 0002, Form 2, or HO 0002 / ISO - HO 00 02','Basic Policy Forms','Form 2','Owners Policy Forms' );
INSERT INTO ho_policy_form_code VALUES( 3,'03','AAIS - ML-3, ML 0003, Form 3, or HO 0003 / ISO - HO 00 03','Basic Policy Forms','Form 3','Owners Policy Forms' );
INSERT INTO ho_policy_form_code VALUES( 4,'04','AAIS - ML-4, ML 0004, Form 4, or HO 0004 / ISO - HO 00 04','Basic Policy Forms','Form 4 - Broad Perils','Renters and Condominiums' );
INSERT INTO ho_policy_form_code VALUES( 5,'84','AAIS - Form 4 w/ ML-430 or HO 0004 w/ HO 0430 or HO 0004 w/ HO 2730 / ISO - HO 00 04 w/ HO 05 24','Basic Policy Forms','Form 4 - Special Perils','Renters and Condominiums' );
INSERT INTO ho_policy_form_code VALUES( 6,'05','AAIS - Form 5 or HO 0005 / ISO - HO 00 05 and HO 00 03 w/ HO 00 15','Basic Policy Forms','Form 5','Owners Policy Forms' );
INSERT INTO ho_policy_form_code VALUES( 7,'06','AAIS - ML 0006, Form 6, or HO 0006 / ISO - HO 00 06','Basic Policy Forms','Form 6 - Broad Perils','Renters and Condominiums' );
INSERT INTO ho_policy_form_code VALUES( 8,'86','AAIS - Form 6 w/ ML-429 or HO 0006 w/ HO 0429 or HO 0006 w/ HO 7029 / ISO - HO 00 06 w/ HO 17 31','Basic Policy Forms','Form 6 - Special Perils','Renters and Condominiums' );
INSERT INTO ho_policy_form_code VALUES( 9,'08','AAIS - ML-8, ML 0008, Form 8, or HO 0008 / ISO - HO 00 08','Basic Policy Forms','Form 8','Owners Policy Forms' );
INSERT INTO ho_policy_form_code VALUES( 10,'41','Care Provided for Others','Liability Endorsements','Care Provided for Others','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 11,'42','Business Activities','Liability Endorsements','Business Activities','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 12,'43','Office, Professional, Private School or Studio Use','Liability Endorsements','Office, Professional, Private School or Studio Use','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 13,'44','Personal Injury','Liability Endorsements','Personal Injury','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 14,'45','Watercraft','Liability Endorsements','Watercraft','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 15,'46','Snowmobile','Liability Endorsements','Snowmobile','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 16,'47','Lead Poisoning Coverage','Liability Endorsements','Lead Poisoning Coverage','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 17,'53','Golf Cart Liability','Liability Endorsements','Golf Cart Liability','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 18,'54','Fuel Oil Liability Coverage','Liability Endorsements','Fuel Oil Liability Coverage','Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 19,'40','All Other Liability Endorsements / All Other HBB Liability Coverages','Liability Endorsements / HBB Liability Coverages','All Other Liability Endorsements / All Other HBB Liability Coverages','Liability Endorsements / HBB Liability Coverages' );
INSERT INTO ho_policy_form_code VALUES( 20,'61','Earthquake','Property Endorsements','Earthquake','Property Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 21,'62','Water Damage - Sewers, Drains, and Sumps','Property Endorsements','Water Damage - Sewers, Drains, and Sumps','Property Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 22,'63','Motorized Golf Cart - Physical Damage Coverage','Property Endorsements','Motorized Golf Cart - Physical Damage Coverage','Property Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 23,'64','Identity Fraud Expense Coverage','Property Endorsements','Identity Fraud Expense Coverage','Property Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 24,'75','Equipment Breakdown Coverage','Property Endorsements','Equipment Breakdown Coverage','Property Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 25,'60','All Other Property','Property Endorsements','All Other Property','Property Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 26,'80','Resident of Assisted Living Facility','Endorsements Providing Both Property and Liability Coverage','Resident of Assisted Living Facility','Indivisible Property & Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 27,'81','Student Living Away From the Described Location','Endorsements Providing Both Property and Liability Coverage','Student Living Away / All Other Indivisible Endorsements','Indivisible Property & Liability Endorsements' );
INSERT INTO ho_policy_form_code VALUES( 28,'19','Basic Coverage','Home Based Business (HBB) Coverage','Basic Coverage','Home Based Business (HBB) Coverage' );
INSERT INTO ho_policy_form_code VALUES( 29,'51','Non-Owned Auto and Hired Auto Liability','HBB Liability Coverages','Non-Owned Auto and Hired Auto Liability','HBB Liability Coverages' );
INSERT INTO ho_policy_form_code VALUES( 30,'52','Cosmetologists Liability','HBB Liability Coverages','Cosmetologists Liability','HBB Liability Coverages' );
INSERT INTO ho_policy_form_code VALUES( 31,'72','Spoilage Coverage','HBB Property Coverages','Spoilage Coverage','HBB Liability Coverages' );
INSERT INTO ho_policy_form_code VALUES( 32,'73','Related Private Structures Used for HBB Purposes','HBB Property Coverages','Related Private Structures Used for HBB Purposes','HBB Liability Coverages' );
INSERT INTO ho_policy_form_code VALUES( 33,'74','Business Property Away from Premises','HBB Property Coverages','Business Property Away from Premises','HBB Liability Coverages' );
INSERT INTO ho_policy_form_code VALUES( 34,'96','Miscellaneous Property/Liability Combined End. Coverage','Other','Miscellaneous Property/Liability Combined End. Coverage','Other' );
INSERT INTO ho_policy_form_code VALUES( 35,'99','Minimum Premium Record Subject to SECTION I, PART C, Rule 3.b','Other','Minimum Premium Record Subject to SECTION I, PART C, Rule 3.b','Other' );
END IF;

END $$;