/**
 SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../lib/src/app/services/storage.service';
import { ModalComponent } from '../../../lib/src/app/components/modal/modal.component';
import { MESSAGE } from 'lib/src/assets/messageBundle';


@Component({
  selector: 'app-view-datacall-draft',
  templateUrl: './view-datacall-draft.component.html',
  styleUrls: ['./view-datacall-draft.component.css']
})
export class ViewDatacallDraftComponent implements OnInit {

  @ViewChild(ModalComponent) appModal: ModalComponent;

  isBack: Boolean = true;
  hasFieldChanged: Boolean = false;
  title: any;
  message: any;
  type: any;

  constructor(private router: Router, private storageService: StorageService) { }

  selected: Number = 0;

  ngOnInit() {
    if (this.storageService.getItem('isShowIssuedDrafts') &&
    this.storageService.getItem('isShowIssuedDrafts') === 'true') {
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
    this.appModal.openConfirmationModal(this.title, this.message, this.type);
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
