import { Component, OnInit } from '@angular/core';
import { sitemap } from '../sitemap';
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
      href: sitemap.admin,
    },
    {
      name: 'Push Notification',
      href: sitemap.apn,
    },
    {
      name: 'API Access',
      href: sitemap.oauth
    },
    {
      name: 'Readers',
      href: sitemap.readers,
    },
    {
      name: 'B2B Subscription',
      href: sitemap.b2b,
    },
    {
      name: 'Android',
      href: sitemap.android,
    },
    {
      name: 'Settings',
      href: sitemap.settings,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
