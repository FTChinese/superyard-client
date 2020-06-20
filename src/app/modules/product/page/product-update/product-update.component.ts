import { Component, OnInit } from '@angular/core';
import { productStd } from 'src/app/data/schema/mocker';
import { Product } from 'src/app/data/schema/product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = productStd;

  get hasYearlyPricing(): boolean {
    return !!this.product.plans.find(p => p.cycle === 'year');
  }

  get permitMonth(): boolean {
    return this.product.tier === 'standard';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
