import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacallsIssuedComponent } from './datacalls-issued.component';

describe('DatacallsIssuedComponent', () => {
  let component: DatacallsIssuedComponent;
  let fixture: ComponentFixture<DatacallsIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacallsIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacallsIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
