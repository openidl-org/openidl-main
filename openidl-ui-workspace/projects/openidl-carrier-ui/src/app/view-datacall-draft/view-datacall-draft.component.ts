import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'openidl-common-ui';

@Component({
	selector: 'app-view-datacall-draft',
	templateUrl: './view-datacall-draft.component.html',
	styleUrls: ['./view-datacall-draft.component.scss']
})
export class ViewDatacallDraftComponent implements OnInit {
	isBack: Boolean = true;
  currentStatus = '';

	constructor(
		private router: Router,
		private storageService: StorageService
	) {}

	ngOnInit() {
    this.currentStatus = this.storageService.getItem('currentStatus');
		if (
			this.storageService.getItem('isShowIssuedDrafts') &&
			this.storageService.getItem('isShowIssuedDrafts') === 'true'
		) {
			this.isBack = false;
			this.storageService.clearItem('isShowIssuedDrafts');
		} else {
			this.isBack = true;
		}
	}

	goBack() {
		this.router.navigate(['/datacallList']);
	}
}
