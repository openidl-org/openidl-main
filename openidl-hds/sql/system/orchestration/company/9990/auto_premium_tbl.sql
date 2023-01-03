create table openidl_base_9990.au_policy
    (
    id SERIAL PRIMARY KEY,
    annual_statement_line VARCHAR,
    line_of_business VARCHAR,
    subline VARCHAR,
    record_type VARCHAR,
    transaction_type VARCHAR,
    transaction_code  VARCHAR,
    subline_category VARCHAR,
    accounting_date DATE,
    company_code VARCHAR,
    company_id VARCHAR,
    state VARCHAR,
    territory VARCHAR,
    optional_zip_code_indicator VARCHAR,
    premium_amount Numeric (20,6),
    program VARCHAR,
    effective_date DATE,
    expiration_date DATE,
    policy_identifier VARCHAR,
    accounting_term_expiration DATE,
    nc_program_enhancement VARCHAR,
    zip_code VARCHAR,
    zip_code_suffix VARCHAR,
    monthly_premium_amount Numeric (20,6),
    coverage_category VARCHAR,
    coverage VARCHAR,
    coverage_code VARCHAR,
    liability_limits_name VARCHAR,
    liability_limits_amount VARCHAR ,
    deductible_code VARCHAR,
    deductible_amount VARCHAR,
    exposure Numeric (20,6),
    months_covered Numeric (20,6),
    single_multi_car_rating VARCHAR,
    terrorism VARCHAR,
    packaging VARCHAR,
    pool_affiliation VARCHAR,
    umuim_stacking VARCHAR,
    passive_restraint_discount VARCHAR,
    anti_lock_brakes_discount VARCHAR,
    defensive_driver_discount VARCHAR,
    operator_age VARCHAR,
    operator_age_code VARCHAR,
    gender VARCHAR,
    marital_status VARCHAR,
    marital_status_code VARCHAR,
    principal_secondary VARCHAR,
    drivers_training VARCHAR,
    good_student_discount VARCHAR,
    penalty_points VARCHAR,
    penalty_points_code Varchar,
    vehicle_use VARCHAR,
    vehicle_use_operator VARCHAR,
    commute_distance VARCHAR,
    annual_distance VARCHAR,
    vehicle_performance VARCHAR,
    body_style VARCHAR,
    body_size VARCHAR,
    model_year Numeric (20,6),
    symbol VARCHAR
    );