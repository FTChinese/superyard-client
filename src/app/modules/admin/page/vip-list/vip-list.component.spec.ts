import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipListComponent } from './vip-list.component';

describe('VipListComponent', () => {
  let component: VipListComponent;
  let fixture: ComponentFixture<VipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
