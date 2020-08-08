import { Plan, Product, BaseProduct, Discount } from './product';
import { Paywall, Banner } from './paywall';
import { PlanReq } from './form-data';
import { toISODatetimeUtc } from '../formatter/datetime';
import { BannerForm, DiscountReq } from 'src/app/modules/product/schema/control-builder';

export function randomString(): string {
  return Math.random().toString(36).substring(2, 15);
}

const RANGE = (x, y) => Array.from((function*() {
  while (x <= y) { yield x++; }
})());

const createdUtc = '2020-05-05T17:19:00Z';

export function genDiscount(reqData: DiscountReq): Discount {
  return {
    id: `dsc_${randomString()}`,
    ...reqData,
    createdUtc: toISODatetimeUtc(new Date()),
    createdBy: 'weiguo.ni',
  };
}

export function genPlan(reqData: PlanReq): Plan {
  return {
    id: `plan_${randomString()}`,
    price: reqData.price,
    currency: 'cny',
    tier: reqData.tier,
    cycle: reqData.cycle,
    description: reqData.description,
    isActive: false,
    createdUtc: toISODatetimeUtc(new Date()),
    createdBy: 'weiguo.ni',
    discount: {
      id: null,
      priceOff: null,
      startUtc: null,
      endUtc: null,
      createdUtc: null,
      createdBy: null,
    }
  };
}

export const planStdYear: Plan = {
  id: 'plan_ICMPPM0UXcpZ',
  price: 258,
  currency: 'cny',
  tier: 'standard',
  cycle: 'year',
  description: 'Standard yearly price',
  isActive: true,
  createdUtc,
  createdBy: 'weiguo.ni',
  discount: {
    id: 'dsc_ykDueW15nIJQ',
    priceOff: 60,
    startUtc: '2020-11-10T16:00:00Z',
    endUtc: '2020-11-11T16:00:00Z',
    createdUtc,
    createdBy: 'weiguo.ni'
  },
};

export const planStdMonth: Plan = {
  id: 'plan_wl5esy783d',
  price: 28,
  currency: 'cny',
  tier: 'standard',
  cycle: 'month',
  description: 'Standard monthly price',
  isActive: true,
  createdUtc,
  createdBy: 'wegiuo.ni',
  discount: {
    id: null,
    priceOff: 0,
    startUtc: null,
    endUtc: null,
    createdUtc: null,
    createdBy: null
  },
};

export const planPrmYear: Plan = {
  id: 'plan_5iIonqaehig4',
  price: 1998,
  currency: 'cny',
  tier: 'premium',
  cycle: 'year',
  description: 'Premium yearly price',
  isActive: true,
  createdUtc,
  createdBy: 'weiguo.ni',
  discount: {
    id: null,
    priceOff: 0,
    startUtc: null,
    endUtc: null,
    createdUtc: null,
    createdBy: null,
  },
};

export const baseProdStd: BaseProduct = {
  id: 'prod_oj4ks8shj38',
  tier: 'standard',
  heading: '标准会员',
  description: [
    '专享订阅内容每日仅需{{dailyAverageOfYear}}元(或按月订阅每日{{dailyAverageOfMonth}}元)',
    '精选深度分析',
    '中英双语内容',
    '金融英语速读训练',
    '英语原声电台',
    '无限浏览7日前所有历史文章（近8万篇）'
  ],
  smallPrint: null,
  createdUtc,
  updatedUtc: createdUtc,
  createdBy: 'weiguo.ni',
};

export const baseProdPrm: BaseProduct = {
  id: 'prod_35rbbrgz08c',
  tier: 'premium',
  heading: '高端会员',
  description: [
    '专享订阅内容每日仅需{{dailyAverageOfYear}}元',
    '享受“标准会员”所有权益',
    '编辑精选，总编/各版块主编每周五为您推荐本周必读资讯，分享他们的思考与观点',
    'FT中文网2018年度论坛门票2张，价值3999元/张 （不含差旅与食宿）'
  ],
  smallPrint: '注：所有活动门票不可折算现金、不能转让、不含差旅与食宿',
  createdUtc,
  updatedUtc: createdUtc,
  createdBy: 'weiguo.ni',
};

export const productStd: Product = {
  ...baseProdStd,
  plans: [
    planStdYear,
    planStdMonth,
  ],
};

export const productPrm: Product = {
  ...baseProdPrm,
  plans: [
    planPrmYear,
  ],
};

export const plans = [
  planStdMonth,
  planStdYear,
  planPrmYear,
];

export const baseProducts = [
  baseProdStd,
  baseProdPrm,
];

export const products: Map<string, Product> = new Map([
  [productStd.id, productStd],
  [productPrm.id, productPrm]
]);

export const mockPaywall: Paywall = {
  banner: {
    id: 1,
    heading: 'FT中文网会员订阅服务',
    coverUrl: 'http://www.ftacademy.cn/subscription.jpg',
    subHeading: '欢迎您',
    content: [
      '希望全球视野的FT中文网，能够带您站在高海拔的地方俯瞰世界，引发您的思考，从不同的角度看到不一样的事物，见他人之未见！'
    ],
    createdUtc: toISODatetimeUtc(new Date()),
    updatedUtc: toISODatetimeUtc(new Date()),
    createdBy: 'weiguo.ni',
    promoId: null
  },
  promo: {
    id: 0,
    heading: '',
    coverUrl: null,
    subHeading: null,
    content: null,
    createdUtc: null,
    createdBy: null,
    startUtc: null,
    endUtc: null
  },
  products: [
    productStd,
    productPrm
  ]
};

export function genBanner(form: BannerForm): Banner {
  return {
    id: 1,
    heading: form.heading,
    subHeading: form.subHeading,
    coverUrl: form.coverUrl,
    content: form.content.split('\n'),
    createdUtc: toISODatetimeUtc(new Date()),
    updatedUtc: toISODatetimeUtc(new Date()),
    createdBy: 'weiguo.ni',
    promoId: null
  };
}
