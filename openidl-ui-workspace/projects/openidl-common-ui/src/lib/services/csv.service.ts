import { Injectable } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Injectable({
	providedIn: 'root'
})
export class CsvService {
	constructor() {}

	downloadCsv(data: Array<any>, fileName = 'extraction-patterns') {
		const output = [];
		let definition_mongo = '';
		data.forEach((element) => {
      console.log(element);
			let csvData = {};
			let definition_cloudant = element.viewDefinition_cloudant;
			let definition_mongo = element.viewDefinition_mongo;
      let definition_postgres = element.viewDefinition_postgres;
			if (
				typeof definition_cloudant == undefined ||
				typeof definition_cloudant == 'undefined' ||
				definition_cloudant == ''
			) {
				definition_cloudant = '-';
			} else {
				definition_cloudant = JSON.stringify(definition_cloudant);
				definition_cloudant = definition_cloudant.replace(/\\n/g, '\n');
				definition_cloudant = definition_cloudant.replace(
					/\/\//g,
					'&&&'
				);
				definition_cloudant = definition_cloudant.replace(/\\/g, '');
				definition_cloudant = definition_cloudant.replace(/&&&/g, '//');
			}
			if (
				typeof definition_mongo == undefined ||
				typeof definition_mongo == 'undefined' ||
				definition_mongo == ''
			) {
				definition_mongo = '-';
			} else {
				definition_mongo = JSON.stringify(definition_mongo);
				definition_mongo = definition_mongo.replace(/\\n/g, '\n');
				definition_mongo = definition_mongo.replace(/\/\//g, '&&&');
				definition_mongo = definition_mongo.replace(/\\"/g, "'");
				definition_mongo = definition_mongo.replace(/&&&/g, '//');

				/**
				 * Below fix is to replace map and reduce key words from source script
				 * inline added to see the result on mongodb client
				 */
				let findFunctionIndex = definition_mongo.indexOf('function()');
				definition_mongo = definition_mongo.substring(
					findFunctionIndex,
					definition_mongo.length - 2
				);
				definition_mongo = definition_mongo.replace(
					'","reduce":"',
					','
				);
				definition_mongo = definition_mongo + ',{out:{inline:1}}';
			}
      if (
        typeof definition_postgres == undefined ||
        typeof definition_postgres == 'undefined' ||
        definition_postgres == '') {

        definition_postgres = '-';
      } else {
        definition_postgres = { ...definition_postgres };

        if (definition_postgres.map) {
          definition_postgres.map = atob(definition_postgres.map);
        }
        if (definition_postgres.reduce) {
          definition_postgres.reduce = atob(definition_postgres.reduce);
        }
        if (definition_postgres.cleanup) {
          definition_postgres.cleanup = atob(definition_postgres.cleanup);
        }
      }
			csvData['Pattern_ID'] = element.extractionPatternID;
			csvData['Pattern_Name'] = element.extractionPatternName;
			csvData['Description'] = element.description;
			csvData['definition_cloudant'] = definition_cloudant;
			csvData['definition_mongo'] = definition_mongo;
      csvData['definition_postgres'] = JSON.stringify(definition_postgres).replace(/\\n/g, '\n');
			output.push(csvData);
		});
		var options = {
			headers: [
				'Pattern ID',
				'Pattern Name',
				'Pattern Description',
				'Cloudant Definition',
				'Mongo Definition',
        'PostgreSQL Definition'
			]
		};
		new ngxCsv(output, fileName, options);
	}
}
