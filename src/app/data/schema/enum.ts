export type LoginMethod = 'email' | 'wechat';
export type PaymentMethod = 'alipay' | 'wechat' | 'stripe' | 'apple' | 'b2b';
export type Tier = 'standard' | 'premium' | 'vip';
export type Cycle = 'month' | 'year';
export type Gender = 'M' | 'F';
export type Platform = 'web' | 'ios' | 'android';
export type SubStatus = 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
export type OrderKind = 'create' | 'renew' | 'upgrade';
export type AccountKind = 'ftc' | 'wechat';
export type ApiKeyKind = 'app' | 'personal';
export type ActivityKind = 'login' | 'signup' | 'email_verification' | 'password_reset';
export type Currency = 'cny' | 'eur' | 'gbp' | 'hkd' | 'jpy' | 'usd';

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

export const paymentMethodOpts: SelectOption<PaymentMethod>[] = [
  {
    disabled: false,
    name: 'Alipay',
    value: 'alipay'
  },
  {
    disabled: false,
    name: 'Wechat pay',
    value: 'wechat',
  }
];

export const statusOpts: SelectOption<SubStatus>[] = [
  {
    disabled: false,
    value: 'active',
    name: 'Active',
  },
  {
    disabled: false,
    value: 'canceled',
    name: 'Canceled',
  },
  {
    disabled: false,
    value: 'incomplete',
    name: 'Incomplete',
  },
  {
    disabled: false,
    value: 'incomplete_expired',
    name: 'Incomplete Expired',
  },
  {
    disabled: false,
    value: 'past_due',
    name: 'Past Due',
  },
  {
    disabled: false,
    value: 'trialing',
    name: 'Trialing',
  },
  {
    disabled: false,
    value: 'unpaid',
    name: 'Unpaid'
  }
];
