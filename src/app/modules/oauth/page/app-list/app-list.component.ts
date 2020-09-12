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
import { getPaging, Paging } from 'src/app/shared/widget/paging';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  apps: OAuthApp[];

  paging: Paging;

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
        this.paging = paging;

        return this.oauthService.listApps(paging);
      })
    )
    .subscribe({
      next: data => {
        this.progress.stop();

        console.log(data);
        this.apps = data;
      },
      error: (err: HttpErrorResponse) => {
        this.progress.stop();

        const errRes = new RequestError(err);

        this.toast.error(errRes.message);
      }
    });
  }

  showDialog() {
    this.modal.open();
  }

  onCreated(app: OAuthApp) {
    this.modal.close();
    this.apps.unshift(app);
  }
}
