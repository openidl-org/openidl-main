// SPDX-License-Identifier: Apache-2.0
import { version } from 'punycode';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { StorageService } from './../../services/storage.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from './../../services/auth.service';
import { MESSAGE } from './../../../assets/messageBundle';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  // Events to be emitted to the parent component
  @Output() create = new EventEmitter();
  @Output() fail = new EventEmitter();
  @Output() issued = new EventEmitter();
  @Output() cloneDatacallEvent = new EventEmitter();
  @Output() abandonDatacallEvent = new EventEmitter();
  @Output() fieldChangeEvent = new EventEmitter();
  @Output() noFieldChangeEvent = new EventEmitter();

  // Reference to access the child component
  @ViewChild(ModalComponent) appModal: ModalComponent;

  // Models to capture data
  public dateRange = [];
  public dateRangeView = [];
  public lossdateRange = [];
  public lossdateRangeView = [];
  public deadline: any;
  public datacallObject = {};
  model = {
          id: '',
          version: '',
          name: '',
          description: '',
          purpose: '',
          isShowParticipants: true,
          lineOfBusiness: '',
          intentToPublish: '',
          eligibilityRequirement: '',
          detailedCriteria: '',
          jurisdiction: '',
          comments: '',
          deadline: '',
          fromdate: '',
          toDate: '',
          lossfromdate: '',
          losstoDate: '',
          proposedDeliveryDate: '',
          forumurl: ''
          };
  currentDraft = {};
  registerForm: FormGroup;
  checked = 0;
  draftlist = [];
  loginResult: any;
  title: any;
  message: any;
  type: any;
  role; datacall;
  buttonText: any = 'Like Data Call';
  forumurl: String = '';
  LOBs = [];
  consentCount: any;
  likeCount: any;
  data: any;
  action: any;
  recordTime: any;
  userJurisdiction: any;

  // Variables to manipulate date ranges
  minDeadline: any;
  maxStartdate: any;
  maxEnddate: any;

  // Flags to conditionally handle expressions
  isSpinner: Boolean = false;
  isSmallSpinner: Boolean = false;
  isFailed: Boolean = false;
  isAbandon: Boolean = false;
  isReadonly: Boolean = false;
  isForumUrl : Boolean = false;
  isSuccess: Boolean = false;
  isError: Boolean = false;
  isopen: Boolean = false;
  isReg: Boolean = false;
  isStatAgent: Boolean = false;
  isLikeCountPositive: Boolean = false;
  isCarr: Boolean = false;
  isViewAbandoned: Boolean = false;
  isLike: Boolean = true;
  isData: Boolean = false;
  isIdenticalDraft: Boolean = false;
  isDraft: Boolean =  false;
  isRecorded: Boolean = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService,
              private storageService: StorageService,
              private authService: AuthService) {
   }

  ngOnInit() {

    console.log('update form compo open');
    // Setting minimum date for deadline
    this.minDeadline = this.dateRange[1];

    // Getting view abandoned status to conditionally show the abandoned view
    const viewAbandoned = this.storageService.getItem('viewAbandoned');

    // storing org id, role, username etc
    this.loginResult = this.storageService.getItem('loginResult');

    // Conditionally setting the abandoned view
    if( viewAbandoned && viewAbandoned === 'true') {
      this.isViewAbandoned = true;
    } else {
      this.isViewAbandoned = false;
    }

    // Conditionally setting the jurisdiction
    if (this.storageService.getItem('jurisdiction')) {
      this.model.jurisdiction = this.storageService.getItem('jurisdiction');
    } else {
      this.model.jurisdiction = 'Ohio';
    }

    // Storing role to toggle roles related flags
    this.role = this.storageService.getItem('role');

    // Conditionally setting the regulator flag
    if (this.role && this.role === 'regulator') {
      this.isReg = true;
    } else {
      this.isReg = false;
    }
    // Conditionally setting the stat agent flag
    if (this.role && this.role === 'statagent') {
      this.isStatAgent = true;
    } else {
      this.isStatAgent = false;
    }
    // Conditionally setting the carrier flag
    if (this.role && this.role === 'carrier') {
      this.isCarr = true;
    } else {
      this.isCarr = false;
    }

    // Storing the current data call details
    this.datacall = this.storageService.getItem('datacall');

    // Get logged in user's jurisdiction
    this.userJurisdiction = this.storageService.getItem('jurisdiction');

    // Setting flags and models if regulator is viewing an abandoned data call
    if(this.role && this.role === 'regulator' && this.isViewAbandoned) {
      this.isReadonly = true;
      console.log('First if case');
      if(this.datacall.forumURL == '' || this.datacall.forumURL == 'undefined' || this.datacall.forumURL == undefined){
        console.log('forum url is blank');
        this.isForumUrl = false;
      } else{
        console.log('forum url is not blank');
        this.forumurl =  this.datacall.forumURL;
        this.isForumUrl = true;
      }
      this.registerForm = this.formBuilder.group({
        name: [{value: '', disabled: true}, Validators.required],
        description: [{value: '', disabled: true}, Validators.required],
        dateRange: [{value: '', disabled: true}, [Validators.required]],
        lossdateRange: [{value: '', disabled: true}, [Validators.required]],
        deadline: [{value: '', disabled: true}, [Validators.required]],
        purpose: [{value: '', disabled: true}, [Validators.required]],
        isShowParticipants: [{value: true, disabled: true}],
        lineOfBusiness: [{value: '', disabled: true}, [Validators.required]],
        detailedCriteria: [{value: '', disabled: true}, [Validators.required]],
        intentToPublish: [{value: '', disabled: true}, [Validators.required]],
        eligibilityRequirement: [{value: '', disabled: true}, [Validators.required]],
        jurisdiction: [this.model.jurisdiction],
        comments: [{value: '', disabled: true}]
    });
    }
    // Setting flags and models if regulator is viewing an issued data call
    else if (this.role && this.role === 'regulator' && this.datacall.isLocked !== true &&
            ((this.datacall.jurisdiction).toLowerCase() == this.userJurisdiction.toLowerCase())) {
      this.isReadonly = false;
      console.log('Second if case', this.datacall.isLocked);
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        dateRange: ['', [Validators.required]],
        lossdateRange: ['', [Validators.required]],
        deadline: ['', [Validators.required]],
        purpose: ['', [Validators.required]],
        isShowParticipants: [true],
        lineOfBusiness: ['', [Validators.required]],
        detailedCriteria: ['', [Validators.required]],
        intentToPublish: ['', [Validators.required]],
        eligibilityRequirement: ['', [Validators.required]],
        jurisdiction: [this.model.jurisdiction],
        comments: ['']
    });
    } else {
      this.isReadonly = true;
      console.log(this.datacall.forumURL);
      if((this.datacall.forumURL == '')||(this.datacall.forumURL == 'undefined') || this.datacall.forumURL == undefined){
        console.log('forum url is blank');
        this.isForumUrl = false;
      } else{
        console.log('forum url is not blank');
        this.forumurl =  this.datacall.forumURL;
        this.isForumUrl = true;
      }
      if(this.datacall.status === 'DRAFT'){
        this.isDraft =  true;
      }
      else{
        this.isDraft = false;
      }
      this.registerForm = this.formBuilder.group({
        name: [{value: '', disabled: true}, Validators.required],
        description: [{value: '', disabled: true}, Validators.required],
        dateRange: [{value: '', disabled: true}, [Validators.required]],
        lossdateRange: [{value: '', disabled: true}, [Validators.required]],
        deadline: [{value: '', disabled: true}, [Validators.required]],
        purpose: [{value: '', disabled: true}, [Validators.required]],
        isShowParticipants: [{value: true, disabled: true}],
        lineOfBusiness: [{value: '', disabled: true}, [Validators.required]],
        detailedCriteria: [{value: '', disabled: true}, [Validators.required]],
        intentToPublish: [{value: '', disabled: true}, [Validators.required]],
        eligibilityRequirement: [{value: '', disabled: true}, [Validators.required]],
        jurisdiction: [this.model.jurisdiction],
        comments: [{value: '', disabled: true}]
    });
    }

  // Fetch different draft versions of a data call
  this.getDrafts();
  }

  // Fetch LineOfBusiness list
  getLOBs() {
    const uri = '/lob';
   // this.isSpinner = true;
    console.log('Trimmed data', this.datacallObject);
    this.dataService.getData(uri)
        .subscribe(response => {
          setTimeout(()=>{
            this.isSpinner = false;
          },1000);
          console.log('LOBs response: ', response);
          let lob = JSON.parse(response);
          console.log(lob);
          this.LOBs = lob.lob;
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

  // Fetch multiple draft versions for a data call
  getDrafts() {
    const api = '/data-call-versions/' + this.storageService.getItem('datacall').id;
    const uri = api ;
    this.isSpinner = true;
    this.dataService.getData(uri)
                    .subscribe(response => {
     console.log('draft list', JSON.parse(response));
     this.draftlist = JSON.parse(response);
     console.log(this.draftlist);
      this.draftlist.forEach(element => {
        element.updatedTs = this.formatDate2(element.updatedTs);
      });

      this.showDetails(this.draftlist[0], 0);

      // Emit no field change event to reset hasFieldChange flag in the parent component
      this.noFieldChangeEvent.emit();
    },
    error => {
      this.isSpinner = false;
      this.isError = true;
      this.isFailed = true;
      const messageBundle=MESSAGE.DATACALL_VERSION_FETCH_ERROR;
      const locale="en-US";
      this.appModal.handleNotification(error,messageBundle,locale);

    });
    this.getLOBs();
  }

  // Format date in mm dd yyyy | hr:min:ss format
  formatDate2 (d) {
    const date = new Date(d);
    // const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    //                       'July', 'August', 'September', 'October', 'November', 'December'];
    let dd: any = date.getDate();
    let ss = 'AM';
    const mm: any = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    let hr: any = date.getHours();
    let min: any = date.getMinutes();
    if (dd < 10) { dd = '0' + dd ; }
    // if ( mm < 10) { mm = '0' + mm ; }
    if(hr == 12){
      ss = 'PM';
    } else if(hr>12){
      hr = hr-12 ;
      ss = 'PM';
    }
    if (hr < 10) { hr = '0' + hr; }
    if (min < 10) { min = '0' + min; }
    // return d = dd + '/' + mm + '/' + yyyy;
    return d = mm + '/' + dd + '/' + yyyy + ' | ' + hr+ ':' + min + ' ' +ss;
  }

  // Show draft details of selected draft version
  showDetails(draft, index) {
    this.checked = index;
    this.dateRange.length = 0;
    // console.log('Draft: ', draft);
    this.model = Object.assign({}, draft);
    // console.log('Model::: ', this.model);
    this.currentDraft = this.createDraftCopy(draft);
    // console.log('is show participant in draft', draft.isShowParticipants);
    this.dateRange = [draft.premiumFromDate, draft.premiumToDate];
    this.lossdateRange = [draft.lossFromDate, draft.lossToDate];
    this.lossdateRangeView = [this.formatDate(draft.lossFromDate), this.formatDate(draft.lossToDate)]
    this.dateRangeView = [this.formatDate(draft.premiumFromDate), this.formatDate(draft.premiumToDate)]
    // console.log('########## intent ', draft.intentToPublish);
    if(draft.intentToPublish == true || draft.intentToPublish == 'Yes')
    {
      this.model.intentToPublish = 'Yes';
    }
    else if(draft.intentToPublish == false || draft.intentToPublish == 'No'){
      this.model.intentToPublish = "No";
    }

    this.model.deadline = draft.deadline;

    if (this.isReadonly === true) {
      if (this.model.fromdate) { this.model.fromdate = this.formatDate(this.model.fromdate); } else { this.model.fromdate = ''; }
      if (this.model.toDate) { this.model.toDate = this.formatDate(this.model.toDate); } else { this.model.toDate = ''; }
      if (this.model.lossfromdate) { this.model.lossfromdate = this.formatDate(this.model.lossfromdate); } else { this.model.lossfromdate = ''; }
      if (this.model.losstoDate) { this.model.losstoDate = this.formatDate(this.model.losstoDate); } else { this.model.losstoDate = ''; }
      if (this.model.proposedDeliveryDate) {
        if (this.model.proposedDeliveryDate === '0001-01-01T00:00:00Z') {
          this.model.proposedDeliveryDate = '';
        } else {
          this.model.proposedDeliveryDate = this.formatDate(this.model.proposedDeliveryDate);
        }
      } else {
        this.model.proposedDeliveryDate = '';
      }
      if (this.model.deadline) { this.model.deadline = this.formatDate(this.model.deadline); } else { this.model.deadline = ''; }
    }
    if (this.dateRange !== undefined || this.dateRange.length !== 0) {
      if (this.dateRange[0] && !this.dateRange[1] ) {
        this.minDeadline = this.dateRange[0];
      } else  {
        this.minDeadline = this.dateRange[1];
      }
    }
    if (this.model.deadline !== undefined || this.model.deadline !== '') {
      this.maxStartdate = this.model.deadline;
      this.maxEnddate = this.model.deadline;
    }
    this.getConsentCount();
   }

   // check whether current version is liked
   getLikeStatus() {
    const likeUri = '/like-status-data-call/'+ this.datacall.id + '/' + this.model.version + '/'+ this.loginResult.attributes.organizationId
    this.isSmallSpinner = true;
    this.dataService.getData(likeUri)
    .subscribe(response => {
      const res = JSON.parse(response)
      // console.log('like status response :::: ', res);
      if(res == 'null' || res == null) {
        this.isLike = true;
        this.buttonText = 'Like Data Call';
        this.isRecorded = false;
        this.recordTime = '';
      } else if(res[0].like.liked) {
        this.isLike = false;
        this.buttonText = 'Unlike Data Call';
        this.isRecorded = true;
        this.recordTime = this.formatDate2(res[0].like.updatedTs);
        this.action = 'Like';
      } else if(!(res[0].like.liked)) {
        this.isLike = true;
        this.buttonText = 'Like Data Call';
        this.isRecorded = true;
        this.recordTime = this.formatDate2(res[0].like.updatedTs);
        this.action = 'Unlike';
      }
      setTimeout(()=>{
        this.isSpinner = false;
      },1000);
      this.isSmallSpinner = false;
    }, error => {
      this.isSpinner = false;
      this.isError = true;
      this.isSmallSpinner = false;
      const messageBundle=MESSAGE.COMMON_ERROR;
      const locale="en-US";
      this.appModal.handleNotification(error,messageBundle,locale);
    })
   }

   // To fetch data call consent count
   getConsentCount() {
    const uri = '/consent-count/' + this.model.id + '/' + this.model.version;
    this.isSmallSpinner = true;
    this.dataService.getData(uri)
                    .subscribe(response => {
                      // console.log('consent count ::: ', response);
                      this.consentCount = JSON.parse(response).delta;
                      this.getLikeCount();
                    })
   }

   // To fetch data call likes count
   getLikeCount() {
    const uri = '/like-count/' + this.model.id + '/' + this.model.version;
    this.dataService.getData(uri)
                    .subscribe(response => {
                      // console.log('like count ::: ', response);
                      this.likeCount = JSON.parse(response).delta;
                      console.log('isLikeCountPositive ', this.isLikeCountPositive);
                      console.log('this.likeCount ', this.likeCount);
                      if(this.likeCount > 0){
                        this.isLikeCountPositive = true
                      }
                      this.isSmallSpinner = false;
                      if(this.role !== 'regulator') {
                        this.getLikeStatus();
                      }
                    })
   }

   // set min and max values for deadline
   deadlineSet(type) {
    if (type === 'enddate') {
    this.minDeadline = this.dateRange[1];
    } else if (type === 'deadline') {
      this.maxEnddate = this.model.deadline;
      this.maxStartdate = this.model.deadline;
    }
    if (type === 'startdate') {
      this.minDeadline = this.dateRange[0];
    }
}

// Handle show participants check according to the readonly flag
toggleIsShowParticipants(event)  {
  if (this.isReadonly === true) {
    return false;
  } else {
    // console.log('event::: ', event);
    if (event.target.checked === true) {
      this.model.isShowParticipants = true;
    } else {
      this.model.isShowParticipants = false;
    }
  }
}

// Issue the selected data call draft version
issueDatacall(value) {
  const commentField = this.registerForm.get('comments');
  let shouldCreateNewVersion: Boolean = false;
  // If form values are not changed remove required attr of comments field else add it.
  if(this.checkDraft(value)){
    console.log('new version will not be created and issued as it is')
    commentField.clearValidators();
    commentField.updateValueAndValidity();
    shouldCreateNewVersion = false;
  } else{
    console.log('create a new version and issue ');
    commentField.setValidators([Validators.required]);
    commentField.updateValueAndValidity();
    shouldCreateNewVersion = true;
  }

  // check for validations else issue it
  if (!this.registerForm.valid) {
    this.isError = true;
    this.type = MESSAGE.MANDATORY_FIELDS_ERROR.type;
    this.message = MESSAGE.MANDATORY_FIELDS_ERROR.message;
    this.title = MESSAGE.MANDATORY_FIELDS_ERROR.title;
  } else {
    // create new version and then issue if changes are observed in the form else issue it as it is.
    if(shouldCreateNewVersion) {
      this.createDatacall(value, 'ISSUED', '/save-and-issue-data-call');
    } else {
      this.updateDatacall(value, 'ISSUED', '/issue-data-call');
    }
  }
}

// Save the changes made to the selected draft and create new draft version
  saveDraft(value) {
    console.log('################### inside save draft ###############');
    const commentField = this.registerForm.get('comments');
    console.log('value ', value);
    if(this.checkDraft(value)){
      console.log('#################### new version will not be created and issued as it is');
      commentField.clearValidators();
      commentField.updateValueAndValidity();
      this.isIdenticalDraft = true;
    } else{
      console.log('##################### create a new version and issue ');
      commentField.setValidators([Validators.required]);
      commentField.updateValueAndValidity();
      this.isIdenticalDraft = false;
    }

    if (!this.registerForm.valid) {
      this.isError = true;
      this.type = MESSAGE.MANDATORY_FIELDS_ERROR.type;
      this.message = MESSAGE.MANDATORY_FIELDS_ERROR.message;
      this.title = MESSAGE.MANDATORY_FIELDS_ERROR.title;
    } else {
      console.log('is draft identical '+ this.isIdenticalDraft);
      this.createDatacall(value, 'DRAFT', '/save-new-draft');
    }
  }

  // Handle event triggered by forum model
  updateForumByModal(event){
    // console.log('forum url  ', event , '  ::');
    if(!(event === '' || event === undefined)){
      this.model.forumurl = event;
      this.updateForum();
    }
  }

  // Updates the forum URL
  updateForum() {
      console.log('in updateforum function');
      // console.log(this.datacall);
      let value = {
        name: this.datacall.name,
        description: this.datacall.description,
        dateRange:[this.datacall.premiumFromDate, this.datacall.premiumToDate],
        lossdateRange: [this.datacall.lossFromDate, this.datacall.lossToDate],
        deadline:this.datacall.deadline,
        purpose: this.datacall.purpose,
        isShowParticipants: this.datacall.isShowParticipants,
        lineOfBusiness: this.datacall.lineOfBusiness,
        detailedCriteria: this.datacall.detailedCriteria,
        intentToPublish: this.datacall.intentToPublish,
        eligibilityRequirement: this.datacall.eligibilityRequirement,
        jurisdiction: this.model.jurisdiction,
        comments: this.datacall.comments
      }
      console.log('this.model.forumurl ', this.model.forumurl);

      if(!(this.model.forumurl === undefined || this.model.forumurl === '' || this.model.forumurl === 'undefined')) {
        this.isForumUrl =  true;
        this.forumurl = this.model.forumurl;
        this.updateDatacall(value, 'DRAFT', '/update-data-call');
      }
  }

  // Edits the forum URL
  editforum() {
    this.type = MESSAGE.FORUMURL_UPDATE_INFO.type;
    this.message = MESSAGE.FORUMURL_UPDATE_INFO.message;
    this.title = MESSAGE.FORUMURL_UPDATE_INFO.title;
     const data = this.forumurl;
    const isData = true
    this.appModal.openForumModal(this.title, this.message, this.type, data, isData);
  }

  // Abandon the data call in draft mode
  abandon(value) {
      this.updateDatacall(value, 'CANCELLED', '/data-call');
  }

  // Trigger the clone event to the parent component so that it will clone the data call contents
  clone(value) {
    this.storageService.setItem('datacalldraft', value);
    console.log(value);
    this.cloneDatacallEvent.emit();
  }

  // Creates the data call. This is called while saving the draft.
  createDatacall(value, status, api) {
    console.log('INTENT TO PUBLISH ::: ', value.intentToPublish);
    this.datacallObject = {
      'id': '' + this.model.id,
      'name': value.name.trim(),
      'intentToPublish': value.intentToPublish,
      'description': value.description.trim(),
      'purpose': value.purpose.trim(),
      'lineOfBusiness': value.lineOfBusiness.trim(),
      'deadline': '' + value.deadline,
      'premiumFromDate': '' + value.dateRange[0],
      'premiumToDate': '' + value.dateRange[1],
      'lossFromDate': '' + value.lossdateRange[0],
      'lossToDate': '' + value.lossdateRange[1],
      'jurisdiction': value.jurisdiction.trim(),
      'detailedCriteria': value.detailedCriteria.trim(),
      'eligibilityRequirement': value.eligibilityRequirement.trim(),
      'status': status,
      'isShowParticipants': value.isShowParticipants,
      'comments': '' + this.model.comments.trim(),
      'forumURL':'' + this.model.forumurl
    };
    if(value.intentToPublish == "Yes") {
      value.intentToPublish = true;
      this.datacallObject['intentToPublish'] = true;
    } else if(value.intentToPublish == "No"){
      value.intentToPublish = false;
      this.datacallObject['intentToPublish'] = false;
    }

    // Reset the isError flag to hide the error notification
    this.isError = false;
    const uri = api;
    if (this.isIdenticalDraft) {
      this.isIdenticalDraft = false;
        this.type = 'error';
        this.message = 'No changes have been made to the data call fields.';
        this.title = 'Cannot save a new draft';
        setTimeout(() => {
          this.showModal();
        }, 10);
    } else {
      this.isSpinner = true;
      this.dataService.postData(uri, this.datacallObject)
      .subscribe(response => {
        this.isSpinner = false;
        this.isSuccess = true;
        if(status === 'ISSUED') {
          this.issued.emit();
          this.message = MESSAGE.DATACALL_ISSUE_SUCCESS.message;
          this.title = MESSAGE.DATACALL_ISSUE_SUCCESS.title;
        } else {
          this.message = MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.message;
          this.title = MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.title;
          this.getDrafts();
        }
        this.type = MESSAGE.DATACALL_ISSUE_SUCCESS.type;
        setTimeout(() => {
          this.showModal();
        }, 10);
      },
      error => {
        this.isForumUrl =  false;
        this.forumurl = '';
        this.isSpinner = false;
        console.log(error);
        this.isSpinner = false;
        this.isError = true;
        const messageBundle=MESSAGE.COMMON_ERROR;
          const locale="en-US";
          this.appModal.handleNotification(error,messageBundle,locale);
      });
    }
  }

  // Updates the data call
  updateDatacall(value, status, api) {
    if(value.intentToPublish == "Yes") {
      value.intentToPublish = true;
    } else if(value.intentToPublish == "No"){
      value.intentToPublish = false;
    }
    this.datacallObject = {
      'id': '' + this.model.id,
      'version': '' + this.model.version,
      'name': value.name.trim(),
      'intentToPublish': value.intentToPublish,
      'description': value.description.trim(),
      'purpose': value.purpose.trim(),
      'lineOfBusiness': value.lineOfBusiness.trim(),
      'deadline': '' + value.deadline,
      'premiumFromDate': '' + value.dateRange[0],
      'premiumToDate': '' + value.dateRange[1],
      'lossFromDate': '' + value.lossdateRange[0],
      'lossToDate': '' + value.lossdateRange[1],
      'jurisdiction': value.jurisdiction.trim(),
      'detailedCriteria': value.detailedCriteria.trim(),
      'eligibilityRequirement': value.eligibilityRequirement.trim(),
      'status': status,
      'isShowParticipants': value.isShowParticipants,
      'comments': '' + this.model.comments.trim(),
      'forumURL':'' + this.model.forumurl
    };
    console.log(this.datacallObject);
    // Reset the isError flag to hide the error notification
    this.isError = false;
    const uri =  api;
    if (this.isIdenticalDraft) {
      this.isIdenticalDraft = false;
        this.type = MESSAGE.DRAFT_SAVE_FAIL.type;
        this.message = MESSAGE.DRAFT_SAVE_FAIL.message;
        this.title = MESSAGE.DRAFT_SAVE_FAIL.title;
        setTimeout(() => {
          this.showModal();
        }, 10);
    } else {
      this.isSpinner = true;
      console.log('status::: ', status);
      this.dataService.putData(uri, this.datacallObject)
      .subscribe(response => {
        if (status === "CANCELLED") {
          this.isSpinner = false;
          this.isSuccess = true;
          this.isAbandon = true;
          this.type = MESSAGE.DATACALL_ABANDON_SUCCESS.type;
          this.message = MESSAGE.DATACALL_ABANDON_SUCCESS.message;
          this.title = MESSAGE.DATACALL_ABANDON_SUCCESS.title;
          setTimeout(() => {
            this.showModal();
          }, 10);
        } else if(status === "ISSUED"){
          this.isSpinner = false;
          this.isSuccess = true;
          this.type = MESSAGE.DATACALL_ISSUE_SUCCESS.type;
          this.message = MESSAGE.DATACALL_ISSUE_SUCCESS.message;
          this.title = MESSAGE.DATACALL_ISSUE_SUCCESS.title;
          setTimeout(() => {
            this.showModal();
          }, 10);
          if(status === 'ISSUED') {
            this.issued.emit();
          } else {
            this.getDrafts();
          }
        } else if(this.isForumUrl) {
          this.isSpinner = false;
          this.isSuccess = true;
          this.type = MESSAGE.SET_FORUM_SUCCESS.type;
          this.message = MESSAGE.SET_FORUM_SUCCESS.message;
          this.title = MESSAGE.SET_FORUM_SUCCESS.title;
          setTimeout(() => {
            this.showModal();
          }, 10);
        }
        else {
          this.isSpinner = false;
          this.isSuccess = true;
          this.type = MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.type;
          this.message = MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.message;
          this.title = MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.title;
          setTimeout(() => {
            this.showModal();
          }, 10);
          this.getDrafts();
        }
      },
      error => {
        this.isSpinner = false;
        console.log(error);
        this.isSpinner = false;
        this.isError = true;
        const messageBundle=MESSAGE.COMMON_ERROR;
        const locale="en-US";
        this.appModal.handleNotification(error,messageBundle,locale);
      });
    }
  }

  // Check if current draft is changed
  checkDraft(value){
    console.log('in draft check ', value);
    if (value.intentToPublish == "Yes") {
      value.intentToPublish = true;
    } else {
      value.intentToPublish = false;
    }
    const keys = Object.keys(value);
    let isIdenticalObject:  Boolean;
    isIdenticalObject = true;
    keys.forEach(element => {
      console.log('************************* START ******************************');
      if(element === 'dateRange'){
        console.log(value[element][0], ' ' , this.currentDraft['premiumFromDate']);
        console.log(value[element][1], ' ' , this.currentDraft['premiumToDate']);
          if(!(value[element][0] === this.currentDraft['premiumFromDate'])){
            isIdenticalObject =  false;
          }
          if(!(value[element][1] === this.currentDraft['premiumToDate'])){
            isIdenticalObject =  false;
          }
      } else if(element === 'lossdateRange'){
        console.log(value[element][0], ' ' , this.currentDraft['lossFromDate']);
        console.log(value[element][1], ' ' , this.currentDraft['lossToDate']);
        if(!(value[element][0] === this.currentDraft['lossFromDate'])){
          isIdenticalObject =  false;
        }
        if(!(value[element][1] === this.currentDraft['lossToDate'])){
          isIdenticalObject =  false;
        }
      } else {
        console.log(value[element], ' ', this.currentDraft[element]);
        console.log('key: ', element);
        console.log(typeof value[element])
        if(!(element === 'comments')){
          if(typeof value[element] === "string"){
            if((value[element]).trim() == this.currentDraft[element].trim()){
              console.log('in string ::::: ', (value[element]), this.currentDraft[element]);
            }
            else{
              console.log('inside else :::::: ', value[element], this.currentDraft[element]);
             isIdenticalObject = false;
           }
          } else if (typeof value[element] !== "string"){
            if((value[element]) == this.currentDraft[element]){
              console.log('not in string :::: ', value[element], this.currentDraft[element]);
            } else{
              console.log('inside else :::::: ', value[element], this.currentDraft[element]);
             isIdenticalObject = false;
           }
          }

        }
      }
      console.log('************************* END ******************************');
    });
    console.log('Object Identical = '+ isIdenticalObject);
    return isIdenticalObject;
  }

  // Following getters are validators for reactive form
  get namefield() {
    return this.registerForm.get('name');
  }
  get descriptionfield() {
    return this.registerForm.get('description');
  }
  get deadlinefield() {
    console.log('deadline: ', this.registerForm.get('deadline'));
    return this.registerForm.get('deadline');
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
  get showParticipantsfield() {
    return this.registerForm.get('isShowParticipants');
  }
  get businessfield() {
    return this.registerForm.get('lineOfBusiness');
  }
  get criteriafield() {
    return this.registerForm.get('detailedCriteria');
  }
  get intentfield() {
    return this.registerForm.get('intentToPublish');
  }
  get eligibilityfield() {
    return this.registerForm.get('eligibilityRequirement');
  }
  get jurisdictionfield() {
    return this.registerForm.get('jurisdiction');
  }
  get commentfield() {
    return this.registerForm.get('comments');
  }

  // Remove the error notification
  closeNotify() {
    this.isError = false;
  }

  // Open the modal to show alert
  showModal() {
    this.appModal.openModal(this.title, this.message, this.type);
   }

   // Opens modal when session is expired
   showSessionModal() {
    this.appModal.openSessionModal(this.title, this.message, this.type, true);
  }

  // Close the modal and trigger the action as per the requirement
   modalClose() {
     if (this.isFailed) {
      this.isFailed = false;
      this.isError = false;
      this.fail.emit();
     } else if (this.isAbandon) {
      this.isSuccess = false;
      this.isAbandon = false;
      this.abandonDatacallEvent.emit();
    } else {
      this.isSuccess = false;
      this.isopen = false;
      this.isError = false;
      this.create.emit();
     }
   }

   // Redirect to login if session is expired
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

   createDraftCopy(src){
    let target = {};
    for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
    }
    return target;
   }
   // Format date in mm/dd/yyyy format
   formatDate (d) {
    const date = new Date(d);
    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd ; }
    if ( mm < 10) { mm = '0' + mm ; }
    return d = mm + '/' + dd + '/' + yyyy;
  }

  // Toggle like and unlike data call when click the corrosponding button
  toggleAction() {
    const uri = '/like';
    const requestData = {
      "datacallID": this.datacall.id,
      "dataCallVersion": this.model.version,
      "OrganizationType": this.loginResult.attributes.role,
      "OrganizationID": this.loginResult.attributes.organizationId,
      "UpdatedBy": this.loginResult.username,
      "Liked":this.isLike
   };
   console.log(requestData);
    if (this.isLike) {
      this.likeDataCall(uri, requestData, 'Unlike Data Call', false)
      this.isLikeCountPositive = true;
    } else if (!this.isLike) {
      this.isLikeCountPositive = false;
      this.likeDataCall(uri, requestData, 'Like Data Call', true)
    }
  }

  // Like / Unlike data call
  likeDataCall(uri, body, buttonText, isLike){
    this.isSmallSpinner = true;
    this.dataService.postData(uri, body)
                    .subscribe(response => {
                      this.isSmallSpinner = false;
                      console.log('like response: ', response);
                      this.buttonText = buttonText;

                      if(this.buttonText === 'Unlike Data Call') {
                        this.action = 'Like';
                      } else if(this.buttonText === 'Like Data Call') {
                        this.action = 'Unlike'
                      }
                      this.isSuccess = true;
                      this.type = 'success';
                      this.message = 'Your ' + this.action.toLowerCase() +' has been recorded. The '+ this.action.toLowerCase() +' count will be updated shortly.';
                      this.title = 'Success';
                      setTimeout(() => {
                        this.showModal();
                      }, 10);
                      this.isLike = isLike;
                      setTimeout(() => {
                        this.getLikeCount();
                        this.getLikeStatus();
                      },500)
                    }, error => {
                      this.isSmallSpinner = false;
                      const messageBundle=MESSAGE.COMMON_ERROR;
                      const locale="en-US";
                      this.appModal.handleNotification(error,messageBundle,locale);
                      console.log(error);
                    })
  }

  // Get names of carriers/organizations who have liked/consented the data call
  viewCarriers(action) {
    let uri;
    let data;
    let res;
    if(action === 'Liked') {
      uri = '/list-likes-by-data-call/' + this.model.id + '/' + this.model.version ;
    } else if (action === 'Consented') {
      uri = '/list-consents-by-data-call/' + this.model.id + '/' + this.model.version ;
    }
    this.isSpinner = true;
    this.dataService.getData(uri)
                    .subscribe(response => {
                      console.log('list response #### ', JSON.parse(response));
                      res = JSON.parse(response);
                      if(res === null) {
                        res = [];
                      }
                      if(action === 'Consented') {
                        data = {
                          name: this.model.name,
                          carrierList: res,
                          action: action,
                          type: 'Carriers'
                        };
                      } else if(action === 'Liked') {
                        data = {
                          name: this.model.name,
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

  fieldChange() {
    this.fieldChangeEvent.emit();
  }
}
