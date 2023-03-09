CREATE TABLE pa_stat_stg(
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
REP_YR VARCHAR(1) DEFAULT NULL,
COMP VARCHAR(4) DEFAULT NULL,
STATE VARCHAR(2) DEFAULT NULL,
TERRITORY VARCHAR(3) DEFAULT NULL,
TRANS VARCHAR(1) DEFAULT NULL,
PREM_AMT DECIMAL(12,2) DEFAULT NULL,
LOSS_AMT DECIMAL(12,2) DEFAULT NULL,
PROG_CD VARCHAR(1) DEFAULT NULL,
COV_CODE VARCHAR(1) DEFAULT NULL,
SUBLINE VARCHAR(1) DEFAULT NULL,
RES030 VARCHAR(4) DEFAULT NULL,
AGE VARCHAR(1) DEFAULT NULL,
SEX_MARITAL VARCHAR(1) DEFAULT NULL,
VEHICLE_USE VARCHAR(1) DEFAULT NULL,
VEHICLE_PERF VARCHAR(1) DEFAULT NULL,
COMMERCIAL_CLASS VARCHAR(1) DEFAULT NULL,
DRIV_TRAIN_GOOD_STUDENT VARCHAR(1) DEFAULT NULL,
COMMERCIAL_USE VARCHAR(1) DEFAULT NULL,
PENALTY_POINTS VARCHAR(1) DEFAULT NULL,
LIA_LIM VARCHAR(1) DEFAULT NULL,
DED_AMT VARCHAR(1) DEFAULT NULL,
BODY_STYLE VARCHAR(2) DEFAULT NULL,
BODY_SIZE VARCHAR(1) DEFAULT NULL,
MODEL_YEAR VARCHAR(2) DEFAULT NULL,
UM_UIM_MOTORIST VARCHAR(1) DEFAULT NULL,
EXPOSURE INT DEFAULT NULL,
CLM_CNT INT DEFAULT NULL,
COL VARCHAR(1) DEFAULT NULL,
MOS_COV VARCHAR(2) DEFAULT NULL,
RES050 VARCHAR(1) DEFAULT NULL,
TERRORISM VARCHAR(1) DEFAULT NULL,
RES051 VARCHAR(1) DEFAULT NULL,
RES052 VARCHAR(4) DEFAULT NULL,
SING_MULT_CAR VARCHAR(1) DEFAULT NULL,
ACCIDENT_MON VARCHAR(2) DEFAULT NULL,
RES057 VARCHAR(3) DEFAULT NULL,
ACCIDENT_YR VARCHAR(2) DEFAULT NULL,
RES060 VARCHAR(4) DEFAULT NULL,
PACKAGE_ID VARCHAR(1) DEFAULT NULL,
POOL VARCHAR(1) DEFAULT NULL,
CLAIM_NUM VARCHAR(12) DEFAULT NULL,
POLICY_NUM VARCHAR(14) DEFAULT NULL,
CLAIM_ID VARCHAR(2) DEFAULT NULL,
RES080 VARCHAR(1) DEFAULT NULL,
ZIP VARCHAR(5) DEFAULT NULL,
ZIP_SUFF VARCHAR(4) DEFAULT NULL,
UM_UIM_STACK_IND VARCHAR(1) DEFAULT NULL,
RES091 VARCHAR(2) DEFAULT NULL,
SYMBOL VARCHAR(2) DEFAULT NULL,
PASS_RESTRAINT VARCHAR(1) DEFAULT NULL,
ANTI_LOCK VARCHAR(1) DEFAULT NULL,
ANTI_THEFT VARCHAR(2) DEFAULT NULL,
DEF_DRIVER VARCHAR(1) DEFAULT NULL,
PIP_LIMIT_DED VARCHAR(1) DEFAULT NULL,
NJ_PIP_LIMIT VARCHAR(2) DEFAULT NULL,
RES099 VARCHAR(2) DEFAULT NULL,
NJ_PIP_DED VARCHAR(1) DEFAULT NULL,
RAT_TERM_ZONE VARCHAR(3) DEFAULT NULL,
RES101 VARCHAR(3) DEFAULT NULL,
ASSIGN_RISK_RATE_CLASS VARCHAR(4) DEFAULT NULL,
ASSIGN_RISK_PTS_SUR VARCHAR(2) DEFAULT NULL,
EXP_RATING_MOD VARCHAR(3) DEFAULT NULL,
RES110 VARCHAR(3) DEFAULT NULL,
RES113 VARCHAR(1) DEFAULT NULL,
EXCEPT_A VARCHAR(2) DEFAULT NULL,
EXCEPT_B VARCHAR(2) DEFAULT NULL,
EXCEPT_C VARCHAR(2) DEFAULT NULL,
EXCEPT_D VARCHAR(2) DEFAULT NULL,
RES122 VARCHAR(15) DEFAULT NULL,
COUNTY VARCHAR(3) DEFAULT NULL,
CO_USE VARCHAR(11) DEFAULT NULL,
STATUS VARCHAR(20) DEFAULT NULL,
LINE_NUMBER INT DEFAULT NULL,
NOTES VARCHAR(4000) DEFAULT NULL,
VERSION INT  DEFAULT '1',
VAL_VER INT  DEFAULT '1',
VIN VARCHAR(17) DEFAULT NULL,
LIMIT_LOSS_CD_ID VARCHAR(1) DEFAULT NULL,
RES111 VARCHAR(2) DEFAULT NULL,
OPT_ZIP_CD_IND VARCHAR(1) DEFAULT NULL,
PRIMARY KEY (ID),
FOREIGN KEY (TRANSMITTAL_ID) REFERENCES TRANSMITTAL(ID)
);
