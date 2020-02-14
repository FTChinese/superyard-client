import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCenterComponent } from './layout-center.component';

describe('LayoutCenterComponent', () => {
  let component: LayoutCenterComponent;
  let fixture: ComponentFixture<LayoutCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
