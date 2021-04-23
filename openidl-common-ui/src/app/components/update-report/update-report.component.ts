// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ReportTableComponent } from '../report-table/report-table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MESSAGE } from './../../../assets/messageBundle';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.css']
})
export class UpdateReportComponent implements OnInit {

  @Input() datacall;
  @Input() username;

  @Output() updateReportEvent = new EventEmitter();

  @ViewChild(ReportTableComponent) appReportTable: ReportTableComponent;

  reportURL: any;
  reportHash: any;
  registerForm: FormGroup;
  isError: Boolean = false;
  shouldUpdateReport: Boolean = true;

  // props passed to modal component
  title: any;
  message: any;
  type: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      reportURL: ['', Validators.required],
      reportHash: ['', Validators.required]
  });
  }

  get reportURLfield() {
    return this.registerForm.get('reportURL');
  }
  get reportHashfield() {
    return this.registerForm.get('reportHash');
  }

  updateReport(formValues) {
    console.log(this.shouldUpdateReport);
    if(this.shouldUpdateReport) {
      if (!this.registerForm.valid) {
        this.isError = true;
        this.type = MESSAGE.MANDATORY_FIELDS_ERROR.type;
        this.message = MESSAGE.MANDATORY_FIELDS_ERROR.message;
        this.title = MESSAGE.MANDATORY_FIELDS_ERROR.title;
      } else {
        this.isError = false;
        const data = {
          "dataCallID": this.datacall.id,
          "dataCallVersion": this.datacall.version,
          "hash":formValues.reportHash,
          "status":"CANDIDATE",
          "url":formValues.reportURL,
          "createdBy":this.username
        };
        // Following event will be handled in parent component mostly which is datacalls issued component in case of AAIS
        this.updateReportEvent.emit(data);
        this.registerForm = this.formBuilder.group({
          reportURL: ['', Validators.required],
          reportHash: ['', Validators.required]
      });
      }
    }
  }

  // Close the error notification
  closeNotify() {
    this.isError = false;
  }

  getReports(isReport) {
    if (isReport) {
      this.appReportTable.getReports();
    }
  }

  getReportStatus() {
    this.shouldUpdateReport = false;
  }

}
