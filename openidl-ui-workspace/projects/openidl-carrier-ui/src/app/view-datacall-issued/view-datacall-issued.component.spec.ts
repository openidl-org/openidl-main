import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDatacallIssuedComponent } from './view-datacall-issued.component';

describe('ViewDatacallIssuedComponent', () => {
  let component: ViewDatacallIssuedComponent;
  let fixture: ComponentFixture<ViewDatacallIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDatacallIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDatacallIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
