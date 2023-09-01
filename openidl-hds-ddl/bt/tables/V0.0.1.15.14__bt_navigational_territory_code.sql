
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
