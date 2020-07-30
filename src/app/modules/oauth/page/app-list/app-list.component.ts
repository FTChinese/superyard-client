import { Component, OnInit } from '@angular/core';
import { OAuthApp } from 'src/app/data/schema/oauth';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { OAuthService } from 'src/app/data/service/oauth.service';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  apps: OAuthApp[];

  constructor(
    private oauthService: OAuthService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.oauthService.listApps().subscribe({
      next: data => {
        console.log(data);
        this.apps = data;
      },
      error: (err: HttpErrorResponse) => {
        const errRes = new RequestError(err);

        this.toast.error(errRes.message);
      }
    });
  }
}
