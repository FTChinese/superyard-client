import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IApiApp, IAppBase } from 'src/app/data/schema/oauth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { RequestError } from 'src/app/data/schema/request-result';
import { InputControl, DynamicControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
  providers: [FormService],
})
export class AppFormComponent implements OnInit {

  private _app: IApiApp;
  private form: FormGroup;

  @Input()
  set app(app: IApiApp) {
    this._app = app;
    this.patchForm();
  }

  @Input()
  set error(err: RequestError) {
    if (!err) {
      return;
    }

    this.formService.sendError(err);
  }

  @Output() submitted = new EventEmitter<IAppBase>();

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'name',
      validators: [Validators.required, Validators.maxLength(256)],
      label: 'Application Name',
      type: 'text',
      desc: 'Required. 1 ~ 256 alphanumerics.'
    }),
    new InputControl({
      value: '',
      key: 'slug',
      label: 'Slug Name',
      type: 'text',
      readonly: true,
    }),
    new InputControl({
      value: null,
      key: 'repoUrl',
      validators: [Validators.required, Validators.maxLength(256)],
      label: 'Repo URL',
      type: 'url',
      placeholder: 'Where could the source code be found?',
      desc: 'Required. Must be valid url with max length of 256 characters'
    }),
    new InputControl({
      value: null,
      key: 'homeUrl',
      validators: [Validators.maxLength(256)],
      label: 'Home URL',
      type: 'url',
      placeholder: 'The full URL to your application homepage',
      desc: 'Optional. Max 256 characters'
    }),
    new TextareaControl({
      value: null,
      key: 'description',
      validators: [Validators.maxLength(512)],
      label: 'Application Description',
      desc: 'Optional but recommended. Max 512 characters'
    }),
    new InputControl({
      value: null,
      key: 'callbackUrl',
      validators: [Validators.maxLength(256)],
      label: 'Callback URL',
      type: 'url',
      placeholder: 'OAuth 2.0 callback url',
      desc: 'Optional. Max 256 characters'
    }),
  ];

  button: Button = Button.primary().setName('Save')

  constructor(
    private formService: FormService,
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
    this.formService.formCreated$
      .subscribe(form => {
        console.log('form created');
        console.log(form);
        form.get('name').valueChanges
          .subscribe(name => {
            form.patchValue({
              slug: slugify(name),
            });
          });

        this.form = form;
        this.patchForm();
      });

    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: IAppBase = JSON.parse(data);

        this.submitted.emit(formData);
      });
  }

  private patchForm() {
    if (!this.form || !this._app) {
      return;
    }
    this.form.patchValue({
      name: this._app.name,
      slug: this._app.slug,
      repoUrl: this._app.repoUrl,
      homeUrl: this._app.homeUrl,
      description: this._app.description,
      callbackUrl: this._app.callbackUrl
    });
  }
}


function slugify(str: string): string {
  return str.toLowerCase().replace(' ', '-');
}
