import { Component, OnInit } from '@angular/core';
import { siteBaseUrl } from '../sitemap';
import { NavItem } from 'src/app/shared/widget/link';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navItems: NavItem[] = [
    {
      name: 'Admin',
      href: '/' + siteBaseUrl.admin,
      children: [
        {
          name: 'VIP',
          href: `/${siteBaseUrl.admin}/vip`
        }
      ]
    },
    {
      name: 'Push Notification',
      href: '/' + siteBaseUrl.apn,
    },
    {
      name: 'API Access',
      href: '/' + siteBaseUrl.oauth,
      children: [
        {
          name: 'Personal Keys',
          href: `/${siteBaseUrl.oauth}/keys`
        }
      ]
    },
    {
      name: 'Wiki',
      href: '/' + siteBaseUrl.wiki
    },
    {
      name: 'Android Release',
      href: '/' + siteBaseUrl.android,
    },
    {
      name: 'Readers',
      href: '/' + siteBaseUrl.readers,
      children: [
        {
          name: 'Orders',
          href: `/${siteBaseUrl.readers}/orders`,
        },
        {
          name: 'Confirmation Failure',
          href: `/${siteBaseUrl.readers}/wh-unconfirmed`
        },
        {
          name: 'Test Account',
          href: `/${siteBaseUrl.readers}/sandbox`,
        },
        // {
        //   name: 'IAP Subs',
        //   href: `/${siteBaseUrl.readers}/iap`,
        // }
      ]
    },
    {
      name: 'Paywall',
      href: '/paywall',
      children: [
        {
          name: 'Products',
          href: `/paywall/products`
        }
      ]
    },
    {
      name: 'Retail Subscription',
      href: '/' + siteBaseUrl.subs,
    },
    {
      name: 'B2B Subscription',
      href: '/' + siteBaseUrl.b2b,
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
