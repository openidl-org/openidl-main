const fs = require('fs');
const getCoverageReport = require('./ref/function/auto/auto_coverage_report');
const getCarYears = require('./ref/function/auto/auto_cy_func');
const getEarnedPremium = require('./ref/function/auto/auto_ep_func');
const getIncurredCount = require('./ref/function/auto/auto_ic_func');
const getIncurredLoss = require('./ref/function/auto/auto_il_func');
const getAutoClaim = require('./ref/function/auto/auto_claim_tbl.js');
const getAutoPolicy = require('./ref/function/auto/auto_policy_tbl.js');
const getPreTable = require('./ref/function/auto/auto_tmp_pc.js');
const getReportingTable = require('./ref/function/auto/auto_tmp_reporting_tbl.js');
const getTearDown = require('./ref/function/auto/auto_tear_down.js');
const getAutoOutstanding = require('./ref/function/auto/auto_outstanding.js');
const getHandTests = require('./ref/function/auto/auto_hand_tests.js');
const getRefTable = require('./ref/function/auto/auto_tmp_report_ref_tbl.js');
const getBackOut = require(`./ref/function/auto/auto_back_out.js`);
const getBuilder = require(`./ref/function/auto/auto_build_extraction.js`);
const getSQLReport = require(`./ref/function/auto/auto_coverage_report_sql`);

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

	if (!checkDirExists(`./company/${companyId}/reporting/auto`)) {
		console.log(`Company ${companyId}/reporting/auto/ DNE`);
		fs.mkdirSync(`./company/${companyId}/reporting/auto`);
	} else {
		console.log(`Company Exists ${companyId}/reporting/auto/ `);
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
	path = `./company/${companyId}/reporting/auto/auto_car_years_func.sql`;
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
	path = `./company/${companyId}/reporting/auto/auto_earned_premium_func.sql`;
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
	path = `./company/${companyId}/reporting/auto/auto_incurred_count_func.sql`;
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
	path = `./company/${companyId}/reporting/auto/auto_incurred_loss_func.sql`;
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

function createAutoCoverageReport(companyId) {
	sql = getCoverageReport(companyId);
	path = `./company/${companyId}/reporting/auto/auto_coverage_report.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Auto Coverage Report ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Auto Coverage Report ${companyId} exists. Skipping Generation`
		);
	}
}

function createAutoPolicy(companyId) {
	sql = getAutoPolicy(companyId);
	path = `./company/${companyId}/auto_policy_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(`Auto Premium Table ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(
			`Auto Premium Table ${companyId} exists. Skipping Generation`
		);
	}
}

function createAutoClaim(companyId) {
	sql = getAutoClaim(companyId);

	path = `./company/${companyId}/auto_claim_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(`Auto Loss Table ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Auto Loss Table ${companyId} exists. Skipping Generation`);
	}
}

function createPreTable(companyId) {
	sql = getPreTable(companyId);

	path = `./company/${companyId}/reporting/auto/auto_tmp_pc_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Auto Pre Reporting Table ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Auto Pre Reporting Table ${companyId} exists. Skipping Generation`
		);
	}
}
function createReportingTableRef(companyId) {
	sql = getRefTable(companyId);

	path = `./company/${companyId}/reporting/auto/auto_tmp_report_ref_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Auto Reporting Table Ref ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Auto Reporting Table Ref ${companyId} exists. Skipping Generation`
		);
	}
}

function createReportingTable(companyId) {
	sql = getReportingTable(companyId);

	path = `./company/${companyId}/reporting/auto/auto_tmp_report_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Auto Reporting Table ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Auto Reporting Table ${companyId} exists. Skipping Generation`
		);
	}
}

function createOutstanding(companyId) {
	sql = getAutoOutstanding(companyId);

	path = `./company/${companyId}/reporting/auto/auto_outstanding_func.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Auto Outstanding function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Auto Outstanding function ${companyId} exists. Skipping Generation`
		);
	}
}

function createTearDown(companyId) {
	sql = getTearDown(companyId);

	path = `./company/${companyId}/reporting/auto/auto_tear_down.sql`;
	if (!checkFileExists(path)) {
		console.log(`Auto Tear Down ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Auto Tear Down ${companyId} exists. Skipping Generation`);
	}
}

function createBackOut(companyId) {
	sql = getBackOut(companyId);

	path = `./company/${companyId}/auto_back_out.sql`;
	if (!checkFileExists(path)) {
		console.log(`Auto Back Out ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Auto Back Out ${companyId} exists. Skipping Generation`);
	}
}

function createHandTests(companyId) {
	sql = getHandTests(companyId);

	path = `./company/${companyId}/reporting/auto/auto_hand_tests.sql`;
	if (!checkFileExists(path)) {
		console.log(`Auto Hand Tests ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`Auto Hand Tests ${companyId} exists. Skipping Generation`);
	}
}

function createBuilder(companyId) {
	sql = getBuilder(companyId,' ');

	path = `./company/${companyId}/reporting/auto/auto_coverage_extraction.json`;
	if (!checkFileExists(path)) {
		console.log(
			`Auto Extraction Builder ${companyId} not found. Creating now.`
		);
		console.table(sql);
		data = JSON.stringify(sql);

		fs.writeFileSync(path, data);
	} else {
		console.log(
			`Auto Extraction Builder ${companyId} exists. Skipping Generation`
		);
	}
}

function createSQLBuilder(companyId) {
	sql = getSQLReport(companyId);

	path = `./company/${companyId}/reporting/auto/auto_coverage_extraction.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Auto Extraction SQL ${companyId} not found. Creating now.`
		);
		//console.table(sql);
		

		fs.writeFileSync(path, sql);
	} else {
		console.log(
			`Auto Extraction SQL ${companyId} exists. Skipping Generation`
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

	path = `./stat_agent/auto_coverage_extraction.json`;
	if (!checkFileExists(path)) {
		console.log(`Auto Extraction Pattern not found. Creating now.`);
		//console.log('317 gs')
		fs.writeFileSync(path, JSON.stringify(sql));
	} else {
		console.log(`Auto Extraction Pattern exists. Skipping Generation`);
	}
}

function initCompany(build) {
	console.log(build)
	companyId = build.ID;
	console.log('init company: ' + companyId);
	createCompanyDirectory(companyId);
	createSchemas(companyId);
	createAutoClaim(companyId);
	createAutoPolicy(companyId);
	createCarYears(companyId);
	createEarnedPremium(companyId);
	createIncurredCount(companyId);
	createIncurredLoss(companyId);
	createAutoCoverageReport(companyId);
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
