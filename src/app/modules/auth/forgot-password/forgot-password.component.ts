import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/service/form.service';
import { Validators } from '@angular/forms';
import { InputControl, DynamicControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [FormService],
})
export class ForgotPasswordComponent implements OnInit {

  dynamicControls: DynamicControl[] = [
    new InputControl({
      value: '',
      key: 'email',
      validators: [Validators.required, Validators.email, Validators.maxLength(64)],
      label: 'Email',
      placeholder: 'example@ftchinese.com',
      type: 'email',
    }),
  ];

  button: Button = Button
    .primary()
    .setBlock()
    .setName('Send me a reset letter');

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.formService.formSubmitted$.subscribe(data => {
      console.log(data);
    });
  }

}