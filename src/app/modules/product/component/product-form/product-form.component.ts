import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { DynamicControl, DropdownControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { BaseProduct } from 'src/app/data/schema/product';
import { switchMap } from 'rxjs/operators';
import { ProductForm } from 'src/app/data/schema/form-data';
import { of } from 'rxjs';
import { toISODatetimeUtc } from 'src/app/data/formatter/datetime';
import { RequestError } from 'src/app/data/schema/request-result';
import { Validators } from '@angular/forms';
import { Tier } from 'src/app/data/schema/enum';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [FormService],
})
export class ProductFormComponent implements OnInit {

  @Input() product: BaseProduct;
  @Output() created = new EventEmitter<BaseProduct>();

  controls: DynamicControl[]
  button: Button = Button.primary().setName('Save');;

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.controls = [
      new DropdownControl({
        value: this.product?.tier || '',
        key: 'tier',
        validators: [Validators.required],
        label: 'Tier',
        options: [
          {
            disabled: !(this.enableTier('standard')),
            name: 'Standard',
            value: 'standard'
          },
          {
            disabled: !(this.enableTier('premium')),
            name: 'Premium',
            value: 'premium',
          }
        ]
      }),
      new InputControl({
        value: this.product?.heading || '',
        key: 'heading',
        validators: [Validators.required],
        label: 'Heading',
        type: 'text',
        desc: 'Required',
      }),
      new TextareaControl({
        value: this.product?.description.join('\n') || '',
        key: 'description',
        validators: [Validators.required],
        label: 'Description',
        desc: 'Required. {{}} and content inside it are placeholders. Do not touch them unless you really mean to remove them.'
      }),
      new InputControl({
        value: this.product?.smallPrint || null,
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

        const prod: BaseProduct = {
          id: 'prod_duplicated',
          tier: formData.tier,
          heading: formData.heading,
          description: formData.description.split('\n'),
          smallPrint: formData.smallPrint,
          createdUtc: toISODatetimeUtc(new Date()),
          createdBy: 'weiguo.ni'
        };

        return of(prod);
      })
    )
    .subscribe({
      next: product => {
        console.log(product);
        this.created.emit(product);
      },
      error: errResp => {
        console.log(errResp);
        this.formService.sendError(RequestError.fromResponse(errResp));
      }
    });
  }

  private enableTier(t: Tier): boolean {
    if (!this.product) {
      return true;
    }

    return this.product.tier === t;
  }
}
