import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'openidl-common-ui';

@Component({
  selector: 'app-create-datacall',
  templateUrl: './create-datacall.component.html',
  styleUrls: ['./create-datacall.component.scss'],
})
export class CreateDatacallComponent implements OnInit {
  selected: Number = 1;
  isClone: Boolean = false;
  hasFieldChanged: Boolean = false;

  constructor(private router: Router, private storageService: StorageService) {
    if (
      this.storageService.getItem('isClone') &&
      this.storageService.getItem('isClone') === 'true'
    ) {
      this.isClone = true;
      this.storageService.clearItem('isClone');
    } else {
      this.isClone = false;
    }
  }

  ngOnInit() {}

  redirect() {
    this.router.navigate(['/datacallList']);
  }

  fieldChange() {
    this.hasFieldChanged = true;
  }
}
