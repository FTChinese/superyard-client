import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { Validators } from '@angular/forms';
import { InputControl, DynamicControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { EmailForm } from 'src/app/data/schema/form-data';
import { authUrls } from 'src/app/layout/sitemap';
import { switchMap } from 'rxjs/operators';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffService } from 'src/app/data/service/staff.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [FormService],
})
export class ForgotPasswordComponent implements OnInit {

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'email',
      validators: [Validators.required, Validators.email, Validators.maxLength(64)],
      label: 'Email',
      placeholder: 'example@ftchinese.com',
      type: 'email',
    }),
  ];

  button: Button = Button
    .primary()
    .setBlock()
    .setName('Send me a reset letter');

  loginLink = authUrls.login;

  done = false;

  constructor(
    private formService: FormService,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    console.log(window.location);

    this.formService.formSubmitted$.pipe(
        switchMap(data => {
          const formData: EmailForm = JSON.parse(data);
          return this.staffService.forgotPassword({
            ...formData,
            sourceUrl: window.location.href,
          });
        })
      )
      .subscribe({
        next: ok => {
          this.done = ok;
        },
        error: (err: HttpErrorResponse) => {
          this.formService.sendError(
            new RequestError(
              err,
              serviceNames.forgotPassword
            )
          );
        }
      });
  }
}
