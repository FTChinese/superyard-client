import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/data/schema/product';
import { buildProductControls, ProductEditForm } from '../../schema/ProductForm';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ProductService } from '../../service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [FormService]
})
export class EditProductComponent implements OnInit {

  product: Product;
  controls = buildProductControls();
  button: Button = Button.primary().setName('Save');
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    readonly progress: ProgressService,
    private toast: ToastService,
    private productService: ProductService
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.productService.loadProduct(id);
      })
    )
    .subscribe({
      next: product => {
        this.progress.stop();
        this.product = product;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();
        const reqErr = new RequestError(err);
        this.toast.error(reqErr.message);
      }
    });

    this.formService.formCreated$.subscribe(form => {
      this.form = form;

      if (this.product) {
        form.patchValue({
          tier: this.product.tier,
          heading: this.product.heading,
          description: this.product.description,
          smallPrint: this.product.smallPrint,
        });
        // Tier field is disabled; thus it won't be submitted.
        this.disableTier();
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      console.log(data);
      const formData: ProductEditForm = JSON.parse(data);

      this.update(formData);
    });
  }

  private disableTier() {
    this.form.get('tier').disable();
  }

  /**
   * @todo disabled tier control even after updated.
   */
  private update(formData: ProductEditForm) {

    this.productService.updateProduct(
      this.product.id,
      {
        tier: this.product.tier,
        ...formData
      }
    )
      .subscribe({
        next: product => {
          console.log('Product updated %o', product);
          this.formService.enable(true);
          this.disableTier();
          this.toast.info('Updated successfully!');
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);
          this.toast.error(reqErr.message);
          this.formService.enable(true);
          this.disableTier();
        }
      });
  }
}
