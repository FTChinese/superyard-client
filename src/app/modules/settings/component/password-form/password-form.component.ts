import { Component, OnInit } from '@angular/core';
import { Button } from 'src/app/shared/widget/button';
import { Validators } from '@angular/forms';
import { InputControl, DynamicControl } from 'src/app/shared/widget/control';
import { FormService } from 'src/app/shared/service/form.service';
import { PasswordUpdateForm } from 'src/app/data/schema/form-data';
import { StaffService } from 'src/app/data/service/staff.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  providers: [FormService],
})
export class PasswordFormComponent implements OnInit {

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'oldPassword',
      validators: [
        Validators.required,
        Validators.maxLength(64)
      ],
      label: 'Old password',
      type: 'password',
      desc: 'Required. Your current password'
    }),
    new InputControl({
      value: null,
      key: 'password',
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ],
      label: 'New password',
      type: 'password',
      desc: 'Required. At least 8 chars'
    }),
    new InputControl({
      value: null,
      key: 'confirmPassword',
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ],
      label: 'Confirm password',
      type: 'password',
      desc: 'Repeat your new password'
    }),
  ];

  button: Button = Button.primary().setName('Change password');

  constructor(
    private formService: FormService,
    private staffService: StaffService,
  ) {
    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const formData: PasswordUpdateForm = JSON.parse(data);
        console.log(formData);
        return of(true);
      })
    )
    .subscribe({
      next: ok => console.log(ok),
      error: err => console.log(err),
    });
  }

  ngOnInit(): void {
  }

}
