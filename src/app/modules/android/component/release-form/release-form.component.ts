import { Component, Input, OnInit} from '@angular/core';
import { AndroidRelease } from 'src/app/data/schema/android';
import { Validators } from '@angular/forms';
import { DynamicControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';

@Component({
  selector: 'app-release-form',
  templateUrl: './release-form.component.html',
  styleUrls: ['./release-form.component.scss'],
})
export class ReleaseFormComponent implements OnInit {

  @Input()
  set release(release: AndroidRelease) {

    this.dynamicControls.forEach((ctrl, i) => {
      const v = release[ctrl.key];
      if (v) {
        this.dynamicControls[i].value = v;
      }
    });
  }

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'versionName',
      validators: [Validators.required],
      label: 'Version Name',
      type: 'text',
      readonly: true,
    }),
    new InputControl({
      value: 0,
      key: 'versionCode',
      validators: [Validators.required],
      label: 'Password',
      type: 'number',
      readonly: true,
    }),
    new TextareaControl({
      value: null,
      key: 'body',
      label: 'Description about this release (optional)',
    }),
    new InputControl({
      value: '',
      key: 'apkUrl',
      validators: [Validators.required],
      label: 'APK Download URL (required)',
      type: 'text',
    }),
  ];

  button: Button = Button.primary().setName('Save');

  constructor() {}

  ngOnInit(): void {}
}
