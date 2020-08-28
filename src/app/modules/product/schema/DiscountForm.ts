import { Discount } from 'src/app/data/schema/product';
import { FormPeriod, Period, buildPeriod } from 'src/app/data/schema/period';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { periodControls } from './datetime-controls';

// The form data of a discount.
export type DiscountForm = {
  priceOff: string,
} & FormPeriod;

// The request data to create a discount.
export type DiscountReq = Pick<Discount, 'priceOff'> & Period;

/**
 * @description Turn discount form data to requst format.
 */
export function buildDiscountReq(f: DiscountForm, zone: string): DiscountReq {
  return {
    priceOff: Number.parseInt(f.priceOff, 10),
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
