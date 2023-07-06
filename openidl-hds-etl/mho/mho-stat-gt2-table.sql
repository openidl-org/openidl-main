CREATE TABLE IF NOT EXISTS mho_stat_stg (
ID SERIAL,
TRANSMITTAL_ID INT,
CHANGE_COMMENTS VARCHAR(4000) DEFAULT NULL,
UPDATED_BY INT DEFAULT NULL,
EFF_START_DATE TIMESTAMP DEFAULT NULL,
EFF_END_DATE TIMESTAMP,
LAST_VALIDATED_DATE TIMESTAMP DEFAULT NULL,
REP_YR_4DIGIT DECIMAL(4,0) DEFAULT NULL,
LINE VARCHAR(2) DEFAULT NULL, -- line of insurance
REP_MO VARCHAR(2) DEFAULT NULL, -- accounting month
REP_YR VARCHAR(2) DEFAULT NULL, -- accounting year
COMP VARCHAR(4) DEFAULT NULL, -- company code
STATE VARCHAR(2) DEFAULT NULL, -- state code
COUNTY VARCHAR(3) DEFAULT NULL, -- county code
AREA VARCHAR(1) DEFAULT NULL, -- area indicator
TERRITORY VARCHAR(3) DEFAULT NULL, -- territory code
TRANS VARCHAR(1) DEFAULT NULL, -- transaction code
PREM_AMT DECIMAL(12,2) DEFAULT NULL, -- premium amount
LOSS_AMT DECIMAL(12,2) DEFAULT NULL, -- loss amount
EXPOSURE INT DEFAULT NULL, -- exposure
CLM_CNT INT DEFAULT NULL, -- claim count
ASLOB VARCHAR(3) DEFAULT NULL, -- annual statement line of business
PROG_CD VARCHAR(1) DEFAULT NULL, -- program code
POL_FRM VARCHAR(2) DEFAULT NULL, -- policy form code
RES042 VARCHAR(2) DEFAULT NULL,
LSI VARCHAR(1) DEFAULT NULL, -- loss settlement indicator code
RES045 VARCHAR(1) DEFAULT NULL,
PAOI VARCHAR(5) DEFAULT NULL, -- primary property amount of insurance
DED_TYPE VARCHAR(1) DEFAULT NULL, -- deductible type
DED_AMT VARCHAR(2) DEFAULT NULL, -- deductible amount
WIND_DED VARCHAR(1) DEFAULT NULL, -- wind/hail deductible
CLASS_CODE VARCHAR(5) DEFAULT NULL, -- class code
RES060 VARCHAR(2) DEFAULT NULL,
FIRE_PROT VARCHAR(2) DEFAULT NULL, -- fire protection code
RES064 VARCHAR(2) DEFAULT NULL,
YR_MAN VARCHAR(2) DEFAULT NULL, -- year of manufacture
LIA_LIM VARCHAR(5) DEFAULT NULL, -- liability limit
MED_PAY_LIM VARCHAR(3) DEFAULT NULL, -- medical payments limit
ELF_PROP VARCHAR(1) DEFAULT NULL, -- es liq fuel prop
ELF_LIAB VARCHAR(1) DEFAULT NULL, -- es liq fuel liab
OCCUPANCY VARCHAR(1) DEFAULT NULL, -- occupancy code
HBB_IND VARCHAR(1) DEFAULT NULL, -- hbb indicator
RES080 VARCHAR(1) DEFAULT NULL,
TIE_DOWN VARCHAR(1) DEFAULT NULL, -- tie down
RES082 VARCHAR(2) DEFAULT NULL,
ORD_LAW VARCHAR(1) DEFAULT NULL, -- ordinance or law
THEFT_DED VARCHAR(1) DEFAULT NULL, -- theft deductible amount
SEC_PAOI VARCHAR(4) DEFAULT NULL, -- secondary property amount of insurance
RES090 VARCHAR(1) DEFAULT NULL,
MOLD VARCHAR(1) DEFAULT NULL, -- mold damage coverage
POOL VARCHAR(1) DEFAULT NULL, -- pool code
MOS_COV VARCHAR(2) DEFAULT NULL, -- months covered
COL VARCHAR(2) DEFAULT NULL, -- cause of loss
RES095 VARCHAR(1) DEFAULT NULL,
ACCIDENT_MON VARCHAR(2) DEFAULT NULL, -- accident month
ACCIDENT_DAY VARCHAR(2) DEFAULT NULL, -- accident day
ACCIDENT_YR VARCHAR(2) DEFAULT NULL, -- accident year
ZIP VARCHAR(5) DEFAULT NULL, -- zip code
ZIP_SUFF VARCHAR(4) DEFAULT NULL, -- zip code suffix
RES111 VARCHAR(1) DEFAULT NULL,
ST_EXC_A VARCHAR(1) DEFAULT NULL, -- state execption code a
ST_EXC_B VARCHAR(1) DEFAULT NULL, -- state execption code b
RES114 VARCHAR(12) DEFAULT NULL,
ST_EXC VARCHAR(1) DEFAULT NULL, -- state exception code
POLICY_NUM VARCHAR(14) DEFAULT NULL, -- policy number
CLAIM_NUM VARCHAR(12) DEFAULT NULL, -- claim number
CLAIM_ID VARCHAR(2) DEFAULT NULL, -- claim id
CO_USE VARCHAR(10) DEFAULT NULL, -- company use
STATUS VARCHAR(20) DEFAULT NULL,
LINE_NUMBER INT DEFAULT NULL,
NOTES VARCHAR(4000) DEFAULT NULL,
VERSION INT  DEFAULT '1',
VAL_VER INT  DEFAULT '1',
PRIMARY KEY (ID)
);