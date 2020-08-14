import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { products } from 'src/app/data/schema/mocker';
import { PricedProduct } from 'src/app/data/schema/product';
import { buildProductControls, EditProductForm } from '../../schema/control-builder';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [FormService]
})
export class EditProductComponent implements OnInit {

  product: PricedProduct;
  controls = buildProductControls();
  button: Button = Button.primary().setName('Save');

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
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

    this.formService.formCreated$.subscribe(form => {
      if (this.product) {
        form.patchValue({
          tier: this.product.tier,
          heading: this.product.heading,
          description: this.product.description.join('\n'),
          smallPrint: this.product.smallPrint,
        });
        // Tier field is disabled; thus is won't be submitted.
        form.get('tier').disable();
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      console.log(data);
      const formData: EditProductForm = JSON.parse(data);

      this.update(formData);
    });
  }

  private update(p: EditProductForm) {
    console.log(p);
  }
}
