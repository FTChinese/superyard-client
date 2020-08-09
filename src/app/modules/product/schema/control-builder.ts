import {
  DynamicControl,
  DropdownControl,
  InputControl,
  TextareaControl,
  FieldsetControl,
  GroupControl
} from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { tierOpts, cycleOpts, Tier } from 'src/app/data/schema/enum';
import { BaseBanner } from 'src/app/data/schema/paywall';
import { Discount, Product, Plan } from 'src/app/data/schema/product';
import { FormPeriod, Period, buildPeriod } from 'src/app/data/schema/period';

// The field required for a banner.
export type BannerForm = Pick<BaseBanner, 'heading' | 'subHeading' | 'coverUrl'> & {
  content: string | null;
};

// Two controls to hold date and time value.
const datetimeControls: DynamicControl[] = [
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

// Nested group controls for start datetime and end datetime.
const periodControls: DynamicControl[] = [
  new GroupControl({
    key: 'startUtc',
    label: 'Start Datetime',
    controls: datetimeControls
  }),
  new GroupControl({
    key: 'endUtc',
    label: 'End Datetime',
    controls: datetimeControls
  })
];

/**
 * @description Controls to describe the banner form.
 */
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

// Promotion form. This is the banner form plus starting and ending time.
export type PromoForm = BannerForm & FormPeriod;

// Request data to build a promotion.
// The type for startUtc and endUtc are different from form.
export type PromoReq = BannerForm & Period;

/**
 * @description Turn the promotion form to request data.
 */
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

/**
 * @description Promotion form UI.
 */
export function buildPromoControls(): DynamicControl[] {
  return [
    ...bannerControls,
    ...periodControls,
  ];
}

// Product form
type ProductForm = Pick<Product, 'tier' | 'heading' | 'smallPrint'> & {
  description: string | null;
};

// Tne form data to create a new product.
// It contains an array of Plans depending whenther user chose to
// add it.
export type CreateProductForm = ProductForm & {
  plans: Plan[] | null;
};

// The form data to edit a product. It does not contain plans field.
export type EditProductForm = Pick<ProductForm, 'heading' | 'smallPrint' | 'description'>;

/**
 * @description The product form UI. This is both used when creating a product
 * and updating a product.
 * When used to create a product, there are additional form array for plans.
 */
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

// Plan form

// The data fields when creating a pricing plan.
// A plan always belongs to a certain product.
export type PlanForm = Pick<Plan, 'price' | 'cycle' | 'description'>;

// The request data to create a plan.
// Since a plan always belongs to a product, we get
// the tier and productId from an existing Product instance.
export type PlanReq = Pick<Plan, 'price' | 'tier' | 'cycle' | 'description'> & {
  productId: string;
};

/**
 * @description Construct an array of DynamicControl to describe the UI of a Plan form.
 * @param productTier - Which type of product this plan is built for. If this
 * value is `premium`, then we should disable the `month` biling cycle.
 */
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

// The form data of a discount.
export type DiscountForm = Pick<Discount, 'priceOff'> & FormPeriod;

// The request data to create a discount.
export type DiscountReq = Pick<Discount, 'priceOff'> & Period;

/**
 * @description Turn discount form data to requst format.
 */
export function buildDiscountReq(f: DiscountForm, zone: string): DiscountReq {
  return {
    priceOff: f.priceOff,
    ...buildPeriod({
      ...f,
      zone,
    })
  };
}

/**
 * @description Contruct the controls for a discount form.
 * @param price - the price of the plan this discount belongs to.
 * This imposes a cap on the limit of discounted price since it is meaningless
 * if discount price is above the original price.
 */
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
    ...periodControls,
  ];
}
