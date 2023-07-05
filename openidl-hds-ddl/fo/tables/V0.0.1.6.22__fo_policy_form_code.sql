
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_policy_form_code (
    id INT,
    code VARCHAR,
    type VARCHAR,
    category VARCHAR,
    reporting_form VARCHAR,
    reporting_category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_policy_form_code) THEN 
    INSERT INTO fo_policy_form_code VALUES(1,'10','Farm Barns, Buildings, and Other Structures','Farm Coverage','Farm Barns, Buildings, and Other Structures','Farm Coverage');
    INSERT INTO fo_policy_form_code VALUES(2,'11','Blanket Farm Personal Property','Farm Coverage','Blanket Farm Personal Property','Farm Coverage');
    INSERT INTO fo_policy_form_code VALUES(3,'12','Scheduled Farm Personal Property','Farm Coverage','Scheduled Farm Personal Property','Farm Coverage');
    INSERT INTO fo_policy_form_code VALUES(4,'13','Liability Coverage Only (Dwelling Coverage Omitted)','Liability Coverage','Liability Coverage Only (Dwelling Coverage Omitted)','Farm Liability Only - No Dwell');
    INSERT INTO fo_policy_form_code VALUES(5,'19','Basic Coverage','Home Based Business (HBB) Coverage Form','Basic Coverage','Home Based Business (HBB) Coverage Form');
    INSERT INTO fo_policy_form_code VALUES(6,'40','All other HBB liability coverages','HBB Liability Coverages','All other HBB liability coverages','HBB Liability Coverages');
    INSERT INTO fo_policy_form_code VALUES(7,'41','Care Provided for Others','Liability Endorsements','Care Provided for Others','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(8,'42','Business Activities','Liability Endorsements','Business Activities','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(9,'43','Office, Professional, Private School or Studio Use','Liability Endorsements','Office, Professional, Private School or Studio Use','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(10,'44','Personal Injury','Liability Endorsements','Personal Injury','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(11,'45','Watercraft','Liability Endorsements','Watercraft','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(12,'46','Snowmobile','Liability Endorsements','Snowmobile','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(13,'47','Lead Poisoning Coverage','Liability Endorsements','Lead Poisoning Coverage','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(14,'51','Non-Owned Auto And Hired Auto Liability','HBB Liability Coverages','Non-Owned Auto And Hired Auto Liability','HBB Liability Coverages');
    INSERT INTO fo_policy_form_code VALUES(15,'52','Cosmetologists Liability','HBB Liability Coverages','Cosmetologists Liability','HBB Liability Coverages');
    INSERT INTO fo_policy_form_code VALUES(16,'53','Golf Cart Liability','Liability Endorsements','All Other Liability','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(17,'54','Fuel Oil Liability Coverage','Liability Endorsements','All Other Liability','Liability Endorsements');
    INSERT INTO fo_policy_form_code VALUES(18,'60','All Other HBB Property Coverages','HBB Property Coverages','All Other HBB Property Coverages','HBB Property Coverages');
    INSERT INTO fo_policy_form_code VALUES(19,'61','Earthquake - Dwelling','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(20,'62','Water Damage - Sewers, Drains, and Sumps','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(21,'63','Motorized Golf Cart - Physical Damage Coverage','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(22,'64','Identity Fraud Expense Coverage','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(23,'71','Earthquake - Farm Property','Property Endorsements','Earthquake - Farm Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(24,'72','Spoilage coverage','HBB Property Coverages','Spoilage coverage','HBB Property Coverages');
    INSERT INTO fo_policy_form_code VALUES(25,'73','Related Private Structures Used For HBB Purposes','HBB Property Coverages','Related Private Structures Used For HBB Purposes','HBB Property Coverages');
    INSERT INTO fo_policy_form_code VALUES(26,'74','Business Property Away From Premises','HBB Property Coverages','Business Property Away From Premises','HBB Property Coverages');
    INSERT INTO fo_policy_form_code VALUES(27,'75','Equipment Breakdown Coverage','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(28,'76','Weight of Ice, Snow, and Sleet','Property Endorsements','Weight of Snow... On Farm','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(29,'77','Livestock Perils Options','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(30,'90','Certified Acts of Terrorism Covered (Coverage Not Excluded)','Terrorism Coverage','','');
    INSERT INTO fo_policy_form_code VALUES(31,'91','Certified Acts of Terrorism Excluded Subject to Standard Fire Policy Statutes When Applicable, Producing "Fire Only" Coverage for Certified Acts of Terrorism','Terrorism Coverage','Certified Acts of Terrorism Excluded Subject to Standard Fire Policy Statutes When Applicable, Producing "Fire Only" Coverage for Certified Acts of Terrorism','Terrorism Coverage');
    INSERT INTO fo_policy_form_code VALUES(32,'92','Non-Certified Acts of Terrorism Covered (Coverage Not Excluded)','Terrorism Coverage','Non-Certified Acts of Terrorism Covered (Coverage Not Excluded)','Terrorism Coverage');
    INSERT INTO fo_policy_form_code VALUES(33,'93','Non-certified Acts of Terrorism Covered, Except Acts of Terrorism Arising Out of Nuclear, Biological or Chemical Events','Terrorism Coverage','Non-certified Acts of Terrorism Covered, Except Acts of Terrorism Arising Out of Nuclear, Biological or Chemical Events','Terrorism Coverage');
    INSERT INTO fo_policy_form_code VALUES(34,'96','Miscellaneous Property/Liability Combined End. Coverage','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(35,'99','Minimum Premium record subject to SECTION I, PART C, Rule 3.b','Property Endorsements','All Other Property','Property Endorsements');
    INSERT INTO fo_policy_form_code VALUES(36,'01','Form 1 or FO-1','Dwelling & Liability Coverage','Form 1','Dwelling & Liability Coverage');
    INSERT INTO fo_policy_form_code VALUES(37,'02','Form 2 or FO-2','Dwelling & Liability Coverage','Form 2','Dwelling & Liability Coverage');
    INSERT INTO fo_policy_form_code VALUES(38,'03','Form 3 or FO-3','Dwelling & Liability Coverage','Form 3','Dwelling & Liability Coverage');
    INSERT INTO fo_policy_form_code VALUES(39,'04','Form 4 or FO-4','Dwelling & Liability Coverage','Form 4','Dwelling & Liability Coverage');
    INSERT INTO fo_policy_form_code VALUES(40,'05','FO-5','Dwelling & Liability Coverage','Form 5','Dwelling & Liability Coverage');
    INSERT INTO fo_policy_form_code VALUES(41,'08','Form 8','Dwelling & Liability Coverage','Form 8','Dwelling & Liability Coverage');
END IF;
END $$;
