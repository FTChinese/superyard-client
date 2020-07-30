import { Component, OnInit, Input } from '@angular/core';
import { OAuthApp } from 'src/app/data/schema/oauth';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss']
})
export class AppItemComponent implements OnInit {

  @Input() app: OAuthApp;

  constructor() { }

  ngOnInit(): void {
  }

}
