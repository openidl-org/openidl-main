// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../lib/src/app/services/storage.service';


@Component({
  selector: 'app-view-datacall-issued',
  templateUrl: './view-datacall-issued.component.html',
  styleUrls: ['./view-datacall-issued.component.css']
})
export class ViewDatacallIssuedComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/datacallList']);
  }

  viewReport() {
    this.router.navigate(['/viewReport']);
  }

  viewDrafts() {
    this.storageService.setItem('isShowIssuedDrafts', 'true');
    this.router.navigate(['/viewDraft']);
  }

  cloneDatacall() {
    this.storageService.setItem('isClone', 'true');
    this.router.navigate(['/createDatacall']);
  }

}
