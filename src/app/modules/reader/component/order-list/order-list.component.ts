import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/data/schema/order';
import { PagedData } from 'src/app/data/schema/paged-data';
import { ReaderAccount } from 'src/app/data/schema/reader';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { buildPagination, Pagination, Paging } from 'src/app/shared/widget/paging';
import { ReaderService } from '../../service/reader.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @Input() account: ReaderAccount;

  orderList: PagedData<Order>;
  pagination: Pagination;

  constructor(
    private readerService: ReaderService,
    private toast: ToastService,
    private progress: ProgressService,
  ) {
  }

  ngOnInit(): void {
    console.log('Start loading orders')
    this.fetchData({
      page: 1,
      perPage: 20
    });
  }

  private fetchData(p: Paging) {
    this.readerService.listOrders(this.account, p)
      .subscribe({
        next: list => {
          console.log(list);
          this.progress.stop();
          this.orderList = list;

          this.pagination = buildPagination(list);
        },
        error: (err: HttpErrorResponse) => {
          this.progress.stop();

          const reqErr = new RequestError(err);

          this.toast.error(reqErr.message);
        }
      });
  }

  onPagination(n: number) {
    console.log(n);
    this.progress.start();
    this.fetchData({
      page: n,
      perPage: 20
    });
  }
}
