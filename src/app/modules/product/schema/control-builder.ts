import {
  DynamicControl,
  DropdownControl,
  InputControl,
  TextareaControl,
  FieldsetControl
} from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { tierOpts, cycleOpts, Tier } from 'src/app/data/schema/enum';
import { BaseBanner } from 'src/app/data/schema/paywall';
import { Discount } from 'src/app/data/schema/product';
import { FormPeriod, Period, buildPeriod } from 'src/app/data/schema/period';

export type BannerForm = Pick<BaseBanner, 'heading' | 'subHeading' | 'coverUrl'> & {
  content: string | null;
};

export type PromoForm = BannerForm & FormPeriod;

export type PromoReq = BannerForm & Period;

export function buildPromoReq(f: PromoForm, zone: string): PromoReq {
  return {
    heading: f.heading,
    subHeading: f.subHeading,
    coverUrl: f.coverUrl,
    content: f.content,
    ...buildPeriod({
      ...f,
      zone,
    })
  };
}

export const datetimeControls: DynamicControl[] = [
  // Value format: 2020-08-06T00:00
  new InputControl({
    value: '',
    key: 'date',
    validators: [
      Validators.required,
    ],
    label: 'Date',
    type: 'date',
  }),
  new InputControl({
    value: '00:00:00',
    key: 'time',
    label: 'Start Time',
    type: 'time',
  }),
];

export const periodSets: FieldsetControl[] = [
  {
    groupName: 'startUtc',
    legend: 'Start Datetime',
    controls: datetimeControls,
  },
  {
    groupName: 'endUtc',
    legend: 'End Datetime',
    controls: datetimeControls,
  },
];

export const bannerControls: DynamicControl[] = [
  new InputControl({
    value: '',
    key: 'heading',
    validators: [Validators.required],
    label: 'Heading *',
    type: 'text',
  }),
  new InputControl({
    value: null,
    key: 'subHeading',
    label: 'Secondary Heading',
    type: 'text',
  }),
  new InputControl({
    value: null,
    key: 'coverUrl',
    label: 'Cover URL',
    type: 'url',
  }),
  new TextareaControl({
    value: null,
    key: 'content',
    label: 'Content',
    desc: 'Support markdown'
  }),
];

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

export type DiscountForm = Pick<Discount, 'priceOff'> & FormPeriod;

export type DiscountReq = Pick<Discount, 'priceOff'> & Period;

export function buildDiscountReq(f: DiscountForm, zone: string): DiscountReq {
  return {
    priceOff: f.priceOff,
    ...buildPeriod({
      ...f,
      zone,
    })
  };
}

export function buildDiscountControls(price: number): DynamicControl[] {
  return [
    new InputControl({
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
  ];
}
