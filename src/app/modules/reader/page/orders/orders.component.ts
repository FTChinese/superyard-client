import { Component, OnInit } from '@angular/core';
import { ReaderService } from '../../service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { Order, PaymentResult } from 'src/app/data/schema/order';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ReaderAccount } from 'src/app/data/schema/reader';
import { AccountKind } from 'src/app/data/schema/enum';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {


  disabledSearch = false;
  order: Order;
  account: ReaderAccount;
  paymentResult: PaymentResult;

  get accountKind(): AccountKind {
    return this.order.ftcId ? 'ftc' : 'wechat';
  }

  constructor(
    private readerService: ReaderService,
    private toast: ToastService,
    readonly progress: ProgressService
  ) { }

  ngOnInit(): void {
  }

  // Receive search keyword
  onKeyword(kw: string) {
    this.loadOrder(kw);
  }

  private loadOrder(id: string) {
    this.readerService.loadOrder(id)
      .subscribe({
        next: o => {
          this.disabledSearch = false;
          this.order = o;

          // After order loaded, load the membership of this user.
          this.loadAccount();
        },
        error: (err: HttpErrorResponse) => {
          this.disabledSearch = false;

          const errRes = new RequestError(err, serviceNames.reader);

          this.toast.error(errRes.message);
        }
      });
  }

  loadAccount() {
    this.toast.info('Loading membership of this order...');
    this.readerService.loadAccount(this.order.compoundId, this.accountKind)
      .subscribe({
        next: account => {
          this.account = account;
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);

          if (reqErr.notFound) {
            this.toast.error('Membership linked to this order is not found');
            return;
          }

          this.toast.error(reqErr.message);
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
