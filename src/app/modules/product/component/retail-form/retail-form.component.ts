import { Component, OnInit } from '@angular/core';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';

@Component({
  selector: 'app-retail-form',
  templateUrl: './retail-form.component.html',
  styleUrls: ['./retail-form.component.scss'],
  providers: [FormService],
})
export class RetailFormComponent implements OnInit {

  controls: DynamicControl[] = [
    new InputControl({
      value: 0,
      key: 'priceOff',
      label: 'Price Off',
      type: 'number',
      desc: 'Optional. Limited time offer to retailing customers',
    }),
    new InputControl({
      value: null,
      key: 'startUtc',
      label: 'Discount start time',
      type: 'date',
      desc: 'Optional. Required only when Price Off is set',
    }),
    new InputControl({
      value: null,
      key: 'endUtc',
      label: 'Discount end time',
      type: 'date',
      desc: 'Optional. Required only when Price Off is set',
    }),
  ];

  button: Button = Button.primary().setName('Save')

  constructor(
    private formService: FormService
  ) { }

  ngOnInit(): void {
  }

}
