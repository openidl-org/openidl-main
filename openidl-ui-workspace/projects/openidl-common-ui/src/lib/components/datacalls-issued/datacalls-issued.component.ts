import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatacallHistoryComponent } from '../datacall-history/datacall-history.component';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { UpdateReportComponent } from '../update-report/update-report.component';
import { MESSAGE } from '../../config/messageBundle';
import { DialogService } from '../../services/dialog.service';

@Component({
	selector: 'app-datacalls-issued',
	templateUrl: './datacalls-issued.component.html',
	styleUrls: ['./datacalls-issued.component.scss']
})
export class DatacallsIssuedComponent implements OnInit {
	// Events to be emitted to the parent component
	@Output() viewReportEvent = new EventEmitter();
	@Output() viewDraftsEvent = new EventEmitter();
	@Output() cloneDatacallEvent = new EventEmitter();
	@Output() deldateUpdateEvent = new EventEmitter();
	@Output() fail = new EventEmitter();
	// Reference to child components
	@ViewChild(UpdateReportComponent) appUpdateReport: UpdateReportComponent;
	@ViewChild(DatacallHistoryComponent)
	appDatacallHistory: DatacallHistoryComponent;

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

	extractionPatternList: any;
	role: any;
	data: any;
	proposedDeliveryDate: any;
	registerForm: FormGroup;
	buttonText: any = 'Consent to the Report';
	loginResult: any;
	consentCount: any;
	likeCount: any;
	action: any = 'Consent';
	recordTime: any;

	// Flags to conditionally handle expressions
	isSpinner: boolean = false;
	isSmallSpinner: boolean = false;
	isSmallSpinner1: boolean = false;
	isSmallSpinner2: boolean = false;
	isSmallSpinner3: boolean = false;
	isError: boolean = false;
	isSuccess: boolean = false;
	isReg: boolean = false;
	isStatAgent: boolean = false;
	isLikeCountPositive: boolean = false;
	isCarr: boolean = false;
	isConsent: boolean = false;
	isReportAvlbl: boolean = false;
	isPublished: boolean = false;
	isRecorded: boolean = false;
	hasAllFields: boolean = false;
	hasDeliveryDate: boolean = false;
	hasForumUrl: boolean = false;
	hasPattern: boolean = false;
	readonly defaultDate = '0001-01-01T00:00:00Z';

	// Hide form elements that are not required in the view.
	// TODO: May completely remove in future or add them back to view.
	hideFormElement = false;

	constructor(
		private formBuilder: FormBuilder,
		private storageService: StorageService,
		private dataService: DataService,
		private dialogService: DialogService
	) {}

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
				forumUrl: ['']
			});
		} else {
			this.isStatAgent = false;
		}
		if (this.role && this.role === 'carrier') {
			this.isCarr = true;
		} else {
			this.isCarr = false;
		}

		const data = this.storageService.getItem('datacall');
		if (data) {
			this.draft = Object.assign({}, data);

			this.setControlsState();

			this.registerForm = this.formBuilder.group({
				proposedDeliveryDate: [
					this.draft.proposedDeliveryDate,
					Validators.required
				],
				forumUrl: [this.draft.forumURL],
				extractionPatternID: [this.draft.extractionPatternID]
			});

			if (this.isCarr) {
				if (
					this.draft.extractionPatternName === '' ||
					this.draft.extractionPatternName === null ||
					this.draft.extractionPatternName === undefined ||
					this.draft.extractionPatternName.length === 0
				) {
					this.isConsent = false;
				} else {
					this.isConsent = true;
				}
			}

			this.getConsentCount();
		} else {
			this.isError = true;
			this.showSessionModal();
		}

		this.getExtractionPattern();
		this.getReports();
	} // init ends

	setControlsState() {
		if (this.draft.proposedDeliveryDate === this.defaultDate) {
			this.draft.proposedDeliveryDate = '';
			this.hasDeliveryDate = false;
		} else {
			this.hasDeliveryDate = true;
		}

		if (this.draft.forumURL === '' || this.draft.forumURL === 'undefined') {
			this.draft.forumURL = '';
			this.hasForumUrl = false;
		} else {
			this.hasForumUrl = true;
		}

		if (
			this.draft.extractionPatternID === '' ||
			this.draft.extractionPatternID === undefined ||
			this.draft.extractionPatternID === 'undefined'
		) {
			this.draft.extractionPatternID = '';
			this.hasPattern = false;
		} else {
			this.hasPattern = true;
		}
	}

	// Get reports and set isReportAvlbl
	getReports() {
		const uri =
			'/report?dataCallVersion=' +
			this.draft.version +
			'&dataCallID=' +
			this.draft.id;
		this.isSpinner = true;
		this.dataService.getData(uri).subscribe(
			(response) => {
				const resp = JSON.parse(response);
				if (resp === null || resp === 'null') {
					this.isReportAvlbl = false;
				} else {
					this.isReportAvlbl = true;
					resp.forEach((element) => {
						if (element.status.toLowerCase() === 'published') {
							this.isPublished = true;
						}
					});
				}
				this.isSpinner = false;
			},
			(err) => {
				this.isSpinner = false;
			}
		);
	}

	// Opens forum url modal in edit mode
	editForum() {
		const data = this.draft.forumURL;
		const dialogRef = this.dialogService.openForumModal(
			'Update Forum URL',
			'info',
			data
		);

		const sub = dialogRef.afterClosed().subscribe((result) => {
			if (!(result === '' || result === undefined)) {
				this.draft.forumURL = result;
				this.updateForum();
			}
			sub.unsubscribe();
		});
	}

	//check whether consent is provided for the data call
	getConsentStatus() {
		const uri =
			'/consent-status-data-call/' +
			this.draft.id +
			'/' +
			this.draft.version +
			'/' +
			this.loginResult.attributes.organizationId;
		this.isSmallSpinner = true;
		this.dataService.getData(uri).subscribe(
			(response) => {
				const res = JSON.parse(response);
				if (res == null || res == 'null') {
					this.isConsent = true;
					this.isRecorded = false;
					this.recordTime = '';
				} else {
					this.isConsent = false;
					this.isRecorded = true;
					this.recordTime = this.formatDate2(
						res[0].consent.createdTs
					);
				}

				if (
					this.draft.extractionPatternName == '' ||
					this.draft.extractionPatternName == null ||
					this.draft.extractionPatternName == undefined
				) {
					this.isConsent = false;
				} else {
					this.isConsent = true;
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
				const locale = 'en-US';
				this.dialogService.handleNotification(
					error,
					messageBundle,
					locale
				);
				console.error(error);
			}
		);
	}

	// Get the count of carriers who have consented the data call
	getConsentCount() {
		this.isSmallSpinner1 = true;
		this.isSmallSpinner = true;
		const uri =
			'/consent-count/' + this.draft.id + '/' + this.draft.version;
		this.dataService.getData(uri).subscribe(
			(response) => {
				this.consentCount = JSON.parse(response).delta;
				this.isSpinner = false;
				this.isSmallSpinner1 = false;
				this.getLikeCount();
			},
			(error) => {
				this.isSpinner = false;
				this.isSmallSpinner1 = false;
				this.isError = true;
				const messageBundle = MESSAGE.COMMON_ERROR;
				const locale = 'en-US';
				this.dialogService.handleNotification(
					error,
					messageBundle,
					locale
				);
			}
		);
	}

	// Get the count of organizations who have liked the data call
	getLikeCount() {
		this.isSmallSpinner2 = true;
		const uri = '/like-count/' + this.draft.id + '/' + this.draft.version;
		this.dataService.getData(uri).subscribe(
			(response) => {
				this.likeCount = JSON.parse(response).delta;
				if (this.likeCount > 0) {
					this.isLikeCountPositive = true;
				}
				this.isSmallSpinner2 = false;
				if (this.role === 'carrier') {
					this.getConsentStatus();
				}
			},
			(err) => {
				this.isSmallSpinner2 = false;
			}
		);
	}

	// Emit the event of cloning a data call
	cloneDatacall(draft) {
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
		const { title, type, message } = MESSAGE.ACTIVITY_FAIL.Unauthorized;
		this.dialogService.openModal(title, message, type, true);
	}

	// Show the modal of success, error or info type
	showModal(bundle) {
		const dialogRef = this.dialogService.openModal(
			bundle.title,
			bundle.message,
			bundle.type
		);

		if (dialogRef) {
			const sub = dialogRef.afterClosed().subscribe((result) => {
				this.modalClose();
				sub.unsubscribe();
			});
		}
	}

	// Reset flags, emit events and set the data conditionally on closing the modal
	modalClose() {
		sessionStorage.removeItem('isModalOpen');
		if (this.isError) {
			this.isError = false;
			this.fail.emit();
		}
		if (this.isSuccess) {
			const uri =
				'/data-call/' + this.draft.id + '/' + this.draft.version;
			this.isSpinner = true;
			this.dataService.getData(uri).subscribe(
				(resp) => {
					this.isSpinner = false;
					this.draft = JSON.parse(resp);
					this.storageService.setItem('datacall', this.draft);
					this.isSuccess = false;
					this.extractionPatternList.forEach((element) => {
						if (this.draft.extractionPatternID === element.id) {
							this.draft.extractionPatternName = element.name;
						}
					});
					this.setControlsState();
				},
				(err) => {
					this.isSpinner = false;
					this.isError = true;
					this.isSuccess = false;
					this.showModal(MESSAGE.DATACALL_FETCH_ERROR);
				}
			);
		}
	}

	// Opens modal to edit the delivery date
	deliveryDateEdit() {
		const date = new Date(this.draft.proposedDeliveryDate);
		const dialogRef = this.dialogService.openDeliveryDateModal(
			'Update Delivery Date',
			'',
			'info',
			date
		);

		const sub = dialogRef.afterClosed().subscribe((result) => {
			if (!(result === '' || result === undefined)) {
				this.draft.proposedDeliveryDate = result;
				this.updateForum();
			}
			sub.unsubscribe();
		});
	}

	// Set the delivery date to be updated
	updatedDelivery(event) {
		let value = {
			proposedDeliveryDate: event
		};
		this.updateDeliveryDate(value);
	}

	// Update the set delivery date using REST API
	private updateDeliveryDate(value) {
		if (
			!(
				value.proposedDeliveryDate === undefined ||
				value.proposedDeliveryDate === ''
			)
		) {
			const dataobject = {
				id: this.draft.id,
				version: this.draft.version,
				forumURL: this.draft.forumURL,
				name: this.draft.name.trim(),
				intentToPublish: this.draft.intentToPublish,
				proposedDeliveryDate: value.proposedDeliveryDate,
				description: this.draft.description.trim(),
				purpose: this.draft.purpose.trim(),
				lineOfBusiness: this.draft.lineOfBusiness.trim(),
				deadline: '' + this.draft.deadline,
				premiumFromDate: '' + this.draft.premiumFromDate,
				premiumToDate: '' + this.draft.premiumToDate,
				lossFromDate: '' + this.draft.lossFromDate,
				lossToDate: '' + this.draft.lossToDate,
				jurisdiction: this.draft.jurisdiction.trim(),
				detailedCriteria: this.draft.detailedCriteria.trim(),
				eligibilityRequirement:
					this.draft.eligibilityRequirement.trim(),
				status: this.draft.status,
				isShowParticipants: this.draft.isShowParticipants,
				extractionPatternID: this.draft.extractionPatternID,
				comments: '' + this.draft.comments.trim()
			};

			const uri = '/update-data-call';
			this.isSpinner = true;
			this.dataService.putData(uri, dataobject).subscribe(
				(resp) => {
					this.isSpinner = false;
					this.isSuccess = true;
					this.showModal(MESSAGE.DELIVERY_DATE_UPDATE_SUCCESS);
					this.appDatacallHistory.getDatacallHistory(
						this.draft.id,
						this.draft.version
					);
				},
				(error) => {
					this.isSpinner = false;
					this.isError = true;
					const messageBundle = MESSAGE.DELIVERY_DATE_UPDATE_FAIL;
					this.dialogService.handleNotification(error, messageBundle);
				}
			);
		}
	}

	// Update the edited forum URL
	private updateForum() {
		if (
			!(this.draft.forumURL === '' || this.draft.forumURL === undefined)
		) {
			const dataobject = {
				id: this.draft.id,
				version: this.draft.version,
				forumURL: this.draft.forumURL,
				name: this.draft.name.trim(),
				intentToPublish: this.draft.intentToPublish,
				proposedDeliveryDate: this.draft.proposedDeliveryDate,
				description: this.draft.description.trim(),
				purpose: this.draft.purpose.trim(),
				lineOfBusiness: this.draft.lineOfBusiness.trim(),
				deadline: '' + this.draft.deadline,
				premiumFromDate: '' + this.draft.premiumFromDate,
				premiumToDate: '' + this.draft.premiumToDate,
				lossFromDate: '' + this.draft.lossFromDate,
				lossToDate: '' + this.draft.lossToDate,
				jurisdiction: this.draft.jurisdiction.trim(),
				detailedCriteria: this.draft.detailedCriteria.trim(),
				eligibilityRequirement:
					this.draft.eligibilityRequirement.trim(),
				status: this.draft.status,
				isShowParticipants: this.draft.isShowParticipants,
				extractionPatternID: this.draft.extractionPatternID,
				comments: '' + this.draft.comments.trim()
			};

			const uri = '/update-data-call';
			this.isSpinner = true;
			this.dataService.putData(uri, dataobject).subscribe(
				(resp) => {
					this.isSpinner = false;
					this.isSuccess = true;
					this.hasAllFields = false;
					this.hasForumUrl = true;

					this.showModal(MESSAGE.SET_FORUM_SUCCESS);
				},
				(error) => {
					this.isSpinner = false;
					this.isError = true;
					const messageBundle = MESSAGE.SET_FORUM_FAIL;
					this.dialogService.handleNotification(error, messageBundle);
				}
			);
		}
	}

	private updateCallData(data) {
		const uri = '/update-data-call';
		this.isSpinner = true;

		this.dataService.putData(uri, data).subscribe(
			(resp) => {
				this.isSpinner = false;
				this.isSuccess = true;
				this.showModal(MESSAGE.SET_ALL_FIELDS_SUCCESS);
				this.appDatacallHistory.getDatacallHistory(
					this.draft.id,
					this.draft.version
				);
			},
			(error) => {
				this.isSpinner = false;
				this.isError = true;
				const messageBundle = MESSAGE.SET_ALL_FIELDS_FAIL;
				const locale = 'en-US';
				this.dialogService.handleNotification(
					error,
					messageBundle,
					locale
				);
			}
		);
	}

	updateFields(form: FormGroup) {
		if (!form.valid) return;

		let isDataUpdated = false;
		const data = Object.assign({}, this.draft);
		const proposedDeliveryDate: string = form.value.proposedDeliveryDate;
		const forumUrl: string = form.value.forumUrl;
		const extractionPatternID: string = form.value.extractionPatternID;

		if (forumUrl && forumUrl.trim() !== '') {
			data.forumURL = forumUrl;
			isDataUpdated = true;
		}

		if (proposedDeliveryDate) {
			data.proposedDeliveryDate = proposedDeliveryDate;
			isDataUpdated = true;
		} else {
			data.proposedDeliveryDate = this.defaultDate;
		}

		if (extractionPatternID && extractionPatternID.trim() !== '') {
			isDataUpdated = true;
			data.extractionPatternID = extractionPatternID;
		}

		if (isDataUpdated) {
			this.updateCallData(data);
		}
	}

	// update the report by adding report URL and report hash for the current issued draft version
	updateReport(event) {
		const uri = '/report ';
		this.isSpinner = true;
		this.dataService.postData(uri, event).subscribe(
			(response) => {
				this.isSpinner = false;
				this.isSuccess = true;
				this.showModal(MESSAGE.HASH_UPDATE_SUCCESS);
				this.appUpdateReport.getReports(true);
				this.appDatacallHistory.getDatacallHistory(
					this.draft.id,
					this.draft.version
				);
				this.getReports();
			},
			(error) => {
				console.log('duplicate report:: ', error.message);
				this.isSpinner = false;
				this.isError = true;
				if (error === 'Unauthorized') {
					this.showSessionModal();
				} else if (error.message.search('Report already exist') > -1) {
					this.showModal(MESSAGE.DUPLICATE_HASH);
				} else {
					this.showModal(MESSAGE.GENERIC_ERROR);
				}
			}
		);
	}

	// Format date in mm dd yyyy | hr:min:ss format
	private formatDate2(d) {
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

	// Provide consent to the issued data call
	toggleAction() {
		if (this.isConsent) {
			this.isConsent = false;
			this.action = 'Consent';
			const uri = '/consent';
			const requestData = {
				datacallID: this.draft.id,
				dataCallVersion: this.draft.version,
				carrierID: this.loginResult.attributes.organizationId,
				carrierName: this.loginResult.username,
				createdBy: this.loginResult.username
			};
			this.isSmallSpinner = true;
			this.dataService.postData(uri, requestData).subscribe(
				(response) => {
					this.isSmallSpinner = false;
					this.isConsent = false;
					this.isSuccess = true;
					const type = 'success';
					const message =
						'Your ' +
						this.action.toLowerCase() +
						' has been recorded. The ' +
						this.action.toLowerCase() +
						' count will be updated shortly.';
					const title = 'Consent Recorded';
					this.dialogService.openModal(title, message, type);
					this.getConsentCount();
				},
				(error) => {
					this.isSmallSpinner = false;
					this.isError = true;
					const messageBundle = MESSAGE.COMMON_ERROR;
					const locale = 'en-US';
					this.dialogService.handleNotification(
						error,
						messageBundle,
						locale
					);
					console.error(error);
				}
			);
		}
	}

	// Get the names of the carriers who have provided the consent to the data call
	viewCarriers(action) {
		let uri;
		let data;
		let res;
		if (action === 'Liked') {
			uri =
				'/list-likes-by-data-call/' +
				this.draft.id +
				'/' +
				this.draft.version;
		} else if (action === 'Consented') {
			uri =
				'/list-consents-by-data-call/' +
				this.draft.id +
				'/' +
				this.draft.version;
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

				this.dialogService.openInfoModal(
					'',
					'',
					'info',
					this.data,
					true
				);
				this.isSpinner = false;
			},
			(error) => {
				this.isSpinner = false;
				const messageBundle = MESSAGE.NAME_FETCH_FAIL;
				const locale = 'en-US';
				this.dialogService.handleNotification(
					error,
					messageBundle,
					locale
				);
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

	getExtractionPattern() {
		const uri = '/list-extraction-patterns';
		this.dataService.getData(uri).subscribe(
			(response) => {
				this.extractionPatternList = JSON.parse(response);
				this.extractionPatternList.sort((a, b) =>
					a.extractionPatternID.localeCompare(b.extractionPatternID)
				);

				let patterns = [];
				this.extractionPatternList.forEach((el) => {
					if (!patterns.includes(el.extractionPatternID)) {
						patterns.push(el.extractionPatternID);
					}
				});
				let _formattedPatterns = [];
				patterns.forEach((pattern) => {
					let _arr = this.extractionPatternList.filter(
						(el) => el.extractionPatternID == pattern
					);
					let _pattern = _arr[0];
					_arr.forEach((arr, index) => {
						_pattern[`viewDefinition_${arr.dbType}`] =
							arr.viewDefinition;
					});
					_formattedPatterns.push(_pattern);
				});

				this.extractionPatternList = _formattedPatterns;

				this.extractionPatternList.forEach((element) => {
					if (
						this.draft.extractionPatternID ===
						element.extractionPatternID
					) {
						this.draft.extractionPatternName =
							element.extractionPatternName;
					}
				});
			},
			(error) => {
				this.isSpinner = false;
				const messageBundle = MESSAGE.NAME_FETCH_FAIL;
				const locale = 'en-US';
				this.dialogService.handleNotification(
					error,
					messageBundle,
					locale
				);
			}
		);
	}

	getExtractionPatternById() {
		let filterList = [];

		this.extractionPatternList.forEach((element) => {
			if (
				this.draft.extractionPatternID === element.extractionPatternID
			) {
				filterList.push(element);
			}
		});

		if (filterList.length > 0) {
			this.dialogService.openPatternDetails(filterList, 'info');
		}
	}

	showPattern() {
		this.dialogService.openPattern(this.extractionPatternList, 'info');
	}
}
