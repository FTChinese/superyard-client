import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxDetailComponent } from './sandbox-detail.component';

describe('SandboxDetailComponent', () => {
  let component: SandboxDetailComponent;
  let fixture: ComponentFixture<SandboxDetailComponent>;

  beforeEach(async(() => {
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
