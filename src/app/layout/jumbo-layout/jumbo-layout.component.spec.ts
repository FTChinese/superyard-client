import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JumboLayoutComponent } from './jumbo-layout.component';

describe('JumboLayoutComponent', () => {
  let component: JumboLayoutComponent;
  let fixture: ComponentFixture<JumboLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JumboLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumboLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
