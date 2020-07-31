import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { OAuthService } from 'src/app/data/service/oauth.service';
import { FormService } from 'src/app/shared/service/form.service';
import { PersonalKeyForm, AppTokenReq } from 'src/app/data/schema/form-data';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';
import { OAuthApp, AccessToken } from 'src/app/data/schema/oauth';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-token-form',
  templateUrl: './token-form.component.html',
  styleUrls: ['./token-form.component.scss'],
  providers: [FormService]
})
export class TokenFormComponent implements OnInit {

  // The presence of this value determines the type of a token
  // If missing, the token is created as personal key;
  // otherwise it is created for this app.
  @Input() app: OAuthApp;
  @Output() created = new EventEmitter<AccessToken>();

  dynamicControls: DynamicControl[] = [
    new InputControl({
      label: 'Description',
      value: null,
      key: 'description',
      type: 'text',
      placeholder: 'What\'s this token for?',
      validators: [Validators.required, Validators.maxLength(128)],
      desc: 'Required. Max 256 characters',
    })
  ];

  button: Button = Button.primary().setName('Generate');

  constructor(
    private formService: FormService,
    private oauthService: OAuthService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$
      .subscribe(data => {
        const formData: PersonalKeyForm = JSON.parse(data);

        if (this.app) {
          const tokenData: AppTokenReq = {
            description: formData.description,
            clientId: this.app.clientId
          };

          this.createAppToken(tokenData);
        } else {
          this.createPersonalKey(formData);
        }
      });
  }

  private createPersonalKey(data: PersonalKeyForm) {

    this.oauthService.createPersonalKey(data)
      .subscribe({
        next: k => {
          this.toast.info('Your personal access token is created successfully');
          if (k) {
            this.created.emit(k);
          }
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.formService.sendError(errRes);
        }
      });
  }

  private createAppToken(data: AppTokenReq) {
    this.oauthService.createToken(data)
      .subscribe({
        next: t => {
          this.toast.info(`Access token for ${this.app.name} is created successfully`);
          if (t) {
            this.created.emit(t);
          }
        },
        error: (err: HttpErrorResponse) => {
          const errRes = new RequestError(err);
          this.formService.sendError(errRes);
        }
      });
  }
}
