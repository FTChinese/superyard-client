import { Component, OnInit } from '@angular/core';
import { OAuthApp, AccessToken, AppBase } from 'src/app/data/schema/oauth';
import { OAuthService } from 'src/app//data/service/oauth.service';
import { ActivatedRoute } from '@angular/router';
import { AppFormService } from '../../app-form.service';
import { switchMap } from 'rxjs/operators';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss'],
  providers: [AppFormService],
})
export class UpdateAppComponent implements OnInit {

  app: OAuthApp;
  error: RequestError;
  tokens: AccessToken[];

  constructor(
    private route: ActivatedRoute,
    private oauthService: OAuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const clientId = params.get('clientId');

        return this.oauthService.loadApp(clientId);
      })
    )
    .subscribe({
      next: app => this.app = app,
      error: err => console.log(err),
    });
  }

  onSubmit(app: AppBase) {
    this.oauthService.updateApp(
      this.app.clientId,
      app,
    )
    .subscribe({
      next: ok => console.log(ok),
      error: err => console.log(err),
    })
  }
}
