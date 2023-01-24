
    CREATE TABLE openidl_ep_9998.tmp_ho_reporting_ref as
    SELECT reporting_category, reporting_form, policy_form
    FROM openidl_ep_9998.tmp_ho_pc
    GROUP BY reporting_category, reporting_form, policy_form;
    