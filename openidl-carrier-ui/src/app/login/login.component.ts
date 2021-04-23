// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from './../../../lib/src/app/services/storage.service';
import { AuthService } from 'lib/src/app/services/auth.service';
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
          const userToken = response.result.userToken;
          this.storageService.setItem('role', response.result.attributes.role.toLowerCase());
          this.storageService.setItem('org', response.result.attributes.organizationId.toLowerCase());
          this.storageService.setItem('jurisdiction', response.result.attributes.organizationId);
          this.storageService.setItem('apiToken', userToken);
          this.storageService.setItem('loginResult', response.result);
          this.storageService.setItem('searchMode', "NORMAL");
          this.storageService.setItem('searchValue', "");
          this.isSpinner = false;
          this.router.navigate(['/datacallList']);
        },
        error => {
          this.isError = true;
          this.type = MESSAGE.LOGIN.INVALID_CREDENTIALS.type;
          this.message = MESSAGE.LOGIN.INVALID_CREDENTIALS.message;
          this.title = MESSAGE.LOGIN.INVALID_CREDENTIALS.title;
          this.isSpinner = false;
        }
        );

    }

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
