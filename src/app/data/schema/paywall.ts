export interface BaseBanner {
  id: number;
  heading: string;
  coverUrl: string | null;
  subHeading: string | null;
  content: string[] | null;
  createdUtc: string | null;
  updatedUtc: string | null;
  createdBy: string | null;
}

export type PromoBanner = BaseBanner & {
  startUtc: string | null;
  endUtc: string | null;
};

export type PaywallBanner = BaseBanner & {
  promo: PromoBanner;
};
