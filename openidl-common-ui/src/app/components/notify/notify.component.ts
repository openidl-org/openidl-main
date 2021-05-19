// SPDX-License-Identifier: Apache-2.0
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  @Input() title;
  @Input() message;
  @Input() type;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  closeNotify() {
    this.close.emit(false);
  }

}
