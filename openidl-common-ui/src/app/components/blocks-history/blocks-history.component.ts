// SPDX-License-Identifier: Apache-2.0
import { Response } from '@angular/http';

import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-blocks-history',
  templateUrl: './blocks-history.component.html',
  styleUrls: ['./blocks-history.component.css']
})
export class BlocksHistoryComponent implements OnInit {

  blockList;
  isOpen: Boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    const url = '/block-explorer';
    this.dataService.getData(url)
                    .subscribe(res => {
                      console.log('Blocks', res);
                      this.blockList = res;
                    })
  }

  toggle() {
    console.log('clicked heading');
    this.isOpen = !this.isOpen;
  }

}
