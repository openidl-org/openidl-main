// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { StorageService } from './../../services/storage.service';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from './../../services/auth.service';
import { MESSAGE } from './../../../assets/messageBundle';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // Reference to the child component
  @ViewChild(ModalComponent) appModal: ModalComponent;
  // Event emitted to the parent component
  @Output() create = new EventEmitter();
  @Output() fieldChangeEvent = new EventEmitter();
  // Property passed to the component
  @Input() isClone;

  // Models to store the data
  public dateRange: Date[];
  public lossdateRange: Date[];
  public deadline: any;
  public datacallObject = {};
  LOBs = [];

  // Models for reactive form
  name: any;
  description: any;
  purpose: any;
  togglecheck: any;
  business: any;
  intent: any;
  eligibility: any;
  criteria: any;
  jurisdiction: any;
  submitted = false;
  registerForm: FormGroup;

  // variables to manipulate date ranges
  minDeadline: any;
  maxStartdate: any;
  maxEnddate: any;

  // props passed to modal component
  title: any;
  message: any;
  type: any;


  // Flags to conditionally handle expressions
  isSpinner: Boolean = false;
  isError: Boolean = false;
  isSuccess: Boolean = false;
  isopen: Boolean = false;
  isSmallSpinner: Boolean = false;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private storageService: StorageService,
              private authService: AuthService) {
   }

  ngOnInit() {
    // Conditionally set the jurisdiction
    const jurisdiction = this.storageService.getItem('jurisdiction')
    if (jurisdiction) {
      this.jurisdiction = jurisdiction;
    } else {
      this.jurisdiction = 'Ohio';
    }
    // Fetch the data and show in case of cloned data call
    if (this.isClone) {
      const datacall = this.storageService.getItem('datacalldraft');
      const fromDate = new Date(datacall.premiumFromDate);
      const todate = new Date(datacall.premiumToDate);
      const lossFromDate = new Date(datacall.lossFromDate);
      const lossToDate = new Date(datacall.lossToDate);
      const dateRangeArr = [fromDate , todate];
      const lossdateRangeArray = [lossFromDate, lossToDate];
      const deadline = new Date(datacall.deadline);
      this.deadline = deadline;
      this.dateRange = dateRangeArr;
      this.lossdateRange = lossdateRangeArray;
      if(datacall.dateRange){
        this.dateRange = datacall.dateRange;
      }
      if(datacall.lossdateRange){
        this.lossdateRange = datacall.lossdateRange;
      }

      // If user jurisdiction does not match with the data call jurisdiction then assign user jurisdiction to datacall's jurisdiction
      const userJurisdiction = this.storageService.getItem('jurisdiction');
      if(userJurisdiction && userJurisdiction.toLowerCase() != datacall.jurisdiction.toLowerCase()) {
        datacall.jurisdiction = userJurisdiction;
      }

      // console.log('dateRangeArr ::::: ', dateRangeArr);
      const isShowParticipants = datacall.isShowParticipants === 'true' ? true : false;
      this.registerForm = this.formBuilder.group({
        name: [datacall.name, Validators.required],
        description: [datacall.description, Validators.required],
        dateRange: [this.dateRange, [Validators.required]],
        lossdateRange: [this.lossdateRange, [Validators.required]],
        deadline: [deadline, [Validators.required]],
        purpose: [datacall.purpose, [Validators.required]],
        togglecheck: [isShowParticipants],
        business: [datacall.lineOfBusiness, [Validators.required]],
        criteria: [datacall.detailedCriteria, [Validators.required]],
        intent: [datacall.intentToPublish],
        eligibility: [datacall.eligibilityRequirement, [Validators.required]],
        jurisdiction: [datacall.jurisdiction]
    });
    console.log('form :::::: ', this.registerForm);
    } else {
      const startdateString = '01/01/' + (new Date()).getFullYear();
      const enddateString = '12/31/' + (new Date()).getFullYear();
      const startdate = new Date(startdateString);
      const enddate = new Date (enddateString);
      console.log(startdate, enddate);
      const dateRangeArr = [startdate, enddate];
      const lossdateRangeArr = [startdate, enddate];
      this.dateRange = [startdate, enddate];
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        dateRange: [dateRangeArr, [Validators.required]],
        lossdateRange: [lossdateRangeArr, [Validators.required]],
        deadline: ['', [Validators.required]],
        purpose: ['', [Validators.required]],
        togglecheck: [true],
        business: ['', [Validators.required]],
        criteria: ['', [Validators.required]],
        intent: ['Yes'],
        eligibility: ['', [Validators.required]],
        jurisdiction: [this.jurisdiction]
    });
    }

    const storedLOBs = JSON.parse(sessionStorage.getItem('LOBs'));
    // Check for cached LOBs or get from REST API
    if(storedLOBs) {
      console.log('storedLOBs ', storedLOBs);
      this.LOBs = storedLOBs;
    } else {
      this.getLOBs();
    }
  }

  // Get LOBs using REST API
  getLOBs() {
    const uri = '/lob';
   this.isSmallSpinner = true;
    this.dataService.getData(uri)
        .subscribe(response => {
          this.isSmallSpinner = false;
          console.log('small spinner ', this.isSmallSpinner);
          let lob = JSON.parse(response);
          console.log(lob);
          this.LOBs = lob.lob;
          // Cache LOBs once received
          sessionStorage.setItem('LOBs', JSON.stringify(this.LOBs));
        },
        error => {
          console.log(error);
          this.isSpinner = false;
          this.isSmallSpinner = false;
          this.isError = true;
          const messageBundle=MESSAGE.COMMON_ERROR;
          const locale="en-US";
          this.appModal.handleNotification(error,messageBundle,locale);
        });
  }

  // Following getters are validators for reactive form fields
  get namefield() {
    return this.registerForm.get('name');
  }
  get descriptionfield() {
    return this.registerForm.get('description');
  }
  get fromdatefield() {
    return this.registerForm.get('dateRange');
  }
  get todatefield() {
    return this.registerForm.get('dateRange');
  }
  get lossfromdatefield() {
    return this.registerForm.get('lossdateRange');
  }
  get losstodatefield() {
    return this.registerForm.get('lossdateRange');
  }
  get purposefield() {
    return this.registerForm.get('purpose');
  }
  get togglecheckfield() {
    return this.registerForm.get('togglecheck');
  }
  get businessfield() {
    return this.registerForm.get('business');
  }
  get criteriafield() {
    return this.registerForm.get('criteria');
  }
  get deadlinefield() {
    return this.registerForm.get('deadline');
  }
  get intentfield() {
    return this.registerForm.get('intent');
  }
  get eligibilityfield() {
    return this.registerForm.get('eligibility');
  }
  get jurisdictionfield() {
    return this.registerForm.get('jurisdiction');
  }

  // Set data call to be issued
  issueDatacall(value) {
    if (!this.registerForm.valid) {
      this.isError = true;
      this.type = MESSAGE.MANDATORY_FIELDS_ERROR.type;
      this.message = MESSAGE.MANDATORY_FIELDS_ERROR.message;
      this.title = MESSAGE.MANDATORY_FIELDS_ERROR.title;
    } else {
      this.title = MESSAGE.DATACALL_ISSUE_SUCCESS.title;
          this.message = MESSAGE.DATACALL_ISSUE_SUCCESS.message;
          this.type = MESSAGE.DATACALL_ISSUE_SUCCESS.type;
      this.createDatacall(value, 'ISSUED');
    }
  }

  // Set data call to be saved as a draft
  saveDatacall(value) {
    if (!this.registerForm.valid) {

      this.isError = true;
      this.type = MESSAGE.MANDATORY_FIELDS_ERROR.type;
      this.message = MESSAGE.MANDATORY_FIELDS_ERROR.message;
      this.title = MESSAGE.MANDATORY_FIELDS_ERROR.title;
    } else {
      this.title = MESSAGE.DATACALL_DRAFT_SUCCESS.title;
          this.message = MESSAGE.DATACALL_DRAFT_SUCCESS.message;
          this.type = MESSAGE.DATACALL_DRAFT_SUCCESS.type;
      this.createDatacall(value, 'DRAFT');
    }
  }

  // Close the error notification
  closeNotify() {
    this.isError = false;
  }

  // Create the data call eithr in draft state or issued state
  createDatacall(value, status) {
    console.log('value intent ', value.intent);

// Create the data call object to be posted to the create data call api
    this.datacallObject = {
      'name': value.name.trim(),
      'intentToPublish': value.intent,
      'description': value.description.trim(),
      'purpose': value.purpose.trim(),
      'lineOfBusiness': value.business.trim(),
      'premiumFromDate': value.dateRange[0],
      'premiumToDate':  value.dateRange[1],
      'lossFromDate': value.lossdateRange[0],
      'lossToDate':  value.lossdateRange[1],
      'jurisdiction': value.jurisdiction.trim(),
      'detailedCriteria': value.criteria.trim(),
      'eligibilityRequirement': value.eligibility.trim(),
      'status': status,
      'isShowParticipants':  value.togglecheck,
      'deadline':  value.deadline
    };

    // Set the intent to publish boolean value as per its selected value
    if(value.intent == "Yes") {
      value.intent = true;
      this.datacallObject['intentToPublish'] = true;
    } else {
      value.intent = false;
      this.datacallObject['intentToPublish'] = false;
    }


    const uri = '/data-call';
    this.isSpinner = true;
    console.log('Trimmed data', this.datacallObject);
    this.dataService.postData(uri, this.datacallObject)
        .subscribe(response => {
          this.isSpinner = false;
          this.isSuccess = true;
          this.create.emit();
          setTimeout(() => {
            this.showModal();
          }, 500);
          console.log('DATA call creation response: ', response);
        },
        error => {
          console.log(error);
          this.isSpinner = false;
          this.isError = true;
          const messageBundle=MESSAGE.COMMON_ERROR;
          const locale="en-US";
          this.appModal.handleNotification(error,messageBundle,locale);
        });
  }

  // Show the modal according to success, error or info using the child modal component's open modal method
  showModal() {
   this.appModal.openModal(this.title, this.message, this.type);
  }
  // Show the session expired modal along with the option to login using child modal component's method
  showSessionModal() {
    this.appModal.openSessionModal(this.title, this.message, this.type, true);
  }

  // Reset required flags on closing the modal
  modalClose() {
    this.isSuccess = false;
    this.isError = false;
    this.isopen = false;
  }

  // Redirects to login using authService's logout method
  redirectLogin() {
    this.isSuccess = false;
    this.isError = false;
    this.isopen = false;
    this.authService.logout('login')
    .subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
   }

  // Conditionally set the deadline min and max range
  deadlineSet(type) {
    if (type === 'enddate') {
    this.minDeadline = this.dateRange[1];
    } else if (type === 'deadline') {
      this.maxEnddate = this.deadline;
      this.maxStartdate = this.deadline;
    }
    if (type === 'startdate') {
      this.minDeadline = this.dateRange[0];
    }
  }

  fieldChange() {
    this.fieldChangeEvent.emit();
  }

}
