import { Component, OnInit } from '@angular/core';
import { OAuthApp, AccessToken } from 'src/app/data/schema/oauth';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'src/app/data/service/oauth.service';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ModalService } from 'src/app/shared/service/modal.service';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent implements OnInit {

  app: OAuthApp;
  tokens: AccessToken[];
  get tokenFormOpend(): boolean {
    return this.modal.on && this.modal.id === 'token';
  }

  constructor(
    private route: ActivatedRoute,
    private oauthService: OAuthService,
    private toast: ToastService,
    private modal: ModalService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const clientId = params.get('clientId');

        return this.oauthService.loadApp(clientId);
      })
    )
    .subscribe({
      next: app => {
        this.app = app;
        this.loadTokens(app.clientId);
      },
      error: (err: HttpErrorResponse) => {
        const errRes = new RequestError(err);
        this.toast.info(errRes.message);
      },
    });
  }

  private loadTokens(clientId: string) {
    this.oauthService.listAppTokens(clientId)
      .subscribe({
        next: tokens => {
          this.tokens = tokens;
          console.log(tokens);
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.toast.info(errRes.message);
        }
      });
  }

  showTokenDialog() {
    this.modal.open('token');
  }

  onTokenCreated(t: AccessToken) {
    this.tokens.unshift(t);
    this.modal.close();
  }
}
