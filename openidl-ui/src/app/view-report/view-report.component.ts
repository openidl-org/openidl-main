/**
 SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  selected: Number = 0;
  constructor() { }

  ngOnInit() {
  }

}
