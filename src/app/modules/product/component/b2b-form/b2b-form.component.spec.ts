import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bFormComponent } from './b2b-form.component';

describe('B2bFormComponent', () => {
  let component: B2bFormComponent;
  let fixture: ComponentFixture<B2bFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
