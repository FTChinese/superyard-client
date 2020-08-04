import { Component, OnInit } from '@angular/core';
import { Product, Plan } from 'src/app/data/schema/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { products } from 'src/app/data/schema/mocker';
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  get modalTitle(): string {
    return `New pricing for ${this.product.tier} product`;
  }

  constructor(
    private route: ActivatedRoute,
    readonly modal: ModalService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');

        return of(products.get(id));
      })
    )
    .subscribe(prod => {
      this.product = prod;
    });
  }

  showNewPricing() {
    this.modal.open();
  }

  onPriceCreated(ok: boolean) {
    this.modal.close();
    // TODO: refresh prices list.
  }

  onDefaultPlan(plan: Plan) {

  }
}
