import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDatacallDraftComponent } from './view-datacall-draft.component';

describe('ViewDatacallDraftComponent', () => {
  let component: ViewDatacallDraftComponent;
  let fixture: ComponentFixture<ViewDatacallDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDatacallDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDatacallDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
