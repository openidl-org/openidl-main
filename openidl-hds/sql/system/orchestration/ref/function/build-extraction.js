function getBuilder(companyId){
    bash = `
    echo 'tables'
    echo '\n#tables\n'>>auto_extraction_pattern.sql
    cat auto_tmp_pre_report_tbl.sql>>auto_extraction_pattern.sql
    cat auto_tmp_report_ref_tbl.sql>>auto_extraction_pattern.sql
    cat auto_tmp_report_tbl.sql>>auto_extraction_pattern.sql
    echo 'functions'
    echo '\n#functions\n'>>auto_extraction_pattern.sql
    cat auto_car_years_func.sql>>auto_extraction_pattern.sql
    cat auto_earned_premium_func>>auto_extraction_pattern.sql
    cat auto_outstanding_func.sql>>auto_extraction_pattern.sql
    cat auto_incurred_count_func>>auto_extraction_pattern.sql
    cat auto_incurred_loss_func>>auto_extraction_pattern.sql
    echo 'report'
    echo '\n#report\n'>>auto_extraction_pattern.sql
    cat auto_coverage_report.sql>>auto_extraction_pattern.sql
    echo 'tear down'>>auto_extraction_pattern.sql


    `
    return bash
}

module.exports = getBuilder