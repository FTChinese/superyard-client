import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmedListComponent } from './unconfirmed-list.component';

describe('UnconfirmedListComponent', () => {
  let component: UnconfirmedListComponent;
  let fixture: ComponentFixture<UnconfirmedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnconfirmedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnconfirmedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
