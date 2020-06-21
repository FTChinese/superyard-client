import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from 'src/app/data/schema/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: BaseProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
