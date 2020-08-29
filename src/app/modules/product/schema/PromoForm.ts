import { FormPeriod, Period, buildPeriod } from 'src/app/data/schema/period';
import { bannerControls } from './BannerForm';
import { DynamicControl, TextareaControl } from 'src/app/shared/widget/control';
import { periodControls } from './datetime-controls';
import { Promo } from 'src/app/data/schema/paywall';

export function zeroPromo(): Promo {
  return {
    id: null,
    heading: null,
    subHeading: null,
    coverUrl: null,
    content: null,
    terms: null,
    startUtc: null,
    endUtc: null,
    createdUtc: null,
    createdBy: null,
  }
}

/**
 * Common fields for both promo form and request body.
 * You cannot simply build upon the Promo type
 * since the nullability of heading field is different.
 * At least you should provide a heading for a promo; otherwise it is meanningless to make
 * everything optional.
 */
type PromoSharedFields = {
  heading: string;
} & Pick<Promo, 'subHeading' | 'coverUrl' | 'content' | 'terms'>

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
