import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IAPSubs, IAPSubsList } from 'src/app/data/schema/iap';
import { PagedData } from 'src/app/data/schema/paged-data';
import { RequestError } from 'src/app/data/schema/request-result';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { buildPrevNext, getPaging, Paging, PrevNextLink } from 'src/app/shared/widget/paging';
import { ReaderService } from '../../service/reader.service';

@Component({
  selector: 'app-iap-list',
  templateUrl: './iap-list.component.html',
  styleUrls: ['./iap-list.component.scss']
})
export class IapListComponent implements OnInit {

  subs: PagedData<IAPSubs>;
  prevNext: PrevNextLink;

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

        return this.readerService.listIAP(paging);
      })
    )
    .subscribe({
      next: subs => {
        console.log('IAP subs: %o', subs);

        this.progress.stop();
        this.subs = subs;

        this.prevNext = buildPrevNext(subs);
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const reqErr = new RequestError(err);

        this.toast.error(reqErr.message);
      }
    });
  }

  onNavigate() {
    this.progress.start();
  }
}
