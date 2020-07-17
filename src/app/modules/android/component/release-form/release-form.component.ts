import { Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import { AndroidRelease } from 'src/app/data/schema/android';
import { Validators } from '@angular/forms';
import { DynamicControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { ReleaseForm } from 'src/app/data/schema/form-data';

@Component({
  selector: 'app-release-form',
  templateUrl: './release-form.component.html',
  styleUrls: ['./release-form.component.scss'],
  providers: [FormService],
})
export class ReleaseFormComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _release: AndroidRelease;

  @Input()
  set release(release: AndroidRelease) {
    this._release = release;

    this.dynamicControls.forEach((ctrl, i) => {
      const v = release[ctrl.key];
      if (v) {
        this.dynamicControls[i].value = v;
      }
    });
  }

  get release(): AndroidRelease {
    return this._release;
  }

  @Output() submitted = new EventEmitter<ReleaseForm>();

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'versionName',
      validators: [Validators.required],
      label: 'Version Name',
      type: 'text',
    }),
    new InputControl({
      value: 0,
      key: 'versionCode',
      validators: [Validators.required],
      label: 'Password',
      type: 'number',
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

  button: Button = Button.primary().setName('Save')

  constructor(
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: ReleaseForm = JSON.parse(data);

        this.submitted.emit(formData);
      });
  }
}
