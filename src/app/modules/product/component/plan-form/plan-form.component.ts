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

  private selectedTier: Tier;
  private selectedCycle: Cycle;

  private _plan: Plan;
  @Input() set preset(p: Plan) {
    this._plan = p;
    this.selectedCycle = p.cycle;
    this.selectedTier = p.tier;
  }

  get preset(): Plan {
    return this._plan;
  }

  @Output() created = new EventEmitter<Plan>();

  loading = false;
  tierOpts: SelectOption<Tier>[];
  cycleOpts: SelectOption<Cycle>[];
  form: FormGroup;


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
      tier: new FormControl(
        this.preset?.tier || '',
        [Validators.required]
      ),
      cycle: new FormControl(
        this.preset?.cycle || '',
        [Validators.required]
      ),
      price: new FormControl(
        this.preset?.price || 0,
        [Validators.required, Validators.min(1)]
      ),
      retailDiscount: new FormGroup({
        priceOff: new FormControl(0, [Validators.min(0)]),
        startUtc: new FormControl(null),
        endUtc: new FormControl(null)
      }),
      b2bDiscounts: new FormArray([]),
    });

    // Premium product is not allowed to have monthly subscripiton.
    this.form.get('tier').valueChanges
      .subscribe((tier: Tier) => {
        this.selectedTier = tier;
        this.cycleOpts[1].disabled = !this.enableCycle('month')
      });

    this.form.get('cycle').valueChanges
      .subscribe((cycle: Cycle) => {
        this.selectedCycle = cycle;
      });
  }

  private enableTier(t: Tier): boolean {
    if (!this.selectedTier) {
      return true;
    }

    return this.selectedTier === t;
  }

  private enableCycle(c: Cycle): boolean {
    // Option   Selected
    // year  &  null  = true
    // year  &  year  = true
    // year  &  month = false
    // ---------------------          selectedTier
    // month &  null  = true    true &  null     = true
    // month &  year  = false   true &  standard = true
    // month &  month = true    true &  premium  = false
    switch (c) {
      case 'year':
        return this.selectedCycle !== 'month';

      case 'month':
        if (this.selectedCycle === 'year') {
          return false;
        }
        // Now the true cases left. Check if premium is selected.
        return this.selectedTier !== 'premium';
    }
  }

  get permitDiscount(): boolean {

    if (!this.selectedCycle) {
      return true;
    }

    return this.selectedCycle === 'year';
  }

  get b2bDiscounts() {
    return this.form.get('b2bDiscounts') as FormArray;
  }

  getControl(path: string): AbstractControl {
    return this.form.get(path);
  }

  thresholdControl(i: number): AbstractControl {
    const group = this.b2bDiscounts[i] as FormGroup;
    return group.get('threshold');
  }

  b2bPriceOff(i: number): AbstractControl {
    const group = this.b2bDiscounts[i] as FormGroup;
    return group.get('priceOff');
  }

  // See https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a
  // on how to use FormArray with FormGroup as element.
  addB2b() {
    this.b2bDiscounts.push(new FormGroup({
      threshold: new FormControl(0, [Validators.required, Validators.min(1)]),
      priceOff: new FormControl(0, [Validators.required, Validators.min(1)])
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
  }
}
