import {
  Tier,
  Cycle,
  PaymentMethod,
  OrderKind,
} from './enum';

export interface Order {
  id: string;
  price: number;
  amount: number;
  compoundId: string;
  ftcId: string | null;
  unionId: string | null;
  planId: string | null;
  discountId: string | null;
  tier: Tier;
  cycle: Cycle;
  cycleCount: number;
  extraDays: number;
  kind: OrderKind;
  paymentMethod: PaymentMethod;
  totalBalance: number;
  wxAppId: string | null;
  createdAt: string;
  confirmedAt: string;
  startDate: string;
  endDate: string;
}
