import { Component, OnInit } from '@angular/core';
import { IApiApp, IAccessToken } from 'src/app/data/schema/oauth';
import { OAuthService } from 'src/app//data/service/oauth.service';
import { ActivatedRoute } from '@angular/router';
import { AppFormService } from '../../app-form.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss'],
  providers: [AppFormService],
})
export class UpdateAppComponent implements OnInit {

  app: IApiApp;
  tokens: IAccessToken[];

  constructor(
    private route: ActivatedRoute,
    private oauthService: OAuthService,
    private formService: AppFormService,
  ) {
    this.formService.formSubmitted$.pipe(
      switchMap(formData => {
        return this.oauthService.updateApp(
          this.app.clientId,
          formData,
        );
      })
    )
    .subscribe({
      next: ok => console.log(ok),
      error: err => console.log(err),
    });
  }

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

}
