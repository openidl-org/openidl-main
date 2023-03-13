DO $$

BEGIN

CREATE TABLE IF NOT EXISTS openidl_lob_code (
    id INT,
    code varchar,
    short_name varchar,
    long_name varchar
);

IF NOT EXISTS (SELECT * FROM openidl_lob_code) THEN
   INSERT INTO openidl_lob_code VALUES(	1,'56','PA','Personal Auto');
    --INSERT INTO openidl_lob VALUES(	2,'HO','Homeowners');
    --INSERT INTO openidl_lob VALUES(	3,'IM','Inland Marine');
    --INSERT INTO openidl_lob VALUES(	4,'FP','Farm Properties');
    --INSERT INTO openidl_lob VALUES(	5,'AP','Artisans (small contractors)');
    --INSERT INTO openidl_lob VALUES(	6,'GL','General Liability');
    --INSERT INTO openidl_lob VALUES(	7,'BT','Boatowners');
    --INSERT INTO openidl_lob VALUES(	8,'GS','Glass');
    --INSERT INTO openidl_lob VALUES(	9,'DP','Dwelling Properties');
    --INSERT INTO openidl_lob VALUES(	10,'BP','Businessowners');
    --INSERT INTO openidl_lob VALUES(	11,	'CR','Crime');
    --INSERT INTO openidl_lob VALUES(	12,	'CA','Commercial Auto');
    --INSERT INTO openidl_lob VALUES(	13,	'CP','Commercial Properties');
    --INSERT INTO openidl_lob VALUES(	14,	'FO','Farmowners');
    --INSERT INTO openidl_lob VALUES(	15,	'MHO','Mobile Homeowners');
END IF;

END $$