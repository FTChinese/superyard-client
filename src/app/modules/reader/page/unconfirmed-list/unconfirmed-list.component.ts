import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PaymentMethod } from 'src/app/data/schema/enum';
import { UnconfirmedOrder } from 'src/app/data/schema/order';
import { PagedData } from 'src/app/data/schema/paged-data';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { buildPrevNext, defaultPaging, getPaging, Paging, PrevNextLink } from 'src/app/shared/widget/paging';
import { ReaderService } from '../../service/reader.service';

@Component({
  selector: 'app-unconfirmed-list',
  templateUrl: './unconfirmed-list.component.html',
  styleUrls: ['./unconfirmed-list.component.scss']
})
export class UnconfirmedListComponent implements OnInit {

  private payMethod: PaymentMethod;
  orderList: PagedData<UnconfirmedOrder>;
  prevNext: PrevNextLink;

  private observer: PartialObserver<PagedData<UnconfirmedOrder>> = {
    next: list => {
      this.progress.stop();
      this.orderList = list;

      this.prevNext = buildPrevNext(list);
    },
    error: (err: HttpErrorResponse) => {
      this.progress.stop();

      const errRes = new RequestError(err);
      this.toast.error(errRes.message);
    }
  };

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService,
    private toast: ToastService,
    private progress: ProgressService,
  ) {
    this.progress.start();
  }

  ngOnInit(): void {
    this.route.data.pipe(
      switchMap(data => {
        this.payMethod = data.payMethod as PaymentMethod;

        return this.load(defaultPaging());
      })
    ).subscribe(this.observer);

    this.route.queryParamMap.pipe(
      switchMap(params => {
        const paging = getPaging(params);

        return this.load(paging);
      })
    ).subscribe(this.observer);
  }

  private load(p: Paging): Observable<PagedData<UnconfirmedOrder>> {
    switch (this.payMethod) {
      case 'alipay':
        return this.readerService.listAliUnconfirmed(p);

      case 'wechat':
        return this.readerService.listWxUnconfirmed(p);

      default:
        throw new Error('Unknown payment method');
    }
  }

  onNavigate() {
    this.progress.start();
  }
}
