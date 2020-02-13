import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashDirective } from '../../shared/flash.directive';
import { FlashComponent } from '../../shared/flash/flash.component';
import { ICMSAccount } from '../../models/staff';
import { IApiErrorBody } from '../../models/errors';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  nameInvalid: string;
  pwInvalid: string;

  @ViewChild(FlashDirective, {static: true}) flashHost: FlashDirective;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      const nameErr = this.loginForm.getError('required', 'userName');
      if (nameErr) {
        this.nameInvalid = 'User name is required';
      }

      const pwErr = this.loginForm.getError('required', 'password');
      if (pwErr) {
        this.pwInvalid = 'Invalid password';
      }

      return;
    }

    this.loginForm.disable();

    this.authService
      .login(this.loginForm.value)
      .subscribe({
        next: (data: ICMSAccount) => {
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
        error: (err: HttpErrorResponse) => {
          this.loginForm.enable();
          this.handleLoginError(err);
        },
        complete: () => console.log('complete'),
      });
  }

  private handleLoginError(errResp: HttpErrorResponse) {
    console.log(errResp);

    // Client-side error
    if (errResp.error instanceof ErrorEvent) {
      console.log('Client side error');
      this.loadFlash(errResp.error.message);
      return;
    }

    if (typeof(errResp.error) === 'string') {
      this.loadFlash(errResp.error);
      return;
    }

    const errBody = errResp.error as IApiErrorBody<'userName' | 'password'>;

    console.log('Api error body:', errBody);

    // Server-side error
    switch (errResp.status) {
      case 404:
        console.log('Invalid credentials');
        this.loadFlash('邮箱或密码错误');
        break;

      case 422:
        console.log('Server side validation failed');
        if (errBody.param === 'userName') {
          this.nameInvalid = errBody.message;
        }

        if (errBody.param === 'password') {
          this.pwInvalid = errBody.message;
        }
        break;

      default:
        this.loadFlash(errBody.message);
    }
  }

  private loadFlash(msg: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(FlashComponent);

    const viewContainerRef = this.flashHost.viewContainerRef;
    viewContainerRef.clear();

    const flashComponentRef = viewContainerRef.createComponent(factory);

    flashComponentRef.instance.message = msg;

    flashComponentRef.instance.closed.subscribe(() => {
      viewContainerRef.clear();
    });
  }

  clearFeedback() {
    this.nameInvalid = '';
    this.pwInvalid = '';
  }
}
