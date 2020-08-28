import { Component, OnInit, Input } from '@angular/core';
import { BaseBanner } from 'src/app/data/schema/paywall';

/**
 * This is used to show both the banne and promotion content.
 */
@Component({
  selector: 'app-banner-box',
  templateUrl: './banner-box.component.html',
  styleUrls: ['./banner-box.component.scss']
})
export class BannerBoxComponent implements OnInit {
  @Input() banner: BaseBanner;

  constructor() { }

  ngOnInit(): void {
  }

}
