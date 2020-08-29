import { Component, OnInit, Input } from '@angular/core';
import { Banner } from 'src/app/data/schema/paywall';
import { MetaItem } from 'src/app/shared/widget/meta-data';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss']
})
export class BannerCardComponent implements OnInit {
  @Input() banner: Banner;

  get metaItems(): MetaItem[] {
    if (!this.banner ) {
      return [];
    }

    return [
      {
        label: 'Created by',
        value: this.banner.createdBy
      },
      {
        label: 'Created at',
        value: this.banner.createdUtc
      },
      {
        label: 'Update at',
        value: this.banner.updatedUtc
      }
    ];
  }

  constructor() { }

  ngOnInit(): void {

  }

}
