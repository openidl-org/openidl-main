/**
 SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from './../../../lib/src/app/services/storage.service';
import { appConst } from '../const/app.const';
import { TabsetComponent } from 'ngx-bootstrap';
import { TableComponent } from '../../../lib/src/app/components/table/table.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datacall-list',
  templateUrl: './datacall-list.component.html',
  styleUrls: ['./datacall-list.component.css']
})
export class DatacallListComponent implements OnInit {
  @ViewChild(TabsetComponent) tabset: TabsetComponent;
  @ViewChild(TableComponent) appTable: TableComponent;
   role: any;
   appConst;
   statusObj;
   selected: Number = 0;
   selectedTab;
   currentTab = 0;
  constructor(private storageService: StorageService,
              private router: Router) {
    this.role = this.storageService.getItem('role');
    this.appConst = appConst[this.role];
    this.statusObj = appConst.status;

   }

  ngOnInit() {

    // Clearing the viewAbandoned to avoid the data call view in abandoned mode.
    this.storageService.removeItem('viewAbandoned');

    this.currentTab = +this.storageService.getItem('currentTab');
    if (!this.currentTab) {
      this.currentTab = 0;
    }
    this.tabset.tabs[this.currentTab].active = true;
    this.selectedTab = this.currentTab;
    this.setSelected(this.currentTab);
  }

  setSelected(selectedtab) {
    this.selectedTab = selectedtab;
    this.storageService.setItem('currentTab', selectedtab);
  }

  search(event) {
    (event == "" || event == null) ? this.storageService.setItem('searchMode', "NORMAL") : this.storageService.setItem('searchMode', "SEARCH");
    this.storageService.setItem('searchValue', event);
    this.appTable.searchFilter(event);
  }

  viewDraft(event) {
    console.log('view draft event ');
   this.storageService.setItem('datacall', event);
    this.router.navigate(['/viewDraft']);
  }
  viewIssued(event) {
    console.log('view issued event ');
    this.storageService.setItem('datacall', event);
     this.router.navigate(['/viewIssued']);
   }
   viewAbandoned(event) {
    console.log('view abandoned event');
    this.storageService.setItem('datacall', event);
    this.storageService.setItem('viewAbandoned', 'true');
    this.router.navigate(['/viewDraft']);
   }
   viewReport(event) {
    console.log('view report event ');
    this.storageService.setItem('datacall', event);
    this.router.navigate(['/viewReport']);
   }

}
