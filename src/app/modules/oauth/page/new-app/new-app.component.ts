import { Component, OnInit } from '@angular/core';
import { OAuthApp, AppBase } from 'src/app/data/schema/oauth';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { AppFormService } from '../../app-form.service';
import { OAuthService } from 'src/app/data/service/oauth.service';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.scss'],
})
export class NewAppComponent {

  app: OAuthApp;
  error: RequestError;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauthService: OAuthService,
  ) {}

  onSubmit(app: AppBase) {
    console.log('Creating a new app...');
    console.log(app);

    this.oauthService.createApp(app)
      .subscribe({
        next: ok => {
          console.log(ok);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err: HttpErrorResponse) => {
          this.error = RequestError.fromResponse(err);
        },
      });
  }
}
