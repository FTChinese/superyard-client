import { ExpandedProduct, Plan } from 'src/app/data/schema/product';
import { PlanForm, PlanFormShared, PlanFormCasted, castPlanForm } from './PlanForm';
import { DynamicControl, DropdownControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { tierOpts } from 'src/app/data/schema/enum';

// Product form
export type ProductForm = Pick<ExpandedProduct, 'tier' | 'heading' | 'description' | 'smallPrint'>;

// The form data to create a new product.
// It contains an array of Plans depending on whenther user choses to
// add it.
export type ProductCreationForm = ProductForm & {
  plans: PlanForm[] | null;
};

export type ProductCreationReq = ProductForm & {
  plans: PlanFormCasted[];
};

export function buildProductCreationReq(form: ProductCreationForm): ProductCreationReq {
  return {
    tier: form.tier,
    heading: form.heading,
    description: form.description,
    smallPrint: form.smallPrint,
    plans: form.plans.map(p => castPlanForm(p))
  };
}

/**
 * The form data to edit a product.
 * It does not contain plans field, nor tier
 * which non-editable.
 */
export type ProductEditForm = Omit<ProductForm, 'tier'>;

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
