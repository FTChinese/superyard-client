import { Component, OnInit } from '@angular/core';
import { ListedProduct } from 'src/app/data/schema/product';
import { ProductService } from '../../service/product.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {

  products: ListedProduct[];

  constructor(
    private productService: ProductService,
    readonly progress: ProgressService,
    private toast: ToastService
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.productService.listProducts()
      .subscribe({
        next: products => {
          this.progress.stop();
          this.products = products;
        },
         error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);

          this.toast.error(errRes.message);
         }
      });
  }

  useProduct(prodId: string) {
    this.progress.start();

    this.productService.activateProduct(prodId)
      .subscribe({
        next: product => {
          this.progress.stop();
          this.products.forEach(prod => {
            if (prod.tier !== product.tier) {
              return;
            }

            if (prod.id !== product.id) {
              prod.isActive = false;
            } else {
              prod.isActive = true;
            }
          });
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();
          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
        }
      });
  }
}
