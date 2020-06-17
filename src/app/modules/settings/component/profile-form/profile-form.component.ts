import { Component, OnInit, Input } from '@angular/core';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { StaffService } from 'src/app/data/service/staff.service';
import { FormService } from 'src/app/shared/service/form.service';
import { ProfileForm, Profile } from 'src/app/data/schema/staff';
import { switchMap } from 'rxjs/operators';
import { RequestError } from 'src/app/data/schema/request-result';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [FormService],
})
export class ProfileFormComponent implements OnInit {

  @Input()
  set profile(p: Profile) {
    this.dynamicControls.forEach((ctrl, i) => {
      const v = p[ctrl.key];
      if (v) {
        this.dynamicControls[i].value = v;
        if (ctrl.key === 'email') {
          this.dynamicControls[i].disabled = true;
        }
      }
    });
  }

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: null,
      key: 'email',
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ],
      label: 'Email',
      type: 'email',
      desc: 'Opitonal. You can set email only once'
    }),
    new InputControl({
      value: null,
      key: 'displayName',
      validators: [
        Validators.maxLength(64)
      ],
      label: 'Display Name',
      type: 'text',
      desc: 'Optional. Max 64 chars.'
    }),
  ];

  button: Button = Button.primary().setName('Save');

  constructor(
    private staffService: StaffService,
    private formService: FormService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$.pipe(
      switchMap(data => {
        const formData: ProfileForm = JSON.parse(data);

        return this.staffService.updateProfile(formData);
      })
    )
    .subscribe({
      next: ok => {
        console.log(ok);
        this.toast.show('Saved!')
      },
      error: err => {
        this.formService.sendError(RequestError.fromResponse(err));
      }
    });
  }

}
