import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/models/oauth';
import { AppFormService } from '../app-form.service';
import { OAuthService } from '../oauth.service';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.scss'],
  providers: [AppFormService],
})
export class NewAppComponent implements OnInit {

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
          return this.oauthService
            .createApp(formData);
        })
      )
      .subscribe({
        next: ok => {
          console.log(ok);
          router.navigate(['../'], { relativeTo: this.route });
        },
        error: err => console.log(err),
      });
  }

  ngOnInit(): void {
  }

}
