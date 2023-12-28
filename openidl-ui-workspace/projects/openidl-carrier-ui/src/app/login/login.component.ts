import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	FormBuilder,
	FormGroup,
	FormGroupDirective,
	Validators
} from '@angular/forms';
import { AuthService } from 'openidl-common-ui';
import { NotifierService } from 'openidl-common-ui';
import { StorageService } from 'openidl-common-ui';
import { MESSAGE } from 'openidl-common-ui';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	username: any;
	password: any;
	model: any = {
		username: '',
		password: ''
	};
	userForm: FormGroup;
	isSpinner: boolean = false;
	title: any;
	message: any;
	type: any;
	isError: Boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private storageService: StorageService,
		private authService: AuthService,
		private notifierService: NotifierService,
	) {}

	ngOnInit() {
		this.userForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
		this.clearStorage();
	}

	login(value, formDirective: FormGroupDirective) {
		// console.log('userform value ', value);
		if (this.userForm.valid) {
			this.model = value;
			this.isSpinner = true;
			this.authService.authenticate(this.model).subscribe(
				(response) => {
					const userToken = response.result.userToken;
					this.storageService.setItem(
						'role',
						response.result.attributes.role
							.replace('-', '')
							.toLowerCase()
					);
					this.storageService.setItem(
						'org',
						response.result.attributes.organizationId.toLowerCase()
					);
					this.storageService.setItem(
						'jurisdiction',
						response.result.attributes.organizationId
					);
					this.storageService.setItem('apiToken', userToken);
					this.storageService.setItem('loginResult', response.result);
					this.storageService.setItem('searchMode', 'NORMAL');
					this.storageService.setItem('searchValue', '');
					this.isSpinner = false;
					this.userForm = this.formBuilder.group({
						username: ['', Validators.required],
						password: ['', Validators.required]
					});
					this.router.navigate(['/datacallList']);
				},
				(error) => {
					this.isError = true;
					this.isSpinner = false;
					formDirective.resetForm();
					this.userForm.reset();

					this.notifierService.openSnackbar(
						MESSAGE.LOGIN.INVALID_CREDENTIALS.type,
						MESSAGE.LOGIN.INVALID_CREDENTIALS.title,
						MESSAGE.LOGIN.INVALID_CREDENTIALS.message
					);
				}
			);
		}
		// later it should be data call list
	}

	closeNotify() {
		this.isError = false;
	}

	clearStorage() {
		this.storageService.clearItem('apiToken');
		this.storageService.clearItem('tokenType');
		this.storageService.clearItem('datacall');
		this.storageService.clearItem('jurisdiction');
		this.storageService.clearItem('org');
		this.storageService.clearItem('role');
		this.storageService.clearItem('searchMode');
		this.storageService.clearItem('searchValue');
	}
}
