import { BaseBanner } from 'src/app/data/schema/paywall';
import { TextareaControl, DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
// The field required for a banner.

export type BannerForm = Pick<BaseBanner, 'heading' | 'subHeading' | 'coverUrl' | 'content'>;

/**
 * @description Controls to describe the banner form.
 */
export const bannerControls: DynamicControl[] = [
  new InputControl({
    value: '',
    key: 'heading',
    validators: [Validators.required],
    label: 'Heading *',
    type: 'text',
  }),
  new InputControl({
    value: null,
    key: 'subHeading',
    label: 'Secondary Heading',
    type: 'text',
  }),
  new InputControl({
    value: null,
    key: 'coverUrl',
    label: 'Cover URL',
    type: 'url',
  }),
  new TextareaControl({
    value: null,
    key: 'content',
    label: 'Content',
  }),
];
