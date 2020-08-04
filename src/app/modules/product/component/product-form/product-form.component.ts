import { Component, OnInit, Input } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { DynamicControl, DropdownControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { BaseProduct, Product } from 'src/app/data/schema/product';
import { ProductForm } from 'src/app/data/schema/form-data';
import { toISODatetimeUtc } from 'src/app/data/formatter/datetime';
import { Validators } from '@angular/forms';
import { tierOpts } from 'src/app/data/schema/enum';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [FormService],
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;

  controls: DynamicControl[] = [
    new DropdownControl({
      value: '',
      key: 'tier',
      validators: [Validators.required],
      label: 'Tier',
      options: tierOpts
    }),
    new InputControl({
      value: '',
      key: 'heading',
      validators: [Validators.required],
      label: 'Heading',
      type: 'text',
      desc: 'Required',
    }),
    new TextareaControl({
      value: '',
      key: 'description',
      validators: [Validators.required],
      label: 'Description',
      desc: 'Required. {{}} and content inside it are placeholders. Do not touch them unless you really mean to remove them.'
    }),
    new InputControl({
      value: null,
      key: 'smallPrint',
      label: 'Small print',
      type: 'text',
      desc: 'Optional. Legal notice.'
    }),
  ];
  button: Button = Button.primary().setName('Save');

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {

    this.formService.formCreated$.subscribe(form => {
      if (this.product) {
        form.patchValue({
          tier: this.product.tier,
          heading: this.product.heading,
          description: this.product.description.join('\n'),
          smallPrint: this.product.smallPrint,
        });
        form.get('tier').disable();
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      console.log(data);
      const formData: ProductForm = JSON.parse(data);

      const prod: BaseProduct = {
        id: 'prod_duplicated',
        tier: formData.tier,
        heading: formData.heading,
        description: formData.description.split('\n'),
        smallPrint: formData.smallPrint,
        createdUtc: toISODatetimeUtc(new Date()),
        updatedUtc: toISODatetimeUtc(new Date()),
        createdBy: 'weiguo.ni'
      };

      if (this.product) {
        this.update(prod);
      } else {
        this.create(prod);
      }
    });
  }

  private create(p: BaseProduct) {
    console.log(p);
  }

  private update(p: BaseProduct) {
    console.log(p);
  }
}
