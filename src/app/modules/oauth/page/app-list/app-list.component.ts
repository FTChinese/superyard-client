import { Component, OnInit } from '@angular/core';
import { OAuthApp } from 'src/app/data/schema/oauth';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { OAuthService } from 'src/app/data/service/oauth.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { buildPrevNext, getPaging, PrevNextLink } from 'src/app/shared/widget/paging';
import { PagedData } from 'src/app/data/schema/paged-data';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  apps: PagedData<OAuthApp>;
  prevNext: PrevNextLink;

  constructor(
    private oauthService: OAuthService,
    private toast: ToastService,
    readonly modal: ModalService,
    private progress: ProgressService,
    private route: ActivatedRoute,
  ) {
    progress.start();
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const paging = getPaging(params);

        return this.oauthService.listApps(paging);
      })
    )
    .subscribe({
      next: apps => {
        this.progress.stop();

        console.log(apps);
        this.apps = apps;
        this.prevNext = buildPrevNext(apps);
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const errRes = new RequestError(err);

        this.toast.error(errRes.message);
      }
    });
  }

  onNavigate() {
    this.progress.start();
  }
  showDialog() {
    this.modal.open();
  }

  onCreated(app: OAuthApp) {
    this.modal.close();
    this.apps.data.unshift(app);
  }
}
