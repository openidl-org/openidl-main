
create table openidl_ep_9997.tmp_pa_coverage_ref as
select reporting_code, reporting_name 
from openidl_ep_9997.tmp_pa_coverage 
where reporting_code is not null
group by reporting_code, reporting_name 
order by reporting_code::numeric;

    