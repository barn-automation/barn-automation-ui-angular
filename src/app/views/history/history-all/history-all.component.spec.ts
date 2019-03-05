import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAllComponent } from './history-all.component';

describe('HistoryAllComponent', () => {
  let component: HistoryAllComponent;
  let fixture: ComponentFixture<HistoryAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
