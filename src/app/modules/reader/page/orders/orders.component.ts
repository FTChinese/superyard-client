import { Component, OnInit } from '@angular/core';
import { buildSearchOpts } from 'src/app/shared/widget/control';
import { ReaderService } from '../../service/reader.service';
import { FormService } from 'src/app/shared/service/form.service';
import { SearchForm } from 'src/app/data/schema/form-data';
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
  providers: [FormService],
})
export class OrdersComponent implements OnInit {

  searchControl = buildSearchOpts('Order ID');
  notFound = false;
  order: Order;
  member: Membership;

  confirming = false;

  memberLoading: string;

  constructor(
    private readerService: ReaderService,
    private formService: FormService,
    private toast: ToastService,
    readonly modal: ModalService,
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$
      .subscribe(data => {
        const search: SearchForm = JSON.parse(data);
        this.getOrder(search.keyword);
      });
  }

  showDialog() {
    this.modal.open();
  }

  closeDialog() {
    this.modal.close();
  }

  getOrder(id: string) {
    this.readerService.loadOrder(id)
      .subscribe({
        next: o => {
          this.notFound = false;
          this.formService.enable(true);
          this.order = o;

          this.getMembership(o.compoundId);
        },
        error: (err: HttpErrorResponse) => {
          this.formService.enable(true);

          const errRes = new RequestError(err, serviceNames.reader);

          if (errRes.notFound) {
            this.notFound = true;
            return;
          }

          this.toast.error(errRes.message);
        }
      });
  }

  getMembership(userId: string) {
    this.memberLoading = 'Loading membership data...';
    this.member = undefined;

    this.readerService.findMembership(userId)
      .subscribe({
        next: m => {
          this.memberLoading = undefined;
          this.member = m;
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);

          if (errRes.notFound) {
            this.memberLoading = 'It seems there is no membership data associated with the account which created this order';
            return;
          }
          this.memberLoading = errRes.message;
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
