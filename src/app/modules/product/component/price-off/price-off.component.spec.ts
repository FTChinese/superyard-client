import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOffComponent } from './price-off.component';

describe('PriceOffComponent', () => {
  let component: PriceOffComponent;
  let fixture: ComponentFixture<PriceOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
