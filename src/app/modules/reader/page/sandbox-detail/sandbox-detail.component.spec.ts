import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SandboxDetailComponent } from './sandbox-detail.component';

describe('SandboxDetailComponent', () => {
  let component: SandboxDetailComponent;
  let fixture: ComponentFixture<SandboxDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SandboxDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandboxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
