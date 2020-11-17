import {
  Tier,
  Cycle,
  PaymentMethod,
  OrderKind,
} from './enum';
import { Membership } from './membership';

export interface Order {
  id: string;
  price: number;
  amount: number;
  compoundId: string;
  ftcId: string | null;
  unionId: string | null;
  planId: string | null;
  discountId: string | null;
  tier: Tier;
  cycle: Cycle;
  cycleCount: number;
  extraDays: number;
  kind: OrderKind; // Subscription-api uses usageType
  payMethod: PaymentMethod; // Subscription api uses payMethod.
  totalBalance: number;
  wxAppId: string | null;
  createdAt: string;
  confirmedAt: string;
  startDate: string;
  endDate: string;
}


export interface PaymentResult {
  paymentState: 'WAIT_BUYER_PAY' | 'TRADE_CLOSED' | 'TRADE_SUCCESS' | 'TRADE_FINISHED' | 'SUCCESS' | 'REFUND' | 'NOTPAY' | 'CLOSED' | 'REVOKED' | 'USERPAYING' | 'PAYERROR';
  paymentStateDesc: string;
  totalFee: number | null;
  transactionId: string;
  ftcOrderId: string;
  paidAt: string | null;
  payMethod: PaymentMethod;
}

export interface ConfirmationResult {
  order: Order;
  membership: Membership;
  payment: PaymentResult;
}

export interface AliPayload {
  transactionId: string;
  ftcOrderId: string;
  tradeStatus: string;
  totalAmount: string;
  receiptAmount: string | null;
  notifiedCst: string;
  createdCst: string;
  paidCst: string;
  closedCst: string | null;
}

export interface WxPayload {
  transactionId: string;
  ftcOrderId: string;
  tradeType: string;
  totalAmount: number;
  paidCst: string;
  returnCode: string;
  returnMessage: string | null;
  resultCode: string;
  errorCode: string | null;
  errorDesc: string | null;
}

export interface UnconfirmedOrder {
  orderId: string;
  orderAmount: number;
  orderTier: Tier;
  orderCycle: Cycle;
  kind: OrderKind;
  confirmedUtc: string | null;
  createdUtc: string | null;
  startDate: string | null;
  endDate: string | null;
  paymentState: string;
  paidCst: string;
  memberTier: Tier | null;
  memberCycle: Cycle | null;
  expireDate: string | null;
}
