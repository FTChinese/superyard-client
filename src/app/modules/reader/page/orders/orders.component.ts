import { Component, OnInit } from '@angular/core';
import { ReaderService } from '../../service/reader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { Membership } from 'src/app/data/schema/membership';
import { Order } from 'src/app/data/schema/order';
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  disabledSearch = false;
  notFound = false;
  order: Order;
  member: Membership;

  confirming = false;

  memberLoading: string;

  constructor(
    private readerService: ReaderService,
    private toast: ToastService,
    readonly modal: ModalService,
  ) { }

  ngOnInit(): void {
  }

  onKeyword(kw: string) {
    this.getOrder(kw);
  }

  showDialog() {
    this.modal.open();
  }

  closeDialog() {
    this.modal.close();
  }

  private getOrder(id: string) {
    this.readerService.loadOrder(id)
      .subscribe({
        next: o => {
          this.notFound = false;
          this.disabledSearch = false;
          this.order = o;

          this.getMembership();
        },
        error: (err: HttpErrorResponse) => {
          this.disabledSearch = false;

          const errRes = new RequestError(err, serviceNames.reader);

          if (errRes.notFound) {
            this.notFound = true;
            return;
          }

          this.toast.error(errRes.message);
        }
      });
  }

  getMembership() {
    this.memberLoading = 'Loading membership data...';
    this.member = undefined;
  }



  // Confirm an order if it is not confirmed yet.
  // TODO: it's better to check against Ali or Wechat
  // API to ensure the money is actually charged.
  confirm() {
    if (!this.order) {
      this.toast.error('No order to confirmed!');
      return;
    }

    this.confirming = true;
    this.readerService.confirmOrder(this.order.id)
      .subscribe({
        next: ok => {
          this.confirming = false;
          if (ok) {
            this.closeDialog();

            this.toast.info('Order confirmed. Refreshing data...');

            this.getOrder(this.order.id);
          } else {
            this.toast.error('Unknown error occurred while confirming an order');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.confirming = false;
          const errRes = new RequestError(err);
          this.toast.error(errRes.message);
        }
      });
  }
}
