import { Component, OnInit } from '@angular/core';
import { Paywall, Banner, Promo } from 'src/app/data/schema/paywall';
import { mockPaywall } from 'src/app/data/schema/mocker';
import { LoadingResult, loadingResult } from 'src/app/shared/widget/progress';
import { PaywallService } from '../../service/paywall.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-paywall-home',
  templateUrl: './paywall-home.component.html',
  styleUrls: ['./paywall-home.component.scss']
})
export class PaywallHomeComponent implements OnInit {

  paywall: Paywall = mockPaywall;

  // Loading result have 3 states:
  // * Result loaded
  // * Not found
  // * Error
  // All these threes states have to be reflected on UI.
  // You cannot determine the UI state simply by relying on the whether data is loaded or not.
  bannerResult: LoadingResult<Banner> = loadingResult(mockPaywall.banner);

  promoResult: LoadingResult<Promo> = loadingResult();

  constructor(
    private paywallService: PaywallService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.paywallService.loadBanner()
      .subscribe({
        next: (b: Banner) => {
          this.bannerResult = {
            value: b,
            notFound: false,
          }
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          if (errRes.notFound) {
            this.bannerResult = {
              value: undefined,
              notFound: true,
            }
            return;
          }

          this.toast.error(errRes.message);
        }
      });

    this.paywallService.loadProducts()
      .subscribe({
        next: products => {

        }
      })
  }

}
