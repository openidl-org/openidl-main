const fs = require('fs');
const getCoverageReport = require('./pa_coverage_extraction_report')
const getCarYears = require('./pa_car_years_func');
const getEarnedPremium = require('./pa_earned_premium_func')
const getIncurredCount = require('./pa_incurred_count_func')
const getIncurredLoss = require('./pa_incurred_loss_func')
const getPersonalAutoOutstanding = require('./pa_auto_outstanding_func.js')
const getTearDown = require('./pa_tear_down.js')
const getRefTable = require('./pa_coverage_ref_tbl.js')
const getReportingTable = require('./pa_coverage_tbl')
const getBasicLimitIl = require('./pa_basic_limit_il')
const getExcessLimitIl = require('./pa_excess_limit_il')
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
// function checkDirExists(path) {
// 	console.log(path)
// 	try {
// 		if (fs.existsSync(path)) {
// 			console.log('Directory exists.');
// 			return true;
// 		} else {
// 			console.log('Directory does not exist.');
// 			return false;
// 		}
// 	} catch (e) {
// 		console.log('An error occurred.');
// 	}
// }

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
	sql = getCarYears(companyId);
	path = '../sql/tmp_pa_car_years_func.sql';
	if (!checkFileExists(path)) {
		console.log(`Car Years Function ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(
			`Car Years Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createEarnedPremium(companyId) {
	sql = getEarnedPremium(companyId);
	path = '../sql/tmp_pa_earned_premium_func.sql';
	if (!checkFileExists(path)) {
		console.log(
			`Earned Premium Function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Earned Premium Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createIncurredCount(companyId) {
	sql = getIncurredCount(companyId);
	path = '../sql/tmp_incurred_count_func.sql';
	if (!checkFileExists(path)) {
		console.log(
			`Incurred Count Function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Incurred Count Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createIncurredLoss(companyId) {
	sql = getIncurredLoss(companyId);
	path = '../sql/tmp_pa_incurred_loss_func.sql'
	if (!checkFileExists(path)) {
		console.log(
			`Incurred Loss Function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Incurred Loss Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createPersonalAutoCoverageReport(companyId) {
	sql = getCoverageReport(companyId);
	path = `../sql/pa_coverage_report.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Coverage Report ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Coverage Report ${companyId} exists. Skipping Generation`
		);
	}
}


function createReportingTableRef(companyId) {
	sql = getRefTable(companyId);

	path = `../sql/tmp_pa_coverage_ref_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Reporting Table Ref ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Reporting Table Ref ${companyId} exists. Skipping Generation`
		);
	}
}

function createReportingTable(companyId) {
	sql = getReportingTable(companyId);

	path = `../sql/tmp_pa_coverage_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Reporting Table ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Reporting Table ${companyId} exists. Skipping Generation`
		);
	}
}

function createOutstanding(companyId) {
	sql = getPersonalAutoOutstanding(companyId);

	path = `../sql/tmp_pa_auto_outstanding.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Outstanding function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Outstanding function ${companyId} exists. Skipping Generation`
		);
	}
}

function createBasicLimitIl(companyId) {
	sql = getBasicLimitIl(companyId);

	path = `../sql/tmp_pa_basic_limit_il.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Basic Limit function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Basic Limit function ${companyId} exists. Skipping Generation`
		);
	}
}

function createExcessLimitIl(companyId) {
	sql = getExcessLimitIl(companyId);

	path = `../sql/tmp_pa_basic_excess_il.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Basic Excess function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Basic Excess function ${companyId} exists. Skipping Generation`
		);
	}
}

function createTearDown(companyId) {
	sql = getTearDown(companyId);

	path = '../sql/tmp_pa_tear_down.sql';
	if (!checkFileExists(path)) {
		console.log(`Personal Auto Tear Down ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Personal Auto Tear Down ${companyId} exists. Skipping Generation`);
	}
}



function createBuilder(companyId) {
	sql = getBuilder(companyId,' ');

	path = `../sql/pa_coverage_extraction.json`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Extraction Builder ${companyId} not found. Creating now.`
		);
		console.table(sql);
		data = JSON.stringify(sql);

		fs.writeFileSync(path, data);
	} else {
		console.log(
			`Personal Auto Extraction Builder ${companyId} exists. Skipping Generation`
		);
	}
}

function createSQLBuilder(companyId) {
	sql = getSQLReport(companyId);

	path = `../sql/pa_coverage_extraction_pattern.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Extraction SQL ${companyId} not found. Creating now.`
		);
		//console.table(sql);
		

		fs.writeFileSync(path, sql);
	} else {
		console.log(
			`Personal Auto Extraction SQL ${companyId} exists. Skipping Generation`
		);
	}
}



function createExtractionPattern() {
	companyId = '@org';
	sql = getBuilder(companyId);

	path = `../sql/pa_coverage_report_org.json`;
	if (!checkFileExists(path)) {
		console.log(`Personal Auto Extraction Pattern not found. Creating now.`);
		//console.log('317 gs')
		fs.writeFileSync(path, JSON.stringify(sql));
	} else {
		console.log(`Personal Auto Extraction Pattern exists. Skipping Generation`);
	}
}

function initCompany(build) {
	console.log(build)
	companyId = build.ID;
	createCarYears(companyId);
	createEarnedPremium(companyId);
	createIncurredCount(companyId);
	createIncurredLoss(companyId);
	createBasicLimitIl(companyId)
	createExcessLimitIl(companyId)
	createPersonalAutoCoverageReport(companyId);
	createReportingTable(companyId);
	createTearDown(companyId);
	createOutstanding(companyId);
	createReportingTableRef(companyId);
	createBuilder(companyId);
	createSQLBuilder(companyId);
	createExtractionPattern();
}

function main() {
	let build = {ID:'9997', startDate: '', endDate: ''}
	initCompany(build)
}


main();


