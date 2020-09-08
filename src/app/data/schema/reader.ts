import { Membership } from './membership';
import {
  AccountKind,
  Gender,
  Platform,
  ActivityKind,
} from './enum';

export interface Wechat {
  nickname: string | null;
  avatarUrl: string | null;
}

// Create a zero membership based on current account.
export function zeroMember(): Membership {
  return {
    compoundId: null,
    ftcId: null,
    unionId: null,
    tier: null,
    cycle: null,
    expireDate: null,
    payMethod: null,
    ftcPlanId: null,
    stripeSubsId: null,
    stripePlanId: null,
    autoRenewal: null,
    status: null,
    appleSubsId: null,
    b2bLicenceId: null
  };
}

/**
 * @description An email-only account.
 */
export interface FtcAccount {
  ftcId: string | null; // null for wechat-only account
  unionId: string | null; // null for ftc-only account
  stripeId: string | null; // null for wechat-only account
  email: string | null; // null for wechat-only account
  userName: string | null; // null for wechat-only account
  password?: string; // Only exists for sandbox account.
  createdBy?: string; // Only exists for sandbox account.
  createdUtc: string | null;
  updatedUtc: string | null;
}

/**
 * @description Combines email and wechat account.
 */
export type JoinedAccount = FtcAccount & {
  wechat: Wechat;
  kind: AccountKind;
};

/**
 * @description A reader's full account, email + wechat + membership.
 */
export type ReaderAccount = JoinedAccount & {
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

