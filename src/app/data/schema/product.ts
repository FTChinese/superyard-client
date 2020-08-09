import { Tier, Cycle } from './enum';
import { cycles, currencySymbols } from './localization';

// The discount of a plan. A plan might not have a discount, in which case
// all field will be null.
export interface Discount {
  id: string | null;
  priceOff: number | null;
  startUtc: string | null;
  endUtc: string | null;
  createdUtc: string | null;
  createdBy: string | null;
}

export function zeroDiscount(): Discount {
  return {
    id: null,
    priceOff: null,
    startUtc: null,
    endUtc: null,
    createdUtc: null,
    createdBy: null
  };
}

export interface Plan {
  id: string;
  price: number;
  currency: string;
  tier: Tier;
  cycle: Cycle;
  description: string | null;
  isActive: boolean; // Indicates whether this plan is used actually used under a product.
  createdUtc: string;
  createdBy: string;
  discount: Discount;
}

export function formatPlanPrice(p: Plan) {
  return `${currencySymbols[p.currency] || p.currency.toUpperCase()}${p.price}/${cycles[p.cycle]}`;
}

export interface BaseProduct {
  id: string;
  tier: Tier;
  heading: string;
  description: string[];
  smallPrint: string | null;
  isActive: boolean;
  createdUtc: string;
  updatedUtc: string;
  createdBy: string;
}

export type Product = BaseProduct & {
  plans: Plan[];
};

