import { Component, OnInit } from '@angular/core';
import { PricedProduct } from 'src/app/data/schema/product';
import { productStd, productPrm } from 'src/app/data/schema/mocker';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {

  products: PricedProduct[] = [
    productStd,
    productPrm,
  ];

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
