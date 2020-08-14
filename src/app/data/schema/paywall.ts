import { PricedProduct } from './product';
import { Period } from './period';


export interface BaseBanner {
  heading: string;
  subHeading: string | null;
  coverUrl: string | null;
  content: string | null;
}

export type Banner = BaseBanner & {
  id: number;
  createdUtc: string | null;
  updatedUtc: string | null;
  createdBy: string | null;
  promoId: string | null;
};

export type Promo = BaseBanner & {
  id: string;
  createdUtc: string;
  createdBy: string;
} & Period;

export interface Paywall {
  banner: Banner;
  promo: Promo;
  products: PricedProduct[];
}
