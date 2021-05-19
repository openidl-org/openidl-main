/**
 SPDX-License-Identifier: Apache-2.0
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../lib/src/app/services/storage.service';



@Component({
  selector: 'app-create-datacall',
  templateUrl: './create-datacall.component.html',
  styleUrls: ['./create-datacall.component.css']
})
export class CreateDatacallComponent implements OnInit {

  selected: Number = 1;
  isClone: Boolean = false;
  hasFieldChanged: Boolean = false;

  constructor(private router: Router, private storageService: StorageService) {
    if (this.storageService.getItem('isClone') &&
    this.storageService.getItem('isClone') === 'true') {
      this.isClone = true;
      this.storageService.clearItem('isClone');
    } else {
      this.isClone = false;
    }
   }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['/datacallList']);
  }

  fieldChange() {
    this.hasFieldChanged = true;
  }

}
