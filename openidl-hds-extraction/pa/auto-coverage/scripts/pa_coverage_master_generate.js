const fs = require('fs');
const getCoverageReport = require('./pa_coverage_extraction_report');
const getCarYears = require('./pa_car_years_func');
const getEarnedPremium = require('./pa_earned_premium_func');
const getIncurredCount = require('./pa_incurred_count_func');
const getIncurredLoss = require('./pa_incurred_loss_func');
const getPersonalAutoOutstanding = require('./pa_auto_outstanding_func.js');
const getTearDown = require('./pa_tear_down.js');
const getRefTable = require('./pa_coverage_ref_tbl.js');
const getReportingTable = require('./pa_coverage_tbl');
const getBasicLimitIl = require('./pa_basic_limit_il');
const getExcessLimitIl = require('./pa_excess_limit_il');
const getBuilder = require('./pa_build_extraction');
const getSQLReport = require(`./pa_coverage_generate_extraction_pattern_sql`);

function write(path, value) {
	// console.log(`write, path: ${path}\n value: ${value}`)
	fs.writeFile(path, value, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log('The file was saved!');
	});
}

function checkFileExists(path) {
	//console.log('file path: '+path)
	try {
		if (fs.existsSync(path)) {
			//file exists
			return true;
		} else {
			return false;
		}
	} catch (err) {
		//console.error(err)
	}
}

function createCarYears(companyId) {
	path = '../sql/tmp_pa_car_years_func.sql';
	if (!checkFileExists(path)) {
		console.log(`Car Years Function ${companyId} not found. Creating now.`);
		sql = getCarYears(companyId);
		write(path, sql);
	} else {
		console.log(
			`Car Years Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createEarnedPremium(companyId) {
	path = '../sql/tmp_pa_earned_premium_func.sql';
	if (!checkFileExists(path)) {
		console.log(
			`Earned Premium Function ${companyId} not found. Creating now.`
		);
		sql = getEarnedPremium(companyId);
		write(path, sql);
	} else {
		console.log(
			`Earned Premium Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createIncurredCount(companyId) {
	path = '../sql/tmp_incurred_count_func.sql';
	if (!checkFileExists(path)) {
		console.log(
			`Incurred Count Function ${companyId} not found. Creating now.`
		);
		sql = getIncurredCount(companyId);
		write(path, sql);
	} else {
		console.log(
			`Incurred Count Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createIncurredLoss(companyId) {
	path = '../sql/tmp_pa_incurred_loss_func.sql';
	if (!checkFileExists(path)) {
		console.log(
			`Incurred Loss Function ${companyId} not found. Creating now.`
		);
		sql = getIncurredLoss(companyId);
		write(path, sql);
	} else {
		console.log(
			`Incurred Loss Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createPersonalAutoCoverageReport(companyId, startDate, endDate) {
	path = `../sql/pa_coverage_report.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Coverage Report ${companyId} not found. Creating now.`
		);
		sql = getCoverageReport(companyId, startDate, endDate);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Coverage Report ${companyId} exists. Skipping Generation`
		);
	}
}

function createReportingTableRef(companyId) {
	path = `../sql/tmp_pa_coverage_ref_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Reporting Table Ref ${companyId} not found. Creating now.`
		);
		sql = getRefTable(companyId);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Reporting Table Ref ${companyId} exists. Skipping Generation`
		);
	}
}

function createReportingTable(companyId, startDate, endDate) {
	path = `../sql/tmp_pa_coverage_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Reporting Table ${companyId} not found. Creating now.`
		);
		sql = getReportingTable(companyId, startDate, endDate);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Reporting Table ${companyId} exists. Skipping Generation`
		);
	}
}

function createOutstanding(companyId) {
	path = `../sql/tmp_pa_auto_outstanding.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Outstanding function ${companyId} not found. Creating now.`
		);
		sql = getPersonalAutoOutstanding(companyId);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Outstanding function ${companyId} exists. Skipping Generation`
		);
	}
}

function createBasicLimitIl(companyId) {
	path = `../sql/tmp_pa_basic_limit_il.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Basic Limit function ${companyId} not found. Creating now.`
		);
		sql = getBasicLimitIl(companyId);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Basic Limit function ${companyId} exists. Skipping Generation`
		);
	}
}

function createExcessLimitIl(companyId) {
	path = `../sql/tmp_pa_basic_excess_il.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Basic Excess function ${companyId} not found. Creating now.`
		);
		sql = getExcessLimitIl(companyId);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Basic Excess function ${companyId} exists. Skipping Generation`
		);
	}
}

function createTearDown(companyId) {
	path = '../sql/tmp_pa_tear_down.sql';
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Tear Down ${companyId} not found. Creating now.`
		);
		sql = getTearDown(companyId);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Tear Down ${companyId} exists. Skipping Generation`
		);
	}
}

function createBuilder(companyId, startDate, endDate) {
	path = `../sql/pa_coverage_extraction.json`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Extraction Builder ${companyId} not found. Creating now.`
		);
		sql = getBuilder(companyId, ' ', startDate, endDate);
		data = JSON.stringify(sql);

		fs.writeFileSync(path, data);
	} else {
		console.log(
			`Personal Auto Extraction Builder ${companyId} exists. Skipping Generation`
		);
	}
}

function createSQLBuilder(companyId, startDate, endDate) {
	path = `../sql/pa_coverage_extraction_pattern.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Extraction SQL ${companyId} not found. Creating now.`
		);
		sql = getSQLReport(companyId, startDate, endDate);
		fs.writeFileSync(path, sql);
	} else {
		console.log(
			`Personal Auto Extraction SQL ${companyId} exists. Skipping Generation`
		);
	}
}

function createExtractionPattern(startDate, endDate) {
	companyId = '@org';
	

	path = `../sql/pa_coverage_report_org.json`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Extraction Pattern not found. Creating now.`
		);
		sql = getBuilder(companyId, startDate, endDate);
		fs.writeFileSync(path, JSON.stringify(sql));
	} else {
		console.log(
			`Personal Auto Extraction Pattern exists. Skipping Generation`
		);
	}
}

function initCompany(build) {
	console.log(build);
	companyId = build.ID;
	startDate = build.startDate;
	endDate = build.endDate;
	createCarYears(companyId);
	createEarnedPremium(companyId);
	createIncurredCount(companyId);
	createIncurredLoss(companyId);
	createBasicLimitIl(companyId);
	createExcessLimitIl(companyId);
	createPersonalAutoCoverageReport(companyId, startDate, endDate);
	createReportingTable(companyId, startDate, endDate);
	createTearDown(companyId);
	createOutstanding(companyId);
	createReportingTableRef(companyId);
	createBuilder(companyId, startDate, endDate);
	createSQLBuilder(companyId, startDate, endDate);
	createExtractionPattern(startDate, endDate);
}

function main() {
	let build = { ID: '9997', startDate: '2020-01-01', endDate: '2021-01-01' };
	initCompany(build);
}

main();
