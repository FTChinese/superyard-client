import { ExpandedProduct } from './product';

export interface BaseBanner {
  heading: string;
  subHeading: string | null;
  coverUrl: string | null;
  content: string | null;
}

export interface Banner extends BaseBanner {
  id: number;
  createdUtc: string | null;
  updatedUtc: string | null;
  createdBy: string | null;
  promoId: string | null;
}

export interface Promo extends BaseBanner {
  id: string | null;
  heading: string | null; // Override.
  terms: string | null;
  startUtc: string | null;
  endUtc: string | null;
  createdUtc: string | null;
  createdBy: string | null;
}

export interface Paywall {
  banner: Banner;
  promo: Promo;
  products: ExpandedProduct[];
}
