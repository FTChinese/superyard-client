import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { InputControl, DynamicControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { authUrls } from 'src/app/layout/sitemap';
import { RequestError } from 'src/app/data/schema/request-result';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PasswordResetForm, PasswordResetter } from 'src/app/data/schema/form-data';

enum TokenState {
  NotFound = 'not_found',
  Found = 'found',
  Used = 'used'
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [FormService],
})
export class ResetPasswordComponent implements OnInit {

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'password',
      validators: [Validators.required],
      label: '密码',
      type: 'password',
    }),
    new InputControl({
      value: '',
      key: 'confirmPassword',
      validators: [Validators.required],
      label: '确认密码',
      type: 'password',
    }),
  ];

  button: Button = Button.primary().setBlock().setName('重置密码');

  tokenState: TokenState = null;
  token: string; // The token acquired from url path.
  email: string; // The email linked to this password reset token.

  forgotPwLink = authUrls.forgotPassword;
  loginLink = authUrls.login;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const token = params.get('token');
        this.token = token;
        console.log(`Token: ${token}`);

        return of({email: 'mock@example.org'});
      })
    )
    .subscribe({
      next: data => {
        this.email = data.email;
        this.tokenState = TokenState.Found;
      },
      error: err => {
        console.log(err);
      }
    });

    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const formData: PasswordResetForm = JSON.parse(data);
        const resetter: PasswordResetter = {
          token: this.token,
          password: formData.password,
        };

        console.log(resetter);

        return of(true);
      })
    )
    .subscribe({
      next: ok => {
        console.log(ok);
        this.tokenState = TokenState.Used;
      },
      error: err => {
        const errResp = RequestError.fromResponse(err);

        if (errResp.notFound) {
          this.tokenState = TokenState.NotFound;
          this.formService.enable(true);
          return;
        }

        this.formService.sendError(err);
      }
    })
  }
}
