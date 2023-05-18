CREATE TABLE STATSGT2.AAIS_STAT_IM (
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
PREM_AMT DECIMAL(15,2) DEFAULT NULL,
LOSS_AMT DECIMAL(15,2) DEFAULT NULL,
EXPOSURE INT DEFAULT NULL,
CLM_CNT INT DEFAULT NULL,
ASLOB VARCHAR(3) DEFAULT NULL,
PROG_CD VARCHAR(1) DEFAULT NULL,
POL_FRM VARCHAR(2) DEFAULT NULL,
RES042 VARCHAR(3) DEFAULT NULL,
TERRORISM VARCHAR(1) DEFAULT NULL,
PAOI VARCHAR(5) DEFAULT NULL,
DED_TYPE VARCHAR(1) DEFAULT NULL,
DED_AMT VARCHAR(2) DEFAULT NULL,
RES054 VARCHAR(1) DEFAULT NULL,
CLASS_CODE VARCHAR(3) DEFAULT NULL,
RES058 VARCHAR(2) DEFAULT NULL,
CONSTRUCTION VARCHAR(2) DEFAULT NULL,
FIRE_PROT VARCHAR(2) DEFAULT NULL,
RES064 VARCHAR(12) DEFAULT NULL,
COMMODITY_CLASS VARCHAR(2) DEFAULT NULL,
COM_CLS_INDEX VARCHAR(1) DEFAULT NULL,
RES079 VARCHAR(1) DEFAULT NULL,
RADIUS_OP VARCHAR(1) DEFAULT NULL,
RES081 VARCHAR(1) DEFAULT NULL,
PREM_BASE VARCHAR(1) DEFAULT NULL,
TYPE_POLICY VARCHAR(1) DEFAULT NULL,
RES084 VARCHAR(1) DEFAULT NULL,
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
CLAIM_NUM VARCHAR(12) DEFAULT NULL,
POLICY_NUM VARCHAR(14) DEFAULT NULL,
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