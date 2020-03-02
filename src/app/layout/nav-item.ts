export interface INavItem {
  href: string;
  name: string;
}

export const navigation: INavItem[] = [
  {
    name: 'Admin',
    href: '/admin',
  },
  {
    name: 'Push Notification',
    href: '/apn',
  },
  {
    name: 'API Access',
    href: '/oauth'
  },
  {
    name: 'Readers',
    href: '/readers',
  },
  {
    name: 'Corporate Customer',
    href: '/corop',
  },
  {
    name: 'Android',
    href: '/android',
  },
];
