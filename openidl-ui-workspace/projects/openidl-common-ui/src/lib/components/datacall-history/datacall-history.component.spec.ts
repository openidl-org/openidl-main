import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacallHistoryComponent } from './datacall-history.component';

describe('DatacallHistoryComponent', () => {
  let component: DatacallHistoryComponent;
  let fixture: ComponentFixture<DatacallHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacallHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
