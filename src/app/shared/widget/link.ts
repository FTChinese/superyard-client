export class Link {
  href: string;
  name: string;
}

export type NavItem = Link & {
  children?: Link[];
};
