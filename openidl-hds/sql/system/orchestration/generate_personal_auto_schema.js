const fs = require('fs');
const getCoverageReport = require('./ref/function/personal-auto/personal_auto_coverage_report');
const getCarYears = require('./ref/function/personal-auto/personal_auto_cy_func');
const getEarnedPremium = require('./ref/function/personal-auto/personal_auto_ep_func');
const getIncurredCount = require('./ref/function/personal-auto/personal_auto_ic_func');
const getIncurredLoss = require('./ref/function/personal-auto/personal_auto_il_func');
const getPersonalAutoClaim = require('./ref/function/personal-auto/personal_auto_claim_tbl');
const getPersonalAutoPolicy = require('./ref/function/personal-auto/personal_auto_policy_tbl');
const getPreTable = require('./ref/function/personal-auto/personal_auto_tmp_pc');
const getReportingTable = require('./ref/function/personal-auto/personal_auto_tmp_reporting_tbl');
const getTearDown = require('./ref/function/personal-auto/personal_auto_tear_down');
const getPersonalAutoOutstanding = require('./ref/function/personal-auto/personal_auto_outstanding');
const getHandTests = require('./ref/function/personal-auto/personal_auto_hand_tests');
const getRefTable = require('./ref/function/personal-auto/personal_auto_tmp_report_ref_tbl');
const getBackOut = require(`./ref/function/personal-auto/personal_auto_back_out`);
const getBuilder = require(`./ref/function/personal-auto/personal_auto_build_extraction`);
const getSQLReport = require(`./ref/function/personal-auto/personal_auto_coverage_report_sql`);

function write(path, value) {
	// console.log(`write, path: ${path}\n value: ${value}`)
	fs.writeFile(path, value, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log('The file was saved!');
	});
}
function checkDirExists(path) {
	console.log(path)
	try {
		if (fs.existsSync(path)) {
			console.log('Directory exists.');
			return true;
		} else {
			console.log('Directory does not exist.');
			return false;
		}
	} catch (e) {
		console.log('An error occurred.');
	}
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

//TODO: check for Auto Folder
function createCompanyDirectory(companyId) {
	console.log('create dir: ' + companyId);

	if (!checkDirExists(`./company/`)) {
		console.log('Company DNE');
		fs.mkdirSync(`./company/`);
	} else {
		console.log('Company Exists');
	}

	if (!checkDirExists(`./company/${companyId}`)) {
		console.log(`Company ${companyId} DNE`);
		fs.mkdirSync(`./company/${companyId}`);
	} else {
		console.log(`Company Exists ${companyId}`);
	}

	if (!checkDirExists(`./company/${companyId}/reporting`)) {
		console.log(`Company ${companyId}/reporting DNE`);
		fs.mkdirSync(`./company/${companyId}/reporting`);
	} else {
		console.log(`Company Exists ${companyId}/reporting`);
	}

	if (!checkDirExists(`./company/${companyId}/reporting/personal-auto`)) {
		console.log(`Company ${companyId}/reporting/personal-auto/ DNE`);
		fs.mkdirSync(`./company/${companyId}/reporting/personal-auto`);
	} else {
		console.log(`Company Exists ${companyId}/reporting/personal-auto/ `);
	}
}

function createSchemas(companyId) {
	sql = `CREATE SCHEMA openidl_base_${companyId};\nCREATE SCHEMA openidl_ep_${companyId};`;
	path = `./company/${companyId}/schemas.sql`;
	if (!checkFileExists(path)) {
		console.log(`Schema ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Schema ${companyId} exists. Skipping Generation`);
	}
}

function createCarYears(companyId) {
	sql = getCarYears(companyId);
	path = `./company/${companyId}/reporting/personal-auto/personal_auto_car_years_func.sql`;
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
	path = `./company/${companyId}/reporting/personal-auto/personal_auto_earned_premium_func.sql`;
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
	path = `./company/${companyId}/reporting/personal-auto/personal_auto_incurred_count_func.sql`;
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
	path = `./company/${companyId}/reporting/personal-auto/personal_auto_incurred_loss_func.sql`;
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
	path = `./company/${companyId}/reporting/personal-auto/personal_auto_coverage_report.sql`;
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

function createPersonalAutoPolicy(companyId) {
	sql = getPersonalAutoPolicy(companyId);
	path = `./company/${companyId}/personal_auto_policy_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(`Personal Auto Premium Table ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Premium Table ${companyId} exists. Skipping Generation`
		);
	}
}

function createPersonalAutoClaim(companyId) {
	sql = getPersonalAutoClaim(companyId);

	path = `./company/${companyId}/personal_auto_claim_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(`Personal Auto Loss Table ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Personal Auto Loss Table ${companyId} exists. Skipping Generation`);
	}
}

function createPreTable(companyId) {
	sql = getPreTable(companyId);

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_tmp_pc_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Personal Auto Pre Reporting Table ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Personal Auto Pre Reporting Table ${companyId} exists. Skipping Generation`
		);
	}
}
function createReportingTableRef(companyId) {
	sql = getRefTable(companyId);

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_tmp_report_ref_tbl.sql`;
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

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_tmp_report_tbl.sql`;
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

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_outstanding_func.sql`;
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

function createTearDown(companyId) {
	sql = getTearDown(companyId);

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_tear_down.sql`;
	if (!checkFileExists(path)) {
		console.log(`Personal Auto Tear Down ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Personal Auto Tear Down ${companyId} exists. Skipping Generation`);
	}
}

function createBackOut(companyId) {
	sql = getBackOut(companyId);

	path = `./company/${companyId}/personal_auto_back_out.sql`;
	if (!checkFileExists(path)) {
		console.log(`Personal Auto Back Out ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Personal Auto Back Out ${companyId} exists. Skipping Generation`);
	}
}

function createHandTests(companyId) {
	sql = getHandTests(companyId);

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_hand_tests.sql`;
	if (!checkFileExists(path)) {
		console.log(`Personal Auto Hand Tests ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Personal Auto Hand Tests ${companyId} exists. Skipping Generation`);
	}
}

function createBuilder(companyId) {
	sql = getBuilder(companyId,' ');

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_coverage_extraction.json`;
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

	path = `./company/${companyId}/reporting/personal-auto/personal_auto_coverage_extraction.sql`;
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

	if (!checkDirExists(`./stat_agent/`)) {
		console.log('Stat Agent DNE');
		fs.mkdirSync(`./stat_agent/`);
	} else {
		console.log('stat_agent');
	}

	path = `./stat_agent/personal_auto_coverage_extraction.json`;
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
	console.log('init company: ' + companyId);
	createCompanyDirectory(companyId);
	createSchemas(companyId);
	createPersonalAutoClaim(companyId);
	createPersonalAutoPolicy(companyId);
	createCarYears(companyId);
	createEarnedPremium(companyId);
	createIncurredCount(companyId);
	createIncurredLoss(companyId);
	createPersonalAutoCoverageReport(companyId);
	createPreTable(companyId);
	createReportingTable(companyId);
	createTearDown(companyId);
	createOutstanding(companyId);
	createHandTests(companyId);
	createReportingTableRef(companyId);
	createBackOut(companyId);
	createBuilder(companyId);
	createSQLBuilder(companyId);
	createExtractionPattern();
}

function main(buildObjects) {
	for (object of buildObjects) {
		console.table(object);
		initCompany(object);
	}
}

// buildObject = [
// 	{ Name: 'Shepard Mutual', ID: '9999' },
// 	{ Name: 'Lab Insurance Group', ID: '9998' },
// 	{ Name: 'York Farmers INC', ID: '9997' },
// 	{ Name: 'Idaho Group', ID: '9996' },
// 	{ Name: 'Carolina Insurance Group', ID: '9995' },
// 	{ Name: 'Burke Farmers', ID: '9990' },
// 	{ Name: 'Company X', ID: '1234' }
// ];
//main(buildObject);

module.exports = initCompany;
