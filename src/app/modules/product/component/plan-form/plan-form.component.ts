import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Tier, Cycle } from 'src/app/data/schema/enum';
import { Plan } from 'src/app/data/schema/product';

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

  loading = false;
  tierOpts: SelectOption<Tier>[] = [
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

  cycleOpts: SelectOption<Cycle>[] = [
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
  ];

  // See https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a
  // on how to use FormArray with FormGroup as element.
  form: FormGroup = new FormGroup({
    tier: new FormControl('', [Validators.required]),
    cycle: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    retailDiscount: new FormGroup({
      priceOff: new FormControl(0, [Validators.min(0)]),
      startUtc: new FormControl(null),
      endUtc: new FormControl(null)
    }),
    b2bDiscounts: new FormArray([]),
  });;

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

  constructor() { }

  ngOnInit(): void {

  }

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
    console.log(this.form.value);
    this.form.disable();
    this.loading = true;
  }
}
