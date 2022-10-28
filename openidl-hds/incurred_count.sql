--incurred count: 1208
select count(distinct(occurrence_identifier)) incurred_count
from openidl_base.au_loss
where transaction_code in ('2','3','6','7')