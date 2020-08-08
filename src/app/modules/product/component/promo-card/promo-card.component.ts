import { Component, OnInit, Input } from '@angular/core';
import { LoadingResult } from 'src/app/shared/widget/progress';
import { Promo } from 'src/app/data/schema/paywall';
import { MetaItem } from 'src/app/shared/widget/meta-data';
import { Link } from 'src/app/shared/widget/link';

/**
 * This component is used to show the promotion details on the paywall page.
 */
@Component({
  selector: 'app-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent implements OnInit {
  @Input() result: LoadingResult<Promo>;

  get link(): Link {
    if (this.result.notFound) {
      return {
        name: 'New',
        href: 'banners/new'
      };
    }

    return {
      name: 'Edit',
      href: 'banners/edit'
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
    ];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
