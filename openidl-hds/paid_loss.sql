--paid loss
select sum(loss_amount) paid_loss
from openidl_base.au_loss
where transaction_code = '2';