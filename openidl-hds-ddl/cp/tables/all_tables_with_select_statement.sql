--state_code
SELECT * FROM state_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS state_code (
    id INT,
    abbreviation VARCHAR,
    code VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM state_code) THEN 
    INSERT INTO state_code VALUES(1,'AL','01');
    INSERT INTO state_code VALUES(2,'AZ','02');
    INSERT INTO state_code VALUES(3,'AR','03');
    INSERT INTO state_code VALUES(4,'CA','04');
    INSERT INTO state_code VALUES(5,'CO','05');
    INSERT INTO state_code VALUES(6,'CT','06');
    INSERT INTO state_code VALUES(7,'DE','07');
    INSERT INTO state_code VALUES(8,'DC','08');
    INSERT INTO state_code VALUES(9,'FL','09');
    INSERT INTO state_code VALUES(10,'GA','10');
    INSERT INTO state_code VALUES(11,'ID','11');
    INSERT INTO state_code VALUES(12,'IL','12');
    INSERT INTO state_code VALUES(13,'IN','13');
    INSERT INTO state_code VALUES(14,'IA','14');
    INSERT INTO state_code VALUES(15,'KS','15');
    INSERT INTO state_code VALUES(16,'KY','16');
    INSERT INTO state_code VALUES(17,'LA','17');
    INSERT INTO state_code VALUES(18,'ME','18');
    INSERT INTO state_code VALUES(19,'MD','19');
    INSERT INTO state_code VALUES(20,'MA','20');
    INSERT INTO state_code VALUES(21,'MI','21');
    INSERT INTO state_code VALUES(22,'MN','22');
    INSERT INTO state_code VALUES(23,'MS','23');
    INSERT INTO state_code VALUES(24,'MO','24');
    INSERT INTO state_code VALUES(25,'MT','25');
    INSERT INTO state_code VALUES(26,'NE','26');
    INSERT INTO state_code VALUES(27,'NV','27');
    INSERT INTO state_code VALUES(28,'NH','28');
    INSERT INTO state_code VALUES(29,'NJ','29');
    INSERT INTO state_code VALUES(30,'NM','30');
    INSERT INTO state_code VALUES(31,'NY','31');
    INSERT INTO state_code VALUES(32,'NC','32');
    INSERT INTO state_code VALUES(33,'ND','33');
    INSERT INTO state_code VALUES(34,'OH','34');
    INSERT INTO state_code VALUES(35,'OK','35');
    INSERT INTO state_code VALUES(36,'OR','36');
    INSERT INTO state_code VALUES(37,'PA','37');
    INSERT INTO state_code VALUES(38,'RI','38');
    INSERT INTO state_code VALUES(39,'SC','39');
    INSERT INTO state_code VALUES(40,'SD','40');
    INSERT INTO state_code VALUES(41,'TN','41');
    INSERT INTO state_code VALUES(42,'TX','42');
    INSERT INTO state_code VALUES(43,'UT','43');
    INSERT INTO state_code VALUES(44,'VT','44');
    INSERT INTO state_code VALUES(45,'VA','45');
    INSERT INTO state_code VALUES(46,'WA','46');
    INSERT INTO state_code VALUES(47,'WV','47');
    INSERT INTO state_code VALUES(48,'WI','48');
    INSERT INTO state_code VALUES(49,'WY','49');
    INSERT INTO state_code VALUES(50,'HI','52');
    INSERT INTO state_code VALUES(51,'AK','54');
    INSERT INTO state_code VALUES(52,'PR','58');
END IF;
END $$;



--cp_deductible_type_code
SELECT * FROM cp_deductible_type_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_deductible_type_code) THEN 
    INSERT INTO cp_deductible_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_deductible_type_code VALUES(2,'1','No deductible ($0)');
    INSERT INTO cp_deductible_type_code VALUES(3,'4','Disappearing deductible');
    INSERT INTO cp_deductible_type_code VALUES(4,'5','Percentage deductible on all perils');
    INSERT INTO cp_deductible_type_code VALUES(5,'6','Flat deductible');
    INSERT INTO cp_deductible_type_code VALUES(6,'7','Flat, with a higher (flat or percentage) windstorm deductible');
    INSERT INTO cp_deductible_type_code VALUES(7,'9','All other deductible types');
END IF;
END $$;



--cp_fire_protection_code
SELECT * FROM cp_fire_protection_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_fire_protection_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_fire_protection_code) THEN 
    INSERT INTO cp_fire_protection_code VALUES(1,'10','10','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(2,'15','9E - North Carolina Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(3,'19','8B - In States Where Applicable','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(4,'21','Fully Protected','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(5,'22','Partially Protected','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(6,'23','Unprotected','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(7,'40','Puerto Rico','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(8,'51','Protected 1','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(9,'52','Protected 2','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(10,'53','Protected 3','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(11,'54','Protected 4','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(12,'55','Protected 5','Simplified Fire Protection','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(13,'65','9A - Washington Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(14,'79','9S - North Carolina Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(15,'80','8A - Washington Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(16,'99','New York City - New York Only','Special Fire Protection Class Categories','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(17,'00','Does Not Apply','Does Not Apply','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(18,'01','1','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(19,'02','2','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(20,'03','3','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(21,'04','4','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(22,'05','5','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(23,'06','6','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(24,'07','7','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(25,'08','8','Fire Protection Grading System','Fire Protection');
    INSERT INTO cp_fire_protection_code VALUES(26,'09','9','Fire Protection Grading System','Fire Protection');
END IF;
END $$;



--cp_large_area_modifier_code
SELECT * FROM cp_large_area_modifier_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_large_area_modifier_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_large_area_modifier_code) THEN 
    INSERT INTO cp_large_area_modifier_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_large_area_modifier_code VALUES(2,'1','15,000 square feet or less');
    INSERT INTO cp_large_area_modifier_code VALUES(3,'2','15,001 to 25,000 square feet');
    INSERT INTO cp_large_area_modifier_code VALUES(4,'3','Greater than 25,000 square feet');
END IF;
END $$;



--cp_limited_coding_loss_transaction_code
SELECT * FROM cp_limited_coding_loss_transaction_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_limited_coding_loss_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_limited_coding_loss_transaction_code) THEN 
    INSERT INTO cp_limited_coding_loss_transaction_code VALUES(1,'Y','Loss Limited Coding (includes Paid Loss Limited Coding and Outstanding Loss Limited Coding)');
END IF;
END $$;



--cp_major_peril_code
SELECT * FROM cp_major_peril_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_major_peril_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_major_peril_code) THEN 
    INSERT INTO cp_major_peril_code VALUES(1,'20','Fire perils excluding vandalism and sprinkler leakage','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(2,'21','Fire perils including vandalism','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(3,'22','Fire perils including sprinkler leakage','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(4,'23','Fire perils including vandalism and sprinkler leakage','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(5,'25','Extended coverage excluding vandalism','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(6,'26','Extended coverage including vandalism','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(7,'28','Extended coverage, vandalism, and broad form perils','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(8,'29','Extended coverage, vandalism, and special form perils with theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(9,'30','Extended coverage, vandalism, and special form perils without theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(10,'31','Broad form perils','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(11,'32','Special form perils with theft','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(12,'33','Special form perils without theft','Not Applicable');
    INSERT INTO cp_major_peril_code VALUES(13,'34','Fire and extended coverage excluding vandalism','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(14,'35','Fire and extended coverage including vandalism','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(15,'36','Fire, extended coverage, vandalism, and broad form perils','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(16,'37','Fire, extended coverage, vandalism, and special form perils with theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(17,'38','Fire, extended coverage, vandalism, and special form perils without theft','NOT For AAIS Program Users');
    INSERT INTO cp_major_peril_code VALUES(18,'61','Earthquake coverage','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(19,'62','Water damage -- Back up of sewers, drains, or sumps','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(20,'72','Spoilage coverage','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(21,'75','Equipment breakdown ','Premium Bearing Endorsements');
    INSERT INTO cp_major_peril_code VALUES(22,'80','Manufacturers Output policy','Special Property');
    INSERT INTO cp_major_peril_code VALUES(23,'81','Commercial Output program / Capital Assets Program','Special Property');
    INSERT INTO cp_major_peril_code VALUES(24,'82','Contractors and Developers Output program','Special Property');
    INSERT INTO cp_major_peril_code VALUES(25,'83','Agricultural Output program / Agricultural Capital Assets Program','Special Property');
    INSERT INTO cp_major_peril_code VALUES(26,'87','Market segments business','Special Property');
    INSERT INTO cp_major_peril_code VALUES(27,'90','Certified acts of terrorism covered (coverage not excluded)','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(28,'91','Certified acts of terrorism excluded subject to Standard Fire Policy statutes when applicable, producing Fire Only coverage for certified acts of terrorism','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(29,'92','Non-certified acts of terrorism covered (coverage not excluded)','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(30,'93','Non-certified acts of terrorism covered, except acts of terrorism arising out of nuclear, biological or chemical events','Terrorism Coverage');
    INSERT INTO cp_major_peril_code VALUES(31,'99','All other allied lines','Terrorism Coverage');
END IF;
END $$;



--cp_package_identification_code
SELECT * FROM cp_package_identification_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_package_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_package_identification_code) THEN 
    INSERT INTO cp_package_identification_code VALUES(1,'0','Coverage written as a separate policy');
    INSERT INTO cp_package_identification_code VALUES(2,'7','Written as part of a package policy such as an SMP, CMP, or CPP');
    INSERT INTO cp_package_identification_code VALUES(3,'9','Written as an endorsement to any other policy');
END IF;
END $$;



--cp_pool_code
SELECT * FROM cp_pool_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_pool_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_pool_code) THEN 
    INSERT INTO cp_pool_code VALUES(1,'0','Not written in a pool or FAIR plan, and not a shared risk');
    INSERT INTO cp_pool_code VALUES(2,'1','State approved FAIR plan');
    INSERT INTO cp_pool_code VALUES(3,'2','Shared risk or Contributing Insurance endorsement attached');
END IF;
END $$;



--cp_program_class_code
SELECT * FROM cp_program_class_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_program_class_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_program_class_code) THEN 
    INSERT INTO cp_program_class_code VALUES(1,'1','AAIS forms and class codes','Other than Exempt Commercial Risks');
    INSERT INTO cp_program_class_code VALUES(2,'3','ISO forms and class codes','Other than Exempt Commercial Risks');
    INSERT INTO cp_program_class_code VALUES(3,'4','Independent forms, but AAIS class codes','Other than Exempt Commercial Risks');
    INSERT INTO cp_program_class_code VALUES(4,'6','Independent forms, but ISO class codes','Other than Exempt Commercial Risks');
    INSERT INTO cp_program_class_code VALUES(5,'A','AAIS forms and class codes','Exempt Commercial Risks');
    INSERT INTO cp_program_class_code VALUES(6,'C','ISO forms and class codes','Exempt Commercial Risks');
    INSERT INTO cp_program_class_code VALUES(7,'D','Independent forms, but AAIS class codes','Exempt Commercial Risks');
    INSERT INTO cp_program_class_code VALUES(8,'F','Independent forms, but ISO class codes','Exempt Commercial Risks');
END IF;
END $$;



--cp_rating_identification_code
SELECT * FROM cp_rating_identification_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_rating_identification_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_rating_identification_code) THEN 
    INSERT INTO cp_rating_identification_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_rating_identification_code VALUES(2,'1','Class rated');
    INSERT INTO cp_rating_identification_code VALUES(3,'2','Class rated on a combined/blanket basis');
    INSERT INTO cp_rating_identification_code VALUES(4,'3','Specifically or schedule rated');
END IF;
END $$;



--cp_stat_gt2_tbl
SELECT * FROM cp_stat_gt2_tbl;CREATE TABLE IF NOT EXISTS cp_stat_stg (
ID SERIAL,
TRANSMITTAL_ID INT,
CHANGE_COMMENTS VARCHAR(4000) DEFAULT NULL,
UPDATED_BY INT DEFAULT NULL,
EFF_START_DATE TIMESTAMP DEFAULT NULL,
EFF_END_DATE TIMESTAMP,
LAST_VALIDATED_DATE TIMESTAMP DEFAULT NULL,
REP_YR_4DIGIT DECIMAL(4,0) DEFAULT NULL,
LINE VARCHAR(2) DEFAULT NULL,
REP_MO VARCHAR(2) DEFAULT NULL,
REP_YR VARCHAR(2) DEFAULT NULL,
COMP VARCHAR(4) DEFAULT NULL,
STATE VARCHAR(2) DEFAULT NULL,
COUNTY VARCHAR(3) DEFAULT NULL,
AREA VARCHAR(1) DEFAULT NULL,
TERRITORY VARCHAR(3) DEFAULT NULL,
TRANS VARCHAR(1) DEFAULT NULL,
PREM_AMT DECIMAL(12,2) DEFAULT NULL,
LOSS_AMT DECIMAL(12,2) DEFAULT NULL,
EXPOSURE INT DEFAULT NULL,
CLM_CNT INT DEFAULT NULL,
ASLOB VARCHAR(3) DEFAULT NULL,
PROG_CD VARCHAR(1) DEFAULT NULL,
MAJOR_PERIL VARCHAR(2) DEFAULT NULL,
COV_CODE VARCHAR(2) DEFAULT NULL,
EXCEPTION VARCHAR(1) DEFAULT NULL,
TERRORISM VARCHAR(1) DEFAULT NULL,
PAOI VARCHAR(5) DEFAULT NULL,
DED_TYPE VARCHAR(1) DEFAULT NULL,
DED_AMT VARCHAR(2) DEFAULT NULL,
WIND_DED VARCHAR(1) DEFAULT NULL,
CLASS_CODE VARCHAR(5) DEFAULT NULL,
CONSTRUCTION VARCHAR(2) DEFAULT NULL,
FIRE_PROT VARCHAR(2) DEFAULT NULL,
RES064 VARCHAR(9) DEFAULT NULL,
THEFT_LIMIT VARCHAR(3) DEFAULT NULL,
RATE_GROUP VARCHAR(2) DEFAULT NULL,
RES078 VARCHAR(2) DEFAULT NULL,
RATING_ID VARCHAR(1) DEFAULT NULL,
LARGE_AREA_MOD VARCHAR(1) DEFAULT NULL,
RES082 VARCHAR(2) DEFAULT NULL,
SPRINKLER VARCHAR(1) DEFAULT NULL,
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
RES111 VARCHAR(14) DEFAULT NULL,
ST_EXC VARCHAR(1) DEFAULT NULL,
POLICY_NUM VARCHAR(14) DEFAULT NULL,
CLAIM_NUM VARCHAR(12) DEFAULT NULL,
CLAIM_ID VARCHAR(2) DEFAULT NULL,
CO_USE VARCHAR(10) DEFAULT NULL,
STATUS VARCHAR(20) DEFAULT NULL,
LINE_NUMBER INT DEFAULT NULL,
NOTES VARCHAR(4000) DEFAULT NULL,
VERSION INT  DEFAULT '1',
VAL_VER INT  DEFAULT '1',
LIMIT_LOSS_CD_ID VARCHAR(1) DEFAULT NULL,
RES125 VARCHAR(2) DEFAULT NULL,
PRIMARY KEY (ID)
);


--cp_sprinkler_system_code
SELECT * FROM cp_sprinkler_system_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_sprinkler_system_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_sprinkler_system_code) THEN 
    INSERT INTO cp_sprinkler_system_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_sprinkler_system_code VALUES(2,'1','Property without automatic sprinklers');
    INSERT INTO cp_sprinkler_system_code VALUES(3,'2','Property with automatic sprinklers');
END IF;
END $$;



--cp_terrorism_indicator_code
SELECT * FROM cp_terrorism_indicator_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_terrorism_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_terrorism_indicator_code) THEN 
    INSERT INTO cp_terrorism_indicator_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_terrorism_indicator_code VALUES(2,'1','Certified acts of terrorism not excluded / non-certified acts of terrorism not excluded');
    INSERT INTO cp_terrorism_indicator_code VALUES(3,'2','Certified acts of terrorism not excluded / non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded');
    INSERT INTO cp_terrorism_indicator_code VALUES(4,'3','Certified acts of terrorism not excluded / non-certified acts of terrorism excluded, subject to limitations');
    INSERT INTO cp_terrorism_indicator_code VALUES(5,'4','Certified terrorism loss excludedᵃ / non-certified acts of terrorism not excluded');
    INSERT INTO cp_terrorism_indicator_code VALUES(6,'5','Certified terrorism loss excludedᵃ / non-certified acts of terrorism arising from nuclear, biological, or chemical events excluded');
    INSERT INTO cp_terrorism_indicator_code VALUES(7,'6','Certified terrorism loss excludedᵃ / non-certified acts of terrorism excludedᵃ');
END IF;
END $$;



--cp_transaction_code
SELECT * FROM cp_transaction_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_transaction_code) THEN 
    INSERT INTO cp_transaction_code VALUES(1,'1','Premium or Cancellation','Premium');
    INSERT INTO cp_transaction_code VALUES(2,'2','Paid Loss','Loss');
    INSERT INTO cp_transaction_code VALUES(3,'3','Outstanding Loss','Loss');
    INSERT INTO cp_transaction_code VALUES(4,'6','Paid Allocated Loss Adjustment Expense','Loss');
    INSERT INTO cp_transaction_code VALUES(5,'7','Outstanding Allocated Loss Adjustment Expense','Loss');
    INSERT INTO cp_transaction_code VALUES(6,'8','Limited Coding','Premium');
    INSERT INTO cp_transaction_code VALUES(7,'9','Audit or Retrospective Premium Adjustment','Premium');
END IF;
END $$;



--cp_windstorm_or_hail_deductible_code
SELECT * FROM cp_windstorm_or_hail_deductible_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_windstorm_or_hail_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_windstorm_or_hail_deductible_code) THEN 
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(2,'1','$500','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(3,'2','$1,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(4,'3','$2,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(5,'4','$5,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(6,'6','1%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(7,'7','2%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(8,'8','5%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(9,'9','10%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(10,'N','Wind/Hail coverage exclusion - Total (Loss caused by the peril of windstorm or hail can be excluded under Coverages A, B, and C)','Does Not Apply');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(11,'M','Wind/Hail coverage exclusion - Direct Damage (Loss caused by the peril of windstorm or hail can be excluded under Coverages A and B)','Does Not Apply');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(12,'R','$250','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(13,'S','$2,500','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(14,'A','$3,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(15,'T','$4,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(16,'G','$7,500','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(17,'B','$10,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(18,'C','$25,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(19,'D','$50,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(20,'E','$75,000','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(21,'H','All Other Flat Windstorm or Hail Deductibles','Flat');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(22,'F','3%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(23,'J','4%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(24,'K','7%','Percentage');
    INSERT INTO cp_windstorm_or_hail_deductible_code VALUES(25,'P','All Other Percentage Windstorm or Hail Deductibles','Percentage');
END IF;
END $$;



--cp_annual_statement_line_of_business_code
SELECT * FROM cp_annual_statement_line_of_business_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_annual_statement_line_of_business_code) THEN 
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(1,'110','Medical Malpractice');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(2,'111','Medical Malpractice (Occurrence Only)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(3,'112','Medical Malpractice (Claims Only)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(4,'120','Earthquake');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(5,'170','Other Liability (excluding Products Liability)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(6,'171','Other Liability - Occurrence Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(7,'172','Other Liability - Claims Made Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(8,'173','Excess Workers Compensation');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(9,'180','Products Liability');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(10,'181','Products Liability - Occurrence Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(11,'182','Products Liability - Claims Made Only');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(12,'191','Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(13,'192','Other Private Passenger Auto Liability');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(14,'193','Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(15,'194','Other Commercial Auto Liability');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(16,'211','Private Passenger Auto Physical Damage');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(17,'212','Commercial Auto Physical Damage');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(18,'260','Burglary and Theft');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(19,'270','Boiler and Machinery');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(20,'010','Fire');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(21,'021','Allied Lines, including Glass');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(22,'022','Multiple Peril Crop');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(23,'030','Farmowners Multiple Peril');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(24,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(25,'050','Commercial Multiple Peril');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(26,'051','Commercial Multiple Peril (Non-Liability portion)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(27,'052','Commercial Multiple Peril (Liability portion)');
    INSERT INTO cp_annual_statement_line_of_business_code VALUES(28,'090','Inland Marine');
END IF;
END $$;



--cp_area_indicator_code
SELECT * FROM cp_area_indicator_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_area_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_area_indicator_code) THEN 
    INSERT INTO cp_area_indicator_code VALUES(1,'0','Does Not Apply');
    INSERT INTO cp_area_indicator_code VALUES(2,'1','Beach area (Specific Atlantic and Gulf states only)');
    INSERT INTO cp_area_indicator_code VALUES(3,'2','Seacoast area (Specific Atlantic and Gulf states only)');
    INSERT INTO cp_area_indicator_code VALUES(4,'3','Designated brush area (California only)');
END IF;
END $$;



--cp_cause_of_loss_code
SELECT * FROM cp_cause_of_loss_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_cause_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_cause_of_loss_code) THEN 
    INSERT INTO cp_cause_of_loss_code VALUES(1,'10','Glass breakage');
    INSERT INTO cp_cause_of_loss_code VALUES(2,'11','Hail');
    INSERT INTO cp_cause_of_loss_code VALUES(3,'12','Lightning');
    INSERT INTO cp_cause_of_loss_code VALUES(4,'16','Riot and civil commotion');
    INSERT INTO cp_cause_of_loss_code VALUES(5,'17','Smoke - Not from a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(6,'18','Theft - From auto');
    INSERT INTO cp_cause_of_loss_code VALUES(7,'19','Theft - On premises');
    INSERT INTO cp_cause_of_loss_code VALUES(8,'20','Theft - Off premises');
    INSERT INTO cp_cause_of_loss_code VALUES(9,'21','Vandalism');
    INSERT INTO cp_cause_of_loss_code VALUES(10,'22','Vehicles');
    INSERT INTO cp_cause_of_loss_code VALUES(11,'23','Sewer back up / Water damage');
    INSERT INTO cp_cause_of_loss_code VALUES(12,'24','Windstorm');
    INSERT INTO cp_cause_of_loss_code VALUES(13,'25','All other physical damage');
    INSERT INTO cp_cause_of_loss_code VALUES(14,'32','Collapse, other than sinkhole');
    INSERT INTO cp_cause_of_loss_code VALUES(15,'33','Fire - From a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(16,'34','Smoke - From a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(17,'37','Sinkhole collapse');
    INSERT INTO cp_cause_of_loss_code VALUES(18,'38','Volcanic action');
    INSERT INTO cp_cause_of_loss_code VALUES(19,'40','Power surge, including brownouts and blackouts');
    INSERT INTO cp_cause_of_loss_code VALUES(20,'41','Weight of ice, snow, or sleet');
    INSERT INTO cp_cause_of_loss_code VALUES(21,'42','Electrical breakdown');
    INSERT INTO cp_cause_of_loss_code VALUES(22,'43','Heating spontaneous');
    INSERT INTO cp_cause_of_loss_code VALUES(23,'44','Mold (property related)');
    INSERT INTO cp_cause_of_loss_code VALUES(24,'76','Sprinkler leakage');
    INSERT INTO cp_cause_of_loss_code VALUES(25,'77','Ice Dam');
    INSERT INTO cp_cause_of_loss_code VALUES(26,'01','Aircraft');
    INSERT INTO cp_cause_of_loss_code VALUES(27,'02','Breakage');
    INSERT INTO cp_cause_of_loss_code VALUES(28,'03','Collision, incl. upset/overturn');
    INSERT INTO cp_cause_of_loss_code VALUES(29,'04','Credit card');
    INSERT INTO cp_cause_of_loss_code VALUES(30,'05','Earthquake');
    INSERT INTO cp_cause_of_loss_code VALUES(31,'06','Explosion');
    INSERT INTO cp_cause_of_loss_code VALUES(32,'07','Fire - Not from a woodburning stove');
    INSERT INTO cp_cause_of_loss_code VALUES(33,'08','Flood');
    INSERT INTO cp_cause_of_loss_code VALUES(34,'09','Freezing');
END IF;
END $$;



--cp_class_code
SELECT * FROM cp_class_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_class_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_class_code) THEN 
    INSERT INTO cp_class_code VALUES(1,'10010','Agricultural chemicals, mixing and storage');
    INSERT INTO cp_class_code VALUES(2,'10020','Agricultural machinery, dealers');
    INSERT INTO cp_class_code VALUES(3,'10030','Alcohol, manufacture, storage and distribution');
    INSERT INTO cp_class_code VALUES(4,'10040','Alkaline and saline products');
    INSERT INTO cp_class_code VALUES(5,'10050','Animal products, including glue and gelatin');
    INSERT INTO cp_class_code VALUES(6,'10060','Auction barn');
    INSERT INTO cp_class_code VALUES(7,'10070','Baked products');
    INSERT INTO cp_class_code VALUES(8,'10080','Beans, edible; storage and processing');
    INSERT INTO cp_class_code VALUES(9,'10090','Beer');
    INSERT INTO cp_class_code VALUES(10,'10100','Beverages, NOC');
    INSERT INTO cp_class_code VALUES(11,'10110','Cereal mill');
    INSERT INTO cp_class_code VALUES(12,'10120','Cereal products storage');
    INSERT INTO cp_class_code VALUES(13,'10130','Chemical colors and finishes, NOC');
    INSERT INTO cp_class_code VALUES(14,'10140','Chemical, agricultural; mixing, storage and distribution');
    INSERT INTO cp_class_code VALUES(15,'10150','Chicle and chicle products');
    INSERT INTO cp_class_code VALUES(16,'10160','Chocolate products');
    INSERT INTO cp_class_code VALUES(17,'10170','Cloth products');
    INSERT INTO cp_class_code VALUES(18,'10180','Cocoa products');
    INSERT INTO cp_class_code VALUES(19,'10190','Coffee');
    INSERT INTO cp_class_code VALUES(20,'10200','Cold storage');
    INSERT INTO cp_class_code VALUES(21,'10210','Condiments');
    INSERT INTO cp_class_code VALUES(22,'10220','Confectionery products, NOC');
    INSERT INTO cp_class_code VALUES(23,'10230','Corn mill');
    INSERT INTO cp_class_code VALUES(24,'10240','Cotton products');
    INSERT INTO cp_class_code VALUES(25,'10250','Cotton Ginning');
    INSERT INTO cp_class_code VALUES(26,'10260','Cotton warehouse, baled');
    INSERT INTO cp_class_code VALUES(27,'10270','Crackers');
    INSERT INTO cp_class_code VALUES(28,'10280','Dairy products (cream, cheese, ice cream, butter)');
    INSERT INTO cp_class_code VALUES(29,'10290','Dehydrating plants');
    INSERT INTO cp_class_code VALUES(30,'10300','Detergents');
    INSERT INTO cp_class_code VALUES(31,'10310','Dyestuffs');
    INSERT INTO cp_class_code VALUES(32,'10320','Egg processing');
    INSERT INTO cp_class_code VALUES(33,'10330','Farm supplies, retail store');
    INSERT INTO cp_class_code VALUES(34,'10340','Farming (dairy, grain, orchards, and other crops)');
    INSERT INTO cp_class_code VALUES(35,'10350','Feather processing');
    INSERT INTO cp_class_code VALUES(36,'10360','Feed lot');
    INSERT INTO cp_class_code VALUES(37,'10370','Feed mill');
    INSERT INTO cp_class_code VALUES(38,'10380','Feed warehouse');
    INSERT INTO cp_class_code VALUES(39,'10390','Fertilizer, animal');
    INSERT INTO cp_class_code VALUES(40,'10400','Fertilizer, blending and storage and distributing');
    INSERT INTO cp_class_code VALUES(41,'10410','Fertilizer, mineral');
    INSERT INTO cp_class_code VALUES(42,'10420','Flour mill');
    INSERT INTO cp_class_code VALUES(43,'10430','Flour storage');
    INSERT INTO cp_class_code VALUES(44,'10440','Foods (processed, preserved, canned and frozen)');
    INSERT INTO cp_class_code VALUES(45,'10450','Fruits, storage and processing');
    INSERT INTO cp_class_code VALUES(46,'10460','Fuel distributing (bulk)');
    INSERT INTO cp_class_code VALUES(47,'10470','Gelatins');
    INSERT INTO cp_class_code VALUES(48,'10480','Glucose');
    INSERT INTO cp_class_code VALUES(49,'10490','Glycerin');
    INSERT INTO cp_class_code VALUES(50,'10500','Grain elevator');
    INSERT INTO cp_class_code VALUES(51,'10510','Grain, storage and processing');
    INSERT INTO cp_class_code VALUES(52,'10520','Grain warehouse');
    INSERT INTO cp_class_code VALUES(53,'10530','Hatchery, fish');
    INSERT INTO cp_class_code VALUES(54,'10540','Hatchery, poultry');
    INSERT INTO cp_class_code VALUES(55,'10550','Hay storage');
    INSERT INTO cp_class_code VALUES(56,'10560','Liquid protein plant');
    INSERT INTO cp_class_code VALUES(57,'10570','Livestock auction');
    INSERT INTO cp_class_code VALUES(58,'10580','Livestock buildings');
    INSERT INTO cp_class_code VALUES(59,'10590','Livestock feed');
    INSERT INTO cp_class_code VALUES(60,'10600','L P G Storage');
    INSERT INTO cp_class_code VALUES(61,'10610','Macaroni');
    INSERT INTO cp_class_code VALUES(62,'10620','Malt products');
    INSERT INTO cp_class_code VALUES(63,'10630','Meat products, including frozen meats');
    INSERT INTO cp_class_code VALUES(64,'10640','Milk, condensed or powdered');
    INSERT INTO cp_class_code VALUES(65,'10650','Milling - corn, rice, feed and cereal');
    INSERT INTO cp_class_code VALUES(66,'10660','Nursery, plant');
    INSERT INTO cp_class_code VALUES(67,'10670','Nut storage and processing');
    INSERT INTO cp_class_code VALUES(68,'10680','Oils extraction compression');
    INSERT INTO cp_class_code VALUES(69,'10690','Oil extraction, solvent');
    INSERT INTO cp_class_code VALUES(70,'10700','Oil, petroleum (check NFPA)');
    INSERT INTO cp_class_code VALUES(71,'10710','Oil, vegetable');
    INSERT INTO cp_class_code VALUES(72,'10720','Pesticide mixing and storage');
    INSERT INTO cp_class_code VALUES(73,'10730','Poultry buildings');
    INSERT INTO cp_class_code VALUES(74,'10740','Poultry processing');
    INSERT INTO cp_class_code VALUES(75,'10750','Rendering');
    INSERT INTO cp_class_code VALUES(76,'10760','Rice mill');
    INSERT INTO cp_class_code VALUES(77,'10770','Sale barn');
    INSERT INTO cp_class_code VALUES(78,'10780','Seafood products including fish');
    INSERT INTO cp_class_code VALUES(79,'10790','Seed storage and processing (high damagability)');
    INSERT INTO cp_class_code VALUES(80,'10800','Slaughtering products');
    INSERT INTO cp_class_code VALUES(81,'10810','Soap');
    INSERT INTO cp_class_code VALUES(82,'10820','Sugar refining products');
    INSERT INTO cp_class_code VALUES(83,'10830','Tea');
    INSERT INTO cp_class_code VALUES(84,'10840','Tobacco, auction/storage warehouse');
    INSERT INTO cp_class_code VALUES(85,'10850','Tobacco in hogshead');
    INSERT INTO cp_class_code VALUES(86,'10860','Tobacco, leaf');
    INSERT INTO cp_class_code VALUES(87,'10870','Tobacco products, manufactured');
    INSERT INTO cp_class_code VALUES(88,'10880','Vegetables, storage, processing, and distributing');
    INSERT INTO cp_class_code VALUES(89,'10890','Wine products');
END IF;
END $$;



--cp_construction_code
SELECT * FROM cp_construction_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_construction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_construction_code) THEN 
    INSERT INTO cp_construction_code VALUES(1,'11','Wind resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(2,'12','Semi-wind resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(3,'13','Heavy timber joisted masonry','Joisted Masonry Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(4,'14','Modified fire resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(5,'60','Earthquake Resistive Buildings - Class 6','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(6,'70','Special Structures - Class 7','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(7,'99','All other construction types','Miscellaneous Building Types','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(8,'00','Does Not Apply','Does Not Apply','Does Not Apply');
    INSERT INTO cp_construction_code VALUES(9,'01','Frame','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(10,'05','Aluminum, plastic, or steel siding over frame','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(11,'06','Stucco','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(12,'02','Veneer (Brick, stone, or masonry)','Frame Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(13,'03','Joisted masonry','Joisted Masonry Buildings','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(14,'04','Fire resistive','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(15,'08','Non-combustible (Exposed metal construction)','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(16,'09','Masonry non-combustible (Non-combustible construction with masonry walls)','Buildings of Superior Construction','Other Than Earthquake Records');
    INSERT INTO cp_construction_code VALUES(17,'1C','Wood Frame Buildings - Class 1C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(18,'1D','Wood Frame Buildings - Class 1D','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(19,'2A','All Metal Buildings - Class 2A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(20,'2B','All Metal Buildings - Class 2B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(21,'3A','Steel Frame Buildings - Class 3A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(22,'3B','Steel Frame Buildings - Class 3B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(23,'3C','Steel Frame Buildings - Class 3C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(24,'4A','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(25,'4B','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(26,'4C','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(27,'4D','Reinforced Concrete, Combined Reinforced Concrete, and Structural Steel Buildings - Class 4D','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(28,'5A','Concrete, Brick, or Block Building - Class 5A','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(29,'5Z','Concrete, Brick, or Block Building - Class 5AA','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(30,'5B','Concrete, Brick, or Block Building - Class 5B','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(31,'5C','Concrete, Brick, or Block Building - Class 5C','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
    INSERT INTO cp_construction_code VALUES(32,'5D','Concrete, Brick, or Block Building - Class 5D','Miscellaneous Building Types','Earthquake Records Only (Major Peril Code 61)');
END IF;
END $$;



--cp_coverage_code
SELECT * FROM cp_coverage_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_coverage_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_coverage_code) THEN 
    INSERT INTO cp_coverage_code VALUES(1,'11','Building');
    INSERT INTO cp_coverage_code VALUES(2,'12','Personal Property');
    INSERT INTO cp_coverage_code VALUES(3,'13','Building and Personal Property Combined');
    INSERT INTO cp_coverage_code VALUES(4,'35','Fire Peril - Contents Susceptibility Group A - Low');
    INSERT INTO cp_coverage_code VALUES(5,'36','Fire Peril - Contents Susceptibility Group B - High');
    INSERT INTO cp_coverage_code VALUES(6,'37','Fire Peril - Contents Susceptibility Group C - Average');
    INSERT INTO cp_coverage_code VALUES(7,'40','Time Element - All Other');
    INSERT INTO cp_coverage_code VALUES(8,'41','Time Element - Income coverage (earnings and extra expense combined)');
    INSERT INTO cp_coverage_code VALUES(9,'43','Time Element - Extra expense');
    INSERT INTO cp_coverage_code VALUES(10,'44','Time Element - Income coverage (a.k.a. business income with extra expense) options: Earnings including rents and extra expense');
    INSERT INTO cp_coverage_code VALUES(11,'45','Time Element - Income coverage (a.k.a. business income with extra expense) options: Earnings other than rents and extra expense');
    INSERT INTO cp_coverage_code VALUES(12,'46','Time Element - Income coverage (a.k.a. business income with extra expense) options: Rents and extra expense');
    INSERT INTO cp_coverage_code VALUES(13,'47','Time Element - Earnings coverage (a.k.a. business income without extra expense) options: Earnings including rents');
    INSERT INTO cp_coverage_code VALUES(14,'48','Time Element - Earnings coverage (a.k.a. business income without extra expense) options: Earnings other than rents');
    INSERT INTO cp_coverage_code VALUES(15,'49','Time Element - Earnings coverage (a.k.a. business income without extra expense) options: Rents only');
    INSERT INTO cp_coverage_code VALUES(16,'70','Stock');
    INSERT INTO cp_coverage_code VALUES(17,'71','Computers');
    INSERT INTO cp_coverage_code VALUES(18,'72','Mobile Equipment');
    INSERT INTO cp_coverage_code VALUES(19,'73','Hay, Straw, and Fodder Coverage');
    INSERT INTO cp_coverage_code VALUES(20,'74','Livestock Coverage');
    INSERT INTO cp_coverage_code VALUES(21,'75','Poultry Coverage');
    INSERT INTO cp_coverage_code VALUES(22,'99','All Other');
    INSERT INTO cp_coverage_code VALUES(23,'00','Does Not Apply');
END IF;
END $$;



--cp_deductible_amount_code
SELECT * FROM cp_deductible_amount_code;
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS cp_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM cp_deductible_amount_code) THEN 
    INSERT INTO cp_deductible_amount_code VALUES(1,'10','10%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(2,'15','15%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(3,'20','20%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(4,'25','25%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(5,'30','30%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(6,'35','35%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(7,'41','None ($0)','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(8,'42','$50','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(9,'43','$100','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(10,'44','$101 - $199','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(11,'45','$200 - $249','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(12,'46','$250','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(13,'47','$500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(14,'49','$750','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(15,'51','$1,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(16,'53','$1,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(17,'55','$2,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(18,'59','$3,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(19,'63','$5,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(20,'65','$7,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(21,'67','$10,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(22,'68','$12,500','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(23,'69','$15,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(24,'70','$20,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(25,'71','$25,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(26,'75','$50,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(27,'79','$75,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(28,'81','$100,000','Flat');
    INSERT INTO cp_deductible_amount_code VALUES(29,'99','Over $100,000 / Over 35%','Flat and Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(30,'00','Does Not Apply','Does Not Apply');
    INSERT INTO cp_deductible_amount_code VALUES(31,'01','1%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(32,'02','2%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(33,'03','3%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(34,'04','4%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(35,'05','5%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(36,'06','6%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(37,'07','7%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(38,'08','8%','Percentage');
    INSERT INTO cp_deductible_amount_code VALUES(39,'09','9%','Percentage');
END IF;
END $$;





SELECT * FROM state_code;
SELECT * FROM cp_deductible_type_code;
SELECT * FROM cp_fire_protection_code;
SELECT * FROM cp_large_area_modifier_code;
SELECT * FROM cp_limited_coding_loss_transaction_code;
SELECT * FROM cp_major_peril_code;
SELECT * FROM cp_package_identification_code;
SELECT * FROM cp_pool_code;
SELECT * FROM cp_program_class_code;
SELECT * FROM cp_rating_identification_code;
SELECT * FROM cp_stat_gt2_tbl;
SELECT * FROM cp_sprinkler_system_code;
SELECT * FROM cp_terrorism_indicator_code;
SELECT * FROM cp_transaction_code;
SELECT * FROM cp_windstorm_or_hail_deductible_code;
SELECT * FROM cp_annual_statement_line_of_business_code;
SELECT * FROM cp_area_indicator_code;
SELECT * FROM cp_cause_of_loss_code;
SELECT * FROM cp_class_code;
SELECT * FROM cp_construction_code;
SELECT * FROM cp_coverage_code;
SELECT * FROM cp_deductible_amount_code;
