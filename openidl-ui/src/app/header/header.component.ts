/**
 SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { appConst } from '../const/app.const';
import { StorageService } from '../../../lib/src/app/services/storage.service';
import { AuthService } from '../../../lib/src/app/services/auth.service';
import { environment } from './../../environments/environment';
import { DataService } from './../../../lib/src/app/services/data.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../lib/src/app/components/modal/modal.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() selected;
  @Input() fieldChanged;
  @Output() navigate = new EventEmitter();
  @ViewChild(ModalComponent) appModal: ModalComponent;
  appConst; role; orgLogo; org;
  isSpinner: Boolean = false;
  isResetWorldState: Boolean = false;
  isResetBtn: Boolean = false;
  shouldLogout: Boolean = false;
  shouldConfirm: Boolean = false;
  requestedRoute = '';

  title: any;
  message: any;
  type: any;

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private dataService: DataService,
              private router: Router) {
   }

  ngOnInit() {

    this.role = this.storageService.getItem('role');
    this.org = this.storageService.getItem('org');
    this.appConst = appConst[this.role];
    this.orgLogo = this.appConst.org[this.org];

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
    if(this.fieldChanged) {
      this.shouldLogout = true;
      this.showConfirmationModal();
    } else {
      this.logout();
    }
  }
  logout() {
    this.isSpinner = true;
    this.authService.logout('login')
                    .subscribe(resp => {
                      console.log(resp);
                      this.isSpinner = false;
                    }, err => {
                      this.isSpinner = false;
                      console.log(err);
                    });
  }

  toggleResetBtn() {
    this.isResetBtn = ! this.isResetBtn;
  }

  navigateToRoute(route) {
    this.requestedRoute = route;
    if (this.router.url !== this.requestedRoute) {
      if(this.fieldChanged) {
        this.shouldLogout = false;
        this.showConfirmationModal();
      } else {
        this.router.navigate([this.requestedRoute]);
      }
    }

  }

  onConfirmation() {
    if(this.shouldLogout) {
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

  conirmReset() {
    this.title = '';
    this.message = 'Are you sure you want to delete the data?';
    this.type = 'info';
    this.shouldConfirm = true;
    this.showModal();
  }

  // Show the modal of success, error or info type
  showModal() {
    this.appModal.openDeleteDataModal(this.title, this.message, this.type);
   }

  showConfirmationModal() {
    this.title = '';
    this.message = 'Are you sure you want to leave this page without submitting? Your information will be lost.';
    this.type = 'info';
    this.appModal.openConfirmationModal(this.title, this.message, this.type);
  }

  resetData() {
    console.log('url ', this.router.url);
    this.isSpinner = true;
    this.dataService.deleteData('/reset-data')
                    .subscribe(res => {
                      console.log(res);
                      this.isSpinner = false;
                      this.isResetBtn = false;
                      this.setSelected(0);
                      if (this.router.url !== '/datacallList') {
                          this.router.navigate(['/datacallList']);
                        } else {
                          location.reload();
                        }
                    }, err => {
                      this.isSpinner = false;
                      this.isResetBtn = false;
                    });
  }
}
