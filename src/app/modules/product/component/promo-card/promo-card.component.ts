import { Component, OnInit, Input } from '@angular/core';
import { LoadingResult } from 'src/app/shared/widget/progress';
import { Promo } from 'src/app/data/schema/paywall';
import { MetaItem } from 'src/app/shared/widget/meta-data';
import { Link } from 'src/app/shared/widget/link';
import { isEmpty } from 'rxjs/operators';

/**
 * This component is used to show the promotion details on the paywall page.
 */
@Component({
  selector: 'app-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss']
})
export class PromoCardComponent implements OnInit {
  // It uses the shared BaseBanner fieds to reuse BannerBoxComponent.
  @Input() promo: Promo;

  get isEmpty(): boolean {
    return !this.promo || !this.promo.id;
  }

  get termsAndConditions(): string[] {
    if (isEmpty) {
      return [];
    }

    return this.promo.terms.split('\n')
      .filter(line => line !== '');
  }

  get metaItems(): MetaItem[] {
    if (!this.promo) {
      return [];
    }

    return [
      {
        label: 'Created by',
        value: this.promo.createdBy
      },
      {
        label: 'Create at',
        value: this.promo.createdUtc
      },
    ];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
