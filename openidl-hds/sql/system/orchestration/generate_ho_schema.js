const fs = require('fs');
//tables
const getHOClaim = require('./ref/function/ho/ho_claim_tbl.js');
const getHOPolicy = require('./ref/function/ho/ho_policy_tbl.js');

const getReportTable = require('./ref/function/ho/tmp_ho_report_ref_tbl')
const getBuilder = require('./ref/function/ho/ho_build_extraction')

//functions
const getEarnedPremium = require('./ref/function/ho/ho_ep_func');
//const getIncurredCount = require('./ref/function/ho/ho_ic_func');
const getIncurredLoss = require('./ref/function/ho/ho_il_func');
const getWrittenPremium = require('./ref/function/ho/ho_wp_func')
const getPaidLoss = require('./ref/function/ho/ho_pl_func')
const getOutstandingLoss = require('./ref/function/ho/ho_ol_func')
//report tables

function createHOPolicy(companyId) {
	sql = getHOPolicy(companyId);

	path = `./company/${companyId}/reporting/ho_policy_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(`ho policy ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`ho policy ${companyId} exists. Skipping Generation`);
	}
}

function createHOReportTable(companyId) {
	sql = getRefTable(companyId);

	path = `./company/${companyId}/reporting/ho_tmp_report_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(`ho policy ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`ho policy ${companyId} exists. Skipping Generation`);
	}
}

function createHOClaim(companyId) {
	sql = getHOClaim(companyId);

	path = `./company/${companyId}/reporting/ho_claim_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(`ho claim ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`ho claim ${companyId} exists. Skipping Generation`);
	}
}


//const getHoDoiReport = require('./ref/function/homeowners/ho_doi_report');


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



function createEarnedPremium(companyId) {
	sql = getEarnedPremium(companyId);
	path = `./company/${companyId}/reporting/ho_earned_premium_func.sql`;
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
	path = `./company/${companyId}/reporting/ho_incurred_count_func.sql`;
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
	path = `./company/${companyId}/reporting/ho_incurred_loss_func.sql`;
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

function createPaidLoss(companyId) {
	sql = getPaidLoss(companyId);
	path = `./company/${companyId}/reporting/ho_paid_loss_func.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Paid Loss Function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Paid Loss Function ${companyId} exists. Skipping Generation`
		);
	}
}

function createWrittenPremium(companyId) {
	sql = getWrittenPremium(companyId);
	path = `./company/${companyId}/reporting/ho_written_premium_func.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Written Premium Function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Written Premium Function ${companyId} exists. Skipping Generation`
		);
	}
}



function createHoDoiReport(companyId) {
	sql = getHoDoiReport(companyId);
	path = `./company/${companyId}/reporting/ho_doi_report.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`Homeowner DOI Report ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`Homeowner DOI Report ${companyId} exists. Skipping Generation`
		);
	}
}






function createReportingTableRef(companyId) {
	sql = getRefTable(companyId);

	path = `./company/${companyId}/reporting/ho_tmp_report_ref_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`ho Reporting Table Ref ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`ho Reporting Table Ref ${companyId} exists. Skipping Generation`
		);
	}
}

function createReportingTable(companyId) {
	sql = getReportingTable(companyId);

	path = `./company/${companyId}/reporting/ho_tmp_report_tbl.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`ho Reporting Table ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`ho Reporting Table ${companyId} exists. Skipping Generation`
		);
	}
}

function createOutstandingLoss(companyId) {
	sql = getOutstandingLoss(companyId);

	path = `./company/${companyId}/reporting/ho_outstanding_loss_func.sql`;
	if (!checkFileExists(path)) {
		console.log(
			`HO Outstanding function ${companyId} not found. Creating now.`
		);
		write(path, sql);
	} else {
		console.log(
			`HO Outstanding function ${companyId} exists. Skipping Generation`
		);
	}
}

function createTearDown(companyId) {
	sql = getTearDown(companyId);

	path = `./company/${companyId}/reporting/ho_tear_down.sql`;
	if (!checkFileExists(path)) {
		console.log(`ho Tear Down ${companyId} not found. Creating now.`);
		write(path, sql);
	} else {
		console.log(`ho Tear Down ${companyId} exists. Skipping Generation`);
	}
}



function createBuilder(companyId) {
	sql = getBuilder(companyId);

	path = `./company/${companyId}/reporting/ho_coverage_extraction.json`;
	if (!checkFileExists(path)) {
		console.log(
			`ho Extraction Builder ${companyId} not found. Creating now.`
		);
		console.table(sql)
		data = JSON.stringify(sql)
		
		fs.writeFileSync(path,data)
	} else {
		console.log(
			`ho Extraction Builder ${companyId} exists. Skipping Generation`
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

	path = `./stat_agent/ho_coverage_extraction.json`;
	if (!checkFileExists(path)) {
		console.log(`ho Extraction Pattern not found. Creating now.`);
		//console.log('317 gs')
		fs.writeFileSync(path,JSON.stringify(sql))
	} else {
		console.log(`ho Extraction Pattern exists. Skipping Generation`);
	}
}

function initCompany(build) {
	companyId = build.ID;
	console.log('init company: ' + companyId);
	createCompanyDirectory(companyId);
	createSchemas(companyId);
	createHOClaim(companyId);
	createHOPolicy(companyId);

	createEarnedPremium(companyId)
	// createIncurredCount(companyId)
	createWrittenPremium(companyId)
	createPaidLoss(companyId)
	createOutstandingLoss(companyId)

	
	createBuilder(companyId);
	createExtractionPattern(companyId)

}

function main(buildObjects) {
	for (object of buildObjects) {
		console.table(object);
		initCompany(object);
	}
}

buildObject = [
	{ Name: 'Shepard Mutual', ID: '9999' },
	{ Name: 'Lab Insurance Group', ID: '9998' },
	{ Name: 'York Farmers INC', ID: '9997' },
  { Name: 'Idaho Group', ID: '9996' },
  { Name: 'Carolina Insurance Group', ID: '9995' },
  { Name: 'Burke Farmers', ID: '9990'},
  { Name: 'Company X', ID: '1234'}
];

main(buildObject);


module.exports = initCompany
