
    create table openidl_ep_9996.tmp_au_coverage_ref as
    select reporting_code, reporting_name 
    from openidl_ep_9996.tmp_au_coverage 
    group by reporting_code, reporting_name 
    order by reporting_code::numeric ;
    
    