import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'openidl-common-ui';
import { MESSAGE } from 'openidl-common-ui';
import { DialogService } from 'openidl-common-ui';

@Component({
  selector: 'app-view-datacall-draft',
  templateUrl: './view-datacall-draft.component.html',
  styleUrls: ['./view-datacall-draft.component.scss'],
})
export class ViewDatacallDraftComponent implements OnInit {
  isBack: Boolean = true;
  hasFieldChanged: Boolean = false;
  title: any;
  message: any;
  type: any;
  currentStatus = '';

  constructor(
    private router: Router,
    private storageService: StorageService,
    private dialogService: DialogService
  ) {}

  selected: Number = 0;

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
    this.hasFieldChanged = false;
  }

  checkBack() {
    console.log('this.hasFieldChanged ', this.hasFieldChanged);
    if (this.hasFieldChanged) {
      this.showConfirmationModal();
    } else {
      this.goBack();
    }
  }

  showConfirmationModal() {
    this.title = MESSAGE.PAGE_LEAVE_CONFIRMATION.title;
    this.message = MESSAGE.PAGE_LEAVE_CONFIRMATION.message;
    this.type = MESSAGE.PAGE_LEAVE_CONFIRMATION.type;
    this.dialogService.openConfirmationModal(
      this.title,
      this.message,
      this.type
    );
  }

  goBack() {
    this.router.navigate(['/datacallList']);
  }
  cloneDatacall() {
    this.storageService.setItem('isClone', 'true');
    this.router.navigate(['/createDatacall']);
  }
  abandonDatacall() {
    console.log('datacall abandonned');
    this.storageService.setItem('isAbandon', 'true');
    this.router.navigate(['/datacallList']);
  }

  fieldChange() {
    this.hasFieldChanged = true;
  }

  noFieldChange() {
    this.hasFieldChanged = false;
  }

  onConfirmation() {
    this.goBack();
  }
}
