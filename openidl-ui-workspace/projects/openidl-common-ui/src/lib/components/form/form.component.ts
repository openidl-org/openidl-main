import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnDestroy,
	Directive
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { MESSAGE } from '../../config/messageBundle';
import { DialogService } from '../../services/dialog.service';
import { NotifierService } from '../../services/notifier.service';
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
  
export const STANDARD_FORMATS = {
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

export const YYYYMM_FORMATS = {
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
	selector: '[dateFormat]',
	providers: [
	  {provide: MAT_DATE_FORMATS, useValue: YYYYMM_FORMATS},
	]
  })
  export class CustomDateFormat {
  }

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},
		{provide: MAT_DATE_FORMATS, useValue: STANDARD_FORMATS}
	]
})
export class FormComponent implements OnInit, OnDestroy {
	// Event emitted to the parent component
	@Output() create = new EventEmitter();
	@Output() fieldChangeEvent = new EventEmitter();
	// Property passed to the component
	@Input() isClone;

	statusSubscription: Subscription;

	// Models to store the data
	public dateRange: Date[];
	public lossdateRange: Date[];
	public deadline: any;
	public dataCallObject = {};
	LOBs = [
		{
			code: 'Auto: Personal',
			value: 'Auto: Personal'
		}
	]; // Set default to 'Auto: Personal'

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
	isSuccess: Boolean = false;
	isSmallSpinner: boolean = false;

	// Hide form elements that are not required in the view.
	// TODO: May completely remove in future or add them back to view.
	hideFormElement = false;

	constructor(
		private formBuilder: FormBuilder,
		private dataService: DataService,
		private storageService: StorageService,
		private dialogService: DialogService,
		private notifierService: NotifierService
	) {}

	ngOnInit() {
		// Conditionally set the jurisdiction
		const jurisdiction = this.storageService.getItem('jurisdiction');
		if (jurisdiction) {
			this.jurisdiction = jurisdiction;
		} else {
			this.dataService.getData('/jurisdiction').subscribe(
				(response) => {
					this.jurisdiction = response;
					this.storageService.setItem('jurisdiction', response);
				},
				(error) => {
					console.log(error);
				}
			);
		}
		// Fetch the data and show in case of cloned data call
		if (this.isClone) {
			const dataCall = this.storageService.getItem('datacalldraft');
			// If user jurisdiction does not match with the data call jurisdiction then assign user jurisdiction to datacall's jurisdiction
			const userJurisdiction =
				this.storageService.getItem('jurisdiction');

			if (
				userJurisdiction &&
				userJurisdiction.toLowerCase() !=
					dataCall.jurisdiction.toLowerCase()
			) {
				dataCall.jurisdiction = userJurisdiction;
			}

			this.registerForm = this.formBuilder.group({
				name: [dataCall.name, Validators.required],
				description: [dataCall.description, Validators.required],
				premiumFromDate: [
					dataCall.premiumFromDate,
					[Validators.required]
				],
				premiumToDate: [dataCall.premiumToDate, [Validators.required]],
				lossFromDate: [dataCall.lossFromDate, [Validators.required]],
				lossToDate: [dataCall.lossToDate, [Validators.required]],
				transactionMonth: [dataCall.transactionMonth, [Validators.required]],
				deadline: [dataCall.deadline, [Validators.required]],
				purpose: [dataCall.purpose, [Validators.required]],
				isShowParticipants: [dataCall.isShowParticipants],
				lineOfBusiness: [
					dataCall.lineOfBusiness,
					[Validators.required]
				],
				detailedCriteria: [
					dataCall.detailedCriteria,
					[Validators.required]
				],
				intentToPublish: [dataCall.intentToPublish],
				eligibilityRequirement: [
					dataCall.eligibilityRequirement,
					[Validators.required]
				],
				jurisdiction: [dataCall.jurisdiction]
			});
			console.log('form :::::: ', this.registerForm);
		} else {
			const currentYear = new Date().getFullYear();
			const startDate = new Date(`01/01/${currentYear}`);
			const endDate = new Date(`12/31/${currentYear}`);

			this.dateRange = [startDate, endDate];
			this.registerForm = this.formBuilder.group({
				name: ['', Validators.required],
				description: ['', Validators.required],
				premiumFromDate: [startDate, [Validators.required]],
				premiumToDate: [endDate, [Validators.required]],
				lossFromDate: [startDate, [Validators.required]],
				lossToDate: [endDate, [Validators.required]],
				transactionMonth: [moment(), [Validators.required]],
				deadline: ['', [Validators.required]],
				purpose: ['', [Validators.required]],
				isShowParticipants: [true],
				lineOfBusiness: [this.LOBs[0].value, [Validators.required]],
				detailedCriteria: ['', [Validators.required]],
				intentToPublish: [true],
				eligibilityRequirement: ['', [Validators.required]],
				jurisdiction: [this.jurisdiction]
			});
		}

		const storedLOBs = JSON.parse(sessionStorage.getItem('LOBs'));
		// Check for cached LOBs or get from REST API
		if (storedLOBs) {
			this.LOBs = storedLOBs;
		} else {
			this.getLOBs();
		}

		this.statusSubscription = this.registerForm.statusChanges.subscribe(
			() => this.fieldChangeEvent.emit()
		);
	}

	ngOnDestroy() {
		if (this.statusSubscription) {
			this.statusSubscription.unsubscribe();
		}
	}

	// Get LOBs using REST API
	getLOBs() {
		const uri = '/lob';
		this.isSmallSpinner = true;
		this.setFormControlDisabled('lineOfBusiness', true);
		this.dataService.getData(uri).subscribe(
			(response) => {
				this.isSmallSpinner = false;
				this.setFormControlDisabled('lineOfBusiness', false);
				const lob = JSON.parse(response);
				this.LOBs = lob.lob;
				// Cache LOBs once received
				sessionStorage.setItem('LOBs', JSON.stringify(this.LOBs));
			},
			(error) => {
				console.log(error);
				this.isSpinner = false;
				this.isSmallSpinner = false;
				this.setFormControlDisabled('lineOfBusiness', false);
				const messageBundle = MESSAGE.COMMON_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);
	}

	setFormControlDisabled(controlName: string, isDisabled: boolean) {
		if (controlName) {
			if (isDisabled) {
				this.registerForm.controls[controlName].disable();
			} else {
				this.registerForm.controls[controlName].enable();
			}
		}
	}

	// Set data call to be issued
	issueDataCall(value) {
		if (!this.registerForm.valid) {
			this.notifierService.openSnackbar(
				MESSAGE.MANDATORY_FIELDS_ERROR.type,
				MESSAGE.MANDATORY_FIELDS_ERROR.title,
				MESSAGE.MANDATORY_FIELDS_ERROR.message
			);
		} else {
			this.title = MESSAGE.DATACALL_ISSUE_SUCCESS.title;
			this.message = MESSAGE.DATACALL_ISSUE_SUCCESS.message;
			this.type = MESSAGE.DATACALL_ISSUE_SUCCESS.type;
			this.createDataCall(value, 'ISSUED');
		}
	}

	// Set data call to be saved as a draft
	saveDataCall(value) {
		if (!this.registerForm.valid) {
			this.notifierService.openSnackbar(
				MESSAGE.MANDATORY_FIELDS_ERROR.type,
				MESSAGE.MANDATORY_FIELDS_ERROR.title,
				MESSAGE.MANDATORY_FIELDS_ERROR.message
			);
		} else {
			this.title = MESSAGE.DATACALL_DRAFT_SUCCESS.title;
			this.message = MESSAGE.DATACALL_DRAFT_SUCCESS.message;
			this.type = MESSAGE.DATACALL_DRAFT_SUCCESS.type;
			this.createDataCall(value, 'DRAFT');
		}
	}

	// Create the data call either in draft state or issued state
	createDataCall(value, status) {
		// Create the data call object to be posted to the create data call api
		this.dataCallObject = {
			name: value.name.trim(),
			intentToPublish: value.intentToPublish,
			description: value.description.trim(),
			purpose: value.purpose.trim(),
			lineOfBusiness: value.lineOfBusiness.trim(),
			premiumFromDate: value.premiumFromDate,
			premiumToDate: value.premiumToDate,
			lossFromDate: value.lossFromDate,
			lossToDate: value.lossToDate,
			jurisdiction: value.jurisdiction.trim(),
			detailedCriteria: value.detailedCriteria.trim(),
			eligibilityRequirement: value.eligibilityRequirement.trim(),
			status: status,
			isShowParticipants: value.isShowParticipants,
			deadline: value.deadline,
			transactionMonth: this.getTransactionMonth(value.transactionMonth)
		};

		console.log('Trimmed data', this.dataCallObject);

		const uri = '/data-call';
		this.isSpinner = true;
		this.dataService.postData(uri, this.dataCallObject).subscribe(
			(response) => {
				this.isSpinner = false;
				this.isSuccess = true;
				this.create.emit();
				setTimeout(() => {
					this.showModal();
				}, 500);
				console.log('DATA call creation response: ', response);
			},
			(error) => {
				console.log(error);
				this.isSpinner = false;
				const messageBundle = MESSAGE.COMMON_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);
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


	// Show the modal according to success, error or info using the child modal component's open modal method
	showModal() {
		this.dialogService.openModal(this.title, this.message, this.type);
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
