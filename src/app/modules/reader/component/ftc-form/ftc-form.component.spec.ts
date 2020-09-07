import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtcFormComponent } from './ftc-form.component';

describe('FtcFormComponent', () => {
  let component: FtcFormComponent;
  let fixture: ComponentFixture<FtcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
