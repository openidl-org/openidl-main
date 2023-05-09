SELECT 	a.id		openidl_id,
		a.line		lob, 
		a.rep_mo	accounting_month,
		a.rep_yr	accounting_year,
		a.comp		company_code,
		b.id 		fk_state_code_id,
		a.county	county,
		c.id		fk_area_indiactor_id,
		-- e territory
		-- f transaction code
		-- g premium amount
		-- h loss amount
		-- i exposure
		-- j claim count
		k.id		fk_aslob_id,
		-- l program code
		-- m policy form code
		-- n loss settlement indicator
		-- o primary property amount of insurance
		-- p deductible type
		-- q deductible amount
		-- r wind hail deductible
		s.id		fk_class_code_id
		-- construction code
		-- fire protection code
		-- year of construction
		-- liability limit
		-- medical payments limit
		-- escaped liquid fuel property
		-- escaped liquid fuel coverage
		-- occupancy code
		-- hbb indicator
		-- number of families
		-- ordinance or law
		-- theft deductible
		-- secondary property amount of insurance
		-- mold damage coverage code
		-- pool code
		-- months covered
		-- cause of loss
		-- accident month
		-- accident day
		-- accident year
		-- zip code
		-- zip code suffix
		-- building code effectiveness grade
		-- policy number
		-- claim number
		-- claim id
		-- company use
		
		

FROM openidl_base_9999.ho_stat_stg a
	LEFT JOIN state_code b 
		ON a.state = b.code
	LEFT JOIN ho_area_indicator_code c
		ON a.area = c.code
	LEFT JOIN ho_annual_statement_line_of_business_code k 
		ON a.aslob = k.code
	LEFT JOIN ho_class_code s 
		ON a.class_code = s.code
	
	
;