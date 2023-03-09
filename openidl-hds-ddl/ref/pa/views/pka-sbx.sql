--line 
SELECT a.line aais_line_code,
       b.code openidl_code,
       b.id   openidl_line_id,
       b.short_name,
       b.long_name
FROM   pa_stat_stg2 a,
       openidl_lob_code b
WHERE  a.line = b.code;
and a.subline = '1'; 

SELECT a.line aais_line_code,
       b.code, 
       b.id   fk_openidl_lob_code_id
FROM   pa_stat_stg2 a,
       openidl_lob_code b
WHERE  a.line = b.code
and a.subline = '1'; 



--state
SELECT b.id   openidl_state_id,
       b.abbreviation,
       b.code aais_state_code
FROM   pa_stat_stg2 a,
       state_code b
WHERE  a.state = b.code; 

--transaction
SELECT b.id   transaction_id,
       b.code transaction_code,
       b.NAME
FROM   pa_stat_stg2 a,
       pa_transaction_code b
WHERE  a.trans = b.code; 

-- program code
SELECT b.*
FROM   pa_stat_stg2 a,
       pa_program_code b
WHERE  a.prog_cd = b.code; 


--coverage_code

SELECT d.*,
       c.coverage_id coverage_id
FROM   (SELECT b.id   openidl_state_id,
               b.abbreviation,
               b.code aais_state_code,
               a.cov_code,
               a.policy_num,
               a.id   row_id
        FROM   pa_stat_stg2 a,
               state_code b
        WHERE  a.state = b.code) d,
       pa_state_coverage_code_vw c
WHERE  d.openidl_state_id = c.fk_state_id
       AND d.cov_code = c.coverage_code; 

-- cause of loss
SELECT *
FROM   (SELECT d.*,
               c.coverage_id coverage_id
        FROM   (SELECT b.id   openidl_state_id,
                       b.abbreviation,
                       b.code aais_state_code,
                       a.cov_code,
                       a.policy_num,
                       a.id   row_id,
                       a.col  cause_of_loss_code
                FROM   pa_stat_stg2 a,
                       state_code b
                WHERE  a.state = b.code) d,
               pa_state_coverage_code_vw c
        WHERE  d.openidl_state_id = c.fk_state_id
               AND d.cov_code = c.coverage_code) aa,
       pa_cause_of_loss bb
WHERE  aa.coverage_id = bb.fk_coverage_code_id
       AND aa.cause_of_loss_code = bb.loss_code;