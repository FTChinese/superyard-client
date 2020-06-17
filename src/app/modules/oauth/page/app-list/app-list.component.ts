import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/data/schema/oauth';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { OAuthService } from 'src/app/data/service/oauth.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  apps: IApiApp[];

  errMsg: string;

  constructor(
    private oauthService: OAuthService,
  ) { }

  ngOnInit(): void {
    this.oauthService.listApps().subscribe({
      next: data => {
        console.log(data);
        this.apps = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.handleError(err);
      }
    });
  }

  private handleError(errResp: HttpErrorResponse) {
    const err = RequestError.fromResponse(errResp);

    this.errMsg = err.message;
  }
}
