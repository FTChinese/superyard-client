import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailFormComponent } from './retail-form.component';

describe('RetailFormComponent', () => {
  let component: RetailFormComponent;
  let fixture: ComponentFixture<RetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
