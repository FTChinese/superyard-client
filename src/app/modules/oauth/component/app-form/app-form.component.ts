import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OAuthApp, } from 'src/app/data/schema/oauth';
import { Validators, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { InputControl, DynamicControl, TextareaControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { OAuthAppForm } from 'src/app/data/schema/form-data';
import { OAuthService } from 'src/app/data/service/oauth.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
  providers: [FormService]
})
export class AppFormComponent implements OnInit {

  private form: FormGroup;
  @Input() app: OAuthApp;
  @Output() created = new EventEmitter<OAuthApp>();

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

  button: Button = Button.primary().setName('Save');

  constructor(
    private formService: FormService,
    private oauthService: OAuthService,
    private toast: ToastService,
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
        const formData: OAuthAppForm = JSON.parse(data);

        if (this.app) {
          this.update(formData);
        } else {
          this.create(formData);
        }
      });
  }

  private update(app: OAuthAppForm) {
    this.oauthService.updateApp(
      this.app.clientId,
      app,
    )
    .subscribe({
      next: ok => {
        this.formService.enable(true);
        if (ok) {
          this.toast.info('Updated successfully');
        }
      },
      error: (err: HttpErrorResponse) => {
        const errRes = new RequestError(err);
        if (errRes.statusCode === 422) {
          this.formService.sendError(errRes);
          return;
        }

        this.formService.enable(true);
        this.toast.error(errRes.message);
      },
    });
  }

  private create(app: OAuthAppForm) {
    this.oauthService.createApp(app)
      .subscribe({
        next: newApp => {
          this.toast.info('App registered successfully');
          if (newApp) {
            this.created.emit(newApp);
          }
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          if (errRes.statusCode === 422) {
            this.formService.sendError(errRes);
            return;
          }

          this.formService.enable(true);
          this.toast.error(errRes.message);
        }
      });
  }

  private patchForm() {
    if (!this.form || !this.app) {
      return;
    }
    this.form.patchValue({
      name: this.app.name,
      slug: this.app.slug,
      repoUrl: this.app.repoUrl,
      homeUrl: this.app.homeUrl,
      description: this.app.description,
      callbackUrl: this.app.callbackUrl
    });
  }
}

function slugify(str: string): string {
  return str.toLowerCase().replace(' ', '-');
}
