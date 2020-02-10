import {
  Tier,
  Cycle,
  PaymentMethod,
  SubStatus,
  LoginMethod,
} from './enums';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IWechat {
  nickname: string | null;
  avatarUrl: string | null;
}

export interface IMembership {
  id: string | null;
  tier: Tier | null;
  cycle: Cycle | null;
  expireDate: string | null;
  payMethod: PaymentMethod | null;
  autoRenew: boolean | null;
  status: SubStatus | null;
  vip: boolean | null;
}

export interface IReaderAccount {
  id: string;
  unionId: string | null;
  stripeId: string | null;
  userName: string | null;
  email: string;
  isVerified: boolean;
  avatarUrl: string | null;
  loginMethod: LoginMethod;
  wechat: IWechat;
  membership: IMembership;
}
