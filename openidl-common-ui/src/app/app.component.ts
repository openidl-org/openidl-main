// SPDX-License-Identifier: Apache-2.0
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-openidl-common-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class OpenidlCommonComponent {
  @ViewChild(TableComponent) appTable: TableComponent;
  title = 'Openidl-common-ui app';

  search(event) {
    this.appTable.searchFilter(event);
  }

}
