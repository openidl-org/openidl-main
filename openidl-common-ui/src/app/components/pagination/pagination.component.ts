// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { appConfig } from './../../config/app.config';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() Records: any;
  @Input() currentIndex: any
  @Output() getPageByIndexEvent: any = new EventEmitter();
  @Output() getNextPageEvent: any = new EventEmitter();
  @Output() getPrevPageEvent: any = new EventEmitter();


  constructor() { }
  indexArray = [];
  indexCount;
  lastPage;
  MidEnd = 5;
  MidStart = 1;
  recordsPerPage = appConfig.records_per_page;
  pageSize = 0;
  colletionSize = 1;
  isMorePage: Boolean = true;
  ngOnInit() {
    this.getPage(this.Records);
  }


   getPage(records) {
    this.indexArray = [];
     let pageSize: any;
     pageSize = records / this.recordsPerPage;
     if (records % this.recordsPerPage === 0) {
       this.indexCount = pageSize;
       console.log(pageSize);
       this.pageSize =  pageSize;
       this.setPage();
     } else {
       pageSize = pageSize.toString();
       pageSize = parseInt(pageSize, 10) + 1;
       if (pageSize === 0) {
        this.indexArray.push({'page': 1});
      } else {
        this.pageSize =  pageSize;
        this.setPage();
    }
   }
   this.lastPage = pageSize;
   this.pageSize =  pageSize;
   }

   setPage() {
     if (this.pageSize > 10) {
      this.isMorePage = true;
      let pageColletionSize: any;
      pageColletionSize = this.pageSize / 5;
      pageColletionSize =  pageColletionSize.toString();
      pageColletionSize =  parseInt(pageColletionSize, 10) + 1;
      if (this.currentIndex === this.MidEnd + 1 ) {
          this.colletionSize = this.colletionSize + 1;
          if (this.colletionSize === pageColletionSize) {
              this.MidEnd = this.lastPage;
              this.MidStart = this.MidStart + 5;
          } else {
              this.MidStart =  this.MidStart + 5;
              this.MidEnd = this.MidEnd + 5;
          }
      } else if (this.currentIndex === this.MidStart - 1) {
        this.colletionSize = this.colletionSize  - 1;
        this.MidEnd = this.MidStart - 1;
        this.MidStart = this.MidStart - 5;
      }
      if (this.colletionSize === pageColletionSize) {
        this.isMorePage = false;
      }
      this.indexArray = [];
      for (let i = this.MidStart; i < this.MidEnd + 1 ; i++) {
     this.indexArray.push({'page': i});
     }
     console.log(this.indexArray);
     } else {
       this.indexArray = [];
       this.isMorePage = false;
      for (let i = 1; i < this.pageSize + 1 ; i++) {
        this.indexArray.push({'page': i});
     }
     }
    }
    getPageByIndex(index) {
      this.currentIndex = index;
      this.getPageByIndexEvent.emit(index);
      this.setPage();
    }
   getNextPage() {
     this.currentIndex = this.currentIndex + 1;
     this.getPageByIndexEvent.emit(this.currentIndex);
     this.setPage();
    }

    getPrevPage() {
      this.currentIndex =  this.currentIndex - 1;
      this.getPageByIndexEvent.emit(this.currentIndex);
      this.setPage();
    }

}
