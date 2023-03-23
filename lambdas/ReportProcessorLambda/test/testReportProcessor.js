
const fs = require('fs')
let converter = require('json-2-csv');
const ReportProcessor = require('../reportProcessor');
const config = require('config');
const logger = require('loglevel');
logger.setLevel(config.get('loglevel'));

const test = async () => {
	let resultData = JSON.parse(fs.readFileSync('testFiles/resultdata.json'))
	let dmvData =  JSON.parse(fs.readFileSync('testFiles/dmvdata.json'))
	const rp = new ReportProcessor;
	let report = await rp.createReportContent(resultData, dmvData)
	let csv = await converter.json2csv(report);
	console.log("Should have no isRegistered")
	console.log(csv); 
	resultData = JSON.parse(fs.readFileSync('testFiles/resultdataNoVin.json'))
	report = await rp.createReportContent(resultData, dmvData)
	csv = await converter.json2csv(report);
	console.log("Should have no isRegistered")
	console.log(csv); 
}


test()
