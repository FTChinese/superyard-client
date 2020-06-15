import { Component, OnInit } from '@angular/core';
import { Link } from 'src/app/shared/widget/link';
import { sitemap } from '../sitemap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
