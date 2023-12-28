import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { appConst } from '../const/app.const';

import { StorageService } from 'openidl-common-ui';
import { AuthService } from 'openidl-common-ui';
import { DataService } from 'openidl-common-ui';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input() selected;
	appConst;
	role;
	orgLogo;
	roleIcon;
	org;
	isSpinner: Boolean = false;
	isResetBtn: Boolean = false;
	constructor(
		private storageService: StorageService,
		private authService: AuthService,
		private dataService: DataService,
		private router: Router
	) {
		this.role = this.storageService.getItem('role');
		this.org = this.storageService.getItem('org');
		this.appConst = appConst[this.role];
		this.orgLogo = this.orgIcon(this.org);
		this.roleIcon = appConst.roles[this.role];
	}

	ngOnInit() {}

	setSelected(selected) {
		this.selected = selected;
	}
	logout() {
		this.isSpinner = true;
		this.authService.logout('login').subscribe(
			(resp) => {
				console.log(resp);
				this.isSpinner = false;
			},
			(err) => {
				console.log(err);
				this.isSpinner = false;
			}
		);
	}

	toggleResetBtn() {
		this.isResetBtn = !this.isResetBtn;
	}

	goHome() {
		if (this.router.url !== '/datacallList') {
			this.router.navigate(['/datacallList']);
		} else {
			location.reload();
		}
	}

	resetData() {
		this.isSpinner = true;
		this.dataService.deleteData('/reset-data').subscribe(
			(res) => {
				console.log(res);
				this.isSpinner = false;
				this.isResetBtn = false;
				this.setSelected(0);
				this.router.navigate(['/datacallList']);
			},
			(err) => {
				this.isSpinner = false;
				this.isResetBtn = false;
			}
		);
	}

	orgIcon(org) {
		return this.storageService.getItem('iconBucketUrl') + org + '-logo.png';
	}
}
