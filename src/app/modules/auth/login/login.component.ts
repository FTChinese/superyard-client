import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { ILogin, StaffAccount } from 'src/app/data/schema/staff';
import { AuthService } from 'src/app/core/service/auth.service';
import { RequestError } from 'src/app/data/schema/request-result';
import { authUrls } from 'src/app/layout/sitemap';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormService],
})
export class LoginComponent {

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'userName',
      validators: [Validators.required],
      label: 'User name',
      type: 'text',
    }),
    new InputControl({
      value: '',
      key: 'password',
      validators: [Validators.required],
      label: 'Password',
      type: 'password',
    })
  ];

  button: Button = Button
    .primary()
    .setBlock()
    .setName('Login');

  forgotPwUrl = authUrls.forgotPassword;

  formErr: Partial<ILogin> = {};
  errMsg: string;
  alertMsg: string;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router,
  ) { }

  onSubmit() {
    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const credentials: ILogin = JSON.parse(data);

        return this.authService.login(credentials);
      })
    )
    .subscribe({
      next: data => {
        console.log(data);

        if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/';

          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true,
          };

          this.router.navigateByUrl(redirect, navigationExtras);
        }
      },
      error: err => {
        const errResp = RequestError.fromResponse(err);

        console.log(err);

        if (errResp.notFound) {
          this.alertMsg = 'Invalid credentials';
          return;
        }

        if (errResp.unprocessable) {
          this.formService.sendError(RequestError.fromResponse(err));
          return;
        }

        this.alertMsg = errResp.message;
      },
    });
  }
}
