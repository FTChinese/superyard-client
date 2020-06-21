import { Tier, Cycle } from './enum';

interface RetailDiscount {
  id: string | null; // null indicates no discount.
  priceOff: number;
  startUtc: string | null;
  endUtc: string | null;
  createdUtc: string | null;
}

export interface B2BDiscount {
  id: number;
  threshold: number;
  priceOff: number;
  createdUtc: string;
}

export interface Plan {
  id: string;
  price: number;
  currency: string
  tier: Tier;
  cycle: Cycle;
  createdUtc: string;
  createdBy: string;
  retailDiscount: RetailDiscount;
  b2bDiscounts: B2BDiscount[];
}

export interface BaseProduct {
  id: string;
  tier: Tier;
  heading: string;
  description: string[];
  smallPrint: string | null;
  createdUtc: string;
  createdBy: string;
}

export type Product = BaseProduct & {
  plans: Plan[];
}

