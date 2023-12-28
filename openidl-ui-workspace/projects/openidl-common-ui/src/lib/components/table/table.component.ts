import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	AfterViewInit
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DataService } from '../../services/data.service';
import { StorageService } from '../../services/storage.service';
import { appConfig } from '../../config/app.config';
import { MESSAGE } from '../../config/messageBundle';
import { DialogService } from '../../services/dialog.service';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
	// Input props received by the component
	@Input() status: any;
	@Input() prop: any;
	@Input() propvalue: any;

	// Events emitted as outputs from the component
	@Output() viewDraftEvent: any = new EventEmitter();
	@Output() viewIssuedEvent: any = new EventEmitter();
	@Output() viewReportEvent: any = new EventEmitter();
	@Output() viewAbandonedEvent: any = new EventEmitter();

	// material table variables
	@ViewChild(MatTable) table!: MatTable<DataTableItem>;
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	// Models to store data
	searchValue;
	data: DataTableItem[] = [];
	pageIndex = 1;
	appConst;

	// Params to be passed to modal
	// title: any;
	// message: any;
	// type: any;
	// role: any;

	// variables related to pagination
	pageCount: any;
	indexArray = [];
	indexCount: any;
	currentIndex;
	lastPage = 1;
	recordsPerPage = appConfig.records_per_page;
	statusObj;

	// Variables related to sorting
	sortField: any;
	sortDir: any = 'desc';
	statusText: any;

	// Flags to handle conditional expressions
	isSpinner: Boolean = false;
	isError: Boolean = false;
	isSuccess: Boolean = false;
	isRecord: Boolean = true;
	isopen: Boolean = false;
	ispagination: Boolean = false;

	private queryParameter: String;
	private queryUri: String;

	private navigationFlag: boolean = false;

	//table columns
	draftColumns = [
		'name',
		'transactionMonth',
		'deadline',
		'jurisdiction',
		'lineOfBusiness',
		'version',
		'noOfLikes',
		'updatedTs'
	];
	issuedColumns = [
		'name',
		'transactionMonth',
		'deadline',
		'jurisdiction',
		'lineOfBusiness',
		'version',
		'noOfConsents',
		'reportStatus',
		'updatedTs'
	];
	cancelledColumns = [
		'name',
		'transactionMonth',
		'deadline',
		'jurisdiction',
		'lineOfBusiness',
		'version',
		'updatedTs'
	];
	tableColumns: string[] = this.draftColumns;

	dataSource = new MatTableDataSource<DataTableItem>();

	constructor(
		private dataService: DataService,
		private storageService: StorageService,
		private dialogService: DialogService
	) {
		this.statusObj = appConfig.status;
	}

	ngOnInit() {
		// Get the current role to handle the view accordingly
		// this.role = this.storageService.getItem('role');

		// Conditional expressions to set the status text which is shown when there are no data calls of the current status
		if (this.status === this.statusObj.DRAFT) {
			this.tableColumns = this.draftColumns;
			this.statusText = 'drafted';
		} else if (this.status === this.statusObj.CANCELLED) {
			this.tableColumns = this.cancelledColumns;
			this.statusText = 'abandoned';
		} else if (this.status === this.statusObj.ISSUED) {
			this.tableColumns = this.issuedColumns;
			this.statusText = 'issued';
		}
		if (!this.storageService.getItem('currentStatus')) {
			this.storageService.setItem('currentStatus', this.status);
		}
		if (this.storageService.getItem('currentStatus') != this.status) {
			this.storageService.setItem('currentStatus', this.status);
			if (this.storageService.getItem('currentPageIndex')) {
				this.storageService.clearItem('currentPageIndex');
			}
		}

		this.initTable();
	}

	private initTable() {
		// Check if currentPageIndex exists in storage else initialize it to 1
		if (this.navigationFlag) {
			this.navigationFlag = false;
			this.currentIndex = 1;
			this.storageService.setItem('currentPageIndex', this.currentIndex);
		} else {
			const currentPageIndex =
				this.storageService.getItem('currentPageIndex');
			if (currentPageIndex) this.currentIndex = currentPageIndex;
			/**
			 * Define the currentIndex value based on searchMode
			 */ else
				this.storageService.getItem('searchMode') == 'NORMAL'
					? (this.currentIndex = 0)
					: (this.currentIndex = 1);
		}
		// Default sorting conditional expression
		if (
			this.status === this.statusObj.DRAFT ||
			this.status === this.statusObj.CANCELLED
		) {
			this.sortField = 'updatedTs';
		} else {
			this.sortField = 'deadline';
		}

		this.isSpinner = true;
	}

	ngAfterViewInit(): void {
		// must call api after setting up paginator and sorter
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		// this.table.dataSource = this.dataSource;
		// Get the data as per the data call status
		this.getDataCallsByStatus();
	}

	// material table page change event
	// onPageChange(page: PageEvent) {
	// fetch data from service based on pageIndex and pageSize
	// console.log('pull data for table', page);
	// this.isSpinner = true;
	// if (page.previousPageIndex > page.pageIndex) {
	// 	console.log('previous page data');
	// 	this.getPrevDataCalls(page);
	// } else {
	// 	console.log('next page data');
	// 	this.getNextDataCalls(page);
	// }
	// }

	// Filter the data calls present in the DOM according to the search input
	searchFilter(searchinputvalue) {
		this.navigationFlag = true;
		this.initTable();
		// Get the data as per the data call status
		this.getDataCallsByStatus();
	}

	// This will be used if the search filter is server side
	searchDatacalls() {
		this.queryParameter =
			'status=' + this.status + '&&' + this.prop + '=' + this.propvalue;
	}

	// Count the index and page size for the pagination
	countIndex(records) {
		console.log(this.lastPage);
		this.indexArray = [];
		let pageSize;
		pageSize = records / 10;
		if (records % 10 == 0) {
			this.indexCount = pageSize;
			console.log(pageSize);
			for (let i = 0; i < pageSize; i++) {
				this.indexArray.push({ page: i + 1 });
			}
		} else {
			pageSize = pageSize.toString();
			pageSize = parseInt(pageSize) + 1;
			console.log(pageSize);
			if (pageSize === 0) {
				this.indexArray.push({ page: 1 });
			} else {
				for (let i = 0; i < pageSize; i++) {
					this.indexArray.push({ page: i + 1 });
				}
			}
		}
		this.lastPage = pageSize;
		console.log(this.indexArray);
	}

	// Get data calls list according to the selected pagination index
	getDatacallsByIndex(index) {
		this.currentIndex = index;
		// Store the current index to storage so that its used whenever table is navigated back form data call details page
		// This index is deleted wen user switches between tabs
		this.storageService.setItem('currentPageIndex', this.currentIndex);
		this.pageIndex = this.recordsPerPage * (index - 1) + 1;
		this.queryParameter =
			this.storageService.getItem('searchMode') == 'NORMAL'
				? 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  this.pageIndex +
				  '&&pageSize=' +
				  this.recordsPerPage
				: 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  this.pageIndex +
				  '&&pageSize=' +
				  this.recordsPerPage +
				  '&&searchKey=' +
				  this.storageService.getItem('searchValue');
		this.getDatacalls(this.queryParameter);
	}

	// Get data calls list according to the data call status
	getDataCallsByStatus() {
		this.pageIndex =
			this.currentIndex == 1 || this.currentIndex == 0
				? this.storageService.getItem('searchMode') == 'NORMAL'
					? (this.pageIndex = 0)
					: (this.pageIndex = 1)
				: this.recordsPerPage * (this.currentIndex - 1) + 1;
		console.log('getDataCallsByStatus   ' + this.pageIndex);
		this.queryParameter =
			this.storageService.getItem('searchMode') == 'NORMAL'
				? 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  this.pageIndex +
				  '&&pageSize=' +
				  this.recordsPerPage
				: 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  this.pageIndex +
				  '&&pageSize=' +
				  this.recordsPerPage +
				  '&&searchKey=' +
				  this.storageService.getItem('searchValue');
		this.getDatacalls(this.queryParameter);
	}

	// Get next set of data calls when clicked the next button of pagination
	getNextDataCalls(page: PageEvent) {
		this.pageIndex = this.recordsPerPage * this.currentIndex + 1;
		this.currentIndex = this.currentIndex + 1;
		this.queryParameter =
			this.storageService.getItem('searchMode') == 'NORMAL'
				? 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  page.pageIndex +
				  '&&pageSize=' +
				  page.pageSize
				: 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  page.pageIndex +
				  '&&pageSize=' +
				  page.pageSize +
				  '&&searchKey=' +
				  this.storageService.getItem('searchValue');
		this.getDatacalls(this.queryParameter);
	}

	//// Get previous set of data calls when clicked the prev button of pagination
	getPrevDataCalls(page: PageEvent) {
		this.currentIndex = this.currentIndex - 1;
		this.pageIndex = this.pageIndex - this.recordsPerPage;
		this.pageIndex = this.pageIndex;
		this.queryParameter =
			this.storageService.getItem('searchMode') == 'NORMAL'
				? 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  page.pageIndex +
				  '&&pageSize=' +
				  page.pageSize
				: 'status=' +
				  this.status +
				  '&&version=latest&&startIndex=' +
				  page.pageIndex +
				  '&&pageSize=' +
				  page.pageSize +
				  '&&searchKey=' +
				  this.storageService.getItem('searchValue');
		this.getDatacalls(this.queryParameter);
	}

	// Fetch the data calls as per the passed query params by calling the REST API
	getDatacalls(queryParam) {
		this.queryUri =
			this.storageService.getItem('searchMode') == 'NORMAL'
				? '/list-data-calls-by-criteria?' + queryParam
				: '/search-data-calls?' + queryParam;

		// this.isSpinner = true;
		this.data = [];
		this.dataService.getData(this.queryUri).subscribe(
			(response) => {
				if (
					JSON.parse(response) === null ||
					JSON.parse(response) === 'null'
				) {
					this.isSpinner = false;
					this.ispagination = false;
					this.isRecord = false;
					this.dataSource.data = [];
					if (this.table) {
						this.table.renderRows();
					}
				} else {
					this.isRecord = true;
					this.ispagination = true;
					const dataCallsList = JSON.parse(response).dataCallsList;

					if (dataCallsList && dataCallsList.length > 0) {
						dataCallsList.forEach((element, i) => {
							if (element.reportsList[0].status === '') {
								element.reportsList = [
									{
										status: 'Awaiting',
										url: ''
									}
								];
							}
							this.data.push({
								name: element.dataCalls.name,
								transactionMonth: element.dataCalls.transactionMonth,
								deadline: element.dataCalls.deadline,
								jurisdiction: element.dataCalls.jurisdiction,
								lineOfBusiness:
									element.dataCalls.lineOfBusiness,
								version: element.dataCalls.version,
								draftVersions: element.NoOfDrafts,
								noOfLikes: element.dataCalls.likeCount,
								noOfConsents: element.dataCalls.consentCount,
								reportStatus:
									element.reportsList[0].status.toLowerCase(),
								reportUrl: element.reportsList[0].url,
								updatedTs: element.dataCalls.updatedTs,
								detailedCriteria:
									element.dataCalls.detailedCriteria,
								comments: element.dataCalls.comments,
								description: element.dataCalls.description,
								eligibilityRequirement:
									element.dataCalls.eligibilityRequirement,
								forumURL: element.dataCalls.forumURL,
								id: element.dataCalls.id,
								intentToPublish:
									element.dataCalls.intentToPublish,
								isLatest: element.dataCalls.isLatest,
								isLocked: element.dataCalls.isLocked,
								isShowParticipants:
									element.dataCalls.isShowParticipants,
								lossFromDate: element.dataCalls.lossFromDate,
								lossToDate: element.dataCalls.lossToDate,
								premiumFromDate:
									element.dataCalls.premiumFromDate,
								premiumToDate: element.dataCalls.premiumToDate,
								proposedDeliveryDate:
									element.dataCalls.proposedDeliveryDate,
								purpose: element.dataCalls.purpose,
								status: element.dataCalls.status,
								type: element.dataCalls.type,
								extractionPatternID:
									element.dataCalls.extractionPatternID,
								extractionPatternTs:
									element.dataCalls.extractionPatternTs,
								updatedBy: element.dataCalls.updatedBy
							});
						});
					}
					this.pageCount = JSON.parse(response).totalNoOfRecords;
					this.countIndex(this.pageCount);

					if (this.data && this.data.length > 0) {
						this.isRecord = true;
						this.data.forEach((el) => {
							if (el.transactionMonth || el.transactionMonth !== '') {
							}
							if (el.deadline || el.deadline !== '') {
							}
							if (
								el.proposedDeliveryDate ||
								el.proposedDeliveryDate !== ''
							) {
							}
							// TODO: following field might change to creationDate if added to data model
							if (el.updatedTs || el.updatedTs !== '') {
							}
							//TODO: raj - below property is always undefined.
							// el.fromdate = this.formatDate(el.fromdate);
							// el.toDate = this.formatDate(el.toDate);
						});
					} else {
						this.isRecord = false;
						// TODO: Also show the error popup
					}
					this.isSpinner = false;
					this.dataSource.data = this.data;
					if (this.table) {
						this.table.renderRows();
					}
				}
			},
			(error) => {
				console.log(error);
				this.isSpinner = false;
				this.isError = true;
				const messageBundle = MESSAGE.DATA_FETCH_ERROR;
				this.dialogService.handleNotification(error, messageBundle);
			}
		);
	}

	search(event) {
		// implement search functionality by passing event.value and status
		console.log('search value: ', event);
	}

	viewDraft(data) {
		console.log(data.status);
		if (data.status === this.statusObj.DRAFT) {
			this.viewDraftEvent.emit(data);
		} else if (data.status === this.statusObj.ISSUED) {
			this.viewIssuedEvent.emit(data);
		} else {
			this.viewAbandonedEvent.emit(data);
		}
	}

	viewReport(event, data, reportStatus, reportUrl) {
		event.stopPropagation();
		if (!(reportStatus.toLowerCase() === 'awaiting')) {
			console.log('else inner ', reportStatus);
			this.viewReportEvent.emit(data);
		}
	}
}

export interface DataTableItem {
	name: string;
	transactionMonth: string;
	deadline: string;
	jurisdiction: string;
	lineOfBusiness: string;
	version: string;
	draftVersions: string;
	noOfLikes: number;
	noOfConsents: number;
	reportStatus: string;
	reportUrl: string;
	updatedTs: string;
	detailedCriteria: string;
	comments: string;
	description: string;
	eligibilityRequirement: string;
	forumURL: string;
	id: string;
	intentToPublish: boolean;
	isLatest: boolean;
	isLocked: boolean;
	isShowParticipants: boolean;
	lossFromDate: Date;
	lossToDate: Date;
	premiumFromDate: Date;
	premiumToDate: Date;
	proposedDeliveryDate: string;
	purpose: string;
	status: string;
	type: string;
	extractionPatternID: string;
	extractionPatternTs: Date;
	updatedBy: string;
}
