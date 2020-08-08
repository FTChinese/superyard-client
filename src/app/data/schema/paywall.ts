import { Product } from './product';
import { Period } from './period';

export interface BaseBanner {
  id: number;
  heading: string;
  subHeading: string | null;
  coverUrl: string | null;
  content: string[] | null;
  createdUtc: string | null;
  createdBy: string | null;
}
export type Banner = BaseBanner & {
  updatedUtc: string | null;
  promoId: string | null;
};

export type Promo = BaseBanner & Partial<Period>;

export interface Paywall {
  banner: Banner;
  promo: Promo;
  products: Product[];
}
