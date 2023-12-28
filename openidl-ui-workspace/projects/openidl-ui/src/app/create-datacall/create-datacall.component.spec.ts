import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatacallComponent } from './create-datacall.component';

describe('CreateDatacallComponent', () => {
  let component: CreateDatacallComponent;
  let fixture: ComponentFixture<CreateDatacallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDatacallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDatacallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
