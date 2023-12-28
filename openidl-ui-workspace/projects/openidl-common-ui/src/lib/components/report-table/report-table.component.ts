import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ViewChild
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Clipboard } from '@angular/cdk/clipboard';

import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { MESSAGE } from '../../config/messageBundle';
import { DialogService } from '../../services/dialog.service';
import { NotifierService } from '../../services/notifier.service';

@Component({
	selector: 'app-report-table',
	templateUrl: './report-table.component.html',
	styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {
	// Output event which is emitted to the update report component which then disables the update button
	// if the report status is accepted/published.
	@Output() reportStatus = new EventEmitter();

	// Flags to conditionally handle the expression
	isSpinner: boolean = false;
	isError: boolean = false;
	isSuccess: boolean = false;
	isDisabled: boolean = true;
	isAccepted: boolean = false;
	isPublished: boolean = false;
	isReportSelected: boolean = false;
	isShowUrl: boolean = true;
	isCopyBtn: boolean = false;
	isHashCopied: boolean = false;
	isURLCopied: boolean = false;
	isJurisdiction: boolean = false;
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
	jurisdiction: any;

	displayedColumns: string[] = [
		'reportVersion',
		'updatedTs',
		'status',
		'url',
		'hash',
		'action'
	];
	// material table variables
	@ViewChild(MatTable) table!: MatTable<any>;

	constructor(
		private dataService: DataService,
		private storageService: StorageService,
		private dialogService: DialogService,
		private notifierService: NotifierService,
		private clipboard: Clipboard
	) {}

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
		if (this.role === 'regulator') {
			this.displayedColumns.unshift('select');
		}
		this.getReports();
	}

	// Fetch the reports for the current issued data call
	getReports() {
		const uri =
			'/report?dataCallVersion=' +
			this.currentDatacall.version +
			'&dataCallID=' +
			this.currentDatacall.id;
		this.isSpinner = true;
		this.isCopyBtn = false;
		this.dataService.getData(uri).subscribe(
			(response) => {
				this.isSpinner = false;
				this.reportList = JSON.parse(response);

				if (this.reportList && this.reportList.length > 0) {
					let publishedReportList = [];
					this.reportList.forEach((element) => {
						element.status = element.status.toLowerCase();
						if (
							this.reportList.length == 1 &&
							element.status.toLowerCase() === 'candidate'
						) {
							this.isReportSelected = true;
							this.selectedReport = element;
							this.isDisabled = false;
						} else {
							this.isReportSelected = false;
							this.isDisabled = true;
						}
						if (element.status.toLowerCase() === 'accepted') {
							this.selectedReport = element;
							this.isAccepted = true;
							this.isPublished = false;
							this.isDisabled = false;
							this.reportStatus.emit();
						} else if (
							element.status.toLowerCase() === 'published'
						) {
							this.isAccepted = false;
							this.isPublished = true;
							this.isDisabled = false;
							this.isReportSelected = true;
							console.log('published element pushed');
							publishedReportList.push(element);
							console.log(publishedReportList);
							this.reportStatus.emit();
						}
						element.updatedTs = this.formatDate2(element.updatedTs);
					});
					if (
						this.role &&
						this.role.toLowerCase() === 'carrier' &&
						!this.isPublished
					) {
						this.isShowUrl = false;
					} else {
						this.isShowUrl = true;
					}
					if (this.isPublished) {
						this.reportList = publishedReportList;
					}
				}

				console.log('report list respnse: ', response);
			},
			(error) => {
				console.log(error);
				this.isSpinner = false;
				this.isError = true;
				const messageBundle = MESSAGE.COMMON_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);
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
		console.log('creating report data>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.');
		const data = {
			dataCallID: this.selectedReport.dataCallID,
			dataCallVersion: this.selectedReport.dataCallVersion,
			hash: this.selectedReport.hash,
			reportVersion: this.selectedReport.reportVersion,
			status: status,
			url: this.selectedReport.url,
			createdTs: this.selectedReport.createdTs,
			Juridiction: this.currentDatacall.jurisdiction
		};

		const uri = '/report ';
		this.isSpinner = true;
		this.dataService.putData(uri, data).subscribe(
			(response) => {
				this.isSpinner = false;
				this.isSuccess = true;
				this.title = 'Success';
				this.type = 'success';
				if (!isAcceptedAndPublished) {
					this.message =
						' The report has been ' + status.toLowerCase() + '.';
					if (apCount !== 1) {
						this.updateReport('PUBLISHED', true, 1);
					} else {
						setTimeout(() => {
							this.showModal();
						}, 500);
					}
				} else {
					this.message =
						'The report has been accepted and published.';
					setTimeout(() => {
						this.showModal();
					}, 500);
				}
			},
			(error) => {
				console.log(error);
				this.isSpinner = false;
				this.isError = true;
				this.isSuccess = false;
				const messageBundle = MESSAGE.COMMON_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);
	}

	// Show modal according to success, error or info
	showModal() {
		const dialogRef = this.dialogService.openModal(
			this.title,
			this.message,
			this.type
		);

		if (dialogRef) {
			const sub = dialogRef.afterClosed().subscribe((result) => {
				this.modalClose();
				sub.unsubscribe();
			});
		}
	}

	// Show the session expired modal
	showSessionModal() {
		this.dialogService.openModal(this.title, this.message, this.type, true);
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
		// const monthNames = [
		// 	'January',
		// 	'February',
		// 	'March',
		// 	'April',
		// 	'May',
		// 	'June',
		// 	'July',
		// 	'August',
		// 	'September',
		// 	'October',
		// 	'November',
		// 	'December'
		// ];
		let dd: any = date.getDate();
		let ss = 'AM';

		const mm: any = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		let hr: any = date.getHours();
		let min: any = date.getMinutes();
		if (dd < 10) {
			dd = '0' + dd;
		}

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

		return (d =
			mm + '/' + dd + '/' + yyyy + '  ' + hr + ':' + min + ' ' + ss);
	}

	copyToClipboard(text: string, source: string, event: Event) {
		event.preventDefault();
		event.stopPropagation();
		if (source === 'hash') {
			this.clipboard.copy(text);
			this.notifierService.openSnackbar(
				'info',
				'Info',
				'Report Hash Copied!'
			);
		} else if (source === 'URL') {
			this.clipboard.copy(text);
			this.notifierService.openSnackbar(
				'info',
				'Info',
				'Report URL Copied!'
			);
		}
	}

	openURL(url) {
		console.log('url  ', url);
		let extURL = url;
		if (!/^(http:|https:)/i.test(extURL)) {
			extURL = 'http://' + extURL;
		}
		let newWindow = window.open();
		// This will protect the app from being abused from 'reverse tabnabbing'.
		newWindow.opener = null;
		newWindow.location = extURL;
	}
}
