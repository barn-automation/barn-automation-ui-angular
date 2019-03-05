import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTabularComponent } from './live-tabular.component';

describe('LiveTabularComponent', () => {
  let component: LiveTabularComponent;
  let fixture: ComponentFixture<LiveTabularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTabularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
