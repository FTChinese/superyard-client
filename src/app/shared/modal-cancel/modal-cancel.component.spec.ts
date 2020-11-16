import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCancelComponent } from './modal-cancel.component';

describe('ModalCancelComponent', () => {
  let component: ModalCancelComponent;
  let fixture: ComponentFixture<ModalCancelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
