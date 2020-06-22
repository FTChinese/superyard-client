import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: BaseProduct;
  @Input() showHeader = true;

  constructor(
    private builder: ProductBuilderService
  ) { }

  ngOnInit(): void {}

  select() {
    this.builder.selectProduct(this.product);
  }
}
