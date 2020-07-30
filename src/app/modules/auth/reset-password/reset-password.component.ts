import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { InputControl, DynamicControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { authUrls } from 'src/app/layout/sitemap';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PasswordResetForm, PasswordResetter } from 'src/app/data/schema/form-data';
import { StaffService } from 'src/app/data/service/staff.service';
import { HttpErrorResponse } from '@angular/common/http';
import { matchValidator } from 'src/app/shared/validators';

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
      label: 'Password',
      type: 'password',
    }),
    new InputControl({
      value: '',
      key: 'confirmPassword',
      validators: [Validators.required],
      label: 'Repeat password',
      type: 'password',
    }),
  ];
  crossValidator = matchValidator('password', 'confirmPassword');

  button: Button = Button.primary().setBlock().setName('重置密码');

  tokenState: TokenState = null;
  token: string; // The token acquired from url path.
  email: string; // The email linked to this password reset token.

  feedback = 'Verifying your token...';

  forgotPwLink = authUrls.forgotPassword;
  loginLink = authUrls.login;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const token = params.get('token');
        this.token = token;
        console.log(`Token: ${token}`);

        return this.staffService.verifyPwResetToken(token);
      })
    )
    .subscribe({
      next: data => {
        this.email = data.email;
        this.tokenState = TokenState.Found;
      },
      error: (err: HttpErrorResponse) => {
        const reqErr = new RequestError(err, serviceNames.forgotPassword);

        if (reqErr.notFound) {
          this.tokenState = TokenState.NotFound;
          return;
        }

        this.feedback = reqErr.message;
      }
    });

    this.formService.formSubmitted$.subscribe(data => {
      const formData: PasswordResetForm = JSON.parse(data);

      this.resetPassword({
        token: this.token,
        password: formData.password,
      });
    });
  }

  private resetPassword(resetter: PasswordResetter) {
    this.staffService.resetPassword(resetter)
      .subscribe({
        next: ok => {
          if (ok) {
            this.tokenState = TokenState.Used;
          }
        },
        error: (err: HttpErrorResponse) => {
          const errResp = new RequestError(err, serviceNames.forgotPassword);

          if (errResp.notFound) {
            this.tokenState = TokenState.NotFound;
            this.formService.enable(true);
            return;
          }

          this.formService.sendError(errResp);
        }
      });
  }
}
