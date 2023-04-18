
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_class_code (
    id VARCHAR,
    name, type, category
);

IF NOT EXISTS (SELECT * FROM ho_class_code) THEN INSERT INTO ho_class_code (name, type, category) VALUES ('10010', 'Baskets', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10020', 'Candles', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10030', 'Ceramics', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10040', 'Decorative clothing', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10050', 'Dolls', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10060', 'Fabrics', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10070', 'Flower Arrangements', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10080', 'Glass', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10085', 'Hobby stores', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10090', 'Jewelry', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10100', 'Metalwork', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10110', 'Needlework', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10120', 'Quilts', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10130', 'Sculptures', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10140', 'Wall hangings', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10150', 'Wind chimes', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10160', 'Wood products', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10170', 'Wreaths', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('10999', 'Crafts - Not otherwise classified', 'Crafts', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20010', 'Baked Goods', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20020', 'Beverages (i.e. coffee and tea', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20030', 'Candy, nuts, or confections', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20040', 'Canning (i.e. jellies and jams', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20050', 'Deli Foods', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20060', 'Fruit and Vegetable Stand (no 'pick your own' operations)', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20070', 'Gourmet Foods', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20080', 'Picnic Baskets', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20090', 'Smoked and Dressed Meats, Poultry, and Fish', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20100', 'Wine and Spirits', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('20999', 'Foods - Not Otherwise Classified', 'Foods', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30010', 'Accounting', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30020', 'Billing', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30030', 'Bookkeeping', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30040', 'Business consulting', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30050', 'Calligraphy', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30060', 'Career Consulting', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30070', 'Computer Consulting', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30080', 'Counseling', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30090', 'Desktop Publishing', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30095', 'Employment Agencies', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30100', 'Financial Planning', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30110', 'Freelance Writing', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30120', 'Graphic Art', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30130', 'Insurance Agent', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30140', 'Mailing and Addressing', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30150', 'Public Relations', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30160', 'Real Estate Agent', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30170', 'Resume Writing', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30180', 'Telephone Answering', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30190', 'Tutoring', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30200', 'Word Processing', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('30999', 'Offices - Not Otherwise Classified', 'Offices', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40001', 'Trust/Trustee only (beneficiary and grantor not named in the endorsement)', 'No Beneficiary or Grantor', 'Owners and Condo Beneficiary');
INSERT INTO ho_class_code (name, type, category) VALUES ('40002', 'Beneficiary OR grantor named in the endorsement; AND Trustee resides on the residence premises', 'Beneficiary OR Grantor', 'Owners and Condo Beneficiary');
INSERT INTO ho_class_code (name, type, category) VALUES ('40003', 'Beneficiary OR grantor named in the endorsement; AND Trustee DOES NOT reside on the residence premises', 'Beneficiary OR Grantor', 'Owners and Condo Beneficiary');
INSERT INTO ho_class_code (name, type, category) VALUES ('40004', 'Beneficiary AND grantor named in the endorsement; AND Trustee resides on the residence premises', 'Beneficiary AND Grantor', 'Owners and Condo Beneficiary');
INSERT INTO ho_class_code (name, type, category) VALUES ('40005', 'Beneficiary AND grantor named in the endorsement; AND Trustee DOES NOT reside on the residence premises', 'Beneficiary AND Grantor', 'Owners and Condo Beneficiary');
INSERT INTO ho_class_code (name, type, category) VALUES ('40010', 'Antiques', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40020', 'Art Supplies', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40030', 'Art Work', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40034', 'Barber / Beauty Supply Stores', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40037', 'Bicycle Stores', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40040', 'Books, Magazines, and Videos', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40045', 'Camera Stores', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40050', 'Candles', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40060', 'Clothing', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40070', 'Coins and Stamps', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40080', 'Collectibles', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40090', 'Cosmetics', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40100', 'Costume Jewelry', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40110', 'Decorative Housewares', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40120', 'Gifts', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40130', 'Household and Kitchen Products', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40140', 'Personal Care Products', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40150', 'Plants and Flowers', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40160', 'Stationary and Paper Products', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40170', 'Tackle and Bait', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40180', 'Toys', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40190', 'Vitamins and Health Care Products', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('40851', 'Out-servant domestic employee', 'N/A', 'Domestic Employee');
INSERT INTO ho_class_code (name, type, category) VALUES ('40852', 'In-servant domestic employee', 'N/A', 'Domestic Employee');
INSERT INTO ho_class_code (name, type, category) VALUES ('40999', 'Retail - Not Otherwise Classified', 'Retail', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50010', 'Aesthetician', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50015', 'Appliance Repair', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50020', 'Barber', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50030', 'Beautician', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50040', 'Bicycle Repair', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50050', 'Camera Repair', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50060', 'Carpet and Upholstery Cleaning', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50070', 'Clock, Jewelry, or Watch Repair', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50080', 'Computer Repair', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50085', 'Copying / Duplicating', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50090', 'Dog or Cat Boarding, Breeding, or Training', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50100', 'Dressmaker, Seamstress, or Tailor', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50110', 'Flower Arranging', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50120', 'Furniture Upholstering', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50125', 'Furniture / Woodwork Stripping', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50130', 'Gift Delivery Service', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50140', 'Hair Stylist', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50150', 'House Cleaning', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50160', 'House Sitting', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50170', 'Instruction (music, etiquette, etc.)', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50180', 'Interior Decorating', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50182', 'Janitorial Services', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50185', 'Landscape Gardening', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50188', 'Mailing or Addressing', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50190', 'Manicurist', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50200', 'Musical Instrument Repair', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50205', 'Painting', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50210', 'Personal Shopper', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50215', 'Pet Grooming', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50220', 'Pet Sitting and Walking', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50230', 'Photography', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50240', 'Picture Framing', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50245', 'Plumbing', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50250', 'Printer', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50260', 'Shoe Repair', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50270', 'Videotaping', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50280', 'Wedding or Party Planning', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('50999', 'Services - Not Otherwise Listed', 'Services', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('54001', 'Below ground tank', 'N/A', 'Oil Tank');
INSERT INTO ho_class_code (name, type, category) VALUES ('54002', 'Above ground tank', 'Inside the Insured Premises', 'Oil Tank');
INSERT INTO ho_class_code (name, type, category) VALUES ('54003', 'Above ground tank', 'Outside the Insured Premises', 'Oil Tank');
INSERT INTO ho_class_code (name, type, category) VALUES ('60001', 'B&B Operations - One Guest Room', 'Bed and Breakfast', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('60002', 'B&B Operations - Two Guest Rooms', 'Bed and Breakfast', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('60003', 'B&B Operations - Three Guest Rooms', 'Bed and Breakfast', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('60004', 'B&B Operations - Four Guest Rooms', 'Bed and Breakfast', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('60005', 'B&B Operations - Five Guest Rooms', 'Bed and Breakfast', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('60006', 'B&B Operations - Six Guest Rooms', 'Bed and Breakfast', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('60999', 'B&B Operations - More Than Six Guest Rooms', 'Bed and Breakfast', 'Home-Based Business');
INSERT INTO ho_class_code (name, type, category) VALUES ('61721', 'Earthquake Coverage', 'AAIS Endorsement ML 0054, HO 0054, or equivalent', 'Earthquake Coverage');
INSERT INTO ho_class_code (name, type, category) VALUES ('61722', 'Limited Earthquake Coverage', 'AAIS Endorsement ML 0498, HO 0498, or equivalent', 'Earthquake Coverage');
INSERT INTO ho_class_code (name, type, category) VALUES ('61723', 'Reconstruction Cost Coverage', 'AAIS Endorsement ML 0678, HO 0678, or equivalent', 'Earthquake Coverage');
INSERT INTO ho_class_code (name, type, category) VALUES ('63401', 'With collision', 'Motorized Golf Carts');
INSERT INTO ho_class_code (name, type, category) VALUES ('63402', 'Without collision', 'Motorized Golf Carts');
INSERT INTO ho_class_code (name, type, category) VALUES ('73501', 'Inboard / Inboard-outboard / sailboats with auxiliary power', 'Less than 26 feet', 'Under 16 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('73502', 'Inboard / Inboard-outboard / sailboats with auxiliary power', 'Less than 26 feet', '16-30 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('73503', 'Inboard / Inboard-outboard / sailboats with auxiliary power', 'Less than 26 feet', 'Over 30 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('73601', 'Inboard / Inboard-outboard / sailboats with auxiliary power', '26 to 40 feet', 'Under 16 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('73602', 'Inboard / Inboard-outboard / sailboats with auxiliary power', '26 to 40 feet', '16-30 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('73603', 'Inboard / Inboard-outboard / sailboats with auxiliary power', '26 to 40 feet', 'Over 30 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('73701', 'Inboard / Inboard-outboard / sailboats with auxiliary power', 'over 40 feet', 'Under 16 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('73702', 'Inboard / Inboard-outboard / sailboats with auxiliary power', 'over 40 feet', '16 - 30 MPH', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('74101', 'Sailboats with no auxiliary power', '26 to 40 feet', 'N/A', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('74201', 'Each outboard motor', 'N/A', '25-50 hp', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('74202', 'Each outboard motor', 'N/A', 'Over 50 hp', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('74299', 'Each outboard motor', 'N/A', 'All watercraft powered by outboard engines or motors, regardless of hp (New Hampshire only)', 'AAIS Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('75001', '1 - 160 acres', 'Farm Liability');
INSERT INTO ho_class_code (name, type, category) VALUES ('75011', '1 - 1000 acres', 'Farm Liability');
INSERT INTO ho_class_code (name, type, category) VALUES ('75101', '161 - 500 acres', 'Farm Liability');
INSERT INTO ho_class_code (name, type, category) VALUES ('75111', '1,001 - 2,000 acres', 'Farm Liability');
INSERT INTO ho_class_code (name, type, category) VALUES ('75201', 'over 500 acres', 'Farm Liability');
INSERT INTO ho_class_code (name, type, category) VALUES ('75211', 'over 2,000 acres', 'Farm Liability');
INSERT INTO ho_class_code (name, type, category) VALUES ('00000', 'N/A', 'N/A');
INSERT INTO ho_class_code (name, type, category) VALUES ('00780', 'Outboard, Inboard or Inboard-Outdrive Motors', 'up to 15 feet', 'Up to 50 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00781', 'Outboard, Inboard or Inboard-Outdrive Motors', 'up to 15 feet', '51-100 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00782', 'Outboard, Inboard or Inboard-Outdrive Motors', 'up to 15 feet', '101-150 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00783', 'Outboard, Inboard or Inboard-Outdrive Motors', 'up to 15 feet', '151-200 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00784', 'Outboard, Inboard or Inboard-Outdrive Motors', 'up to 15 feet', 'Over 200 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00785', 'Outboard, Inboard or Inboard-Outdrive Motors', 'over 15 to 26 feet', 'Up to 50 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00786', 'Outboard, Inboard or Inboard-Outdrive Motors', 'over 15 to 26 feet', '51-101 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00787', 'Outboard, Inboard or Inboard-Outdrive Motors', 'over 15 to 26 feet', '101-150 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00788', 'Outboard, Inboard or Inboard-Outdrive Motors', 'over 15 to 26 feet', '151-200 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00789', 'Outboard, Inboard or Inboard-Outdrive Motors', 'over 15 to 26 feet', 'Over 200 hp', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00763', 'Sailboats with or without Auxiliary Power', '26 to 40 feet', 'N/A', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00764', 'Sailboats with or without Auxiliary Power', 'Over feet', 'N/A', 'ISO Program Users', 'Watercraft');
INSERT INTO ho_class_code (name, type, category) VALUES ('00999', 'All other', 'All other', 'All other', 'Independent Program Users', 'Watercraft');
END IF;
END $$;