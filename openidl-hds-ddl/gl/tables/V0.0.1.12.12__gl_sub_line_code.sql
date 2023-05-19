
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS gl_sub_line_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM gl_sub_line_code) THEN 
    INSERT INTO gl_sub_line_code VALUES(1,'10','Druggists liability');
    INSERT INTO gl_sub_line_code VALUES(2,'11','Personal liability, including farm personal liability coverage');
    INSERT INTO gl_sub_line_code VALUES(3,'12','Storekeepers liability');
    INSERT INTO gl_sub_line_code VALUES(4,'13','Lawyers liability');
    INSERT INTO gl_sub_line_code VALUES(5,'14','Liquor law liability');
    INSERT INTO gl_sub_line_code VALUES(6,'15','Medical professional liability');
    INSERT INTO gl_sub_line_code VALUES(7,'17','Pollution liability');
    INSERT INTO gl_sub_line_code VALUES(8,'18','Premises/Operations liability (ISO)');
    INSERT INTO gl_sub_line_code VALUES(9,'19','Umbrella/Excess liability');
    INSERT INTO gl_sub_line_code VALUES(10,'20','Municipality');
    INSERT INTO gl_sub_line_code VALUES(11,'21','Composite large A-rated risks');
    INSERT INTO gl_sub_line_code VALUES(12,'22','Composite loss rated risks');
    INSERT INTO gl_sub_line_code VALUES(13,'23','Composite rated risks (All other)');
    INSERT INTO gl_sub_line_code VALUES(14,'50','All other');
    INSERT INTO gl_sub_line_code VALUES(15,'90','Certified Acts of Terrorism Covered');
    INSERT INTO gl_sub_line_code VALUES(16,'91','Certified acts of terrorism excluded subject to Standard Fire Policy statutes when applicable, producing Fire-Only coverage for certified acts of terrorism');
    INSERT INTO gl_sub_line_code VALUES(17,'92','Non-Certified Acts of Terrorism Covered');
    INSERT INTO gl_sub_line_code VALUES(18,'93','Non-certified acts of terrorism covered, except acts of terrorism arising out of nuclear, biological or chemical events');
    INSERT INTO gl_sub_line_code VALUES(19,'99','Minimum Premium record subject to SECTION 1, PART C, Rule 3.b');
    INSERT INTO gl_sub_line_code VALUES(20,'01','Contractual liability');
    INSERT INTO gl_sub_line_code VALUES(21,'08','Employers liability');
    INSERT INTO gl_sub_line_code VALUES(22,'07','Manufacturers and contractors liability / AAIS premises and operations');
    INSERT INTO gl_sub_line_code VALUES(23,'05','Owners or contractors protective liability');
    INSERT INTO gl_sub_line_code VALUES(24,'04','Owners, landlords, and tenants liability / AAIS Premises');
    INSERT INTO gl_sub_line_code VALUES(25,'06','Product and completed work/operations liability');
    INSERT INTO gl_sub_line_code VALUES(26,'03','Professional liability - not medical');
END IF;
END $$;
