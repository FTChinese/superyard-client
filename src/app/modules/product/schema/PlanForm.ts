import { Plan, Product } from 'src/app/data/schema/product';
import { Tier, cycleOpts } from 'src/app/data/schema/enum';
import { DynamicControl, InputControl, DropdownControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';

/**
 * A plan may be created together with a product,
 * or separately. Each case has slightly
 * different input and request body. Here are
 * the common fields used in all scenarios.
 */
export type PlanFormShared = Pick<Plan, 'cycle' | 'description'>;

/**
 * A plan created on the product detail page.
 * It seems Angular cannot handle input type
 * number. We need to cast it manually.
 */
export type PlanForm = {
  price: string;
} & PlanFormShared;

/**
 * Plan form with price correctly set to number.
 */
export type PlanFormCasted = Pick<Plan, 'price'> & PlanFormShared;

/**
 * Cast the submitted form's price field to number.
 */
export function castPlanForm(form: PlanForm): PlanFormCasted {
  return {
    price: Number.parseInt(form.price, 10),
    cycle: form.cycle,
    description: form.description
  };
}

/**
 * The request data to create a plan.
 * We do not provide the tier field on client.
 * It is left to the server to decide as long as
 * product id is provided.
 */
export type PlanReq = Pick<Plan, 'productId'> & PlanFormCasted;

export function buildPlanReq(product: Product, form: PlanForm): PlanReq {
  return {
    productId: product.id,
    ...castPlanForm(form)
  };
}

/**
 * @description Construct an array of DynamicControl to describe the UI of a Plan form.
 * @param productTier - Which type of product this plan is built for. If this
 * value is `premium`, then we should disable the `month` billing cycle.
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
          // Disable month for premium.
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
