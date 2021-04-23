// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit } from '@angular/core';
import { UpdateFormComponent } from './../../../lib/src/app/components/update-form/update-form.component';
import { Router } from '@angular/router';
import { StorageService } from '../../../lib/src/app/services/storage.service';


@Component({
  selector: 'app-view-datacall-draft',
  templateUrl: './view-datacall-draft.component.html',
  styleUrls: ['./view-datacall-draft.component.css']
})
export class ViewDatacallDraftComponent implements OnInit {

  isBack: Boolean = true;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    if (this.storageService.getItem('isShowIssuedDrafts') &&
    this.storageService.getItem('isShowIssuedDrafts') === 'true') {
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
