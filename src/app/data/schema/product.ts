import { Tier, Cycle } from './enum';
import { Period } from './period';

// The discount of a plan. A plan might not have a discount, in which case
// all field will be null.
export type Discount = {
  id: string | null;
  planId: string | null;
  priceOff: number | null;
} & Period;

export function zeroDiscount(): Discount {
  return {
    id: null,
    planId: null,
    priceOff: null,
    startUtc: null,
    endUtc: null,
  };
}

export interface Plan {
  id: string;
  productId: string;
  price: number;
  tier: Tier;
  cycle: Cycle;
  description: string | null;
  isActive: boolean; // Indicates whether this plan is used actually used under a product.
  createdUtc: string;
  createdBy: string;
}

export type ExpandedPlan  = Plan & {
  discount: Discount;
};

export interface Product {
  id: string;
  tier: Tier;
  heading: string;
  description: string | null;
  smallPrint: string | null;
  isActive: boolean;
  createdUtc: string;
  updatedUtc: string;
  createdBy: string;
}

export type PricedProduct = Product & {
  plans: Plan[];
};

export type ListedProduct = Product & {
  planCount: number;
}

export type ExpandedProduct = Product & {
  plans: ExpandedPlan[];
};

