
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




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_hull_material_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_hull_material_code) THEN 
    INSERT INTO bt_hull_material_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_hull_material_code VALUES(2,'1','Fiberglass');
    INSERT INTO bt_hull_material_code VALUES(3,'2','Wood');
    INSERT INTO bt_hull_material_code VALUES(4,'4','Aluminum');
    INSERT INTO bt_hull_material_code VALUES(5,'5','Steel');
    INSERT INTO bt_hull_material_code VALUES(6,'9','All Other');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_loss_settlement_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_loss_settlement_indicator_code) THEN 
    INSERT INTO bt_loss_settlement_indicator_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_loss_settlement_indicator_code VALUES(2,'1','Actual Cash Value');
    INSERT INTO bt_loss_settlement_indicator_code VALUES(3,'2','Replacement Cost');
    INSERT INTO bt_loss_settlement_indicator_code VALUES(4,'3','Agreed Value');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_multiple_single_owner_indicator_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_multiple_single_owner_indicator_code) THEN 
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(2,'1','Single Owner','Single Owner');
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(3,'2','Residing in Same Household','Multiple Owners');
    INSERT INTO bt_multiple_single_owner_indicator_code VALUES(4,'3','Residing in Different Households','Multiple Owners');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_named_storm_deductible_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_named_storm_deductible_code) THEN 
    INSERT INTO bt_named_storm_deductible_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO bt_named_storm_deductible_code VALUES(2,'1','1%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(3,'2','2%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(4,'3','3%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(5,'4','4%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(6,'5','5%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(7,'6','10%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(8,'7','15%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(9,'8','20%','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(10,'9','All Other','Percentage Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(11,'A','$250','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(12,'B','$500','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(13,'C','$750','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(14,'D','$1,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(15,'E','$2,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(16,'F','$2,500','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(17,'G','$5,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(18,'H','$10,000','Flat Named Storm Deductible Amounts');
    INSERT INTO bt_named_storm_deductible_code VALUES(19,'J','All Other','Flat Named Storm Deductible Amounts');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_navigational_territory_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_navigational_territory_code) THEN 
    INSERT INTO bt_navigational_territory_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO bt_navigational_territory_code VALUES(2,'1','Coastal South Atlantic and Gulf - from the North Carolina-Virginia border southward','AAIS Boatowners Manuals prior to Revision 05 08 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(3,'2','Coastal North Atlantic - from the North Carolina-Virginia border northward','AAIS Boatowners Manuals prior to Revision 05 08 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(4,'3','Great Lakes','AAIS Boatowners Manuals prior to Revision 05 08 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(5,'4','Coastal Pacific','AAIS Boatowners Manuals prior to Revision 05 08 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(6,'5','Other Inland Waters','AAIS Boatowners Manuals prior to Revision 05 08 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(7,'A','Alaska -- Coastal waters of Alaska','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(8,'B','Pacific North -- Coastal waters of the Pacific Ocean off the coasts of Washington and Oregon','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(9,'C','Pacific South -- Coastal waters of the Pacific Ocean off the coasts of California and Hawaii','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(10,'D','Inland - West -- Inland waters of Alaska, Arizona, California, Colorado, Hawaii, Idaho, Kansas, Montana, Nebraska, North Dakota, Nevada, New Mexico, Oklahoma, Oregon, South Dakota, Texas, Utah, Washington, and Wyoming','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(11,'E','Inland - Central -- Waters of Missouri, Kentucky, and Tennessee','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(12,'F','Inland - East -- Inland waters of Alabama, Arkansas, Connecticut, Delaware, District of Columbia, Florida, Georgia, Illinois, Indiana, Iowa, Louisiana, Maine, Massachusetts, Maryland, Michigan, Minnesota, Mississippi, New Hampshire, New Jersey, New York, North Carolina, Ohio, Pennsylvania, Puerto Rico, Rhode Island, South Carolina, Vermont, Virginia, West Virginia, and Wisconsin','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(13,'G','Great Lakes -- Lake Erie, Lake Huron, Lake Michigan, Lake Ontario, and Lake Superior','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(14,'H','Atlantic North -- Coastal waters of Connecticut, Delaware, Massachusetts, Maryland, Maine, New Hampshire, New Jersey, New York, and Rhode Island','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(15,'J','Atlantic South -- Coastal waters of Georgia, North Carolina, South Carolina, and Virginia','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(16,'K','Gulf West -- Coastal waters of Alabama, Louisiana, Mississippi, and Texas','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
    INSERT INTO bt_navigational_territory_code VALUES(17,'L','Florida and Puerto Rico -- Coastal waters of Florida and Puerto Rico','AAIS Boatowners Manual Revision 05 08 (or equivalent) and AAIS Yacht Manual Revision 09 10 (or equivalent)');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_operator_experience_code (
    id INT,
    code VARCHAR,
    years_of_experience VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_operator_experience_code) THEN 
    INSERT INTO bt_operator_experience_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_operator_experience_code VALUES(2,'1','0-1');
    INSERT INTO bt_operator_experience_code VALUES(3,'2','1-2');
    INSERT INTO bt_operator_experience_code VALUES(4,'3','2-3');
    INSERT INTO bt_operator_experience_code VALUES(5,'4','3-4');
    INSERT INTO bt_operator_experience_code VALUES(6,'5','4-5');
    INSERT INTO bt_operator_experience_code VALUES(7,'9','5+');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_power_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_power_code) THEN 
    INSERT INTO bt_power_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_power_code VALUES(2,'1','Inboard');
    INSERT INTO bt_power_code VALUES(3,'2','Outboard');
    INSERT INTO bt_power_code VALUES(4,'3','Inboard/Outdrive');
    INSERT INTO bt_power_code VALUES(5,'4','Jet propelled or water jet propelled (e.g., jet skis, wave runners)');
    INSERT INTO bt_power_code VALUES(6,'5','Sail with auxiliary power');
    INSERT INTO bt_power_code VALUES(7,'6','Sail without auxiliary power');
    INSERT INTO bt_power_code VALUES(8,'9','All Other');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_transaction_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_transaction_code) THEN 
    INSERT INTO bt_transaction_code VALUES(1,'1','Premium or Cancellation','Premium');
    INSERT INTO bt_transaction_code VALUES(2,'2','Paid Loss','Loss');
    INSERT INTO bt_transaction_code VALUES(3,'3','Outstanding Loss','Loss');
    INSERT INTO bt_transaction_code VALUES(4,'6','Paid Allocated Loss Adjustment Expense','Loss');
    INSERT INTO bt_transaction_code VALUES(5,'7','Outstanding Allocated Loss Adjustment Expense','Loss');
    INSERT INTO bt_transaction_code VALUES(6,'8','Limited Coding','Premium');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_type_of_hull_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_type_of_hull_code) THEN 
    INSERT INTO bt_type_of_hull_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_type_of_hull_code VALUES(2,'1','Cabin Motorboat');
    INSERT INTO bt_type_of_hull_code VALUES(3,'2','Open Motorboat');
    INSERT INTO bt_type_of_hull_code VALUES(4,'3','Sailboat');
    INSERT INTO bt_type_of_hull_code VALUES(5,'6','Canoe/Kayak/Rowboat');
    INSERT INTO bt_type_of_hull_code VALUES(6,'7','Bass Boat');
    INSERT INTO bt_type_of_hull_code VALUES(7,'8','Personal Watercraft');
    INSERT INTO bt_type_of_hull_code VALUES(8,'9','All Other');
    INSERT INTO bt_type_of_hull_code VALUES(9,'A','Houseboat');
    INSERT INTO bt_type_of_hull_code VALUES(10,'B','Pontoon');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_type_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_type_of_loss_code) THEN 
    INSERT INTO bt_type_of_loss_code VALUES(1,'1','Property Coverage - Boat/Yacht and motor or trailer');
    INSERT INTO bt_type_of_loss_code VALUES(2,'2','All Other Property (e.g. boating equipment, miscellaneous property, personal effects, etc.)Emergency');
    INSERT INTO bt_type_of_loss_code VALUES(3,'3','Service');
    INSERT INTO bt_type_of_loss_code VALUES(4,'4','Liability - Bodily Injury');
    INSERT INTO bt_type_of_loss_code VALUES(5,'5','Liability - Property Damage');
    INSERT INTO bt_type_of_loss_code VALUES(6,'6','Liability - Medical Payments');
    INSERT INTO bt_type_of_loss_code VALUES(7,'7','Uninsured Boater - Bodily Injury');
    INSERT INTO bt_type_of_loss_code VALUES(8,'8','Uninsured Boater - Property Damage');
    INSERT INTO bt_type_of_loss_code VALUES(9,'9','Uninsured Boater - Other');
    INSERT INTO bt_type_of_loss_code VALUES(10,'F','Storm Protection Coverage');
    INSERT INTO bt_type_of_loss_code VALUES(11,'A','Liability - Removal of Wrecked or Sunken Property');
    INSERT INTO bt_type_of_loss_code VALUES(12,'B','Liability - Other');
END IF;
END $$;



CREATE TABLE IF NOT EXISTS bt_stat_stg (
ID SERIAL,
TRANSMITTAL_ID INT NOT NULL,
CHANGE_COMMENTS VARCHAR(4000) DEFAULT NULL,
UPDATED_BY INT DEFAULT NULL,
EFF_START_DATE TIMESTAMP DEFAULT NULL,
EFF_END_DATE TIMESTAMP,
LAST_VALIDATED_DATE TIMESTAMP DEFAULT NULL,
REP_YR_4DIGIT DECIMAL(4,0) DEFAULT NULL,
LINE VARCHAR(2) DEFAULT NULL,
REP_MO VARCHAR(2) DEFAULT NULL,
REP_YR VARCHAR(1) DEFAULT NULL,
COMP VARCHAR(4) DEFAULT NULL,
STATE VARCHAR(2) DEFAULT NULL,
COUNTY VARCHAR(3) DEFAULT NULL,
RES015 VARCHAR(1) DEFAULT NULL,
TRANS VARCHAR(1) DEFAULT NULL,
PREM_AMT DECIMAL(12,2) DEFAULT NULL,
LOSS_AMT DECIMAL(12,2) DEFAULT NULL,
PROG_CD VARCHAR(1) DEFAULT NULL,
COV_CODE VARCHAR(1) DEFAULT NULL,
INS_LIMIT VARCHAR(4) DEFAULT NULL,
HULL_TYPE VARCHAR(1) DEFAULT NULL,
HULL_MATERIAL VARCHAR(1) DEFAULT NULL,
YR_MAN VARCHAR(2) DEFAULT NULL,
LENGTH VARCHAR(3) DEFAULT NULL,
DED_TYPE VARCHAR(1) DEFAULT NULL,
DED_AMT VARCHAR(1) DEFAULT NULL,
NAV_TERRITORY VARCHAR(1) DEFAULT NULL,
NAMED_STORM_DED VARCHAR(1) DEFAULT NULL,
EXPOSURE INT DEFAULT NULL,
CLM_CNT INT DEFAULT NULL,
MOS_COV VARCHAR(2) DEFAULT NULL,
RES049 VARCHAR(2) DEFAULT NULL,
RES051 VARCHAR(1) DEFAULT NULL,
TYPE_LOSS VARCHAR(1) DEFAULT NULL,
RES052 VARCHAR(2) DEFAULT NULL,
COL VARCHAR(2) DEFAULT NULL,
RES054 VARCHAR(2) DEFAULT NULL,
RES056 VARCHAR(2) DEFAULT NULL,
ACCIDENT_MON VARCHAR(2) DEFAULT NULL,
RES058 VARCHAR(2) DEFAULT NULL,
ACCIDENT_YR VARCHAR(2) DEFAULT NULL,
POL_EFF_MO VARCHAR(2) DEFAULT NULL,
POL_EFF_YR VARCHAR(2) DEFAULT NULL,
LAY_UP_PERIOD VARCHAR(2) DEFAULT NULL,
CLAIM_NUM VARCHAR(12) DEFAULT NULL,
POLICY_NUM VARCHAR(14) DEFAULT NULL,
CLAIM_ID VARCHAR(2) DEFAULT NULL,
SING_MULT_OWNER VARCHAR(1) DEFAULT NULL,
ZIP VARCHAR(5) DEFAULT NULL,
RES086 VARCHAR(4) DEFAULT NULL,
MED_PAY_LIMIT VARCHAR(2) DEFAULT NULL,
UNINSURED_LIM VARCHAR(4) DEFAULT NULL,
LSI VARCHAR(1) DEFAULT NULL,
OPERATOR_EXP VARCHAR(1) DEFAULT NULL,
POWER VARCHAR(1) DEFAULT NULL,
MAX_SPEED VARCHAR(2) DEFAULT NULL,
FUEL_TYPE VARCHAR(1) DEFAULT NULL,
HORSEPOWER VARCHAR(4) DEFAULT NULL,
RES106 VARCHAR(2) DEFAULT NULL,
RES108 VARCHAR(14) DEFAULT NULL,
ASLOB VARCHAR(3) DEFAULT NULL,
RES125 VARCHAR(26) DEFAULT NULL,
STATUS VARCHAR(20) DEFAULT NULL,
LINE_NUMBER INT DEFAULT NULL,
NOTES VARCHAR(4000) DEFAULT NULL,
VERSION INT  DEFAULT '1',
VAL_VER INT  DEFAULT '1',
PRIMARY KEY (ID)
);



DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_annual_statement_line_of_business_code) THEN 
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(1,'120','Earthquake');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(2,'171','Other Liability - Occurrence Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(3,'172','Other Liability - Claims Made Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(4,'173','Excess Workers Compensation');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(5,'180','Products Liability');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(6,'181','Products Liability - Occurrence Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(7,'182','Products Liability - Claims Made Only');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(8,'191','Private Passenger Auto No-Fault (Personal Injury Protection)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(9,'192','Other Private Passenger Auto Liability');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(10,'193','Commercial Auto No-Fault (Personal Injury Protection)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(11,'194','Other Commercial Auto Liability');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(12,'211','Private Passenger Auto Physical Damage');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(13,'212','Commercial Auto Physical Damage');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(14,'260','Burglary and Theft');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(15,'270','Boiler and Machinery');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(16,'010','Fire');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(17,'021','Allied Lines, including Glass');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(18,'022','Multiple Peril Crop');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(19,'030','Farmowners Multiple Peril');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(20,'040','Homeowners Multiple Peril (includes Mobile-Homeowners)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(21,'050','Commercial Multiple Peril');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(22,'051','Commercial Multiple Peril Non-Liability portion)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(23,'052','Commercial Multiple Peril (Liability portion)');
    INSERT INTO bt_annual_statement_line_of_business_code VALUES(24,'090','Inland Marine');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_cause_of_loss_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_cause_of_loss_code) THEN 
    INSERT INTO bt_cause_of_loss_code VALUES(1,'10','Glass Breakage');
    INSERT INTO bt_cause_of_loss_code VALUES(2,'11','Hail');
    INSERT INTO bt_cause_of_loss_code VALUES(3,'12','Lightning');
    INSERT INTO bt_cause_of_loss_code VALUES(4,'16','Riot & Civil Commotion');
    INSERT INTO bt_cause_of_loss_code VALUES(5,'17','Smoke');
    INSERT INTO bt_cause_of_loss_code VALUES(6,'21','Vandalism and Malicious Mischief');
    INSERT INTO bt_cause_of_loss_code VALUES(7,'24','Wind');
    INSERT INTO bt_cause_of_loss_code VALUES(8,'25','All Other Physical Damage');
    INSERT INTO bt_cause_of_loss_code VALUES(9,'29','All Liability');
    INSERT INTO bt_cause_of_loss_code VALUES(10,'50','Capsizing/Swamping');
    INSERT INTO bt_cause_of_loss_code VALUES(11,'51','Collision In Water');
    INSERT INTO bt_cause_of_loss_code VALUES(12,'52','Grounding');
    INSERT INTO bt_cause_of_loss_code VALUES(13,'53','Hauling');
    INSERT INTO bt_cause_of_loss_code VALUES(14,'54','Launching/Landing');
    INSERT INTO bt_cause_of_loss_code VALUES(15,'55','Sinking');
    INSERT INTO bt_cause_of_loss_code VALUES(16,'56','Stranding');
    INSERT INTO bt_cause_of_loss_code VALUES(17,'57','Theft Of Boat/Yacht');
    INSERT INTO bt_cause_of_loss_code VALUES(18,'58','Theft Of Equipment');
    INSERT INTO bt_cause_of_loss_code VALUES(19,'59','Theft Of Motor');
    INSERT INTO bt_cause_of_loss_code VALUES(20,'60','Theft Of Personal Property');
    INSERT INTO bt_cause_of_loss_code VALUES(21,'61','Theft Of Trailer');
    INSERT INTO bt_cause_of_loss_code VALUES(22,'01','Aircraft');
    INSERT INTO bt_cause_of_loss_code VALUES(23,'02','Breakage');
    INSERT INTO bt_cause_of_loss_code VALUES(24,'03','Collision Out Of Water');
    INSERT INTO bt_cause_of_loss_code VALUES(25,'05','Earthquake or Landslide');
    INSERT INTO bt_cause_of_loss_code VALUES(26,'06','Explosion');
    INSERT INTO bt_cause_of_loss_code VALUES(27,'07','Fire');
    INSERT INTO bt_cause_of_loss_code VALUES(28,'08','Flooding');
    INSERT INTO bt_cause_of_loss_code VALUES(29,'09','Freezing');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_coverage_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_coverage_code) THEN 
    INSERT INTO bt_coverage_code VALUES(1,'1','Physical Damage/Property Coverage with Theft','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(2,'2','Physical Damage/Property Coverage without Theft','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(3,'3','Liability with Uninsured Boater Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(4,'4','Liability without Uninsured Boater Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(5,'5','Uninsured Boater Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(6,'6','Trailer Coverage','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(7,'7','All Other Property Coverage','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(8,'8','All Other Liability Coverage','Liability Coverage');
    INSERT INTO bt_coverage_code VALUES(9,'9','Minimum Premium record subject to SECTION I, PART C, Rule 3.b','Does Not Apply');
    INSERT INTO bt_coverage_code VALUES(10,'A','Physical Damage - Collision','Property Coverage');
    INSERT INTO bt_coverage_code VALUES(11,'B','Physical Damage - Comprehensive','Property Coverage');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_deductible_amount_code (
    id INT,
    code VARCHAR,
    flat_ded_amount VARCHAR,
    split_ded_amount VARCHAR,
    percentage_deductible VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_deductible_amount_code) THEN 
    INSERT INTO bt_deductible_amount_code VALUES(1,'0','Does Not Apply','Does Not Apply','Does Not Apply');
    INSERT INTO bt_deductible_amount_code VALUES(2,'1','None','None','0%');
    INSERT INTO bt_deductible_amount_code VALUES(3,'2','$50','-------','1%');
    INSERT INTO bt_deductible_amount_code VALUES(4,'3','$100','$50 / 100','2%');
    INSERT INTO bt_deductible_amount_code VALUES(5,'4','$250','$100 / 250','3%');
    INSERT INTO bt_deductible_amount_code VALUES(6,'5','$500','$100 / 500','5%');
    INSERT INTO bt_deductible_amount_code VALUES(7,'6','$1,000','$100 / 1,000','10%');
    INSERT INTO bt_deductible_amount_code VALUES(8,'7','$101-199','-------','-------');
    INSERT INTO bt_deductible_amount_code VALUES(9,'8','$200-249','-------','-------');
    INSERT INTO bt_deductible_amount_code VALUES(10,'9','All Other','All Other','All Other');
    INSERT INTO bt_deductible_amount_code VALUES(11,'A','$2,500','$250 / 2,500','-------');
    INSERT INTO bt_deductible_amount_code VALUES(12,'B','$5,000','$250 / 5,000','-------');
    INSERT INTO bt_deductible_amount_code VALUES(13,'C','------','$500 / 1%','-------');
    INSERT INTO bt_deductible_amount_code VALUES(14,'D','------','$500 / 2%','-------');
    INSERT INTO bt_deductible_amount_code VALUES(15,'E','------','$500 / 3%','-------');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_deductible_type_code) THEN 
    INSERT INTO bt_deductible_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_deductible_type_code VALUES(2,'1','No deductible');
    INSERT INTO bt_deductible_type_code VALUES(3,'2','Flat deductible');
    INSERT INTO bt_deductible_type_code VALUES(4,'4','Percentage deductible');
    INSERT INTO bt_deductible_type_code VALUES(5,'8','All other deductible types');
    INSERT INTO bt_deductible_type_code VALUES(6,'9','Split Deductible (boating equipment / boats, motors, and additional property coverages for the Boatowners Program OR personal property and equipment / yachts, property coverage extensions, and supplemental property for the Yacht Program)');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_electronic_equipment_deductible_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_electronic_equipment_deductible_code) THEN 
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(1,'0','Does Not Apply','Does Not Apply');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(2,'1','1%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(3,'2','2%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(4,'3','3%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(5,'4','4%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(6,'5','5%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(7,'6','10%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(8,'7','15%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(9,'8','20%','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(10,'9','All Other','Percentage Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(11,'A','$250','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(12,'B','$500','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(13,'C','$750','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(14,'D','$1,000','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(15,'E','$2,000','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(16,'F','$2,500','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(17,'G','$5,000','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(18,'H','$10,000','Flat Electronic Equipment Deductible Amounts');
    INSERT INTO bt_electronic_equipment_deductible_code VALUES(19,'J','All Other','Flat Electronic Equipment Deductible Amounts');
END IF;
END $$;




DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_fuel_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_fuel_type_code) THEN 
    INSERT INTO bt_fuel_type_code VALUES(1,'0','Does Not Apply');
    INSERT INTO bt_fuel_type_code VALUES(2,'1','Gasoline');
    INSERT INTO bt_fuel_type_code VALUES(3,'2','Diesel');
    INSERT INTO bt_fuel_type_code VALUES(4,'9','All Other');
END IF;
END $$;
