import { Component, OnInit } from '@angular/core';
import { IProfile } from 'src/app/models/staff';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _profile: IProfile;

  profileForm = this.formBuilder.group({
    email: [null, Validators.email],
    displayName: [null],
  });

  passwordsForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  get emailControl(): AbstractControl {
    return this.profileForm.get('email');
  }

  set profile(p: IProfile) {
    this._profile = p;

    this.profileForm.patchValue({
      email: p.email,
      displayName: p.displayName
    });

    if (p.email) {
      this.emailControl.disable();
    }
  }

  get profile(): IProfile {
    return this._profile;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.loadProfile().subscribe({
      next: profile => {
        this.profile = profile;
      },
      error: err => {
        console.log(err);
        this.profile = {
          id: 'stf_YlrPE6HJLkKp',
          userName: 'weiguo.ni',
          email: 'weiguo.ni@ftchinese.com',
          isActive: true,
          displayName: null,
          department: 'tech',
          groupMembers: 8,
          createdAt: '2012-02-29T07:39:12Z',
          deactiveatedAt: null,
          updatedAt: null,
          lastLoginAt: null,
          lastLoginIp: null,
        };
      },
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  onChangePassword() {
    console.log(this.passwordsForm.value);
  }
}
