import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/models/oauth';
import { AppFormService } from '../app-form.service';
import { OAuthService } from '../oauth.service';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.scss'],
  providers: [AppFormService],
})
export class NewAppComponent implements OnInit {

  app: IApiApp;

  constructor(
    private oauthService: OAuthService,
    private formService: AppFormService,
  ) {
    this.formService
      .formSubmitted$
      .subscribe(app => console.log(app));
  }

  ngOnInit(): void {
  }

}
