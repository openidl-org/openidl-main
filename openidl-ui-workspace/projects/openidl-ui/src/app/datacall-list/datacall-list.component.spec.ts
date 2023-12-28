import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacallListComponent } from './datacall-list.component';

describe('DatacallListComponent', () => {
  let component: DatacallListComponent;
  let fixture: ComponentFixture<DatacallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
