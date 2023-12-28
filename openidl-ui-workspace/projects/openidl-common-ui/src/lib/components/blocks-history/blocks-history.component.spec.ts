import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksHistoryComponent } from './blocks-history.component';

describe('BlocksHistoryComponent', () => {
  let component: BlocksHistoryComponent;
  let fixture: ComponentFixture<BlocksHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocksHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
