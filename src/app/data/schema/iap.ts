import { Cycle, Environment, Tier } from './enum';

export interface IAPSubs {
  environment: Environment;
  originalTransactionId: string;
  lastTransactionId: string;
  productId: string;
  purchaseDateUtc: string | null;
  expiresDateUtc: string | null;
  tier: Tier;
  cycle: Cycle;
  autoRenewal: boolean;
  createdUtc: string | null;
  updatedUtc: string | null;
}

export interface IAPSubsList {
  total: number;
  page: 1;
  limit: 20;
  data: IAPSubs[];
}
