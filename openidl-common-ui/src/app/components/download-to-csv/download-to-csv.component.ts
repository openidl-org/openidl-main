// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-download-to-csv',
  templateUrl: './download-to-csv.component.html',
  styleUrls: ['./download-to-csv.component.css']
})
export class DownloadToCsvComponent implements OnInit {
  @Input() extractionPattern: any;
  @Input() buttonTitle: string; // "Download extraction pattern/s"
  @Input() fileName: string;
  @Input() disable: boolean;

  definition_mongo: string
  constructor() { }

  ngOnInit() {
  }

  downloadCsv() {
    let data = [];
    this.definition_mongo = "";
    this.extractionPattern.forEach(element => {
      let csvdata = {};
      if (element.selected) {
        let definition_cloudant = element.viewDefinition_cloudant;
        this.definition_mongo = element.viewDefinition_mongo;
        if (typeof definition_cloudant == undefined || typeof definition_cloudant == 'undefined' || definition_cloudant == '') {
          definition_cloudant = '-';
        } else {
          definition_cloudant = JSON.stringify(definition_cloudant);
          definition_cloudant = definition_cloudant.replace(/\\n/g, "\n");
          definition_cloudant = definition_cloudant.replace(/\/\//g, "&&&");
          definition_cloudant = definition_cloudant.replace(/\\/g, "");
          definition_cloudant = definition_cloudant.replace(/&&&/g, "//");
        }
        if (typeof this.definition_mongo == undefined || typeof this.definition_mongo == 'undefined' || this.definition_mongo == '') {
          this.definition_mongo = '-';
        } else {
          this.definition_mongo = JSON.stringify(this.definition_mongo);
          this.definition_mongo = this.definition_mongo.replace(/\\n/g, "\n");
          this.definition_mongo = this.definition_mongo.replace(/\/\//g, "&&&");
          this.definition_mongo = this.definition_mongo.replace(/\\"/g, "'");
          this.definition_mongo = this.definition_mongo.replace(/&&&/g, "//");

          /** 
           * Below fix is to replace map and reduce key words from source script
           * inline added to see the result on mongodb client
          */
          let findFunctionIndex = this.definition_mongo.indexOf("function()");
          this.definition_mongo = this.definition_mongo.substring(findFunctionIndex, this.definition_mongo.length - 2);
          this.definition_mongo = this.definition_mongo.replace('","reduce":"', ",")
          this.definition_mongo = this.definition_mongo + ",{out:{inline:1}}";

        }
        csvdata["Pattern_ID"] = element.extractionPatternID;
        csvdata["Pattern_Name"] = element.extractionPatternName;
        csvdata["Description"] = element.description;
        csvdata["definition_cloudant"] = definition_cloudant;
        csvdata["definition_mongo"] = this.definition_mongo;
        data.push(csvdata);
      }
    });
    var options = {
      headers: ["Pattern ID", "Pattern Name", "Pattern Description", "Cloudant Definition", "Mongo Definition"]
    };
    new ngxCsv(data, this.fileName, options);
  }
}

