import { Component, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { RequestError, serviceNames } from 'src/app/data/schema/request-result';
import { authUrls } from 'src/app/layout/sitemap';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { switchMap } from 'rxjs/operators';
import { Credentials } from 'src/app/data/schema/form-data';
import { StaffService } from 'src/app/data/service/staff.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  forgotPwUrl = authUrls.forgotPassword;

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
      error: (errResp: HttpErrorResponse) => {
        console.log(errResp);
        this.formService.sendError(
          new RequestError(errResp, serviceNames.logIn)
        );
      },
    });
  }
}
