import { DynamicControl, DropdownControl, InputControl, TextareaControl } from '../../shared/widget/control';
import { Validators } from '@angular/forms';
import { tierOpts, cycleOpts, Tier } from '../../data/schema/enum';

export function buildProductControls(): DynamicControl[] {
  return [
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
    })
  ];
}

export function buildPlanControls(productTier?: Tier): DynamicControl[] {
  return [
    new InputControl({
      value: 0,
      key: 'price',
      validators: [
        Validators.required,
        Validators.min(0)
      ],
      label: 'Price (Required)',
      type: 'number',
    }),
    new DropdownControl({
      value: productTier === 'premium' ? 'year' : '',
      key: 'cycle',
      validators: [Validators.required],
      label: 'Billing Cycle (Required)',
      options: cycleOpts.map(opt => {
        return {
          // Diable month for premium.
          disabled: (opt.value === 'month' && productTier === 'premium') ? true : opt.disabled,
          name: opt.name,
          value: opt.value
        };
      }),
    }),
    new InputControl({
      value: '',
      key: 'description',
      validators: [
        Validators.maxLength(32)
      ],
      label: 'Description (optional)',
      type: 'text',
    }),
  ];
}

export interface DiscountControls {
  priceOff: DynamicControl;
  startTimeRow: DynamicControl[];
  endTimeRow: DynamicControl[];
}

export function buildDiscountControls(price: number): DiscountControls {
  return {
    priceOff: new InputControl({
      value: 0,
      key: 'priceOff',
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(price),
      ],
      label: 'Price Off (Required)',
      type: 'number',
    }),
    startTimeRow: [
      // Value format: 2020-08-06T00:00
      new InputControl({
        value: '',
        key: 'startDate',
        validators: [
          Validators.required,
        ],
        label: 'Start Date (Required)',
        type: 'date',
      }),
      new InputControl({
        value: '00:00:00',
        key: 'startTime',
        label: 'Start Time',
        type: 'time',
      }),
    ],
    endTimeRow: [
      new InputControl({
        value: '',
        key: 'endDate',
        validators: [
          Validators.required,
        ],
        label: 'End Date (Required)',
        type: 'date',
      }),
      new InputControl({
        value: '00:00:00',
        key: 'endTime',
        label: 'End Time',
        type: 'time',
      })
    ]
  };
}
