import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sub } from 'date-fns';
import { switchMap } from 'rxjs/operators';
import { IAPSubs } from 'src/app/data/schema/iap';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { getPaging, Paged, Paging } from 'src/app/shared/widget/paging';
import { ReaderService } from '../../service/reader.service';

@Component({
  selector: 'app-iap-list',
  templateUrl: './iap-list.component.html',
  styleUrls: ['./iap-list.component.scss']
})
export class IapListComponent implements OnInit {

  subs: IAPSubs[];
  private paging: Paging;
  paged: Paged;

  constructor(
    private progress: ProgressService,
    private toast: ToastService,
    private readerService: ReaderService,
    private route: ActivatedRoute,
  ) {
    progress.start();
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const paging = getPaging(params, 20);
        this.paging = paging;

        return this.readerService.listIAP(paging);
      })
    )
    .subscribe({
      next: subs => {
        console.log('IAP subs: %o', subs);

        this.progress.stop();
        this.subs = subs;

        this.paged = {
          ...this.paging,
          count: subs.length
        }
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });
  }

}
