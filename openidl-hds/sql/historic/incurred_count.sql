--incurred count: 1208
select count(distinct(occurrence_identifier)) 
     incurred_count, coverage_code
from openidl_base.au_loss
where transaction_code in ('2','3','6','7')
and coverage_code = '1'
and accident_date>'2000-01-01'::DATE
and<'2002-01-01'::DATE
