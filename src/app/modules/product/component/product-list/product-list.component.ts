import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from 'src/app/data/schema/product';
import { baseProdStd, baseProdPrm } from 'src/app/data/schema/mocker';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: BaseProduct[] = [
    baseProdStd,
    baseProdPrm,
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
