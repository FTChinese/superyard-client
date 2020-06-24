import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFeedbackComponent } from './control-feedback.component';

describe('ControlFeedbackComponent', () => {
  let component: ControlFeedbackComponent;
  let fixture: ComponentFixture<ControlFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
