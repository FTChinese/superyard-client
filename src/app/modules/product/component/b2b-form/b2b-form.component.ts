import { Component, OnInit } from '@angular/core';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-b2b-form',
  templateUrl: './b2b-form.component.html',
  styleUrls: ['./b2b-form.component.scss'],
  providers: [FormService]
})
export class B2bFormComponent implements OnInit {

  controls: DynamicControl[] = [
    new InputControl({
      value: 0,
      key: 'threshold',
      validators: [Validators.required],
      label: 'Threshold Copies',
      type: 'number',
      desc: 'The minimum copies to buy to enjoy this discount'
    }),
    new InputControl({
      value: 0,
      key: 'priceOff',
      validators: [Validators.required],
      label: 'Price Off',
      type: 'number',
    }),
  ];

  button: Button = Button.primary().setName('Add');

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
  }

}
