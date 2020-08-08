import { Component, OnInit } from '@angular/core';
import { Paywall, Banner, Promo } from 'src/app/data/schema/paywall';
import { mockPaywall } from 'src/app/data/schema/mocker';
import { LoadingResult, loadingResult } from 'src/app/shared/widget/progress';

@Component({
  selector: 'app-paywall-home',
  templateUrl: './paywall-home.component.html',
  styleUrls: ['./paywall-home.component.scss']
})
export class PaywallHomeComponent implements OnInit {

  paywall: Paywall = mockPaywall;

  bannerResult: LoadingResult<Banner> = loadingResult(mockPaywall.banner);
  promoResult: LoadingResult<Promo> = loadingResult();

  constructor() { }

  ngOnInit(): void {
  }

}
