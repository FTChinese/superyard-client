import { Component, OnInit } from '@angular/core';
import { BaseProduct } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  product: BaseProduct;

  constructor(
    private builderService: ProductBuilderService
  ) { }

  ngOnInit(): void {
  }

  // When host ProductFormComponent emitted `created` event,
  // update ui to preview it and aslo updte the builder serive.
  onCreated(p: BaseProduct) {
    console.log('A new plan is created: %o', p);
    this.product = p;
    this.builderService.setProduct(p);
  }
}
