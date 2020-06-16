import { Component, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { RequestError } from 'src/app/data/schema/request-result';
import { authUrls } from 'src/app/layout/sitemap';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { switchMap } from 'rxjs/operators';
import { Alert } from 'src/app/shared/widget/alert';
import { Credentials } from 'src/app/data/schema/form-data';
import { StaffService } from 'src/app/data/service/staff.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormService],
})
export class LoginComponent implements OnInit{

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

  alert: Alert;

  forgotPwUrl = authUrls.forgotPassword;

  private set alertMsg(v: string) {
    this.alert = {
      type: 'danger',
      message: v,
      dismissible: true,
    };
  }

  constructor(
    private authService: AuthService,
    private staffService: StaffService,
    private formService: FormService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        console.log('Credentials submitted');
        const credentials: Credentials = JSON.parse(data);

        return this.staffService.login(credentials);
      })
    )
    .subscribe({
      next: data => {
        console.log(data);
        this.authService.loggedIn(data);

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
        this.formService.sendError(errResp);

        if (errResp.notFound) {
          this.alertMsg = 'Invalid credentials';
          return;
        }

        this.alertMsg = errResp.message;
      },
    });
  }

  onDismissAlert() {
    this.alert = null;
  }
}
