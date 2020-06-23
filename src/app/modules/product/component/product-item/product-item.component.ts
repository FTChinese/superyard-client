import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';
import { DynamicControl, DropdownControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProductForm } from 'src/app/data/schema/form-data';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toISODatetimeUtc } from 'src/app/data/formatter/datetime';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  providers: [FormService],
})
export class ProductItemComponent implements OnInit {

  @Input() product: BaseProduct;
  @Input() showHeader = true;

  isDuplicating = false;

  controls: DynamicControl[]

  button: Button;

  constructor(
    private builder: ProductBuilderService,
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        console.log(data);
        const formData: ProductForm = JSON.parse(data);

        return of(formData);
      })
    )
    .subscribe({
      next: formData => {
        console.log(formData);
        this.builder.createProduct({
          id: 'prod_duplicated',
          tier: formData.tier,
          heading: formData.heading,
          description: formData.description.split('\n'),
          smallPrint: formData.smallPrint,
          createdUtc: toISODatetimeUtc(new Date()),
          createdBy: 'weiguo.ni'
        });
        this.toggleDuplicate();
      },
      error: errResp => {
        console.log(errResp);
        this.formService.sendError(RequestError.fromResponse(errResp));
      }
    });
  }

  select() {
    this.builder.selectProduct(this.product);
  }

  toggleDuplicate() {
    if (!this.isDuplicating) {
      this.controls = [
        new DropdownControl({
          value: this.product.tier,
          key: 'tier',
          validators: [Validators.required],
          label: 'Tier',
          options: [
            {
              disabled: !(this.product.tier === 'standard'),
              name: 'Standard',
              value: 'standard'
            },
            {
              disabled: !(this.product.tier === 'premium'),
              name: 'Premium',
              value: 'premium',
            }
          ]
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

      this.button = Button.primary().setName('Save and use it');
    }

    this.isDuplicating = !this.isDuplicating;
  }
}
