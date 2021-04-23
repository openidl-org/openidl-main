/**
 SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../lib/src/app/services/auth.service';
import { StorageService } from '../../../lib/src/app/services/storage.service';
import { MESSAGE } from '../../../lib/src/assets/messageBundle';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  model: any = {
    'username': '',
    'password': ''
  };
  userForm: FormGroup;
  isSpinner: Boolean = false;
  title: any;
  message: any;
  type: any;
  isError: Boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.clearStorage();
  }

  login(value) {

    console.log('userform value ', value);
    if (!this.userForm.valid) {
      this.isError = true;
      this.type = MESSAGE.LOGIN.USER_PASSWORD_MISSING.type;
      this.message = MESSAGE.LOGIN.USER_PASSWORD_MISSING.message;
      this.title = MESSAGE.LOGIN.USER_PASSWORD_MISSING.title;
    } else {
      this.model = value;
      this.isSpinner = true;
      this.authService.authenticate(this.model)
        .subscribe(response => {
          console.log('Login response: ', response);
          const userToken = response.result.userToken;
          this.storageService.setItem('role', response.result.attributes.role.replace('-', '').toLowerCase());
          this.storageService.setItem('org', response.result.attributes.organizationId.toLowerCase());

          // this.storageService.setItem('jurisdiction', (response.result.attributes.organizationId).split(' ')[0]);
          // this.storageService.setItem('jurisdiction', (response.result.attributes.stateName));

          if (response.result.attributes.stateName != null || typeof response.result.attributes.stateName !== 'undefined') {
            this.storageService.setItem('jurisdiction', (response.result.attributes.stateName));
            console.log('jurisdiction 1: ', response.result.attributes.stateName);
          } else {
            this.storageService.setItem('jurisdiction', (response.result.attributes.organizationId).split(' ')[0]);
            console.log('jurisdiction 2: ', (response.result.attributes.organizationId).split(' ')[0]);
          }

          this.storageService.setItem('apiToken', userToken);
          this.storageService.setItem('loginResult', response.result);
          this.storageService.setItem('userToken', response.result.userToken);
          this.storageService.setItem('searchMode', "NORMAL");
          this.storageService.setItem('searchValue', "");
          this.isSpinner = false;
          this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
          this.router.navigate(['/datacallList']);
        },
          error => {
            this.isError = true;
            this.type = MESSAGE.LOGIN.INVALID_CREDENTIALS.type;
            this.message = MESSAGE.LOGIN.INVALID_CREDENTIALS.message;
            this.title = MESSAGE.LOGIN.INVALID_CREDENTIALS.title;
            this.isSpinner = false;
            this.userForm = this.formBuilder.group({
              username: ['', Validators.required],
              password: ['', Validators.required]
            });
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
    this.storageService.clearItem('loginResult');
    this.storageService.clearItem('isAbandon');
    this.storageService.clearItem('currentTab');
    this.storageService.clearItem('searchMode');
    this.storageService.clearItem('searchValue');

  }

}
