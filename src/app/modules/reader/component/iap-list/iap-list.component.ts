import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IAPSubs } from 'src/app/data/schema/iap';
import { PagedData } from 'src/app/data/schema/paged-data';
import { ReaderAccount } from 'src/app/data/schema/reader';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { buildPagination, buildPrevNext, Pagination, Paging } from 'src/app/shared/widget/paging';
import { ReaderService } from '../../service/reader.service';

@Component({
  selector: 'app-iap-list',
  templateUrl: './iap-list.component.html',
  styleUrls: ['./iap-list.component.scss']
})
export class IapListComponent implements OnInit {
  @Input() account: ReaderAccount;

  subsList: PagedData<IAPSubs>;
  pagination: Pagination;

  constructor(
    private progress: ProgressService,
    private toast: ToastService,
    private readerService: ReaderService,
  ) {
    progress.start();
  }

  ngOnInit(): void {
    this.fetchData(1);
  }

  private fetchData(p: number) {
    this.readerService.listIAP(this.account.ftcId, {
      page: p,
      perPage: 20
    })
    .subscribe({
      next: subs => {
        this.progress.stop();
        this.subsList = subs;

        this.pagination = buildPagination(subs);
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });
  }

  onPagination(n: number) {
    this.progress.start();
    this.fetchData(n);
  }
}
