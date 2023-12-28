import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { appConst } from '../const/app.const';

import { StorageService } from 'openidl-common-ui';
import { AuthService } from 'openidl-common-ui';
import { DataService } from 'openidl-common-ui';
import { DialogService } from 'openidl-common-ui';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input() selected;
	@Input() fieldChanged;
	@Output() navigate = new EventEmitter();
	appConst;
	roleIcon;
	role;
	orgLogo;
	org;
	isSpinner: Boolean = false;
	isResetWorldState: Boolean = false;
	isResetBtn: Boolean = false;
	shouldLogout: Boolean = false;
	shouldConfirm: Boolean = false;
	requestedRoute = '';

	title: any;
	message: any;
	type: any;

	constructor(
		private storageService: StorageService,
		private authService: AuthService,
		private dataService: DataService,
		private router: Router,
		private dialogService: DialogService
	) {}

	ngOnInit() {
		this.role = this.storageService.getItem('role');
		this.org = this.storageService.getItem('org');
		this.appConst = appConst[this.role];
		this.orgLogo = this.appConst.org[this.org];
		this.roleIcon = appConst.roles[this.role];

		if (environment.RESET_WORLD_STATE === 'true') {
			this.isResetWorldState = true;
		} else {
			this.isResetWorldState = false;
		}
	}

	setSelected(selected) {
		this.selected = selected;
	}
	checkLogout() {
		if (this.fieldChanged) {
			this.shouldLogout = true;
			this.showConfirmationModal();
		} else {
			this.logout();
		}
	}
	logout() {
		this.isSpinner = true;
		this.authService.logout('login').subscribe(
			(resp) => {
				console.log(resp);
				this.isSpinner = false;
			},
			(err) => {
				this.isSpinner = false;
				console.log(err);
			}
		);
	}

	toggleResetBtn() {
		this.isResetBtn = !this.isResetBtn;
	}

	navigateToRoute(route) {
		this.requestedRoute = route;
		if (this.router.url !== this.requestedRoute) {
			if (this.fieldChanged) {
				this.shouldLogout = false;
				this.showConfirmationModal();
			} else {
				this.router.navigate([this.requestedRoute]);
			}
		}
	}

	onConfirmation() {
		if (this.shouldLogout) {
			this.shouldLogout = false;
			this.logout();
		} else {
			this.router.navigate([this.requestedRoute]);
		}
	}

	goHome() {
		if (this.router.url !== '/datacallList') {
			this.router.navigate(['/datacallList']);
		} else {
			location.reload();
		}
	}

	confirmReset() {
		this.title = '';
		this.message = 'Are you sure you want to delete the data?';
		this.type = 'info';
		this.shouldConfirm = true;
		this.showModal();
	}

	// Show the modal of success, error or info type
	showModal() {
		this.dialogService.openDeleteDataModal(
			this.title,
			this.message,
			this.type
		);
	}

	showConfirmationModal() {
		this.title = 'Confirmation';
		this.message =
			'Are you sure you want to leave this page without submitting? Your information will be lost.';
		this.type = 'info';
		const dialogRef = this.dialogService.openConfirmationModal(
			this.title,
			this.message,
			this.type
		);

		if (dialogRef) {
			const sub = dialogRef.afterClosed().subscribe((result) => {
				sub.unsubscribe();
				if (result === 'yes') {
					this.onConfirmation();
				} else {
					// set navigation to same
					this.selected = 1;
				}
			});
		}
	}

	resetData() {
		console.log('url ', this.router.url);
		this.isSpinner = true;
		this.dataService.deleteData('/reset-data').subscribe(
			(res) => {
				console.log(res);
				this.isSpinner = false;
				this.isResetBtn = false;
				this.setSelected(0);
				if (this.router.url !== '/datacallList') {
					this.router.navigate(['/datacallList']);
				} else {
					location.reload();
				}
			},
			(err) => {
				this.isSpinner = false;
				this.isResetBtn = false;
			}
		);
	}
}
