import { Component, OnInit, Input } from '@angular/core';
import { DynamicControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { Product } from 'src/app/data/schema/product';
import { FormService } from 'src/app/shared/service/form.service';
import { ProductForm } from 'src/app/data/schema/form-data';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RequestError } from 'src/app/data/schema/request-result';
import { productStd } from 'src/app/data/schema/mocker';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [FormService],
})
export class ProductFormComponent implements OnInit {

  // Build new product form based on an existing Product instance.
  @Input() product: Product = productStd;

  controls: DynamicControl[]

  button: Button = Button.primary().setName('save');

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.controls = [
      new InputControl({
        value: this.product.tier,
        key: 'tier',
        validators: [Validators.required],
        label: 'Tier',
        type: 'text',
        readonly: true,
      }),
      new InputControl({
        value: this.product.heading,
        key: 'heading',
        validators: [Validators.required],
        label: 'Heading',
        type: 'text',
        desc: 'Required',
      }),
      new TextareaControl({
        value: this.product.description.join('\n'),
        key: 'description',
        validators: [Validators.required],
        label: 'Description',
        desc: 'Required. {{}} and content inside it are placeholders. Do not touch them unless you really mean to remove them.'
      }),
      new InputControl({
        value: this.product.smallPrint,
        key: 'smallPrint',
        label: 'Small print',
        type: 'text',
        desc: 'Optional. Legal notice.'
      }),
    ];

    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        console.log(data);
        const formData: ProductForm = JSON.parse(data);

        return of(formData);
      })
    )
    .subscribe({
      next: product => {
        console.log(product)
      },
      error: errResp => {
        console.log(errResp);
        this.formService.sendError(RequestError.fromResponse(errResp));
      }
    })
  }
}
