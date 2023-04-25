rm ./pa_coverage_extraction_pattern.sql
echo 'delete existing pattern'
cat tmp_pa_coverage_ref_tbl.sql>>./pa_coverage_extraction_pattern.sql
cat tmp_pa_coverage_tbl.sql>>./pa_coverage_extraction_pattern.sql
cat tmp_pa_auto_outstanding_func.sql>>./pa_coverage_extraction_pattern.sql
cat tmp_pa_car_years_func.sql>>./pa_coverage_extraction_pattern.sql
cat tmp_pa_earned_premium_func.sql>>./pa_coverage_extraction_pattern.sql
cat tmp_pa_incurred_count_func.sql>>./pa_coverage_extraction_pattern.sql
cat tmp_pa_incurred_loss_func.sql>>./pa_coverage_extraction_pattern.sql
cat pa_coverage_report.sql>>./pa_coverage_extraction_pattern.sql
echo 'new extraction pattern created.'