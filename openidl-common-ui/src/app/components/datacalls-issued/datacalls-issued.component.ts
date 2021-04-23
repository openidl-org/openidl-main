// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatacallHistoryComponent } from '../datacall-history/datacall-history.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from './../../services/storage.service';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from './../../services/data.service';
import { UpdateReportComponent } from './../update-report/update-report.component';
import { MESSAGE } from './../../../assets/messageBundle';
@Component({
  selector: 'app-datacalls-issued',
  templateUrl: './datacalls-issued.component.html',
  styleUrls: ['./datacalls-issued.component.css']
})
export class DatacallsIssuedComponent implements OnInit {
  // Events to be emitted to the parent component
  @Output() viewReportEvent = new EventEmitter();
  @Output() viewDraftsEvent = new EventEmitter();
  @Output() cloneDatacallEvent = new EventEmitter();
  @Output() deldateUpdateEvent = new EventEmitter();
  @Output() fail = new EventEmitter();
  // Reference to child components
  @ViewChild(ModalComponent) appModal: ModalComponent;
  @ViewChild(UpdateReportComponent) appUpdateReport: UpdateReportComponent;
  @ViewChild(DatacallHistoryComponent) appDatacallHistory: DatacallHistoryComponent;

  //Models to store data
  draft = {
    id: '',
    name: '',
    jurisdiction: '',
    description: '',
    lineOfBusiness: '',
    proposedDeliveryDate: '',
    premiumFromDate: '',
    premiumToDate: '',
    deadline: '',
    intentToPublish: true,
    isShowParticipants: '',
    purpose: '',
    detailedCriteria: '',
    noOfConsents: '',
    noOfLikes: '',
    eligibilityRequirement: '',
    version: '',
    lossToDate: '',
    lossFromDate: '',
    comments: '',
    forumURL: '',
    status: '',
    extractionPatternID: '',
    extractionPatternName: ''
  };

  extrationPatterList: any;
  extrationPatterListDropDown: any;
  role: any;
  data: any;
  proposedDeliveryDate: any;
  registerForm: FormGroup;
  minDeadline: any;
  buttonText: any = 'Consent to the Report';
  loginResult: any;
  consentCount: any;
  likeCount: any;
  action: any = 'Consent';
  recordTime: any;
  tempDate: any;
  tempURL: any;
  tempPattern: any;
  // props passed to modal component
  title: any;
  message: any;
  type: any;
  // Flags to conditionally handle expressions
  isSpinner: Boolean = false;
  isSmallSpinner: Boolean = false;
  isSmallSpinner1: Boolean = false;
  isSmallSpinner2: Boolean = false;
  isSmallSpinner3: Boolean = false;
  isError: Boolean = false;
  isSuccess: Boolean = false;
  isData: Boolean = false;
  isReg: Boolean = false;
  isStatAgent: Boolean = false;
  isLikeCountPositive: Boolean = false;
  isCarr: Boolean = false;
  isForumUrl: Boolean = false;
  isPattern: Boolean = false;
  isConsent: Boolean = false;
  isDelivery: Boolean = true;
  isReportAvlbl: Boolean = false;
  isPublished: Boolean = false;
  isRecorded: Boolean = false;
  hasAllFields: Boolean = false;
  isUpdate: Boolean = false;
  isPatternUpdate: Boolean = false;
  isForumUpdate: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private dataService: DataService) {

  }

  ngOnInit() {
    // To clear the flag for abandoned view
    this.storageService.removeItem('viewAbandoned');

    // Get current role required to conditionally render the view
    this.role = this.storageService.getItem('role');
    // storing org id, role, username etc
    this.loginResult = this.storageService.getItem('loginResult');

    // Set flags according to the current role
    if (this.role && this.role === 'regulator') {
      this.isReg = true;
    } else {
      this.isReg = false;
    }
    if (this.role && this.role === 'statagent') {
      this.isStatAgent = true;
      this.registerForm = this.formBuilder.group({
        extractionPatternID: [''],
        proposedDeliveryDate: ['', Validators.required],
        forumUrl: [''],
      });
    } else {
      this.isStatAgent = false;
    }
     if (this.role && this.role === 'carrier') {
      this.isCarr = true;
    } else {
      this.isCarr = false;
    }
 
    const data = this.storageService.getItem('datacall')
    if (data) {
      this.draft = data;
      this.minDeadline = new Date(this.draft.premiumToDate);
      if (this.draft.proposedDeliveryDate == '0001-01-01T00:00:00Z') {
        console.log('delivery date not set');
        this.isUpdate = false;
        this.isDelivery = true;
      } else {
        console.log('delivery date is set');
        this.isDelivery = false;
        this.isUpdate = true;
      }
      this.registerForm = this.formBuilder.group({
        proposedDeliveryDate: [new Date(this.draft.proposedDeliveryDate), Validators.required],
        forumUrl: [this.draft.forumURL],
        extractionPatternID: [this.draft.extractionPatternID],
      });
      
    if (this.role && this.role === 'carrier') {
    console.log("this.draft.extractionPatternName at Oninit Method->  " + this.draft.extractionPatternName)
    if (this.draft.extractionPatternName == "" || this.draft.extractionPatternName == null || this.draft.extractionPatternName == undefined || this.draft.extractionPatternName.length == 0) {
        this.isConsent = false;
        }
    else {
        this.isConsent = true;
        }
    }

    console.log("this.isConsent value at Oninit Method ->  " + this.isConsent)

      this.getConsentCount();

    } else {
      this.isError = true;
      this.type = 'error';
      this.message = 'Error';
      this.title = 'Error';
      setTimeout(() => {
        this.showModal();
      }, 10);
    }
    if ((this.draft.forumURL == '') || (this.draft.forumURL == 'undefined')) {
      console.log('forum url is blank');
      this.draft.forumURL = '';
      this.isForumUrl = false;
      this.isForumUpdate = false;
    } else {
      console.log('forum url is not blank');
      this.isForumUrl = true;
      this.isForumUpdate = true;
    }
    if ((this.draft.extractionPatternID == '') || (this.draft.extractionPatternID == undefined) || (this.draft.extractionPatternID == 'undefined')) {
      console.log('extration pattern is blank');
      this.draft.extractionPatternID = '';
      this.isPattern = false;
      this.isPatternUpdate = false;
    } else {
      console.log('extration pattern is not blank');
      // console.log(this.draft.extractionPatternID);
      this.isPattern = true;
      this.isPatternUpdate = true;
    }
    this.getExtrationPattern();
    this.getReports();
  } // init ends

  // Get reports and set isReportAvlbl
  getReports() {
    const uri = '/report?dataCallVersion=' + this.draft.version + '&dataCallID=' + this.draft.id;
    this.isSpinner = true;
    this.dataService.getData(uri)
      .subscribe(response => {
        const resp = JSON.parse(response);
        if (resp === null || resp === 'null') {
          this.isReportAvlbl = false;
        } else {
          this.isReportAvlbl = true;
          resp.forEach(element => {
            if (element.status.toLowerCase() === 'published') {
              this.isPublished = true;
            }
          });
        }
        this.isSpinner = false;
      }, err => {
        this.isSpinner = false;
      })
  }

  // Opens forum url modal in edit mode
  editforum() {
    this.type = 'info';
    this.message = 'Forum URL';
    this.title = 'Update Forum URL';
    const data = this.draft.forumURL;
    const isData = true
    this.appModal.openForumModal(this.title, this.message, this.type, data, isData);
    // this.isForumUrl = false;
    // this.model.forumurl = '';
  }

  //check whether consent is provided for the data call
  getConsentStatus() {
    const uri = '/consent-status-data-call/' + this.draft.id + '/' + this.draft.version + '/' + this.loginResult.attributes.organizationId
    this.isSmallSpinner = true;
    this.dataService.getData(uri)
      .subscribe(response => {
        const res = JSON.parse(response);
        // console.log('consent response ::: ', response);
        if (res == null || res == 'null') {
          this.isConsent = true;
          this.isRecorded = false;
          this.recordTime = '';
        } else {
          this.isConsent = false;
          this.isRecorded = true;
          this.recordTime = this.formatDate2(res[0].consent.createdTs);
        }
        
         if (this.draft.extractionPatternName == "" || this.draft.extractionPatternName == null || this.draft.extractionPatternName == undefined) {
                this.isConsent = false;
        }
        else {
                this.isConsent = true;
        }
        
          console.log("this.isConsent value at getConsentStatus Method ->  " + this.isConsent)
        
        setTimeout(() => {
          this.isSpinner = false;
        }, 1000);
        this.isSmallSpinner = false;
      }, error => {
        this.isSpinner = false;
        this.isError = true;
        this.isSmallSpinner = false;
        const messageBundle = MESSAGE.COMMON_ERROR;
        const locale = "en-US";
        this.appModal.handleNotification(error, messageBundle, locale);
        console.log(error);
      })
  }

  // Get the count of carriers who have consented the data call
  getConsentCount() {
    this.isSmallSpinner1 = true;
    this.isSmallSpinner = true;
    const uri = '/consent-count/' + this.draft.id + '/' + this.draft.version;
    this.dataService.getData(uri)
      .subscribe(response => {
        // console.log('consent count ::: ', response);
        this.consentCount = JSON.parse(response).delta;
        this.isSpinner = false;
        this.isSmallSpinner1 = false;
        this.getLikeCount();
      }, error => {
        this.isSpinner = false;
        this.isSmallSpinner1 = false;
        this.isError = true;
        const messageBundle = MESSAGE.COMMON_ERROR;
        const locale = "en-US";
        this.appModal.handleNotification(error, messageBundle, locale);
      })
  }

  // Get the count of organizations who have liked the data call
  getLikeCount() {
    this.isSmallSpinner2 = true;
    const uri = '/like-count/' + this.draft.id + '/' + this.draft.version;
    this.dataService.getData(uri)
      .subscribe(response => {
        // console.log('like count ::: ', response);
        this.likeCount = JSON.parse(response).delta;
        console.log('isLikeCountPositive ', this.isLikeCountPositive);
        console.log('this.likeCount ', this.likeCount);
        if (this.likeCount > 0) {
          this.isLikeCountPositive = true
        }
        this.isSmallSpinner2 = false;
        if (this.role === 'carrier') {
          this.getConsentStatus();
        }
      }, err => {
        this.isSmallSpinner2 = false;
      })
  }

  // Emit the event of cloning a data call
  cloneDatacall(draft) {
    console.log(draft);
    this.storageService.setItem('datacalldraft', draft);
    this.cloneDatacallEvent.emit();
  }

  // Emit the event to view draft versions of an issued data call
  viewDrafts() {
    this.viewDraftsEvent.emit();
  }

  // Emit the event to view the report versions
  viewReport() {
    if (this.isReportAvlbl) {
      this.viewReportEvent.emit();
    }
  }

  // Show the session expired modal
  showSessionModal() {
    this.appModal.openSessionModal(this.title, this.message, this.type, true);
  }

  // Show the modal of success, error or info type
  showModal() {
    this.appModal.openModal(this.title, this.message, this.type);
  }

  // Reset flags, emit events and set the data conditionally on closing the modal
  modalClose() {
    sessionStorage.removeItem('isModalOpen');
    console.log('modal close');
    this.isData = false;
    if (this.isError) {
      this.isError = false;
      this.fail.emit();
    }
    if (this.isSuccess) {
      const uri = '/data-call/' + this.draft.id + '/' + this.draft.version;
      this.isSpinner = true;
      this.dataService.getData(uri)
        .subscribe(resp => {
          this.isUpdate = true;
          this.isForumUpdate = true;
          this.isPatternUpdate = true;
          this.isSpinner = false;
          this.draft = JSON.parse(resp);
          this.storageService.setItem('datacall', this.draft);
          this.isSuccess = false;
          this.extrationPatterList.forEach(element => {
            if (this.draft.extractionPatternID === element.id) {
              this.draft.extractionPatternName = element.name;
            }
          });
          console.log('modal is closed');
          // console.log('extraction patter name set = ' + this.draft.extractionPatternName);
        },
          err => {
            this.isSpinner = false;
            this.isError = true;
            this.isSuccess = false;
            this.type = MESSAGE.DATACALL_FETCH_ERROR.type;
            this.message = MESSAGE.DATACALL_FETCH_ERROR.message;
            this.title = MESSAGE.DATACALL_FETCH_ERROR.title;
            setTimeout(() => {
              this.showModal();
            }, 10);
          });
    }
  }

  // Opens modal to edit the delivery date
  deliveryDateEdit() {
    this.type = 'info';
    this.message = 'Forum URL';
    this.title = 'Update Delivery Date';
    const data = this.draft.proposedDeliveryDate;
    //  console.log(this.draft.proposedDeliveryDate)
    this.appModal.openDeliveryModal(this.title, this.message, this.type, data);
  }

  // Set the delivery date to be updated
  updatedDelivery(event) {
    this.isUpdate = false;
    console.log('delivery date update');
    console.log(event);
    let value = {
      proposedDeliveryDate: event
    }
    console.log(value);
    this.updateDeliveryDate(value);
  }

  // Update the set delivery date using REST API
  updateDeliveryDate(value) {
    this.isUpdate = false;
    console.log('del date value ::: ', value);
    if (!(value.proposedDeliveryDate === undefined || value.proposedDeliveryDate === '')) {
      const dataobject = {
        'id': this.draft.id,
        'version': this.draft.version,
        'forumURL': this.draft.forumURL,
        'name': this.draft.name.trim(),
        'intentToPublish': this.draft.intentToPublish,
        'proposedDeliveryDate': value.proposedDeliveryDate,
        'description': this.draft.description.trim(),
        'purpose': this.draft.purpose.trim(),
        'lineOfBusiness': this.draft.lineOfBusiness.trim(),
        'deadline': '' + this.draft.deadline,
        'premiumFromDate': '' + this.draft.premiumFromDate,
        'premiumToDate': '' + this.draft.premiumToDate,
        'lossFromDate': '' + this.draft.lossFromDate,
        'lossToDate': '' + this.draft.lossToDate,
        'jurisdiction': this.draft.jurisdiction.trim(),
        'detailedCriteria': this.draft.detailedCriteria.trim(),
        'eligibilityRequirement': this.draft.eligibilityRequirement.trim(),
        'status': this.draft.status,
        'isShowParticipants': this.draft.isShowParticipants,
        'extractionPatternID': this.draft.extractionPatternID,
        'comments': '' + this.draft.comments.trim()
      };
      console.log('draft data');
      console.log(dataobject);
      const uri = '/update-data-call';
      this.isSpinner = true;
      this.dataService.putData(uri, dataobject)
        .subscribe(resp => {
          this.isSpinner = false;
          this.isSuccess = true;
          this.type = MESSAGE.DELIVERY_DATE_UPDATE_SUCCESS.type;
          this.title = MESSAGE.DELIVERY_DATE_UPDATE_SUCCESS.title;
          this.message = MESSAGE.DELIVERY_DATE_UPDATE_SUCCESS.message;
          setTimeout(() => {
            this.showModal();
          }, 10);
          this.isDelivery = false;
          this.appDatacallHistory.getDatacallHistory(this.draft.id, this.draft.version);
        },
          error => {
            this.isSpinner = false;
            this.isError = true;
            const messageBundle = MESSAGE.DELIVERY_DATE_UPDATE_FAIL;
            const locale = "en-US";
            this.appModal.handleNotification(error, messageBundle, locale);
          });
    }
  }

  // Handle event triggered by forum model
  updateForumByModal(event) {
    console.log('update forum by modal event : ', event);
    if (!(event === '' || event === undefined)) {
      this.draft.forumURL = event;
      this.updateForum();
    }
  }

  // Update the edited Extration pattern
  updatePattern(pattern) {
    this.isPatternUpdate = false;
    const dataobject = {
      'id': this.draft.id,
      'version': this.draft.version,
      'forumURL': this.draft.forumURL,
      'name': this.draft.name.trim(),
      'intentToPublish': this.draft.intentToPublish,
      'proposedDeliveryDate': this.draft.proposedDeliveryDate,
      'description': this.draft.description.trim(),
      'purpose': this.draft.purpose.trim(),
      'lineOfBusiness': this.draft.lineOfBusiness.trim(),
      'deadline': '' + this.draft.deadline,
      'premiumFromDate': '' + this.draft.premiumFromDate,
      'premiumToDate': '' + this.draft.premiumToDate,
      'lossFromDate': '' + this.draft.lossFromDate,
      'lossToDate': '' + this.draft.lossToDate,
      'jurisdiction': this.draft.jurisdiction.trim(),
      'detailedCriteria': this.draft.detailedCriteria.trim(),
      'eligibilityRequirement': this.draft.eligibilityRequirement.trim(),
      'status': this.draft.status,
      'isShowParticipants': this.draft.isShowParticipants,
      'extractionPatternID': pattern,
      'comments': '' + this.draft.comments.trim()
    };

    console.log(dataobject);
    const uri = '/update-data-call';
    this.isSpinner = true;
    this.dataService.putData(uri, dataobject)
      .subscribe(resp => {
        this.isSpinner = false;
        this.isSuccess = true;
        this.type = MESSAGE.SET_EXTRACTION_SUCCESS.type;
        this.title = MESSAGE.SET_EXTRACTION_SUCCESS.title;
        if (this.hasAllFields) {
          this.message = MESSAGE.SET_EXTRACTION_SUCCESS.message;
          this.hasAllFields = false;
        } else {
          this.message = MESSAGE.SET_EXTRACTION_SUCCESS.message;
        }
        this.isPattern = true;
        setTimeout(() => {
          this.showModal();
        }, 10);
      },
        error => {
          this.isSpinner = false;
          this.isError = true;
          const messageBundle = MESSAGE.SET_EXTRACTION_FAIL;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);

        });
  }


  // Update the edited forum URL
  updateForum() {
    this.isForumUpdate = false;
    console.log('draft data');
    console.log(this.draft);
    if (!(this.draft.forumURL === '' || this.draft.forumURL === undefined)) {
      const dataobject = {
        'id': this.draft.id,
        'version': this.draft.version,
        'forumURL': this.draft.forumURL,
        'name': this.draft.name.trim(),
        'intentToPublish': this.draft.intentToPublish,
        'proposedDeliveryDate': this.draft.proposedDeliveryDate,
        'description': this.draft.description.trim(),
        'purpose': this.draft.purpose.trim(),
        'lineOfBusiness': this.draft.lineOfBusiness.trim(),
        'deadline': '' + this.draft.deadline,
        'premiumFromDate': '' + this.draft.premiumFromDate,
        'premiumToDate': '' + this.draft.premiumToDate,
        'lossFromDate': '' + this.draft.lossFromDate,
        'lossToDate': '' + this.draft.lossToDate,
        'jurisdiction': this.draft.jurisdiction.trim(),
        'detailedCriteria': this.draft.detailedCriteria.trim(),
        'eligibilityRequirement': this.draft.eligibilityRequirement.trim(),
        'status': this.draft.status,
        'isShowParticipants': this.draft.isShowParticipants,
        'extractionPatternID': this.draft.extractionPatternID,
        'comments': '' + this.draft.comments.trim()
      };

      console.log(dataobject);
      const uri = '/update-data-call';
      this.isSpinner = true;
      this.dataService.putData(uri, dataobject)
        .subscribe(resp => {
          this.isSpinner = false;
          this.isSuccess = true;
          this.type = MESSAGE.SET_FORUM_SUCCESS.type;
          this.title = MESSAGE.SET_FORUM_SUCCESS.title;
          this.message = MESSAGE.SET_FORUM_SUCCESS.message;
          this.hasAllFields = false;

          this.isForumUrl = true;
          setTimeout(() => {
            this.showModal();
          }, 10);
        },
          error => {
            this.isSpinner = false;
            this.isError = true;
            const messageBundle = MESSAGE.SET_FORUM_FAIL;
            const locale = "en-US";
            this.appModal.handleNotification(error, messageBundle, locale);

          });
    }
  }

  //Update DeliveryDate And Forum.

  updateDateAndForum(date, forumurl) {
    this.isUpdate = false;
    this.isForumUpdate = false;
    const dataobject = {
      'id': this.draft.id,
      'version': this.draft.version,
      'forumURL': forumurl,
      'name': this.draft.name.trim(),
      'intentToPublish': this.draft.intentToPublish,
      'proposedDeliveryDate': date,
      'description': this.draft.description.trim(),
      'purpose': this.draft.purpose.trim(),
      'lineOfBusiness': this.draft.lineOfBusiness.trim(),
      'deadline': '' + this.draft.deadline,
      'premiumFromDate': '' + this.draft.premiumFromDate,
      'premiumToDate': '' + this.draft.premiumToDate,
      'lossFromDate': '' + this.draft.lossFromDate,
      'lossToDate': '' + this.draft.lossToDate,
      'jurisdiction': this.draft.jurisdiction.trim(),
      'detailedCriteria': this.draft.detailedCriteria.trim(),
      'eligibilityRequirement': this.draft.eligibilityRequirement.trim(),
      'status': this.draft.status,
      'isShowParticipants': this.draft.isShowParticipants,
      'extractionPatternID': this.draft.extractionPatternID,
      'comments': '' + this.draft.comments.trim()
    };
    console.log('both fields');
    console.log(dataobject);
    const uri = '/update-data-call';
    this.isSpinner = true;
    this.dataService.putData(uri, dataobject)
      .subscribe(resp => {
        this.isSpinner = false;
        this.isSuccess = true;
        this.type = MESSAGE.SET_FORUM_DATE_SUCCESS.type;
        this.title = MESSAGE.SET_FORUM_DATE_SUCCESS.title;
        this.message = MESSAGE.SET_FORUM_DATE_SUCCESS.message;
        setTimeout(() => {
          this.showModal();
        }, 10);
        this.isDelivery = false;
        this.isForumUrl = true;
        this.appDatacallHistory.getDatacallHistory(this.draft.id, this.draft.version);
      },
        error => {
          this.isSpinner = false;
          this.isError = true;
          const messageBundle = MESSAGE.SET_FORUM_DATE__FAIL;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);

        });
  }

  //Update DeliveryDate And pattern.

  updateDateAndPattern(date, pattern) {
    this.isUpdate = false;
    this.isPatternUpdate = false;
    const dataobject = {
      'id': this.draft.id,
      'version': this.draft.version,
      'forumURL': this.draft.forumURL,
      'name': this.draft.name.trim(),
      'intentToPublish': this.draft.intentToPublish,
      'proposedDeliveryDate': date,
      'description': this.draft.description.trim(),
      'purpose': this.draft.purpose.trim(),
      'lineOfBusiness': this.draft.lineOfBusiness.trim(),
      'deadline': '' + this.draft.deadline,
      'premiumFromDate': '' + this.draft.premiumFromDate,
      'premiumToDate': '' + this.draft.premiumToDate,
      'lossFromDate': '' + this.draft.lossFromDate,
      'lossToDate': '' + this.draft.lossToDate,
      'jurisdiction': this.draft.jurisdiction.trim(),
      'detailedCriteria': this.draft.detailedCriteria.trim(),
      'eligibilityRequirement': this.draft.eligibilityRequirement.trim(),
      'status': this.draft.status,
      'isShowParticipants': this.draft.isShowParticipants,
      'extractionPatternID': pattern,
      'comments': '' + this.draft.comments.trim()
    };
    console.log('both fields');
    console.log(dataobject);
    const uri = '/update-data-call';
    this.isSpinner = true;
    this.dataService.putData(uri, dataobject)
      .subscribe(resp => {
        this.isSpinner = false;
        this.isSuccess = true;
        this.type = MESSAGE.SET_PATTERN_DATE_SUCCESS.type;
        this.title = MESSAGE.SET_PATTERN_DATE_SUCCESS.title;
        this.message = MESSAGE.SET_PATTERN_DATE_SUCCESS.message;
        setTimeout(() => {
          this.showModal();
        }, 10);
        this.isDelivery = false;
        this.isPattern = true;
        this.appDatacallHistory.getDatacallHistory(this.draft.id, this.draft.version);
      },
        error => {
          this.isSpinner = false;
          this.isError = true;
          const messageBundle = MESSAGE.SET_PATTERN_DATE__FAIL;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);

        });
  }

  //Update DeliveryDate And pattern.

  updatePatternAndForum(pattern, forum) {
    this.isForumUpdate = false;
    this.isPatternUpdate = false;
    const dataobject = {
      'id': this.draft.id,
      'version': this.draft.version,
      'forumURL': forum,
      'name': this.draft.name.trim(),
      'intentToPublish': this.draft.intentToPublish,
      'proposedDeliveryDate': this.draft.proposedDeliveryDate,
      'description': this.draft.description.trim(),
      'purpose': this.draft.purpose.trim(),
      'lineOfBusiness': this.draft.lineOfBusiness.trim(),
      'deadline': '' + this.draft.deadline,
      'premiumFromDate': '' + this.draft.premiumFromDate,
      'premiumToDate': '' + this.draft.premiumToDate,
      'lossFromDate': '' + this.draft.lossFromDate,
      'lossToDate': '' + this.draft.lossToDate,
      'jurisdiction': this.draft.jurisdiction.trim(),
      'detailedCriteria': this.draft.detailedCriteria.trim(),
      'eligibilityRequirement': this.draft.eligibilityRequirement.trim(),
      'status': this.draft.status,
      'isShowParticipants': this.draft.isShowParticipants,
      'extractionPatternID': pattern,
      'comments': '' + this.draft.comments.trim()
    };
    console.log('both fields');
    console.log(dataobject);
    const uri = '/update-data-call';
    this.isSpinner = true;
    this.dataService.putData(uri, dataobject)
      .subscribe(resp => {
        this.isSpinner = false;
        this.isSuccess = true;
        this.type = MESSAGE.SET_PATTERN_DATE_SUCCESS.type;
        this.title = MESSAGE.SET_PATTERN_DATE_SUCCESS.title;
        this.message = MESSAGE.SET_PATTERN_DATE_SUCCESS.message;
        setTimeout(() => {
          this.showModal();
        }, 10);
        this.isForumUrl = true;
        this.isPattern = true;
        this.appDatacallHistory.getDatacallHistory(this.draft.id, this.draft.version);
      },
        error => {
          this.isSpinner = false;
          this.isError = true;
          const messageBundle = MESSAGE.SET_PATTERN_DATE__FAIL;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);

        });
  }


  // update all the fields

  updateAllFields(date, forumurl, pattern) {
    this.isUpdate = false;
    this.isForumUpdate = false;
    this.isPatternUpdate = false;
    const dataobject = {
      'id': this.draft.id,
      'version': this.draft.version,
      'forumURL': forumurl,
      'name': this.draft.name.trim(),
      'intentToPublish': this.draft.intentToPublish,
      'proposedDeliveryDate': date,
      'description': this.draft.description.trim(),
      'purpose': this.draft.purpose.trim(),
      'lineOfBusiness': this.draft.lineOfBusiness.trim(),
      'deadline': '' + this.draft.deadline,
      'premiumFromDate': '' + this.draft.premiumFromDate,
      'premiumToDate': '' + this.draft.premiumToDate,
      'lossFromDate': '' + this.draft.lossFromDate,
      'lossToDate': '' + this.draft.lossToDate,
      'jurisdiction': this.draft.jurisdiction.trim(),
      'detailedCriteria': this.draft.detailedCriteria.trim(),
      'eligibilityRequirement': this.draft.eligibilityRequirement.trim(),
      'status': this.draft.status,
      'isShowParticipants': this.draft.isShowParticipants,
      'extractionPatternID': pattern,
      'comments': '' + this.draft.comments.trim()
    };
    console.log('both fields');
    console.log(dataobject);
    const uri = '/update-data-call';
    this.isSpinner = true;
    this.dataService.putData(uri, dataobject)
      .subscribe(resp => {
        this.isSpinner = false;
        this.isSuccess = true;
        this.type = MESSAGE.SET_ALLFIELDS_SUCCESS.type;
        this.title = MESSAGE.SET_ALLFIELDS_SUCCESS.title;
        this.message = MESSAGE.SET_ALLFIELDS_SUCCESS.message;
        setTimeout(() => {
          this.showModal();
        }, 10);
        this.isDelivery = false;
        this.isForumUrl = true;
        this.isPattern = true;
        this.appDatacallHistory.getDatacallHistory(this.draft.id, this.draft.version);
      },
        error => {
          this.isSpinner = false;
          this.isError = true;
          const messageBundle = MESSAGE.SET_ALLFIELDS_FAIL;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);

        });
  }
  updateFields(tempdate, tempurl, tempPattern) {
    if ((tempdate != undefined || tempdate != null) && (tempurl && tempurl !== '') && (tempPattern && tempPattern !== '')) {
      this.hasAllFields = true;
      this.draft.forumURL = tempurl;
      console.log('calling upateAllField with data ' + tempdate + ' ' + tempurl + ' ' + tempPattern);
      this.updateAllFields(tempdate, tempurl, tempPattern);
      this.tempDate = null;
      this.tempURL = '';
      this.tempPattern = '';
    } else if ((tempdate != undefined || tempdate != null)
      && (tempurl == undefined || tempurl == '') && (tempPattern == undefined || tempPattern == '')) {
      console.log('calling deliverydate')
      this.updateDeliveryDate({
        proposedDeliveryDate: tempdate
      });
      this.tempDate = null;
      this.tempPattern = null;;
    } else if ((tempdate == undefined || tempdate == null)
      && (tempurl != undefined || tempurl != '') && (tempPattern == undefined || tempPattern == '')) {
      console.log('calling forumURL');
      this.draft.forumURL = tempurl;
      setTimeout(() => {
        this.updateForum();
      }, 100);
      this.tempURL = '';
      this.tempPattern = '';
      this.tempDate = null;
    } else if ((tempdate == undefined || tempdate == null)
      && (tempurl == undefined || tempurl == '') && (tempPattern != undefined || tempPattern != '')) {
      console.log('calling pattern ');
      this.updatePattern(tempPattern);
      this.tempURL = '';
      this.tempPattern = '';
      this.tempDate = null;
    } else if ((tempdate != undefined || tempdate != null)
      && (tempurl == undefined || tempurl == '') && (tempPattern != undefined || tempPattern != '')) {
      console.log('calling deliveryDate and pattern ');
      this.updateDateAndPattern(tempdate, tempPattern);
      this.tempURL = '';
      this.tempPattern = '';
      this.tempDate = null;
    } else if ((tempdate != undefined || tempdate != null)
      && (tempurl != undefined || tempurl != '') && (tempPattern == undefined || tempPattern == '')) {
      console.log('calling deliveryDate and forumURL ');
      this.updateDateAndForum(tempdate, tempurl);
      this.tempURL = '';
      this.tempPattern = '';
      this.tempDate = null;
    } else if ((tempdate == undefined || tempdate == null)
      && (tempurl != undefined || tempurl != '') && (tempPattern != undefined || tempPattern != '')) {
      console.log('calling pattern and forumURL ');
      this.updatePatternAndForum(tempPattern, tempurl);
      this.tempURL = '';
      this.tempPattern = '';
      this.tempDate = null;
    }
  }

  // update the report by adding report URL and report hash for the current issued draft version
  updateReport(event) {
    const uri = '/report ';
    this.isSpinner = true;
    this.dataService.postData(uri, event)
      .subscribe(response => {
        this.isSpinner = false;
        this.isSuccess = true;
        this.title = MESSAGE.HASH_UPDATE_SUCCESS.title;
        this.message = MESSAGE.HASH_UPDATE_SUCCESS.message;
        this.type = MESSAGE.HASH_UPDATE_SUCCESS.type;
        setTimeout(() => {
          this.showModal();
        }, 500);
        this.appUpdateReport.getReports(true);
        this.appDatacallHistory.getDatacallHistory(this.draft.id, this.draft.version);
        this.getReports();
      },
        error => {
          console.log('duplicate report:: ', error.message);
          this.isSpinner = false;
          this.isError = true;
          if (error === 'Unauthorized') {
            this.type = MESSAGE.ACTIVITY_FAIL.Unauthorized.type;
            this.message = MESSAGE.ACTIVITY_FAIL.Unauthorized.message;
            this.title = MESSAGE.ACTIVITY_FAIL.Unauthorized.title;
            setTimeout(() => {
              this.showSessionModal();
            }, 100);
          } else if (error.message.search("Report already exist") > -1) {
            this.type = MESSAGE.DUPLICATE_HASH.type;
            this.message = MESSAGE.DUPLICATE_HASH.message;
            this.title = MESSAGE.DUPLICATE_HASH.title;
            setTimeout(() => {
              this.showModal();
            }, 500);
          } else {
            this.type = 'error';
            this.message = 'Error';
            this.title = 'Error';
            setTimeout(() => {
              this.showModal();
            }, 500);
          }
        });
  }

  // Format the date to mm/dd/yyyy format
  formatDate(d) {
    console.log('date format');
    const date = new Date(d);
    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    return d = mm + '/' + dd + '/' + yyyy;
  }

  // Format date in mm dd yyyy | hr:min:ss format
  formatDate2(d) {
    const date = new Date(d);
    // const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    //                       'July', 'August', 'September', 'October', 'November', 'December'];
    let dd: any = date.getDate();
    let ss = 'AM';
    const mm: any = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    let hr: any = date.getHours();
    let min: any = date.getMinutes();
    if (dd < 10) { dd = '0' + dd; }
    // if ( mm < 10) { mm = '0' + mm ; }
    if (hr == 12) {
      ss = 'PM';
    } else if (hr > 12) {
      hr = hr - 12;
      ss = 'PM';
    }
    if (hr < 10) { hr = '0' + hr; }
    if (min < 10) { min = '0' + min; }
    // return d = dd + '/' + mm + '/' + yyyy;
    return d = mm + '/' + dd + '/' + yyyy + ' | ' + hr + ':' + min + ' ' + ss;
  }

  // Provide consent to the issued data call
  toggleAction() {
    // console.log('isconsent::: ', this.isConsent);
    if (this.isConsent) {
      this.isConsent = false;
      this.action = 'Consent';
      const uri = '/consent';
      const requestData = {
        "datacallID": this.draft.id,
        "dataCallVersion": this.draft.version,
        "carrierID": this.loginResult.attributes.organizationId,
        "carrierName": this.loginResult.username,
        "createdBy": this.loginResult.username
      };
      this.isSmallSpinner = true;
      this.dataService.postData(uri, requestData)
        .subscribe(response => {
          this.isSmallSpinner = false;
          // console.log('consent response: ', response);
          this.isConsent = false;
          this.isSuccess = true;
          this.type = 'success';
          this.message = 'Your ' + this.action.toLowerCase() + ' has been recorded. The ' + this.action.toLowerCase() + ' count will be updated shortly.';
          this.title = 'Consent Recorded';
          setTimeout(() => {
            this.showModal();
          }, 10);
          this.getConsentCount();
        }, error => {
          this.isSmallSpinner = false;
          this.isError = true;
          const messageBundle = MESSAGE.COMMON_ERROR;
          const locale = "en-US";
          this.appModal.handleNotification(error, messageBundle, locale);
          console.log(error);
        })
    }
  }

  // Get the names of the carriers who have provided the consent to the data call
  viewCarriers(action) {
    let uri;
    let data;
    let res;
    if (action === 'Liked') {
      uri = '/list-likes-by-data-call/' + this.draft.id + '/' + this.draft.version;
    } else if (action === 'Consented') {
      uri = '/list-consents-by-data-call/' + this.draft.id + '/' + this.draft.version;
    }
    this.isSpinner = true;
    this.dataService.getData(uri)
      .subscribe(response => {
        console.log('list response #### ', JSON.parse(response));
        res = JSON.parse(response);
        if (res === null) {
          res = [];
        }
        if (action === 'Consented') {
          data = {
            name: this.draft.name,
            carrierList: res,
            action: action,
            type: 'Carriers'
          };
        } else if (action === 'Liked') {
          data = {
            name: this.draft.name,
            orgList: res,
            action: action,
            type: 'Organizations'
          };
        }
        this.type = 'info';
        this.data = data;
        this.message = '';
        this.title = '';
        this.isData = true;
        setTimeout(() => {
          this.appModal.openInfoModal(this.title, this.message, this.type, this.data, this.isData);
        }, 10);
        this.isSpinner = false;
      }, error => {
        this.isSpinner = false;
        const messageBundle = MESSAGE.NAME_FETCH_FAIL;
        const locale = "en-US";
        this.appModal.handleNotification(error, messageBundle, locale);

      })
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

  getExtrationPattern() {
    const uri = '/list-extraction-patterns';
    this.dataService.getData(uri)
      .subscribe(response => {
        // console.log('list response #### ', JSON.parse(response));
        this.extrationPatterList = JSON.parse(response);
        this.extrationPatterList.sort((a, b) => a.extractionPatternID.localeCompare(b.extractionPatternID));
        // console.log("this.extrationPatterList :- ", this.extrationPatterList);

        let patterns = [];
        this.extrationPatterList.forEach(el => {
          if (!patterns.includes(el.extractionPatternID)) {
            patterns.push(el.extractionPatternID);
          }
        });
        let _formattedPatterns = [];
        patterns.forEach(pattern => {
          let _arr = this.extrationPatterList.filter(el => el.extractionPatternID == pattern);
          let _pattern = _arr[0];
          _arr.forEach((arr, index) => {
            _pattern[`viewDefinition_${arr.dbType}`] = arr.viewDefinition;
          })
          _formattedPatterns.push(_pattern);
        });

        this.extrationPatterList = _formattedPatterns;
        // console.log("this.extrationPatterList _formattedPatterns :- ", this.extrationPatterList);
        this.extrationPatterList.forEach(element => {
          // console.log("getExtrationPattern element :- ", element);
          if (this.draft.extractionPatternID === element.extractionPatternID) {
            this.draft.extractionPatternName = element.extractionPatternName;
          }
        });
      }, error => {
        this.isSpinner = false;
        const messageBundle = MESSAGE.NAME_FETCH_FAIL;
        const locale = "en-US";
        this.appModal.handleNotification(error, messageBundle, locale);
      })
  }

  getExtrationPatternById() {
    let filterLIST = [];
    this.extrationPatterList.forEach(element => {
      if (this.draft.extractionPatternID === element.extractionPatternID) {
        filterLIST.push(element);
      }
    });
    // console.log("filterLIST :- ", filterLIST);
    this.appModal.openPatternDetails(filterLIST, 'info');

  }


  // getExtrationPatternById(){
  //   const uri = '/extraction-patterns';
  //   console.log(this.draft.extractionPatternID)
  //   const requestData = {
  //     "id": [this.draft.extractionPatternID]
  //   };
  //   this.dataService.postData(uri, requestData)
  //                   .subscribe((response: any) => {
  //                     // console.log('getExtrationPatternById ', response)
  //                     this.appModal.openPatternDetails(JSON.parse(response), 'info');
  //                   }, error => {
  //                     this.isSpinner = false;
  //                     const messageBundle=MESSAGE.NAME_FETCH_FAIL;
  //                     const locale="en-US";
  //                     this.appModal.handleNotification(error,messageBundle,locale);
  //                   })
  // }

  showPattern() {
    this.appModal.openPattern(this.extrationPatterList, 'info');
  }
}
