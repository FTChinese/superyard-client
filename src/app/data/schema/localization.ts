import { Tier, Cycle, PaymentMethod, OrderKind } from './enum';

export const tiers: Record <Tier, string> = {
  standard: '标准版',
  premium: '高端版',
  vip: 'VIP'
};

export const cycles: Record<Cycle, string> = {
  month: '月',
  year: '年'
};

export const paymentMethods: Record<PaymentMethod, string> = {
  alipay: '支付宝',
  wechat: '微信',
  stripe: 'Stripe',
  apple: 'Apple In-App Purchase',
  b2b: 'B2B许可授权'
};

export const orderKinds: Record<OrderKind, string> = {
  create: '新建会员',
  renew: '续订',
  upgrade: '升级'
}
