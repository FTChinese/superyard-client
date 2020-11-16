import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressBtnComponent } from './progress-btn.component';

describe('ProgressBtnComponent', () => {
  let component: ProgressBtnComponent;
  let fixture: ComponentFixture<ProgressBtnComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
