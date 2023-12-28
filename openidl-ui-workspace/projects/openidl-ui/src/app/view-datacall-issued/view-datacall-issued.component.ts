import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'openidl-common-ui';

@Component({
	selector: 'app-view-datacall-issued',
	templateUrl: './view-datacall-issued.component.html',
	styleUrls: ['./view-datacall-issued.component.scss']
})
export class ViewDatacallIssuedComponent implements OnInit {
	selected: Number = 0;
	constructor(
		private router: Router,
		private storageService: StorageService
	) {}

	ngOnInit() {}

	goBack() {
		this.router.navigate(['/datacallList']);
	}

	viewReport() {
		this.router.navigate(['/viewReport']);
	}

	viewDrafts() {
		this.storageService.setItem('isShowIssuedDrafts', 'true');
		this.router.navigate(['/viewDraft']);
	}

	cloneDatacall() {
		this.storageService.setItem('isClone', 'true');
		this.router.navigate(['/createDatacall']);
	}
}
