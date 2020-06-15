import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumboLayoutComponent } from './jumbo-layout.component';

describe('JumboLayoutComponent', () => {
  let component: JumboLayoutComponent;
  let fixture: ComponentFixture<JumboLayoutComponent>;

  beforeEach(async(() => {
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
