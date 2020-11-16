import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonalKeysComponent } from './personal-keys.component';

describe('PersonalKeysComponent', () => {
  let component: PersonalKeysComponent;
  let fixture: ComponentFixture<PersonalKeysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
