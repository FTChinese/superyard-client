import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from 'src/app/data/schema/product';
import { baseProdStd, baseProdPrm } from 'src/app/data/schema/mocker';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';

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

  constructor(
    private builderService: ProductBuilderService,
  ) { }

  ngOnInit(): void {
    this.builderService.productCreated$
      .subscribe(prod => {
        this.products.unshift(prod);
      });
  }

}
