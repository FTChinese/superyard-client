import { Tier, Cycle } from './enum';

export const tiers: Record <Tier, string> = {
  standard: '标准版',
  premium: '高端版',
  vip: 'VIP'
};

export const cycles: Record<Cycle, string> = {
  month: '月',
  year: '年'
};
