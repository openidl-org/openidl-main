import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { appConst } from '../const/app.const';
import { DataService, StorageService } from 'openidl-common-ui';
import { TableComponent } from 'openidl-common-ui';

@Component({
	selector: 'app-datacall-list',
	templateUrl: './datacall-list.component.html',
	styleUrls: ['./datacall-list.component.scss']
})
export class DatacallListComponent implements OnInit {
	@ViewChild(TableComponent) appTable: TableComponent;
	role: any;
	appConst;
	statusObj;
	selected: Number = 0;
	selectedTab = 0;
	currentTab = 0;
	// currentStatus = appConst.status.DRAFT;

	constructor(
		private storageService: StorageService,
		private dataService: DataService,
		private router: Router
	) {
		this.role = this.storageService.getItem('role');
		this.appConst = appConst[this.role];
		this.statusObj = appConst.status;
		this.dataService.getData('/icon-bucket-url').subscribe(
			(response) => {
				this.storageService.setItem('iconBucketUrl', response);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	ngOnInit() {
		// Clearing the viewAbandoned to avoid the data call view in abandoned mode.
		this.storageService.removeItem('viewAbandoned');

		this.currentTab = +this.storageService.getItem('currentTab');
		if (!this.currentTab) {
			this.currentTab = 0;
		}
		this.selectedTab = this.currentTab;
		this.setSelected(this.currentTab);
	}

	onStatusGroupChange($event: MatButtonToggleChange) {
		console.log('onStatusGroupChange', $event.value);
		this.storageService.setItem('currentTab', $event.value);
		// based on value set string status
		// switch ($event.value) {
		// 	case 1:
		// 		this.currentStatus = appConst.status.ISSUED;
		// 		break;
		// 	case 2:
		// 		this.currentStatus = appConst.status.CANCELLED;
		// 		break;
		// 	default:
		// 		this.currentStatus = appConst.status.DRAFT;
		// 		break;
		// }
	}

	setSelected(selectedTab) {
		this.selectedTab = selectedTab;
		this.storageService.setItem('currentTab', selectedTab);
	}

	search(event) {
		event == '' || event == null
			? this.storageService.setItem('searchMode', 'NORMAL')
			: this.storageService.setItem('searchMode', 'SEARCH');
		this.storageService.setItem('searchValue', event);
		this.appTable.searchFilter(event);
	}

	viewDraft(event) {
		console.log('view draft event ');
		this.storageService.setItem('datacall', event);
		this.router.navigate(['/viewDraft']);
	}
	viewIssued(event) {
		console.log('view issued event ');
		this.storageService.setItem('datacall', event);
		this.router.navigate(['/viewIssued']);
	}
	viewAbandoned(event) {
		console.log('view abandoned event');
		this.storageService.setItem('datacall', event);
		this.storageService.setItem('viewAbandoned', 'true');
		this.router.navigate(['/viewDraft']);
	}
	viewReport(event) {
		console.log('view report event ');
		this.storageService.setItem('datacall', event);
		this.router.navigate(['/viewReport']);
	}
}
