import { Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import { IRelease, IReleaseBase } from 'src/app/data/schema/android';
import { Validators } from '@angular/forms';
import { DynamicControl, InputControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { Alert } from 'src/app/shared/widget/alert';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-release-form',
  templateUrl: './release-form.component.html',
  styleUrls: ['./release-form.component.scss'],
  providers: [FormService],
})
export class ReleaseFormComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _release: IRelease;

  @Input()
  set release(release: IRelease) {
    this._release = release;

    this.dynamicControls.forEach((ctrl, i) => {
      const v = release[ctrl.key];
      if (v) {
        this.dynamicControls[i].value = v;
      }
    });
  }

  get release(): IRelease {
    return this._release;
  }

  @Output() submitted = new EventEmitter<IReleaseBase>();

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

  alert: Alert;

  private set alertMsg(m: string) {
    this.alert = {
      type: 'danger',
      message: m,
      dismissible: true,
    }
  }

  constructor(
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: IReleaseBase = JSON.parse(data);

        this.submitted.emit(formData);
      });
  }

  onDismissAlert() {
    this.alert = null;
  }
}
