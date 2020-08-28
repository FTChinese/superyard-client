import { ExpandedProduct, Plan } from 'src/app/data/schema/product';
import { PlanForm } from './PlanForm';
import { DynamicControl, DropdownControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { tierOpts } from 'src/app/data/schema/enum';
// Product form
export type ProductForm = Pick<ExpandedProduct, 'tier' | 'heading' | 'smallPrint'> & {
  description: string | null;
};

// The form data to create a new product.
// It contains an array of Plans depending whenther user chose to
// add it.
export type CreateProductForm = ProductForm & {
  plans: PlanForm[] | null;
};

/**
 * The data type used to creating form request.
 */
type PlanReq = Pick<Plan, 'cycle' | 'description' | 'price'>;

export type CreateProductReq = ProductForm & {
  plans: PlanReq[];
};

function castProductPlan(form: PlanForm): PlanReq {
  return {
    price: Number.parseInt(form.price, 10),
    cycle: form.cycle,
    description: form.description
  };
}

export function buildCreateProductReq(form: CreateProductForm): CreateProductReq {
  return {
    tier: form.tier,
    heading: form.heading,
    description: form.description,
    smallPrint: form.smallPrint,
    plans: form.plans.map(p => castProductPlan(p))
  };
}

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
