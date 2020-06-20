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

  example = JSON.stringify(productStd, null, 2);

  constructor() { }

  ngOnInit(): void {
  }

}
