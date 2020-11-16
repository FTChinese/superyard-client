import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WikiListComponent } from './wiki-list.component';

describe('WikiListComponent', () => {
  let component: WikiListComponent;
  let fixture: ComponentFixture<WikiListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
