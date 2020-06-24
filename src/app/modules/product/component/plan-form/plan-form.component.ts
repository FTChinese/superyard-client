import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Tier, Cycle } from 'src/app/data/schema/enum';
import { Plan } from 'src/app/data/schema/product';
import { PlanForm } from 'src/app/data/schema/form-data';
import { toISODatetimeUtc } from 'src/app/data/formatter/datetime';

interface SelectOption<T> {
  disabled: boolean;
  name: string;
  value: T;
}

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss']
})
export class PlanFormComponent implements OnInit {

  @Input() preset: Plan;
  @Output() created = new EventEmitter<Plan>();

  loading = false;
  tierOpts: SelectOption<Tier>[];
  cycleOpts: SelectOption<Cycle>[];
  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.tierOpts = [
      {
        disabled: !this.enableTier('standard'),
        name: 'Standard',
        value: 'standard',
      },
      {
        disabled: !this.enableTier('premium'),
        name: 'Premium',
        value: 'premium',
      },
    ];

    this.cycleOpts = [
      {
        disabled: !this.enableCycle('year'),
        name: 'Year',
        value: 'year',
      },
      {
        disabled: !this.enableCycle('month'),
        name: 'Month',
        value: 'month',
      },
    ]

    this.form = new FormGroup({
      tier: new FormControl(this.preset?.tier || '', [Validators.required]),
      cycle: new FormControl(this.preset?.cycle || '', [Validators.required]),
      price: new FormControl(this.preset?.price || 0, [Validators.required, Validators.min(0)]),
      retailDiscount: new FormGroup({
        priceOff: new FormControl(0, [Validators.min(0)]),
        startUtc: new FormControl(null),
        endUtc: new FormControl(null)
      }),
      b2bDiscounts: new FormArray([]),
    });
  }

  get b2bDiscounts() {
    return this.form.get('b2bDiscounts') as FormArray;
  }

  private enableTier(t: Tier): boolean {
    if (!this.preset) {
      return true;
    }

    return this.preset.tier === t;
  }

  private enableCycle(c: Cycle): boolean {
    if (!this.preset) {
      return true;
    }

    return this.preset.cycle === c;
  }

  get permitDiscount(): boolean {
    if (!this.preset) {
      return true;
    }

    return this.preset.cycle === 'year';
  }

  b2bThreshold(i: number): AbstractControl {
    const group = this.b2bDiscounts[i] as FormGroup;
    return group.get('threshold');
  }

  thresholdInvalid(i: number): boolean {
    const ctrl = this.b2bThreshold(i);
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  thresholdErrMsg(i: number): string {
    const errors = this.b2bThreshold(i).errors;
    if (errors.required) {
      return 'Please specify the minimum copies, or delete this row'
    }

    return 'Unknown errors';
  }

  b2bPriceOff(i: number): AbstractControl {
    const group = this.b2bDiscounts[i] as FormGroup;
    return group.get('priceOff');
  }

  priceOffInvalid(i: number): boolean {
    const ctrl = this.b2bPriceOff(i);
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  priceOffErrMsg(i: number): string {
    const errors = this.b2bPriceOff(i).errors;
    if (errors.required) {
      return 'Please specify the discount amount';
    }

    if (errors.min) {
      return 'Should not below 0';
    }

    if (errors.max) {
      return 'Should not above the original price'
    }

    return 'Unknow errors';
  }

  // See https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a
  // on how to use FormArray with FormGroup as element.
  addB2b() {
    this.b2bDiscounts.push(new FormGroup({
      threshold: new FormControl(0, Validators.required),
      priceOff: new FormControl(0, Validators.required)
    }));
  }

  removeB2b(i: number) {
    this.b2bDiscounts.removeAt(i);
  }

  onSubmit() {
    const formData: PlanForm = this.form.value;
    console.log(formData);
    this.form.disable();
    this.loading = true;
    this.created.emit({
      id: 'plan_new',
      createdUtc: toISODatetimeUtc(new Date()),
      createdBy: 'weiguo.ni',
      ...formData,
    });
  }

  // Returing false indicates duplicate threshold field.
  // private addB2BDiscount(discount: B2BDiscount): boolean {
  //   console.log('Add a new discount: %o', discount);

  //   const index = this.plan.b2bDiscounts.findIndex(item => item.threshold >= discount.threshold);

  //   console.log('B2B discounts found: %s', index);

  //   if (index === -1) {
  //     this.plan.b2bDiscounts.push(discount);
  //     return true;
  //   }

  //   const foundElem = this.plan.b2bDiscounts[index];

  //   console.log('Found element: %o', foundElem);

  //   // The threshhold field should be unique in the whole array.
  //   if (foundElem.threshold === discount.threshold) {
  //     return false;
  //   }
  //   // Insert before index.

  //   this.plan.b2bDiscounts.splice(index, 0, discount);
  //   return true
  // }
}
