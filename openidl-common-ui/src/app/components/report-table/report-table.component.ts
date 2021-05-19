// SPDX-License-Identifier: Apache-2.0
import { DataService } from './../../services/data.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { ModalComponent } from '../modal/modal.component';
import { MESSAGE } from './../../../assets/messageBundle';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit {
  // Reference to the child component
  @ViewChild(ModalComponent) appModal: ModalComponent;

  // Output event which is emmitted to the update report component which then disables the update button
  // if the report status is accepted/published.
  @Output() reportStatus = new EventEmitter();

  // Flags to conditionally handle the expression
  isSpinner: Boolean = false;
  isError: Boolean = false;
  isSuccess: Boolean = false;
  isDisabled: Boolean = true;
  isAccepted: Boolean = false;
  isPublished: Boolean = false;
  isReportSelected: Boolean = false;
  isShowUrl: Boolean = true;
  isCopyBtn: Boolean = false;
  isHashCopied: Boolean = false;
  isURLCopied: Boolean = false;
  isJurisdiction: Boolean = false;
  // Props to be passed to the modal component
  type: any;
  message: any;
  title: any;

  // Models to store data
  reportList: any;
  selectedReport: any;
  role: any;
  currentDatacall: any;
  copyIndex: any;
  copyHashText: any = 'Copy Report Hash';
  copyURLText: any = 'Copy Report URL';
  jurisdiction: any;


  constructor(private dataService: DataService, private storageService: StorageService) { }

  ngOnInit() {
    this.role = this.storageService.getItem('role');
    this.jurisdiction = this.storageService.getItem('jurisdiction');
    this.currentDatacall = this.storageService.getItem('datacall');
    if (this.currentDatacall.jurisdiction === this.jurisdiction) {
      this.isJurisdiction = true;
      console.log('Jurisdiction is same');
    } else {
      this.isJurisdiction = false;
      console.log('Jurisdiction is not same');
    }
    this.getReports();
  }

  // Fetch the reports for the current issued data call
  getReports() {
    const uri = '/report?dataCallVersion=' + this.currentDatacall.version + '&dataCallID=' + this.currentDatacall.id;
    this.isSpinner = true;
    this.isCopyBtn = false;
    this.dataService.getData(uri)
      .subscribe(response => {
        this.isSpinner = false;
        this.reportList = JSON.parse(response);

        if (this.reportList && this.reportList.length > 0) {
          let publistReportList = [];
          this.reportList.forEach(element => {
            element.status = (element.status).toLowerCase();
            if ((this.reportList.length == 1) && ((element.status).toLowerCase() === 'candidate')) {
              this.isReportSelected = true;
              this.selectedReport = element;
              this.isDisabled = false;
            } else {
              this.isReportSelected = false;
              this.isDisabled = true;
            }
            if ((element.status).toLowerCase() === 'accepted') {
              this.selectedReport = element;
              this.isAccepted = true;
              this.isPublished = false;
              this.isDisabled = false;
              this.reportStatus.emit();
            } else if ((element.status).toLowerCase() === 'published') {
              this.isAccepted = false;
              this.isPublished = true;
              this.isDisabled = false;
              this.isReportSelected = true;
              console.log('published element pushed');
              publistReportList.push(element);
              console.log(publistReportList);
              this.reportStatus.emit();
            }
            element.updatedTs = this.formatDate2(element.updatedTs);
          });
          if (this.role && (this.role).toLowerCase() === 'carrier' && !this.isPublished) {
            this.isShowUrl = false;
          } else {
            this.isShowUrl = true;
          }
          if (this.isPublished) {
            console.log('published element');
            this.reportList = publistReportList;
            console.log(this.reportList);
          }
        }

        console.log('report list respnse: ', response);
      },
        error => {
          console.log(error);
          this.isSpinner = false;
          this.isError = true;
          const messageBundle = MESSAGE.COMMON_ERROR;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);
        });
  }

  // Get the data of selected report
  getSelectedReport(selectedReport) {
    this.selectedReport = selectedReport;
    console.log('selected report ', selectedReport);
    this.isDisabled = false;
  }

  // check the report action and call the update report with the selected action
  submitReport(action) {
    console.log('submit button called');
    if (!this.isDisabled || this.isAccepted) {
      switch (action) {
        case 'acceptReport':
          this.updateReport('ACCEPTED', false, 1);
          break;
        case 'acceptAndPublishReport':
          this.updateReport('ACCEPTED', false, 0);
          break;
        case 'publishReport':
          this.updateReport('PUBLISHED', false, 1);
          break;
      }
    }
  }

  // Update the report with the submitted action and the data
  updateReport(status, isAcceptedAndPublished, apCount) {
    console.log("creating report data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
    const data = {
      "dataCallID": this.selectedReport.dataCallID,
      "dataCallVersion": this.selectedReport.dataCallVersion,
      "hash": this.selectedReport.hash,
      "reportVersion": this.selectedReport.reportVersion,
      "status": status,
      "url": this.selectedReport.url,
      "createdTs": this.selectedReport.createdTs,
      "Juridiction": this.currentDatacall.jurisdiction
    };

    const uri = '/report ';
    this.isSpinner = true;
    this.dataService.putData(uri, data)
      .subscribe(response => {
        this.isSpinner = false;
        this.isSuccess = true;
        this.title = 'Success';
        this.type = 'success';
        if (!isAcceptedAndPublished) {
          this.message = ' The report has been ' + status.toLowerCase() + '.';
          if (apCount !== 1) {
            this.updateReport('PUBLISHED', true, 1);
          } else {
            setTimeout(() => {
              this.showModal();
            }, 500);
          }
        } else {
          this.message = 'The report has been accepted and published.'
          setTimeout(() => {
            this.showModal();
          }, 500);
        }
      },
        error => {
          console.log(error);
          this.isSpinner = false;
          this.isError = true;
          this.isSuccess = false;
          const messageBundle = MESSAGE.COMMON_ERROR;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);

        });
  }

  // Show modal according to success, error or info
  showModal() {
    this.appModal.openModal(this.title, this.message, this.type);
  }

  // Show the session expired modal
  showSessionModal() {
    this.appModal.openSessionModal(this.title, this.message, this.type, true);
  }

  // Reset flags on closing the modal and refesh the data.
  modalClose() {
    this.isError = false;
    if (this.isSuccess) {
      this.isSuccess = false;
      this.getReports();
    }
  }

  // Format date in mm dd yyyy | hr:min:ss format
  formatDate2(d) {
    const date = new Date(d);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    let dd: any = date.getDate();
    let ss = 'AM';

    const mm: any = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    let hr: any = date.getHours();
    let min: any = date.getMinutes();
    if (dd < 10) { dd = '0' + dd; }

    if (hr == 12) {
      ss = 'PM';
    } else if (hr > 12) {
      hr = hr - 12;
      ss = 'PM';
    }
    if (hr < 10) { hr = '0' + hr; }
    if (min < 10) { min = '0' + min; }

    return d = mm + '/' + dd + '/' + yyyy + '  ' + hr + ':' + min + ' ' + ss;
  }

  toggleCopyBtn(index) {

    this.isHashCopied = false;
    this.isURLCopied = false;
    this.copyHashText = 'Copy Report Hash';
    this.copyURLText = 'Copy Report URL';

    this.copyIndex = index;
    this.isCopyBtn = !this.isCopyBtn
  }

  copyToClipboard(text, copyType, event) {
    event.preventDefault();
    event.stopPropagation();
    if (copyType === 'hash') {
      this.isHashCopied = true;
      this.isURLCopied = false;
      this.copyHashText = text;
      this.copyURLText = 'Copy Report URL';
    } else if (copyType === 'URL') {
      this.isHashCopied = false;
      this.isURLCopied = true;
      this.copyHashText = 'Copy Report Hash';
      this.copyURLText = text;
    }
  }

  openURL(url) {
    console.log('url  ', url);
    let extURL = url;
    if (!/^(http:|https:)/i.test(extURL)) {
      extURL = "http://" + extURL;
    }
    window.open(
      extURL,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

}
