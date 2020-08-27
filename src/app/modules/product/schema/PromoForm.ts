import { FormPeriod, Period, buildPeriod } from 'src/app/data/schema/period';
import { BannerForm, bannerControls } from './BannerForm';
import { DynamicControl, TextareaControl } from 'src/app/shared/widget/control';
import { periodControls } from './datetime-controls';
import { Promo, BaseBanner } from 'src/app/data/schema/paywall';
// Promotion form. This is the banner form plus starting and ending time.

type PromoSharedFields = Omit<Promo, 'id' | 'createdUtc' | 'createdBy' | 'startUtc' | 'endUtc'>;

export type PromoForm = PromoSharedFields & FormPeriod;

// Request data to build a promotion.
// The type for startUtc and endUtc are different from form.
export type PromoReq = PromoSharedFields & Period;

/**
 * @description Turn the promotion form to request data.
 */
export function buildPromoReq(f: PromoForm, zone: string): PromoReq {
  return {
    heading: f.heading,
    subHeading: f.subHeading,
    coverUrl: f.coverUrl,
    content: f.content,
    terms: f.terms,
    ...buildPeriod({
      ...f,
      zone,
    })
  };
}

/**
 * @description Promotion form UI.
 */
export function buildPromoControls(): DynamicControl[] {
  return [
    ...bannerControls,
    new TextareaControl({
      value: null,
      key: 'terms',
      label: 'Terms and Conditions',
    }),
    ...periodControls,
  ];
}
