import { Plan, Product } from './product'

const createdUtc = '2020-05-05T17:19:00Z';

const planStdYear: Plan = {
  id: 'plan_ICMPPM0UXcpZ',
  price: 258,
  currency: 'cny',
  tier: 'standard',
  cycle: 'year',
  createdUtc,
  retailDiscount: {
    id: null,
    priceOff: 0,
    startUtc: null,
    endUtc: null,
    createdUtc: null,
  },
  b2bDiscounts: [
    {
      id: 1,
      threshold: 10,
      priceOff: 15,
      createdUtc,
    },
    {
      id: 2,
      threshold: 20,
      priceOff: 25,
      createdUtc,
    }
  ]
};

const planStdMonth: Plan = {
  id: 'plan_wl5esy783d',
  price: 28,
  currency: 'cny',
  tier: 'standard',
  cycle: 'month',
  createdUtc,
  retailDiscount: {
    id: null,
    priceOff: 0,
    startUtc: null,
    endUtc: null,
    createdUtc: null,
  },
  b2bDiscounts: [],
};

const planPrmYear: Plan = {
  id: 'plan_5iIonqaehig4',
  price: 1998,
  currency: 'cny',
  tier: 'premium',
  cycle: 'year',
  createdUtc,
  retailDiscount: {
    id: null,
    priceOff: 0,
    startUtc: null,
    endUtc: null,
    createdUtc: null,
  },
  b2bDiscounts: [
    {
      id: 3,
      threshold: 10,
      priceOff: 100,
      createdUtc,
    },
    {
      id: 4,
      threshold: 20,
      priceOff: 200,
      createdUtc,
    },
  ],
};

export const productStd: Product = {
  id: 'standard_product',
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
  plans: [
    planStdYear,
    planStdMonth,
  ],
}

export const productPrm: Product = {
  id: 'premium_product',
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
  plans: [
    planPrmYear,
  ],
}