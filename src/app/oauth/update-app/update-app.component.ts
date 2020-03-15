import { Component, OnInit } from '@angular/core';
import { IApiApp } from 'src/app/models/oauth';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss']
})
export class UpdateAppComponent implements OnInit {

  app: IApiApp;

  constructor() { }

  ngOnInit(): void {
  }

}
