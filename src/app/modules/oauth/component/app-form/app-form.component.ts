import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IApiApp, IAppBase } from 'src/app/data/schema/oauth';
import { FormBuilder, Validators } from '@angular/forms';
import { AppFormService } from '../../app-form.service';
import { FormService } from 'src/app/shared/service/form.service';
import { Alert } from 'src/app/shared/widget/alert';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
  providers: [FormService],
})
export class AppFormComponent implements OnInit {

  formErr: Partial<IAppBase> = {};

  @Input()
  set app(app: IApiApp) {
    this.appForm.patchValue({
      name: app.name,
      slug: app.slug,
      repoUrl: app.repoUrl,
      homeUrl: app.homeUrl,
      description: app.description,
      callbackUrl: app.callbackUrl
    });
  }

  @Input()
  set error(err: RequestError) {

  }

  @Output() submitted = new EventEmitter<IAppBase>();

  appForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    slug: [''],
    repoUrl: ['', [Validators.required]],
    homeUrl: [null],
    description: [null],
    callbackUrl: [null],
  });

  alert: Alert

  set alertMsg(m: string) {
    this.alert = {
      type: 'danger',
      message: m,
      dismissible: true,
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private formService: AppFormService,
  ) { }

  /**
   * Monitor the name field value change
   * and sync the slugified version.
   * If you use a template reference variable on the `name` field
   * and set the `slug` field to its value,
   * Angular only updates the UI;
   * it does not submit the value.
   */
  ngOnInit(): void {
    this.appForm.get('name')
      .valueChanges
      .subscribe(name => {
        this.appForm.patchValue({
          slug: slugify(name),
        });
      });

    this.formService
      .errorReceived$
      .subscribe(reqErr => {
        console.log(reqErr);

        this.appForm.enable();

        if (reqErr.unprocessable) {
          this.formErr = reqErr.toFormFields;

          return;
        }

        this.alertMsg = reqErr.message;
      });
  }

  submit() {
    console.log(this.appForm.value);

    if (this.appForm.invalid) {
      if (this.appForm.getError('required', 'name')) {
        this.formErr.name = 'App name is required';
      }

      if (this.appForm.getError('required', 'repoUrl')) {
        this.formErr.repoUrl = 'Please supply the source code url of this app';
      }

      return;
    }

    this.submitted.emit(this.appForm.value);

    // NOTE: must not put this line before submite data;
    // otherwise the form data is empty.
    this.appForm.disable();
  }

  onDismissAlert() {
    this.alert = null
  }
}


function slugify(str: string): string {
  return str.toLowerCase().replace(' ', '-');
}
