import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BannerPreviewComponent } from './banner-preview.component';

describe('BannerPreviewComponent', () => {
  let component: BannerPreviewComponent;
  let fixture: ComponentFixture<BannerPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
