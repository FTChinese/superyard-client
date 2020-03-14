import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/models/oauth';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  apps: IApiApp[];

  constructor() { }

  ngOnInit(): void {
  }

}
