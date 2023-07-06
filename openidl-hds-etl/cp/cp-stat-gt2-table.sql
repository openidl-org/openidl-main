CREATE TABLE IF NOT EXISTS cp_stat_stg (
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
EXCEPTION VARCHAR(1) DEFAULT NULL, -- what is this?
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