import { Tier, Cycle, PaymentMethod, SubStatus } from './enum';
import { parseISO, startOfDay, isBefore } from 'date-fns';

export interface Membership {
  compoundId: string;
  ftcId: string | null;
  unionId: string | null;
  tier: Tier | null;
  cycle: Cycle | null;
  expireDate: string | null;
  payMethod: PaymentMethod | null;
  ftcPlanId: string | null;
  stripeSubsId: string | null;
  stripePlanId: string | null;
  autoRenewal: boolean | null;
  status: SubStatus | null;
  appleSubsId: string | null;
  b2bLicenceId: string | null;
}

export function isMember(m: Membership): boolean {
  return m.tier != null;
}

export function isMemberExpired(m: Membership): boolean {
  if (!m.expireDate) {
    return true;
  }

  const expireOn = parseISO(m.expireDate);
  const today = startOfDay(new Date());

  return isBefore(expireOn, today);
}
