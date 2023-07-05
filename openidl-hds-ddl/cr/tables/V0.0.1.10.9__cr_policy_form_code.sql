
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
    INSERT INTO cr_policy_form_code VALUES(1,'10','Forms E through N,Form E - Premises Burglary,Form F - Computer Fraud,Form G - Extortion,Form H - Premises Theft and Robbery Outside The Premises Form I - Lessees of Safe Deposit Box,Form J - Securities Deposited With Others,Form K - Liability for Guests Property - Safe Deposit Box Form L - Guests Property - Premises,Form M - Safe Depository Liability,Form N - Safe Depository Direct Loss','ISO Subline Code 960 (Burglary and Theft)');
    INSERT INTO cr_policy_form_code VALUES(2,'11','Plans 3, 4, 5, 9, and 10,Plan 3 - Storekeepers Broad Form,Plan 4 - Storekeepers Burglary and Robbery Plan 5 - Office Burglary and Robbery,Plan 9 - Excess Bank Burglary and Robbery Plan 10 - Bank Excess Securities','ISO Subline Code 960 (Burglary and Theft)');
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
