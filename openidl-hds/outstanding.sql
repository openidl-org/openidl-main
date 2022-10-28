--max 4775818.900000
SELECT Sum(x.loss_amount)
FROM  (SELECT t2.coverage_code,
              t2.occurrence_identifier,
              Max(t2.loss_amount) loss_amount
       FROM   (SELECT coverage_code,
                      occurrence_identifier,
                      Max(accounting_date) accounting_date
               FROM   openidl_base.au_loss
               WHERE  transaction_code = '3'
               GROUP  BY coverage_code,
                         occurrence_identifier) t,
              openidl_base.au_loss t2
       WHERE  t.coverage_code = t2.coverage_code
              AND t.occurrence_identifier = t2.occurrence_identifier
              AND t.accounting_date = t2.accounting_date
       GROUP  BY t2.coverage_code,
                 t2.occurrence_identifier,
                 t2.accounting_date) x; 
-- min: 4484485.550000
SELECT Sum(x.loss_amount) SELECT Sum(x.loss_amount) 
FROM  (SELECT t2.coverage_code,
              t2.occurrence_identifier,
              min(t2.loss_amount) loss_amount
       FROM   (SELECT coverage_code,
                      occurrence_identifier,
                      max(accounting_date) accounting_date
               FROM   openidl_base.au_loss
               WHERE  transaction_code = '3'
               GROUP  BY coverage_code,
                         occurrence_identifier) t,
              openidl_base.au_loss t2
       WHERE  t.coverage_code = t2.coverage_code
              AND t.occurrence_identifier = t2.occurrence_identifier
              AND t.accounting_date = t2.accounting_date
       GROUP  BY t2.coverage_code,
                 t2.occurrence_identifier,
                 t2.accounting_date) x;
FROM  (SELECT t2.coverage_code,
              t2.occurrence_identifier,
              min(t2.loss_amount) loss_amount
       FROM   (SELECT coverage_code,
                      occurrence_identifier,
                      max(accounting_date) accounting_date
               FROM   openidl_base.au_loss
               WHERE  transaction_code = '3'
               GROUP  BY coverage_code,
                         occurrence_identifier) t,
              openidl_base.au_loss t2
       WHERE  t.coverage_code = t2.coverage_code
              AND t.occurrence_identifier = t2.occurrence_identifier
              AND t.accounting_date = t2.accounting_date
       GROUP  BY t2.coverage_code,
                 t2.occurrence_identifier,
                 t2.accounting_date) x; 

-- max    = 4775818.900000
-- excel  = 4649758.14 
-- min    = 4484485.550000
-- -----------------------
-- spread = 291333.350000


