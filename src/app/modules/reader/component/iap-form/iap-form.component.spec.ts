import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IapFormComponent } from './iap-form.component';

describe('IapFormComponent', () => {
  let component: IapFormComponent;
  let fixture: ComponentFixture<IapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IapFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
