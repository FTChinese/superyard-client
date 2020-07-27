import {
  Tier,
  Cycle,
  PaymentMethod,
  SubStatus,
  AccountKind,
  Gender,
  Platform,
  ActivityKind,
} from './enum';

export interface Wechat {
  nickname: string | null;
  avatarUrl: string | null;
}

export interface Membership {
  compoundId: string;
  ftcId: string | null;
  unionId: string | null;
  tier: Tier | null;
  cycle: Cycle | null;
  expireDate: string | null;
  payMethod: PaymentMethod | null;
  autoRenewal: boolean | null;
  stripeSubsId: string | null;
  stripePlanId: string | null;
  status: SubStatus | null;
  appleSubsId: string | null;
  b2bLicenceId: string | null;
}

export interface FtcAccount {
  ftcId: string | null; // null for wechat-only account
  unionId: string | null; // null for ftc-only account
  stripeId: string | null; // null for wechat-only account
  email: string | null; // null for wechat-only account
  userName: string | null; // null for wechat-only account
  wechat: Wechat;
  kind: AccountKind;
}

/**
 * @description Definition of a reader's account
 */
export type ReaderAccount = FtcAccount & {
  membership: Membership;
};

export interface IFtcProfile {
  id: string;
  unionId: string | null;
  stripeId: string | null;
  email: string;
  userName: string | null;
  mobile: string | null;
  gender: Gender;
  lastName: string | null;
  firstName: string | null;
  birthday: string | null;
  country: string | null;
  province: string | null;
  city: string | null;
  district: string | null;
  postcode: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IWxProfile {
  unionId: string;
  nickname: string | null;
  avatarUrl: string | null;
  gender: Gender;
  country: string | null;
  province: string | null;
  city: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface ClientApp {
  platform: Platform;
  version: string | null;
  userIp: string | null;
  userAgent: string | null;
}

export interface IActivity extends ClientApp {
  ftcId: string;

  createdUtc: string | null;
  kind: ActivityKind;
}

export interface IWxLogin extends ClientApp {
  unionId: string;
  openId: string;
  appId: string;
  createdAt: string | null;
  updatedAt: string | null;
}
