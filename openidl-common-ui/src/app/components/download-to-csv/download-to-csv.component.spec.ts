// SPDX-License-Identifier: Apache-2.0
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadToCsvComponent } from './download-to-csv.component';

describe('DownloadToCsvComponent', () => {
  let component: DownloadToCsvComponent;
  let fixture: ComponentFixture<DownloadToCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadToCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadToCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
