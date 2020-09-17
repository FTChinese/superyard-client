import { Validators } from '@angular/forms';
import { AndroidRelease } from 'src/app/data/schema/android';
import { DynamicControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';

export type ReleaseForm = Omit<AndroidRelease, 'createdAt' | 'updatedAt'>;

export function buildReleaseControls(r: AndroidRelease): DynamicControl[] {
  return [
    new InputControl({
      value: r.versionName,
      key: 'versionName',
      validators: [Validators.required],
      label: 'Version Name',
      type: 'text',
      readonly: true,
    }),
    new InputControl({
      value: r.versionCode,
      key: 'versionCode',
      validators: [Validators.required],
      label: 'Version Code',
      type: 'number',
      readonly: true,
    }),
    new TextareaControl({
      value: r.body,
      key: 'body',
      label: 'Description about this release (optional)',
    }),
    new InputControl({
      value: r.apkUrl,
      key: 'apkUrl',
      validators: [Validators.required],
      label: 'APK Download URL (required)',
      type: 'text',
    }),
  ];
}
