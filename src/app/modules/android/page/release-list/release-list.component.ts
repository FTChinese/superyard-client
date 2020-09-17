import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AndroidRelease } from 'src/app/data/schema/android';
import { PagedData } from 'src/app/data/schema/paged-data';
import { RequestError } from 'src/app/data/schema/request-result';
import { AndroidService } from 'src/app/data/service/android.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { buildPrevNext, getPaging, PrevNextLink } from 'src/app/shared/widget/paging';

@Component({
  selector: 'app-release-list',
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.scss']
})
export class ReleaseListComponent implements OnInit {

  list: PagedData<AndroidRelease>;
  prevNext: PrevNextLink;

  constructor(
    private service: AndroidService,
    private toast: ToastService,
    private progress: ProgressService,
    private route: ActivatedRoute,
  ) {
    progress.start();
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
        switchMap(params => {
          return this.service.listReleases(getPaging(params));
        })
      )
      .subscribe({
        next: list => {
          this.progress.stop();
          this.list = list;

          this.prevNext = buildPrevNext(list);
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);

          this.toast.error(reqErr.message);
        }
      });
  }

  onNavigate() {
    this.progress.start();
  }
}
