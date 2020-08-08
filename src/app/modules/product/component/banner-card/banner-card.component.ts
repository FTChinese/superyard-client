import { Component, OnInit, Input } from '@angular/core';
import { Banner } from 'src/app/data/schema/paywall';
import { Link } from 'src/app/shared/widget/link';
import { LoadingResult } from 'src/app/shared/widget/progress';
import { MetaItem } from 'src/app/shared/widget/meta-data';

@Component({
  selector: 'app-banner-card',
  templateUrl: './banner-card.component.html',
  styleUrls: ['./banner-card.component.scss']
})
export class BannerCardComponent implements OnInit {
  @Input() result: LoadingResult<Banner>;

  get link(): Link {
    if (this.result.notFound) {
      return {
        name: 'New',
        href: 'banner/new'
      };
    }

    return {
      name: 'Edit',
      href: 'banner/edit'
    };
  }

  get metaItems(): MetaItem[] {
    if (!this.result || !this.result.value) {
      return [];
    }

    return [
      {
        label: 'Created by',
        value: this.result.value.createdBy
      },
      {
        label: 'Create at',
        value: this.result.value.createdUtc
      },
      {
        label: 'Update at',
        value: this.result.value.updatedUtc
      }
    ];
  }

  constructor() { }

  ngOnInit(): void {

  }

}
