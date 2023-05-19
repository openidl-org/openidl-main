CREATE VIEW mho_stat_vw AS 

SELECT 	a.id				openidl_id,
		a.line				lob, 
		a.rep_mo			accounting_month,
		CASE
           WHEN a.rep_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 2), a.rep_yr)
         END            	accounting_year,
        CASE
           WHEN a.rep_yr IS NULL THEN NULL
           ELSE Concat(Substring(( Date_part('year',
                current_date) :: VARCHAR ), 1, 2), a.rep_yr,'-',a.rep_mo,'-15')::DATE
         END            	accounting_date,
		a.comp				company_code,
		b.id 				fk_state_code_id
		
		
FROM openidl_base_9999.mho_stat_stg a
	LEFT JOIN state_code b 
		ON a.state = b.code
	
	
	;	