import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';
import { planStdYear } from 'src/app/data/schema/mocker';
import { DynamicControl, InputControl } from 'src/app/shared/widget/control';
import { Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/service/form.service';
import { Button } from 'src/app/shared/widget/button';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
  providers: [FormService]
})
export class PlanFormComponent implements OnInit {

  plan: Plan = planStdYear;
  controls: DynamicControl[];
  button: Button = Button.primary().setName('Save');

  constructor(
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.controls = [
      new InputControl({
        value: this.plan.tier,
        key: 'tier',
        validators: [Validators.required],
        label: 'Tier',
        type: 'text',
        readonly: true,
      }),
      new InputControl({
        value: this.plan.cycle,
        key: 'cycle',
        validators: [Validators.required],
        label: 'Cycle',
        type: 'text',
        readonly: true,
      }),
      new InputControl({
        value: this.plan.currency,
        key: 'currency',
        validators: [Validators.required],
        label: 'Currency',
        type: 'text',
        readonly: true,
      }),
      new InputControl({
        value: this.plan.price,
        key: 'price',
        validators: [Validators.required],
        label: 'Price',
        type: 'number',
        desc: 'Required',
      }),
    ];
  }

}
