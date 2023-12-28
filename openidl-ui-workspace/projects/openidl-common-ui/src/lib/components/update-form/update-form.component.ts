import { Component, OnInit, Output, EventEmitter, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { MESSAGE } from '../../config/messageBundle';
import { DialogService } from '../../services/dialog.service';
import {
	MomentDateAdapter,
	MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
  
const moment = _rollupMoment || _moment;
  
export const STANDARD_FORMATS1 = {
	parse: {
		dateInput: 'MM/DD/YYYY',
	},
	display: {
		dateInput: 'MM/DD/YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	}
};

export const YYYYMM_FORMATS1 = {
	parse: {
		dateInput: 'YYYY/MM',
	},
	display: {
		dateInput: 'YYYY/MM',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	}
};

@Directive({
	selector: '[dateFormat1]',
	providers: [
	  {provide: MAT_DATE_FORMATS, useValue: YYYYMM_FORMATS1},
	]
  })
  export class CustomDateFormat1 {
  }

@Component({
	selector: 'app-update-form',
	templateUrl: './update-form.component.html',
	styleUrls: ['./update-form.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},
		{provide: MAT_DATE_FORMATS, useValue: STANDARD_FORMATS1}
	]
})
export class UpdateFormComponent implements OnInit {
	// Events to be emitted to the parent component
	@Output() fieldChangeEvent = new EventEmitter();
	@Output() noFieldChangeEvent = new EventEmitter();

	// Models to capture data
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
		intentToPublish: true,
		eligibilityRequirement: '',
		detailedCriteria: '',
		jurisdiction: '',
		comments: '',
		deadline: '',
		transactionMonth: '',
		premiumFromDate: '',
		premiumToDate: '',
		lossFromDate: '',
		lossToDate: '',
		proposedDeliveryDate: '',
		forumURL: ''
	};
	currentDraft = {};
	registerForm: FormGroup;
	checked = 0;
	draftlist = [];
	loginResult: any;
	title: any;
	message: any;
	type: any;
	role;
	datacall;
	buttonText: any = 'Like Data Call';
	forumurl: string = '';
	LOBs = [
		{
			code: 'Auto: Personal',
			value: 'Auto: Personal'
		}
	]; // Set default to 'Auto: Personal'
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
	isSpinner: boolean = false;
	isSmallSpinner: boolean = false;
	isFailed: boolean = false;
	isAbandon: boolean = false;
	isReadonly: boolean = false;
	isForumUrl: boolean = false;
	isSuccess: boolean = false;
	isError: boolean = false;
	isopen: boolean = false;
	isReg: boolean = false;
	isStatAgent: boolean = false;
	isLikeCountPositive: boolean = false;
	isCarr: boolean = false;
	isViewAbandoned: boolean = false;
	isLike: boolean = true;
	isData: boolean = false;
	isIdenticalDraft: boolean = false;
	isDraft: boolean = false;
	isRecorded: boolean = false;
	submitted = false;
	toolbarLabel = '';
	toolbarTS = '';
	currentStatus = '';

	// Hide form elements that are not required in the view.
	// TODO: May completely remove in future or add them back to view.
	hideFormElement = false;

	constructor(
		private formBuilder: FormBuilder,
		private dataService: DataService,
		private storageService: StorageService,
		private dialogService: DialogService,
		private router: Router
	) {}

	ngOnInit() {
		this.currentStatus = this.storageService.getItem('currentStatus');

		// Getting view abandoned status to conditionally show the abandoned view
		const viewAbandoned = this.storageService.getItem('viewAbandoned');

		// storing org id, role, username etc
		this.loginResult = this.storageService.getItem('loginResult');

		// Conditionally setting the abandoned view
		if (viewAbandoned && viewAbandoned === 'true') {
			this.isViewAbandoned = true;
		} else {
			this.isViewAbandoned = false;
		}

		// Conditionally setting the jurisdiction
		if (this.storageService.getItem('jurisdiction')) {
			this.model.jurisdiction =
				this.storageService.getItem('jurisdiction');
		} else {
			this.dataService.getData('/jurisdiction').subscribe(
				(response) => {
					this.model.jurisdiction = response;
					this.storageService.setItem('jurisdiction', response);
				},
				(error) => {
					console.log(error);
				}
			);
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
		if (this.role && this.role === 'regulator' && this.isViewAbandoned) {
			this.isReadonly = true;
			if (
				this.datacall.forumURL == '' ||
				this.datacall.forumURL == 'undefined' ||
				this.datacall.forumURL == undefined
			) {
				this.isForumUrl = false;
			} else {
				this.forumurl = this.datacall.forumURL;
				this.isForumUrl = true;
			}
			this.registerForm = this.formBuilder.group({
				name: [{ value: '', disabled: true }, Validators.required],
				description: [
					{ value: '', disabled: true },
					Validators.required
				],
				premiumFromDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				premiumToDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				lossFromDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				lossToDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				deadline: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				transactionMonth: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				purpose: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				isShowParticipants: [
					{ value: true, disabled: true }
				],
				lineOfBusiness: [
					{ value: this.LOBs[0].value, disabled: true },
					[Validators.required]
				],
				detailedCriteria: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				intentToPublish: [
					{ value: true, disabled: true },
					[Validators.required]
				],
				eligibilityRequirement: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				jurisdiction: [this.model.jurisdiction],
				comments: [{ value: '', disabled: true }]
			});
		}
		// Setting flags and models if regulator is viewing an issued data call
		else if (
			this.role &&
			this.role === 'regulator' &&
			this.datacall.isLocked !== true &&
			this.datacall.jurisdiction.toLowerCase() ==
				this.userJurisdiction.toLowerCase()
		) {
			this.isReadonly = false;
			console.log('Second if case', this.datacall.isLocked);
			this.registerForm = this.formBuilder.group({
				name: ['', Validators.required],
				description: ['', Validators.required],
				premiumFromDate: ['', [Validators.required]],
				premiumToDate: ['', [Validators.required]],
				lossFromDate: ['', [Validators.required]],
				lossToDate: ['', [Validators.required]],
				transactionMonth: [this.model.transactionMonth, [Validators.required]],
				deadline: ['', [Validators.required]],
				purpose: ['', [Validators.required]],
				isShowParticipants: [true],
				lineOfBusiness: [this.LOBs[0].value, [Validators.required]],
				detailedCriteria: ['', [Validators.required]],
				intentToPublish: [true, [Validators.required]],
				eligibilityRequirement: ['', [Validators.required]],
				jurisdiction: [this.model.jurisdiction],
				comments: ['']
			});
		} else {
			this.isReadonly = true;
			if (
				this.datacall.forumURL == '' ||
				this.datacall.forumURL == 'undefined' ||
				this.datacall.forumURL == undefined
			) {
				this.isForumUrl = false;
			} else {
				this.forumurl = this.datacall.forumURL;
				this.isForumUrl = true;
			}
			if (this.datacall.status === 'DRAFT') {
				this.isDraft = true;
			} else {
				this.isDraft = false;
			}
			this.registerForm = this.formBuilder.group({
				name: [{ value: '', disabled: true }, Validators.required],
				description: [
					{ value: '', disabled: true },
					Validators.required
				],
				premiumFromDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				premiumToDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				lossFromDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				lossToDate: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				transactionMonth: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				deadline: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				purpose: [{ value: '', disabled: true }, [Validators.required]],
				isShowParticipants: [{ value: true, disabled: true }],
				lineOfBusiness: [
					{ value: this.LOBs[0].value, disabled: true },
					[Validators.required]
				],
				detailedCriteria: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				intentToPublish: [
					{ value: true, disabled: true },
					[Validators.required]
				],
				eligibilityRequirement: [
					{ value: '', disabled: true },
					[Validators.required]
				],
				jurisdiction: [this.model.jurisdiction],
				comments: [{ value: '', disabled: true }]
			});
		}

		// Fetch different draft versions of a data call
		this.getDrafts();
	}

	// Fetch LineOfBusiness list
	getLOBs() {
		const uri = '/lob';
		this.dataService.getData(uri).subscribe(
			(response) => {
				this.isSpinner = false;
				const lob = JSON.parse(response);
				this.LOBs = lob.lob;
			},
			(error) => {
				console.error(error);
				this.isSpinner = false;
				this.isError = true;
				const messageBundle = MESSAGE.COMMON_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);
	}

	isSameJurisdiction() {
		const isSame =
			this.userJurisdiction.toLowerCase() ===
			this.datacall.jurisdiction.toLowerCase();
		return isSame;
	}

	// Fetch multiple draft versions for a data call
	getDrafts() {
		const api =
			'/data-call-versions/' + this.storageService.getItem('datacall').id;
		const uri = api;
		this.isSpinner = true;
		this.dataService.getData(uri).subscribe(
			(response) => {
				this.draftlist = JSON.parse(response);
				this.draftlist.forEach((element) => {
					element.updatedTs = this.formatDate2(element.updatedTs);
				});

				this.showDetails(this.draftlist[0], 0);

				this.isSpinner = false;
				// Emit no field change event to reset hasFieldChange flag in the parent component
				this.noFieldChangeEvent.emit();
			},
			(error) => {
				this.isSpinner = false;
				this.isError = true;
				this.isFailed = true;
				const messageBundle = MESSAGE.DATACALL_VERSION_FETCH_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);

		const storedLOBs = JSON.parse(sessionStorage.getItem('LOBs'));
		// Check for cached LOBs or get from REST API
		if (storedLOBs) {
			this.LOBs = storedLOBs;
		} else {
			this.getLOBs();
		}
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
		if (dd < 10) {
			dd = '0' + dd;
		}
		// if ( mm < 10) { mm = '0' + mm ; }
		if (hr == 12) {
			ss = 'PM';
		} else if (hr > 12) {
			hr = hr - 12;
			ss = 'PM';
		}
		if (hr < 10) {
			hr = '0' + hr;
		}
		if (min < 10) {
			min = '0' + min;
		}
		// return d = dd + '/' + mm + '/' + yyyy;
		return (d =
			mm + '/' + dd + '/' + yyyy + ' | ' + hr + ':' + min + ' ' + ss);
	}

	updateToolbarLabel(draft, index) {
		this.toolbarTS = draft.updatedTs;
		if (draft.status === 'ISSUED') this.toolbarLabel = 'Issued Data Call';
		if (draft.status !== 'ISSUED' && index === 0)
			this.toolbarLabel = 'Current Version';
		if (draft.status !== 'ISSUED' && index !== 0)
			this.toolbarLabel = `Draft Version ${draft.version}`;
	}

	populateFormData(data) {
		this.registerForm.setValue({
			name: data.name,
			description: data.description,
			lineOfBusiness: data.lineOfBusiness,
			jurisdiction: data.jurisdiction,
			premiumFromDate: data.premiumFromDate,
			premiumToDate: data.premiumToDate,
			lossFromDate: data.lossFromDate,
			lossToDate: data.lossToDate,
			intentToPublish: data.intentToPublish,
			purpose: data.purpose,
			detailedCriteria: data.detailedCriteria,
			eligibilityRequirement: data.eligibilityRequirement,
			isShowParticipants: data.isShowParticipants,
			comments: data.comments,
			deadline: data.deadline,
			transactionMonth: data.transactionMonth
		});
	}

	// Show draft details of selected draft version
	showDetails(draft, index) {
		this.updateToolbarLabel(draft, index);
		this.checked = index;
		this.model = Object.assign({}, draft);
		this.currentDraft = this.createDraftCopy(draft);

		if (this.isReadonly) {
			if (this.model.premiumFromDate) {
				this.model.premiumFromDate = this.formatDate(
					this.model.premiumFromDate
				);
			} else {
				this.model.premiumFromDate = '';
			}
			if (this.model.premiumToDate) {
				this.model.premiumToDate = this.formatDate(
					this.model.premiumToDate
				);
			} else {
				this.model.premiumToDate = '';
			}
			if (this.model.lossFromDate) {
				this.model.lossFromDate = this.formatDate(
					this.model.lossFromDate
				);
			} else {
				this.model.lossFromDate = '';
			}
			if (this.model.lossToDate) {
				this.model.lossToDate = this.formatDate(this.model.lossToDate);
			} else {
				this.model.lossToDate = '';
			}
			if (this.model.proposedDeliveryDate) {
				if (
					this.model.proposedDeliveryDate === '0001-01-01T00:00:00Z'
				) {
					this.model.proposedDeliveryDate = '';
				} else {
					this.model.proposedDeliveryDate = this.formatDate(
						this.model.proposedDeliveryDate
					);
				}
			} else {
				this.model.proposedDeliveryDate = '';
			}
			if (this.model.deadline) {
				this.model.deadline = this.formatDate(this.model.deadline);
			} else {
				this.model.deadline = '';
			}
		} else {
			this.populateFormData(draft);
		}

		this.getConsentCount();
	}

	// check whether current version is liked
	getLikeStatus() {
		const likeUri =
			'/like-status-data-call/' +
			this.datacall.id +
			'/' +
			this.model.version +
			'/' +
			this.loginResult.attributes.organizationId;
		this.isSmallSpinner = true;
		this.dataService.getData(likeUri).subscribe(
			(response) => {
				const res = JSON.parse(response);
				if (res == 'null' || res == null) {
					this.isLike = true;
					this.buttonText = 'Like Data Call';
					this.isRecorded = false;
					this.recordTime = '';
				} else if (res[0].like.liked) {
					this.isLike = false;
					this.buttonText = 'Unlike Data Call';
					this.isRecorded = true;
					this.recordTime = this.formatDate2(res[0].like.updatedTs);
					this.action = 'Like';
				} else if (!res[0].like.liked) {
					this.isLike = true;
					this.buttonText = 'Like Data Call';
					this.isRecorded = true;
					this.recordTime = this.formatDate2(res[0].like.updatedTs);
					this.action = 'Unlike';
				}
				setTimeout(() => {
					this.isSpinner = false;
				}, 1000);
				this.isSmallSpinner = false;
			},
			(error) => {
				this.isSpinner = false;
				this.isError = true;
				this.isSmallSpinner = false;
				const messageBundle = MESSAGE.COMMON_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);
	}

	// To fetch data call consent count
	getConsentCount() {
		const uri =
			'/consent-count/' + this.model.id + '/' + this.model.version;
		this.isSmallSpinner = true;
		this.dataService.getData(uri).subscribe((response) => {
			this.consentCount = JSON.parse(response).delta;
			this.getLikeCount();
		});
	}

	// To fetch data call likes count
	getLikeCount() {
		const uri = '/like-count/' + this.model.id + '/' + this.model.version;
		this.dataService.getData(uri).subscribe((response) => {
			this.likeCount = JSON.parse(response).delta;
			if (this.likeCount > 0) {
				this.isLikeCountPositive = true;
			}
			this.isSmallSpinner = false;
			if (this.role !== 'regulator') {
				this.getLikeStatus();
			}
		});
	}

	// set min and max values for deadline
	// deadlineSet(type) {
	// 	if (type === 'enddate') {
	// 		this.minDeadline = this.dateRange[1];
	// 	} else if (type === 'deadline') {
	// 		this.maxEnddate = this.model.deadline;
	// 		this.maxStartdate = this.model.deadline;
	// 	}
	// 	if (type === 'startdate') {
	// 		this.minDeadline = this.dateRange[0];
	// 	}
	// }

	// Handle show participants check according to the readonly flag
	toggleIsShowParticipants(event) {
		if (this.isReadonly === true) {
			return;
		} else {
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
		if (this.checkDraft(value)) {
			console.log('new version will not be created and issued as it is');
			commentField.clearValidators();
			commentField.updateValueAndValidity();
			shouldCreateNewVersion = false;
		} else {
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
			this.showModal();
		} else {
			// create new version and then issue if changes are observed in the form else issue it as it is.
			if (shouldCreateNewVersion) {
				this.createDatacall(
					value,
					'ISSUED',
					'/save-and-issue-data-call'
				);
			} else {
				this.updateDatacall(value, 'ISSUED', '/issue-data-call');
			}
		}
	}

	// Save the changes made to the selected draft and create new draft version
	saveDraft(value) {
		const commentField = this.registerForm.get('comments');
		if (this.checkDraft(value)) {
			commentField.clearValidators();
			commentField.updateValueAndValidity();
			this.isIdenticalDraft = true;
		} else {
			commentField.setValidators([Validators.required]);
			commentField.updateValueAndValidity();
			this.isIdenticalDraft = false;
		}

		if (!this.registerForm.valid) {
			this.isError = true;
			this.type = MESSAGE.MANDATORY_FIELDS_ERROR.type;
			this.message = MESSAGE.MANDATORY_FIELDS_ERROR.message;
			this.title = MESSAGE.MANDATORY_FIELDS_ERROR.title;
			this.showModal();
		} else {
			this.createDatacall(value, 'DRAFT', '/save-new-draft');
		}
	}

	// Updates the forum URL
	updateForum() {
		let value = {
			name: this.datacall.name,
			description: this.datacall.description,
			dateRange: [
				this.datacall.premiumFromDate,
				this.datacall.premiumToDate
			],
			lossdateRange: [
				this.datacall.lossFromDate,
				this.datacall.lossToDate
			],
			deadline: this.datacall.deadline,
			transactionMonth: this.datacall.transactionMonth,
			purpose: this.datacall.purpose,
			isShowParticipants: this.datacall.isShowParticipants,
			lineOfBusiness: this.datacall.lineOfBusiness,
			detailedCriteria: this.datacall.detailedCriteria,
			intentToPublish: this.datacall.intentToPublish,
			eligibilityRequirement: this.datacall.eligibilityRequirement,
			jurisdiction: this.model.jurisdiction,
			comments: this.datacall.comments
		};

		if (
			!(
				this.model.forumURL === undefined ||
				this.model.forumURL === '' ||
				this.model.forumURL === 'undefined'
			)
		) {
			this.isForumUrl = true;
			this.forumurl = this.model.forumURL;
			this.updateDatacall(value, 'DRAFT', '/update-data-call');
		}
	}

	// Edits the forum URL
	editForum() {
		const dialogRef = this.dialogService.openForumModal(
			MESSAGE.FORUMURL_UPDATE_INFO.title,
			MESSAGE.FORUMURL_UPDATE_INFO.type,
			this.forumurl
		);

		const sub = dialogRef.afterClosed().subscribe((result) => {
			if (!(result === '' || result === undefined)) {
				this.model.forumURL = result;
				this.updateForum();
			}
			sub.unsubscribe();
		});
	}

	// Abandon the data call in draft mode
	abandon(value) {
		this.updateDatacall(value, 'CANCELLED', '/data-call');
	}

	// Trigger the clone event to the parent component so that it will clone the data call contents
	clone(value) {
		this.storageService.setItem('datacalldraft', value);
		this.storageService.setItem('isClone', 'true');
		this.router.navigate(['/createDatacall']);
	}

	// Creates the data call. This is called while saving the draft.
	createDatacall(value, status, api) {
		this.datacallObject = {
			id: '' + this.model.id,
			name: value.name.trim(),
			intentToPublish: value.intentToPublish,
			description: value.description.trim(),
			purpose: value.purpose.trim(),
			lineOfBusiness: value.lineOfBusiness.trim(),
			deadline: value.deadline,
			transactionMonth: this.getTransactionMonth(value.transactionMonth),
			premiumFromDate: value.premiumFromDate,
			premiumToDate: value.premiumToDate,
			lossFromDate: value.lossFromDate,
			lossToDate: value.lossToDate,
			jurisdiction: value.jurisdiction.trim(),
			detailedCriteria: value.detailedCriteria.trim(),
			eligibilityRequirement: value.eligibilityRequirement.trim(),
			status: status,
			isShowParticipants: value.isShowParticipants,
			comments: value.comments.trim(),
			forumURL: '' + this.model.forumURL
		};

		// Reset the isError flag to hide the error notification
		this.isError = false;
		const uri = api;
		if (this.isIdenticalDraft) {
			this.isIdenticalDraft = false;
			this.type = 'error';
			this.message = 'No changes have been made to the data call fields.';
			this.title = 'Cannot save a new draft';
			this.showModal();
		} else {
			this.isSpinner = true;
			this.dataService.postData(uri, this.datacallObject).subscribe(
				() => {
					this.isSpinner = false;
					this.isSuccess = true;
					if (status === 'ISSUED') {
						this.router.navigate(['/datacallList']);
						this.message = MESSAGE.DATACALL_ISSUE_SUCCESS.message;
						this.title = MESSAGE.DATACALL_ISSUE_SUCCESS.title;
					} else {
						this.message =
							MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.message;
						this.title =
							MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.title;
						this.getDrafts();
					}
					this.type = MESSAGE.DATACALL_ISSUE_SUCCESS.type;
					this.showModal();
				},
				(error) => {
					console.error(error);
					this.isForumUrl = false;
					this.forumurl = '';
					this.isSpinner = false;
					this.isError = true;
					const messageBundle = MESSAGE.COMMON_ERROR;
					this.dialogService.handleNotification(error, messageBundle);
				}
			);
		}
	}

	// Updates the data call
	updateDatacall(value, status, api) {
		this.datacallObject = {
			id: '' + this.model.id,
			version: '' + this.model.version,
			name: value.name.trim(),
			intentToPublish: value.intentToPublish,
			description: value.description.trim(),
			purpose: value.purpose.trim(),
			lineOfBusiness: value.lineOfBusiness.trim(),
			deadline: value.deadline,
			transactionMonth: this.getTransactionMonth(value.transactionMonth),
			premiumFromDate: value.premiumFromDate,
			premiumToDate: value.premiumToDate,
			lossFromDate: value.lossFromDate,
			lossToDate: value.lossToDate,
			jurisdiction: value.jurisdiction.trim(),
			detailedCriteria: value.detailedCriteria.trim(),
			eligibilityRequirement: value.eligibilityRequirement.trim(),
			status: status,
			isShowParticipants: value.isShowParticipants,
			comments: '' + this.model.comments.trim(),
			forumURL: '' + this.model.forumURL
		};
		// Reset the isError flag to hide the error notification
		this.isError = false;
		const uri = api;
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
			this.dataService.putData(uri, this.datacallObject).subscribe(
				(response) => {
					if (status === 'CANCELLED') {
						this.isSpinner = false;
						this.isSuccess = true;
						this.isAbandon = true;
						this.type = MESSAGE.DATACALL_ABANDON_SUCCESS.type;
						this.message = MESSAGE.DATACALL_ABANDON_SUCCESS.message;
						this.title = MESSAGE.DATACALL_ABANDON_SUCCESS.title;
						this.showModal();
						this.storageService.setItem('isAbandon', 'true');
						this.router.navigate(['/datacallList']);
					} else if (status === 'ISSUED') {
						this.isSpinner = false;
						this.isSuccess = true;
						this.type = MESSAGE.DATACALL_ISSUE_SUCCESS.type;
						this.message = MESSAGE.DATACALL_ISSUE_SUCCESS.message;
						this.title = MESSAGE.DATACALL_ISSUE_SUCCESS.title;
						this.showModal();

						if (status === 'ISSUED') {
							this.router.navigate(['/datacallList']);
						} else {
							this.getDrafts();
						}
					} else if (this.isForumUrl) {
						this.isSpinner = false;
						this.isSuccess = true;
						this.type = MESSAGE.SET_FORUM_SUCCESS.type;
						this.message = MESSAGE.SET_FORUM_SUCCESS.message;
						this.title = MESSAGE.SET_FORUM_SUCCESS.title;
						this.showModal();
					} else {
						this.isSpinner = false;
						this.isSuccess = true;
						this.type = MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.type;
						this.message =
							MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.message;
						this.title =
							MESSAGE.DATACALL_DRAFT_UPDATE_SUCCESS.title;

						this.showModal();
						this.getDrafts();
					}
				},
				(error) => {
					this.isSpinner = false;
					console.error(error);
					this.isSpinner = false;
					this.isError = true;
					const messageBundle = MESSAGE.COMMON_ERROR;
					this.dialogService.handleNotification(error, messageBundle);
				}
			);
		}
	}

	// Check if current draft is changed
	checkDraft(value: any) {
		const keys = Object.keys(value);
		let isIdenticalObject = true;
		const dateProps = [
			'deadline',
			'lossFromDate',
			'lossToDate',
			'premiumFromDate',
			'premiumToDate'
		];

		keys.forEach((element) => {
			if (!(element === 'comments')) {
				// if it's date property the convert to date and compare diff
				if (dateProps.includes(element)) {
					const newDate = new Date(value[element]);
					const oldDate = new Date(this.currentDraft[element]);
					const isSame = newDate.getTime() === oldDate.getTime();
					if (!isSame) isIdenticalObject = false;
				} else if (typeof value[element] === 'string') {
					if (
						value[element].trim() !==
						this.currentDraft[element].trim()
					) {
						isIdenticalObject = false;
					}
				} else if (typeof value[element] !== 'string') {
					if (value[element] !== this.currentDraft[element]) {
						isIdenticalObject = false;
					}
				}
			}
		});
		return isIdenticalObject;
	}

	// Remove the error notification
	closeNotify() {
		this.isError = false;
	}

	// Open the modal to show alert
	showModal() {
		this.dialogService.openModal(this.title, this.message, this.type);
	}

	// Opens modal when session is expired
	showSessionModal() {
		this.dialogService.openModal(this.title, this.message, this.type, true);
	}

	createDraftCopy(src) {
		let target = {};
		for (let prop in src) {
			if (src.hasOwnProperty(prop)) {
				target[prop] = src[prop];
			}
		}
		return target;
	}

	// Format date in mm/dd/yyyy format
	formatDate(d) {
		const date = new Date(d);
		let dd: any = date.getDate();
		let mm: any = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		return (d = mm + '/' + dd + '/' + yyyy);
	}

	// Toggle like and unlike data call when click the corresponding button
	toggleAction() {
		const uri = '/like';
		const requestData = {
			datacallID: this.datacall.id,
			dataCallVersion: this.model.version,
			OrganizationType: this.loginResult.attributes.role,
			OrganizationID: this.loginResult.attributes.organizationId,
			UpdatedBy: this.loginResult.username,
			Liked: this.isLike
		};

		if (this.isLike) {
			this.likeDataCall(uri, requestData, 'Unlike Data Call', false);
			this.isLikeCountPositive = true;
		} else if (!this.isLike) {
			this.isLikeCountPositive = false;
			this.likeDataCall(uri, requestData, 'Like Data Call', true);
		}
	}

	// Like / Unlike data call
	likeDataCall(uri, body, buttonText, isLike) {
		this.isSmallSpinner = true;
		this.dataService.postData(uri, body).subscribe(
			(response) => {
				this.isSmallSpinner = false;
				this.buttonText = buttonText;

				if (this.buttonText === 'Unlike Data Call') {
					this.action = 'Like';
				} else if (this.buttonText === 'Like Data Call') {
					this.action = 'Unlike';
				}
				this.isSuccess = true;
				this.type = 'success';
				this.message =
					'Your ' +
					this.action.toLowerCase() +
					' has been recorded. The ' +
					this.action.toLowerCase() +
					' count will be updated shortly.';
				this.title = 'Success';
				setTimeout(() => {
					this.showModal();
				}, 10);
				this.isLike = isLike;
				setTimeout(() => {
					this.getLikeCount();
					this.getLikeStatus();
				}, 500);
			},
			(error) => {
				this.isSmallSpinner = false;
				const messageBundle = MESSAGE.COMMON_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
				console.error(error);
			}
		);
	}

	// Get names of carriers/organizations who have liked/consented the data call
	viewCarriers(action) {
		let uri;
		let data;
		let res;
		if (action === 'Liked') {
			uri =
				'/list-likes-by-data-call/' +
				this.model.id +
				'/' +
				this.model.version;
		} else if (action === 'Consented') {
			uri =
				'/list-consents-by-data-call/' +
				this.model.id +
				'/' +
				this.model.version;
		}
		this.isSpinner = true;
		this.dataService.getData(uri).subscribe(
			(response) => {
				res = JSON.parse(response);
				if (res === null) {
					res = [];
				}
				if (action === 'Consented') {
					data = {
						name: this.model.name,
						carrierList: res,
						action: action,
						type: 'Carriers'
					};
				} else if (action === 'Liked') {
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
					this.dialogService.openInfoModal(
						this.title,
						this.message,
						this.type,
						this.data,
						this.isData
					);
				}, 10);
				this.isSpinner = false;
			},
			(error) => {
				this.isSpinner = false;
			}
		);
	}

	openURL(url) {
		let extURL = url;
		if (!/^(http:|https:)/i.test(extURL)) {
			extURL = 'http://' + extURL;
		}
		let newWindow = window.open();
		// This will protect the app from being abused from 'reverse tabnabbing'.
		newWindow.opener = null;
		newWindow.location = extURL;
	}

	fieldChange() {
		this.fieldChangeEvent.emit();
	}

	// Format the transaction month to YYYY-MM before sending to backend
	getTransactionMonth(transactionMonth) {
		if (transactionMonth) {
			const year = new Date(transactionMonth).toLocaleDateString('en-US', {year: 'numeric'});
			const month = new Date(transactionMonth).toLocaleDateString('en-US', {month: '2-digit'});
			return (year + '-' + month);
		}
		return '-NA-';
	}

	disableOldDates = (d: Date | null): boolean => {
		const selected = (d || new Date());
		const now = new Date();
		// display today and future dates
		return selected >= now;
	};

	chosenYearHandler(normalizedYear: Moment) {
		const ctrlValue = this.registerForm.get('transactionMonth').value;
		ctrlValue.year(normalizedYear.year());
		this.registerForm.get('transactionMonth').setValue(ctrlValue);
	}
	
	chosenMonthHandler(
		normalizedMonth: Moment,
		datepicker: MatDatepicker<Moment>
	) {
		const ctrlValue = this.registerForm.get('transactionMonth').value;
		ctrlValue.month(normalizedMonth.month());
		this.registerForm.get('transactionMonth').setValue(ctrlValue);
		datepicker.close();
	}
}
