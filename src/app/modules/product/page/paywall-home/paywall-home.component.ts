import { Component, OnInit } from '@angular/core';
import { PaywallBanner } from 'src/app/data/schema/paywall';
import { paywallBanner, productStd, productPrm } from 'src/app/data/schema/mocker';
import { Product } from 'src/app/data/schema/product';

@Component({
  selector: 'app-paywall-home',
  templateUrl: './paywall-home.component.html',
  styleUrls: ['./paywall-home.component.scss']
})
export class PaywallHomeComponent implements OnInit {

  banner: PaywallBanner = paywallBanner;
  products: Product[] = [
    productStd,
    productPrm
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
