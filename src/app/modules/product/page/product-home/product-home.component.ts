import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data/schema/product';
import { productStd, productPrm } from 'src/app/data/schema/mocker';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {

  products: Product[] = [
    productStd,
    productPrm,
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onSetPaywall(prod: Product) {
    for (const p of this.products) {
      if (p.tier !== prod.tier) {
        continue;
      }

      if (p.id === prod.id) {
        p.isActive = true;
      } else {
        p.isActive = false;
      }
    }
  }
}
