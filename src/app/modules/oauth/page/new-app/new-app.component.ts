import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/data/schema/oauth';
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
  providers: [AppFormService],
})
export class NewAppComponent {

  app: IApiApp;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oauthService: OAuthService,
    private formService: AppFormService,
  ) {
    this.formService
      .formSubmitted$
      .pipe(
        switchMap(formData => {
          console.log('Creating a new app...');
          console.log(formData);
          return this.oauthService
            .createApp(formData);
        })
      )
      .subscribe({
        next: ok => {
          console.log(ok);
          router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err: HttpErrorResponse) => {
          this.formService.sendError(RequestError.fromResponse(err));
        },
      });
  }
}
