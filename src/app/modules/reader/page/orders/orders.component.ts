import { Component, OnInit } from '@angular/core';
import { ReaderService } from '../../service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { AliPayload, Order, PaymentResult, WxPayload } from 'src/app/data/schema/order';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ReaderAccount } from 'src/app/data/schema/reader';
import { AccountKind } from 'src/app/data/schema/enum';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  order: Order;

  account: ReaderAccount;
  account404 = false;

  paymentResult: PaymentResult;
  aliPayload: AliPayload[];
  wxPayload: WxPayload[];

  get accountKind(): AccountKind {
    return this.order.ftcId ? 'ftc' : 'wechat';
  }

  get loadingAlWh(): boolean {
    if (this.order && this.order.payMethod === 'alipay' && !this.aliPayload) {
      return true;
    }

    return false;
  }

  get loadingWxWh(): boolean {
    if (this.order && this.order.payMethod === 'wechat' && !this.wxPayload) {
      return true;
    }

    return false;
  }

  get loadingAccount(): boolean {
    if (this.order && !this.account && !this.account404) {
      return true;
    }

    return false;
  }

  constructor(
    private readerService: ReaderService,
    private toast: ToastService,
    readonly progress: ProgressService
  ) { }

  ngOnInit(): void {
  }

  private clearData() {
    this.order = undefined;
    this.account = undefined;
    this.account404 = false;
    this.paymentResult = undefined;
    this.aliPayload = undefined;
    this.wxPayload = undefined;
  }

  // Receive search keyword
  onKeyword(kw: string) {
    this.progress.start();
    this.loadOrder(kw);
    this.clearData();
  }

  private loadOrder(id: string) {
    this.readerService.loadOrder(id)
      .subscribe({
        next: o => {
          this.progress.stop();

          this.order = o;

          // After order loaded, load the membership of this user.
          this.loadAccount();

          switch (this.order.payMethod) {
            case 'alipay':
              this.loadAliWebhook();
              break;

            case 'wechat':
              this.loadWxWebhook();
              break;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const errRes = new RequestError(err, serviceNames.reader);

          this.toast.error(errRes.message);
        }
      });
  }

  loadAccount() {
    // this.toast.info('Loading membership of this order...');
    this.readerService.loadAccount(this.order.compoundId, this.accountKind)
      .subscribe({
        next: account => {
          this.account = account;
        },
        error: (err: HttpErrorResponse) => {

          const reqErr = new RequestError(err);

          if (reqErr.notFound) {
            this.account404 = true;
            return;
          }

          this.toast.error(reqErr.message);
        }
      });
  }

  loadAliWebhook() {
    this.readerService.aliWebhookPayload(this.order.id)
      .subscribe({
        next: data => {
          this.aliPayload = data;
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.toast.error(errRes.message);
        }
      });
  }

  loadWxWebhook() {
    this.readerService.wxWebhookPayload(this.order.id)
      .subscribe({
        next: data => {
          this.wxPayload = data;
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.toast.error(errRes.message);
        }
      });
  }

  // Confirm an order if it is not confirmed yet.
  verifyPayment() {
    if (!this.order) {
      this.toast.error('No order to verify!');
      return;
    }

    this.progress.start();
    this.toast.info('Verifying order payment...');

    this.readerService.verifyPayment(this.order.id)
      .subscribe({
        next: result => {
          this.progress.stop();

          if (result) {
            this.order = result.order;
            this.account.membership = result.membership;
            this.paymentResult = result.payment;
          } else {
            this.toast.error('Unknown error occurred while confirming an order');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();
          const errRes = new RequestError(err);
          this.toast.error(errRes.message);
        }
      });
  }
}
