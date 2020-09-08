import { Component, OnInit } from '@angular/core';
import { ReaderService } from '../../service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { Membership } from 'src/app/data/schema/membership';
import { Order } from 'src/app/data/schema/order';
import { ModalService } from 'src/app/shared/service/modal.service';
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

  get accountKind(): AccountKind {
    return this.order.ftcId ? 'ftc' : 'wechat';
  }

  constructor(
    private readerService: ReaderService,
    private toast: ToastService,
    readonly modal: ModalService,
    readonly progress: ProgressService
  ) { }

  ngOnInit(): void {
  }

  onKeyword(kw: string) {
    this.loadOrder(kw);
  }

  showDialog() {
    this.modal.open();
  }

  closeDialog() {
    this.modal.close();
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
    this.readerService.loadAccount(this.order.compoundId, this.accountKind)
      .subscribe({
        next: account => {
          this.account = account;
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);

          this.toast.error(reqErr.message);
        }
      });
  }

  // Confirm an order if it is not confirmed yet.
  // TODO: it's better to check against Ali or Wechat
  // API to ensure the money is actually charged.
  confirm() {
    if (!this.order) {
      this.toast.error('No order to confirmed!');
      return;
    }

    this.progress.start();
    this.toast.info('Confirming order...');

    this.readerService.confirmOrder(this.order.id)
      .subscribe({
        next: ok => {
          this.progress.stop();

          if (ok) {
            this.closeDialog();

            this.toast.info('Order confirmed. Refreshing data...');

            this.loadOrder(this.order.id);
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
