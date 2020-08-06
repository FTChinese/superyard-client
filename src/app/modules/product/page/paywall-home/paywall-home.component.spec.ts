import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaywallHomeComponent } from './paywall-home.component';

describe('PaywallHomeComponent', () => {
  let component: PaywallHomeComponent;
  let fixture: ComponentFixture<PaywallHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaywallHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaywallHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
