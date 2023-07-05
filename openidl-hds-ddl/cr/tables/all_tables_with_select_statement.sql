--cr_stat_gt2_tbl
SELECT * FROM cr_stat_gt2_tbl;CREATE TABLE IF NOT EXISTS cr_stat_stg (
    ID SERIAL,
    ID SERIAL,
    TRANSMITTAL_ID INT,
    CHANGE_COMMENTS VARCHAR(4000) DEFAULT NULL,
    UPDATED_BY INT DEFAULT NULL,
    EFF_START_DATE TIMESTAMP(6) DEFAULT NULL,
    EFF_END_DATE TIMESTAMP(6),
    LAST_VALIDATED_DATE TIMESTAMP(6) DEFAULT NULL,
    REP_YR_4DIGIT DECIMAL(4,0) DEFAULT NULL,
    LINE VARCHAR(2) DEFAULT NULL,
    REP_MO VARCHAR(2) DEFAULT NULL,
    REP_YR VARCHAR(2) DEFAULT NULL,
    COMP VARCHAR(4) DEFAULT NULL,
    STATE VARCHAR(2) DEFAULT NULL,
    COUNTY VARCHAR(3) DEFAULT NULL,
    RES016 VARCHAR(1) DEFAULT NULL,
    TERRITORY VARCHAR(3) DEFAULT NULL,
    TRANS VARCHAR(1) DEFAULT NULL,
    PREM_AMT DECIMAL(12,2) DEFAULT NULL,
    LOSS_AMT DECIMAL(12,2) DEFAULT NULL,
    EXPOSURE INT DEFAULT NULL,
    ASLOB VARCHAR(3) DEFAULT NULL,
    PROG_CD VARCHAR(1) DEFAULT NULL,
    POL_FRM VARCHAR(2) DEFAULT NULL,
    COV_CODE VARCHAR(2) DEFAULT NULL,
    RES044 VARCHAR(1) DEFAULT NULL,
    TERRORISM VARCHAR(1) DEFAULT NULL,
    PAOI VARCHAR(5) DEFAULT NULL,
    DED_TYPE VARCHAR(1) DEFAULT NULL,
    DED_AMT VARCHAR(2) DEFAULT NULL,
    RES054 VARCHAR(1) DEFAULT NULL,
    CLASS_CODE VARCHAR(5) DEFAULT NULL,
    RES060 VARCHAR(8) DEFAULT NULL,
    NUM_PREM VARCHAR(5) DEFAULT NULL,
    ADD_LIMIT VARCHAR(3) DEFAULT NULL,
    RATE_GROUP VARCHAR(2) DEFAULT NULL,
    RES078 VARCHAR(5) DEFAULT NULL,
    TYPE_POLICY VARCHAR(1) DEFAULT NULL,
    PROT_DEVICES VARCHAR(1) DEFAULT NULL,
    PACKAGE_ID VARCHAR(1) DEFAULT NULL,
    RES086 VARCHAR(6) DEFAULT NULL,
    POOL VARCHAR(1) DEFAULT NULL,
    MOS_COV VARCHAR(2) DEFAULT NULL,
    COL VARCHAR(2) DEFAULT NULL,
    RES095 VARCHAR(1) DEFAULT NULL,
    ACCIDENT_MON VARCHAR(2) DEFAULT NULL,
    ACCIDENT_DAY VARCHAR(2) DEFAULT NULL,
    ACCIDENT_YR VARCHAR(2) DEFAULT NULL,
    ZIP VARCHAR(5) DEFAULT NULL,
    ZIP_SUFF VARCHAR(4) DEFAULT NULL,
    RES111 VARCHAR(16) DEFAULT NULL,
    POLICY_NUM VARCHAR(14) DEFAULT NULL,
    CLAIM_NUM VARCHAR(12) DEFAULT NULL,
    CLAIM_ID VARCHAR(2) DEFAULT NULL,
    CO_USE VARCHAR(10) DEFAULT NULL,
    STATUS VARCHAR(20) DEFAULT NULL,
    LINE_NUMBER INT DEFAULT NULL,
    NOTES VARCHAR(4000) DEFAULT NULL,
    VERSION INT  DEFAULT '1',
    VAL_VER INT  DEFAULT '1',
    PRIMARY KEY (ID),
    FOREIGN KEY (TRANSMITTAL_ID) REFERENCES TRANSMITTAL(ID)
);


--cr_pool_code
SELECT * FROM cr_pool_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_pool_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_pool_code) THEN 
    INSERT INTO cr_pool_code VALUES(1,'0','Not written in a pool or FAIR plan, and not a shared risk');
    INSERT INTO cr_pool_code VALUES(2,'1','State approved FAIR plan');
    INSERT INTO cr_pool_code VALUES(3,'2','Shared risk or Contributing Insurance endorsement attached');
END IF;
END $$;



--cr_protective_device_code
SELECT * FROM cr_protective_device_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_protective_device_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_protective_device_code) THEN 
    INSERT INTO cr_protective_device_code VALUES(1,'0','None or Does not apply');
    INSERT INTO cr_protective_device_code VALUES(2,'1','Watchman - Signals to central station or police station');
    INSERT INTO cr_protective_device_code VALUES(3,'2','Watchman - Other');
    INSERT INTO cr_protective_device_code VALUES(4,'3','Burglary alarm system - Signals to central station');
    INSERT INTO cr_protective_device_code VALUES(5,'4','Burglary alarm system - Other');
    INSERT INTO cr_protective_device_code VALUES(6,'9','All other');
END IF;
END $$;



--cr_rate_group_code
SELECT * FROM cr_rate_group_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_rate_group_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_rate_group_code) THEN 
    INSERT INTO cr_rate_group_code VALUES(1,'10','10');
    INSERT INTO cr_rate_group_code VALUES(2,'00','Does not apply');
    INSERT INTO cr_rate_group_code VALUES(3,'01','1');
    INSERT INTO cr_rate_group_code VALUES(4,'02','2');
    INSERT INTO cr_rate_group_code VALUES(5,'03','3');
    INSERT INTO cr_rate_group_code VALUES(6,'04','4');
    INSERT INTO cr_rate_group_code VALUES(7,'05','5');
    INSERT INTO cr_rate_group_code VALUES(8,'06','6');
    INSERT INTO cr_rate_group_code VALUES(9,'07','7');
    INSERT INTO cr_rate_group_code VALUES(10,'08','8');
    INSERT INTO cr_rate_group_code VALUES(11,'09','9');
END IF;
END $$;



--cr_terrorism_indicator_code
SELECT * FROM cr_terrorism_indicator_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_terrorism_indicator_code) THEN 
    INSERT INTO cr_terrorism_indicator_code VALUES(1,'0','Does not apply','Does not apply');
    INSERT INTO cr_terrorism_indicator_code VALUES(2,'1','Certified acts of terrorism not excluded / non-certified acts of terrorism not excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(3,'2','Certified acts of terrorism not excluded / non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(4,'3','Certified acts of terrorism not excluded / non-certified acts of terrorism excluded, subject to limitations','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(5,'4a','Certified terrorism loss excludeda / non-certified acts of terrorism not excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(6,'5a','Certified terrorism loss excludeda / non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(7,'6a','Certified terrorism loss excludeda / non-certified acts of terrorism excludeda','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_terrorism_indicator_code VALUES(8,'A','Total exclusion for all terrorism','Terrorism Options Post-TRIA');
    INSERT INTO cr_terrorism_indicator_code VALUES(9,'B','Terrorism is covered, but only when the total property damage for terrorism event is $25,000,000 or less','Terrorism Options Post-TRIA');
    INSERT INTO cr_terrorism_indicator_code VALUES(10,'C','All terrorism events are covered, except those attributed to nuclear, biological, or chemical events','Terrorism Options Post-TRIA');
    INSERT INTO cr_terrorism_indicator_code VALUES(11,'D','Terrorism not excluded','Terrorism Options Post-TRIA');
END IF;
END $$;



--cr_transaction_code
SELECT * FROM cr_transaction_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_transaction_code) THEN 
    INSERT INTO cr_transaction_code VALUES(1,'0','Not written in a pool or FAIR plan, and not a shared risk');
    INSERT INTO cr_transaction_code VALUES(2,'1','State approved FAIR plan');
    INSERT INTO cr_transaction_code VALUES(3,'2','Shared risk or Contributing Insurance endorsement attached');
END IF;
END $$;



--cr_type_of_policy_code
SELECT * FROM cr_type_of_policy_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_type_of_policy_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_type_of_policy_code) THEN 
    INSERT INTO cr_type_of_policy_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cr_type_of_policy_code VALUES(2,'1','Personal Crim (Theft) Policy');
    INSERT INTO cr_type_of_policy_code VALUES(3,'2','Commercial Crime (Burglary and Theft) Policy');
END IF;
END $$;



--
SELECT * FROM ;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_state_code (
    id INT,
    abbreviation VARCHAR,
    code VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_state_code) THEN 
    INSERT INTO cr_state_code VALUES(1,'AL','01');
    INSERT INTO cr_state_code VALUES(2,'AZ','02');
    INSERT INTO cr_state_code VALUES(3,'AR','03');
    INSERT INTO cr_state_code VALUES(4,'CA','04');
    INSERT INTO cr_state_code VALUES(5,'CO','05');
    INSERT INTO cr_state_code VALUES(6,'CT','06');
    INSERT INTO cr_state_code VALUES(7,'DE','07');
    INSERT INTO cr_state_code VALUES(8,'DC','08');
    INSERT INTO cr_state_code VALUES(9,'FL','09');
    INSERT INTO cr_state_code VALUES(10,'GA','10');
    INSERT INTO cr_state_code VALUES(11,'ID','11');
    INSERT INTO cr_state_code VALUES(12,'IL','12');
    INSERT INTO cr_state_code VALUES(13,'IN','13');
    INSERT INTO cr_state_code VALUES(14,'IA','14');
    INSERT INTO cr_state_code VALUES(15,'KS','15');
    INSERT INTO cr_state_code VALUES(16,'KY','16');
    INSERT INTO cr_state_code VALUES(17,'LA','17');
    INSERT INTO cr_state_code VALUES(18,'ME','18');
    INSERT INTO cr_state_code VALUES(19,'MD','19');
    INSERT INTO cr_state_code VALUES(20,'MA','20');
    INSERT INTO cr_state_code VALUES(21,'MI','21');
    INSERT INTO cr_state_code VALUES(22,'MN','22');
    INSERT INTO cr_state_code VALUES(23,'MS','23');
    INSERT INTO cr_state_code VALUES(24,'MO','24');
    INSERT INTO cr_state_code VALUES(25,'MT','25');
    INSERT INTO cr_state_code VALUES(26,'NE','26');
    INSERT INTO cr_state_code VALUES(27,'NV','27');
    INSERT INTO cr_state_code VALUES(28,'NH','28');
    INSERT INTO cr_state_code VALUES(29,'NJ','29');
    INSERT INTO cr_state_code VALUES(30,'NM','30');
    INSERT INTO cr_state_code VALUES(31,'NY','31');
    INSERT INTO cr_state_code VALUES(32,'NC','32');
    INSERT INTO cr_state_code VALUES(33,'ND','33');
    INSERT INTO cr_state_code VALUES(34,'OH','34');
    INSERT INTO cr_state_code VALUES(35,'OK','35');
    INSERT INTO cr_state_code VALUES(36,'OR','36');
    INSERT INTO cr_state_code VALUES(37,'PA','37');
    INSERT INTO cr_state_code VALUES(38,'RI','38');
    INSERT INTO cr_state_code VALUES(39,'SC','39');
    INSERT INTO cr_state_code VALUES(40,'SD','40');
    INSERT INTO cr_state_code VALUES(41,'TN','41');
    INSERT INTO cr_state_code VALUES(42,'TX','42');
    INSERT INTO cr_state_code VALUES(43,'UT','43');
    INSERT INTO cr_state_code VALUES(44,'VT','44');
    INSERT INTO cr_state_code VALUES(45,'VA','45');
    INSERT INTO cr_state_code VALUES(46,'WA','46');
    INSERT INTO cr_state_code VALUES(47,'WV','47');
    INSERT INTO cr_state_code VALUES(48,'WI','48');
    INSERT INTO cr_state_code VALUES(49,'WY','49');
    INSERT INTO cr_state_code VALUES(50,'HI','52');
    INSERT INTO cr_state_code VALUES(51,'AK','54');
    INSERT INTO cr_state_code VALUES(52,'PR','58');
END IF;
END $$;



--cr_annual_statement_line_of_business_code
SELECT * FROM cr_annual_statement_line_of_business_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_annual_statement_line_of_business_code) THEN 
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(1,'120','Earthquake');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(2,'170','Other Liability (excluding Products Liability)');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(3,'171','Other Liability - Occurance Only');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(4,'172','Other Liability - Claims Made Only');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(5,'173','Excess Workers Compensation');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(6,'180','Products Liability');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(7,'181','Products Liability - Occurrence Only');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(8,'182','Products Liability - Claims Made Only');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(9,'191','Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(10,'192','Other Private Passenger Auto Liability');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(11,'193','Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(12,'194','Other Commercial Auto Liability');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(13,'211','Private Passenger Auto Physical Damage');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(14,'212','Commercial Auto Physical Damage');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(15,'260','Burglary and Theft');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(16,'270','Boiler and Machinery');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(17,'010','Fire');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(18,'021','Allied Lines, including Glass');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(19,'022','Multiple Peril Crop');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(20,'030','Farmowners Multiple Peril');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(21,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(22,'050','Commercial Multiple Peril');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(23,'051','Commercial Multiple Peril (Non-Liability portion)');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(24,'052','Commercial Multiple Peril (Liability portion)');
    INSERT INTO cr_annual_statement_line_of_business_code VALUES(25,'090','Inland Marine');
END IF;
END $$;



--cr_cause_of_loss_code
SELECT * FROM cr_cause_of_loss_code;
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



--cr_coverage_code
SELECT * FROM cr_coverage_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_coverage_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_coverage_code) THEN 
    INSERT INTO cr_coverage_code VALUES(1,'11','Computer Fraud Coverage','CR 0311');
    INSERT INTO cr_coverage_code VALUES(2,'12','Premises Liability for Guests Property','CR 0312');
    INSERT INTO cr_coverage_code VALUES(3,'13','Counterfeit Money, Money Orders, and Travelers Checks','CR 0313');
    INSERT INTO cr_coverage_code VALUES(4,'14','Forgery Coverage','CR 0314');
    INSERT INTO cr_coverage_code VALUES(5,'99','All Other','Does not apply');
    INSERT INTO cr_coverage_code VALUES(6,'00','Does not apply','Does not apply');
    INSERT INTO cr_coverage_code VALUES(7,'02','Premises Burglary and Robbery Coverage','CR 0302 / CR-302');
    INSERT INTO cr_coverage_code VALUES(8,'03','Burglary & Robbery Coverage -- Safe Burglary and Messenger','CR 0303 / CR-303');
    INSERT INTO cr_coverage_code VALUES(9,'04','Money and Securities Coverage','CR 0304 / CR-304');
    INSERT INTO cr_coverage_code VALUES(10,'06','Theft Coverage -- Property Other Than Money & Securities','CR 0306 / CR-306');
    INSERT INTO cr_coverage_code VALUES(11,'07','Theft Coverage -- Churches','CR 0307 / CR-307');
    INSERT INTO cr_coverage_code VALUES(12,'08','Employee Dishonesty Coverage','CR 0308 / CR-308');
END IF;
END $$;



--cr_deductible_type_code
SELECT * FROM cr_deductible_type_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_deductible_type_code) THEN 
    INSERT INTO cr_deductible_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cr_deductible_type_code VALUES(2,'1','No Deductible ($0)');
    INSERT INTO cr_deductible_type_code VALUES(3,'4','Disappearing Deductible');
    INSERT INTO cr_deductible_type_code VALUES(4,'5','Percentage Deductible');
    INSERT INTO cr_deductible_type_code VALUES(5,'6','Flat Deductible');
    INSERT INTO cr_deductible_type_code VALUES(6,'9','All Other Deductible Types');
END IF;
END $$;



--cr_deductible_amount_code
SELECT * FROM cr_deductible_amount_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_deductible_amount_code) THEN 
    INSERT INTO cr_deductible_amount_code VALUES(1,'41','None ($0)','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(2,'42','$50','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(3,'43','100','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(4,'44','101 - 199','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(5,'45','200 - 249','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(6,'46','250','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(7,'47','500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(8,'49','750','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(9,'51','1,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(10,'53','1,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(11,'54','2,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(12,'55','2,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(13,'59','3,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(14,'63','5,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(15,'65','7,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(16,'67','10,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(17,'68','12,500','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(18,'69','15,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(19,'70','20,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(20,'71','25,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(21,'75','50,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(22,'79','75,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(23,'81','100,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(24,'99','Over 100,000','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(25,'00','Does Not Apply','Flat');
    INSERT INTO cr_deductible_amount_code VALUES(26,'10','10%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(27,'15','15%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(28,'20','20%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(29,'25','25%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(30,'30','30%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(31,'35','35%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(32,'50','50%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(33,'99','Over 50%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(34,'00','Does Not Apply','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(35,'01','1%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(36,'02','2%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(37,'03','3%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(38,'04','4%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(39,'05','5%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(40,'06','6%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(41,'07','7%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(42,'08','8%','Percentage');
    INSERT INTO cr_deductible_amount_code VALUES(43,'09','9%','Percentage');
END IF;
END $$;



--cr_limited_coding_transaction_code
SELECT * FROM cr_limited_coding_transaction_code;
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



--cr_line_of_insurance_code
SELECT * FROM cr_line_of_insurance_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_line_of_insurance_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_line_of_insurance_code) THEN 
    INSERT INTO cr_line_of_insurance_code VALUES(1,'37','Crime');
END IF;
END $$;



--cr_package_identification_code
SELECT * FROM cr_package_identification_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_package_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_package_identification_code) THEN 
    INSERT INTO cr_package_identification_code VALUES(1,'0','Coverage written as a separate policy, or does not apply');
    INSERT INTO cr_package_identification_code VALUES(2,'7','Written as part of a package policy such as an SMP, CMP, or CPP');
    INSERT INTO cr_package_identification_code VALUES(3,'9','Written as an endorsement to any other policy');
END IF;
END $$;



--cr_policy_form_code
SELECT * FROM cr_policy_form_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cr_policy_form_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cr_policy_form_code) THEN 
    INSERT INTO cr_policy_form_code VALUES(1,'10','Forms E through N,Form E - Premises Burglary,Form F - Computer Fraud,Form G - Extortion,Form H - Premises Theft and Robbery Outside The Premises Form I - Lessees of Safe Deposit Box,Form J - Securities Deposited With Others,Form K - Liability for Guest's Property - Safe Deposit Box Form L - Guest's Property - Premises,Form M - Safe Depository Liability,Form N - Safe Depository Direct Loss','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(2,'11','Plans 3, 4, 5, 9, and 10,Plan 3 - Storekeepers' Broad Form,Plan 4 - Storekeepers' Burglary and Robbery Plan 5 - Office Burglary and Robbery,Plan 9 - Excess Bank Burglary and Robbery Plan 10 - Bank Excess Securities','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(3,'21','Inside the Premises - Theft of Money & Securities (ISO form codes 120-121)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(4,'22','Inside the Premises - Robbery or Safe Burglary of Other (ISO form codes 125-126)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(5,'23','Outside the Premises (ISO form codes 130-132)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(6,'24','Money Orders and Counterfeit Paper Currency (ISO form code 140)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(7,'25','Inside the Premises - Theft of Other Property (ISO form codes 148-153)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(8,'26','Inside the Premises - Robbery or Burglary of Other Property (ISO form code 154)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(9,'27','Inside the Premises - Robbery or Safe Burglary of Money & Securities (ISO form code 156)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(10,'28','Lessees of Safe Deposit Boxes (ISO form codes 162-164)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(11,'29','Securities Deposited with Others (ISO form code 165)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(12,'30','Guests Property (ISO form codes 170-171)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(13,'31','Safe Depository (ISO form codes 175-176)','ISO Subline Code 965 (Crime and Fidelity) - Burglary and Theft');
    INSERT INTO cr_policy_form_code VALUES(14,'32','Employee Theft (ISO form codes 101, 102, 104-113)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(15,'33','Employee Theft PER EMPLOYEE (ISO form codes 202, 204-206, 209-210, 212-213)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(16,'34','Forgery or Alteration (ISO form codes 115-118)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(17,'35','Computer Fraud (ISO form codes 135-136)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(18,'36','Clients Property (ISO form code 142)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(19,'37','Funds Transfer Fraud (ISO form code 144)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(20,'38','Extortion (ISO form code 146)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(21,'39','Employee Theft - Name or Position Schedule (ISO form codes 158-159)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(22,'40','Destruction of Electronic Data or Computer Programs (ISO form code 180)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(23,'41','Unauthorized Reproduction of Computer Software by Employees (ISO form code 185)','ISO Subline Code 965 (Crime and Fidelity) - Fidelity and Forgery');
    INSERT INTO cr_policy_form_code VALUES(24,'50','Kidnap/Ransom and Extortion (ISO form codes 301, 305, 310, 315, 320, 325, 330)','ISO Subline Code 965 (Crime and Fidelity)');
    INSERT INTO cr_policy_form_code VALUES(25,'60','E-Commerce (ISO form codes 860, 863, 866)','ISO Subline Code 965 (Crime and Fidelity)');
    INSERT INTO cr_policy_form_code VALUES(26,'90','Certified acts of terrorism covered (coverage not excluded)','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_policy_form_code VALUES(27,'91','Certified acts of terrorism excluded subject to Standard Fire Policy statutes when applicable, producing fire only coverage for certified acts of terrorism','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_policy_form_code VALUES(28,'94','Terrorism coverage (premium and loss) reported separately from the underlying coverage','Terrorism Options Post-TRIA');
    INSERT INTO cr_policy_form_code VALUES(29,'99','Miscellaneous','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(30,'01','Financial Institution - Premises coverage','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(31,'02','Broad Forms','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(32,'03','Mercantile Open Stock','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(33,'04','Mercantile Stock','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(34,'05','Money Orders and Counterfeit Paper Currency','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(35,'06','Form C - (excluding Plans 3, 4, 5, 9, 10) - Theft, Disappearance and Destruction','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(36,'08','Robbery and Safe Burglary -- Form D ( excluding Plans 3, 4, 5, and 9)','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(37,'09','Robbery and Safe Burglary -- Form Q (excluding Plans 4 and 5)','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(38,'92a','Non-certified acts of terrorism covered (coverage not excluded)a','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
    INSERT INTO cr_policy_form_code VALUES(39,'93a','Non-certified acts of terrorism covered, except acts of terrorism arising out of nuclear, biological or chemical events a','Terrorism Options Under the Terrorism Risk Insurance Act of 2002');
END IF;
END $$;



--
SELECT * FROM ;CREATE TABLE STATSGT2.AAIS_STAT_CR (
ID INT NOT NULL AUTO_INCREMENT,
TRANSMITTAL_ID INT NOT NULL,
CHANGE_COMMENTS VARCHAR(4000) DEFAULT NULL,
UPDATED_BY INT DEFAULT NULL,
EFF_START_DATE DATETIME(6) DEFAULT NULL,
EFF_END_DATE DATETIME(6) NOT NULL,
LAST_VALIDATED_DATE DATETIME(6) DEFAULT NULL,
REP_YR_4DIGIT DECIMAL(4,0) DEFAULT NULL,
LINE VARCHAR(2) DEFAULT NULL,
REP_MO VARCHAR(2) DEFAULT NULL,
REP_YR VARCHAR(2) DEFAULT NULL,
COMP VARCHAR(4) DEFAULT NULL,
STATE VARCHAR(2) DEFAULT NULL,
COUNTY VARCHAR(3) DEFAULT NULL,
RES016 VARCHAR(1) DEFAULT NULL,
TERRITORY VARCHAR(3) DEFAULT NULL,
TRANS VARCHAR(1) DEFAULT NULL,
PREM_AMT DECIMAL(12,2) DEFAULT NULL,
LOSS_AMT DECIMAL(12,2) DEFAULT NULL,
EXPOSURE INT DEFAULT NULL,
CLM_CNT INT DEFAULT NULL,
ASLOB VARCHAR(3) DEFAULT NULL,
PROG_CD VARCHAR(1) DEFAULT NULL,
POL_FRM VARCHAR(2) DEFAULT NULL,
COV_CODE VARCHAR(2) DEFAULT NULL,
RES044 VARCHAR(1) DEFAULT NULL,
TERRORISM VARCHAR(1) DEFAULT NULL,
PAOI VARCHAR(5) DEFAULT NULL,
DED_TYPE VARCHAR(1) DEFAULT NULL,
DED_AMT VARCHAR(2) DEFAULT NULL,
RES054 VARCHAR(1) DEFAULT NULL,
CLASS_CODE VARCHAR(5) DEFAULT NULL,
RES060 VARCHAR(8) DEFAULT NULL,
NUM_PREM VARCHAR(5) DEFAULT NULL,
ADD_LIMIT VARCHAR(3) DEFAULT NULL,
RATE_GROUP VARCHAR(2) DEFAULT NULL,
RES078 VARCHAR(5) DEFAULT NULL,
TYPE_POLICY VARCHAR(1) DEFAULT NULL,
PROT_DEVICES VARCHAR(1) DEFAULT NULL,
PACKAGE_ID VARCHAR(1) DEFAULT NULL,
RES086 VARCHAR(6) DEFAULT NULL,
POOL VARCHAR(1) DEFAULT NULL,
MOS_COV VARCHAR(2) DEFAULT NULL,
COL VARCHAR(2) DEFAULT NULL,
RES095 VARCHAR(1) DEFAULT NULL,
ACCIDENT_MON VARCHAR(2) DEFAULT NULL,
ACCIDENT_DAY VARCHAR(2) DEFAULT NULL,
ACCIDENT_YR VARCHAR(2) DEFAULT NULL,
ZIP VARCHAR(5) DEFAULT NULL,
ZIP_SUFF VARCHAR(4) DEFAULT NULL,
RES111 VARCHAR(16) DEFAULT NULL,
POLICY_NUM VARCHAR(14) DEFAULT NULL,
CLAIM_NUM VARCHAR(12) DEFAULT NULL,
CLAIM_ID VARCHAR(2) DEFAULT NULL,
CO_USE VARCHAR(10) DEFAULT NULL,
STATUS VARCHAR(20) DEFAULT NULL,
LINE_NUMBER INT DEFAULT NULL,
NOTES VARCHAR(4000) DEFAULT NULL,
VERSION INT  DEFAULT '1',
VAL_VER INT  DEFAULT '1',
PRIMARY KEY (ID),
FOREIGN KEY (TRANSMITTAL_ID) REFERENCES TRANSMITTAL(ID)
);




SELECT * FROM cr_stat_gt2_tbl;
SELECT * FROM cr_pool_code;
SELECT * FROM cr_protective_device_code;
SELECT * FROM cr_rate_group_code;
SELECT * FROM cr_terrorism_indicator_code;
SELECT * FROM cr_transaction_code;
SELECT * FROM cr_type_of_policy_code;
SELECT * FROM ;
SELECT * FROM cr_annual_statement_line_of_business_code;
SELECT * FROM cr_cause_of_loss_code;
SELECT * FROM cr_coverage_code;
SELECT * FROM cr_deductible_type_code;
SELECT * FROM cr_deductible_amount_code;
SELECT * FROM cr_limited_coding_transaction_code;
SELECT * FROM cr_line_of_insurance_code;
SELECT * FROM cr_package_identification_code;
SELECT * FROM cr_policy_form_code;
SELECT * FROM ;
