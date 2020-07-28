export type LoginMethod = 'email' | 'wechat';
export type PaymentMethod = 'alipay' | 'wechat' | 'stripe' | 'apple' | 'b2b';
export type Tier = 'standard' | 'premium' | 'vip';
export type Cycle = 'month' | 'year';
export type Gender = 'M' | 'F';
export type Platform = 'web' | 'ios' | 'android'
export type SubStatus = 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
export type OrderType = 'create' | 'renew' | 'upgrade';
export type AccountKind = 'ftc' | 'wechat';
export type ApiKeyKind = 'app' | 'personal';
export type ActivityKind = 'login' | 'signup' | 'email_verification' | 'password_reset';


export interface SelectOption<T> {
  disabled: boolean;
  name: string;
  value: T;
}

export const tierOpts: SelectOption<Tier>[] = [
  {
    disabled: false,
    name: 'Standard',
    value: 'standard',
  },
  {
    disabled: false,
    name: 'Premium',
    value: 'premium',
  },
];

export const cycleOpts: SelectOption<Cycle>[] = [
  {
    disabled: false,
    name: 'Year',
    value: 'year',
  },
  {
    disabled: false,
    name: 'Month',
    value: 'month',
  },
];
