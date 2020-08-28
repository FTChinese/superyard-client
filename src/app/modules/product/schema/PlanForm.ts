import { Plan, Product } from 'src/app/data/schema/product';
import { Tier, cycleOpts } from 'src/app/data/schema/enum';
import { DynamicControl, InputControl, DropdownControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
// Plan form
// The data fields when creating a pricing plan.
// A plan always belongs to a certain product.


export type PlanForm = Pick<Plan, 'cycle' | 'description'> & {
  price: string;
};

// The request data to create a plan.
// Since a plan always belongs to a product, we get
// the tier and productId from an existing Product instance.
export type PlanReq = Pick<Plan, 'price' | 'tier' | 'cycle' | 'description'> & {
  productId: string;
};

export function planFormToReq(product: Product, form: PlanForm): PlanReq {
  return {
    productId: product.id,
    tier: product.tier,
    cycle: form.cycle,
    price: Number.parseInt(form.price, 10),
    description: form.description,
  };
}

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
