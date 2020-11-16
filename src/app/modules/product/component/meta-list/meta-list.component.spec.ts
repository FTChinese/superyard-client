import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetaListComponent } from './meta-list.component';

describe('MetaListComponent', () => {
  let component: MetaListComponent;
  let fixture: ComponentFixture<MetaListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
