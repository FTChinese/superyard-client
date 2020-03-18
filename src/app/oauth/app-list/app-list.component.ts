import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/models/oauth';
import { OAuthService } from '../oauth.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  apps: IApiApp[];

  constructor(
    private oauthService: OAuthService,
  ) { }

  ngOnInit(): void {
    this.oauthService.listApps().subscribe({
      next: data => {
        this.apps = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
