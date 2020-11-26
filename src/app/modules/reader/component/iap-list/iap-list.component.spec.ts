import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IapListComponent } from './iap-list.component';

describe('IapListComponent', () => {
  let component: IapListComponent;
  let fixture: ComponentFixture<IapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IapListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
