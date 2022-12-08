create table openidl_base.au_reg_reporting_ref
as 
select reg_reporting_code, reg_reporting_name
from openidl_base.au_premium ap 
group by reg_reporting_code, reg_reporting_name
order by reg_reporting_code::numeric;