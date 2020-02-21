import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FlashDirective } from '../../shared/flash.directive';
import { FlashComponent } from '../../shared/flash/flash.component';
import { ICMSAccount } from '../../models/staff';
import { parseErrorResponse } from '../../models/errors';
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

    const err = parseErrorResponse(errResp);

    if (err.notFound) {
      this.loadFlash('Invalid credentials');
      return;
    }

    if (err.unprocessable) {
      if (err.unprocessable.param === 'userName') {
        this.nameInvalid = err.message;
      }

      if (err.unprocessable.param === 'password') {
        this.pwInvalid = err.message;
      }
      return;
    }

    this.loadFlash(err.message);
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
