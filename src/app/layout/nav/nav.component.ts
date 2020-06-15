import { Component, OnInit } from '@angular/core';
import { siteBaseUrl } from '../sitemap';
import { Link } from 'src/app/shared/widget/link';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navItems: Link[] = [
    {
      name: 'Admin',
      href: '/' + siteBaseUrl.admin,
    },
    {
      name: 'Push Notification',
      href: '/' + siteBaseUrl.apn,
    },
    {
      name: 'API Access',
      href: '/' + siteBaseUrl.oauth
    },
    {
      name: 'Readers',
      href: '/' + siteBaseUrl.readers,
    },
    {
      name: 'B2B Subscription',
      href: '/' + siteBaseUrl.b2b,
    },
    {
      name: 'Android',
      href: '/' + siteBaseUrl.android,
    },
    {
      name: 'Settings',
      href: '/' + siteBaseUrl.settings,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
