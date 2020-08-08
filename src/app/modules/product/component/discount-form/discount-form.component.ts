import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Plan, Discount } from 'src/app/data/schema/product';
import { Button } from 'src/app/shared/widget/button';
import { buildDiscountControls, periodSets, DiscountForm, DiscountReq, buildDiscountReq } from '../../schema/control-builder';
import { FormGroup } from '@angular/forms';
import { DynamicControlService } from 'src/app/shared/service/dynamic-control.service';
import { isoOffset } from 'src/app/data/formatter/datetime';
import { buildPeriod } from 'src/app/data/schema/period';
import { genDiscount } from 'src/app/data/schema/mocker';
import { DynamicControl } from 'src/app/shared/widget/control';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.scss'],
})
export class DiscountFormComponent implements OnInit {

  @Input() plan: Plan;
  @Output() created = new EventEmitter<Discount>();

  timezone = isoOffset(new Date());

  controls: DynamicControl[];
  periodSets = periodSets;
  form: FormGroup;
  button = Button.primary().setName('Create and apply to this plan');

  set submitting(yes: boolean) {
    if (yes) {
      this.form.disable();
      this.button.start();
    } else {
      this.form.enable();
      this.button.stop();
    }
  }

  constructor(
    private controlService: DynamicControlService
  ) { }

  ngOnInit(): void {
    this.controls = buildDiscountControls(this.plan.price);

    this.form = this.controlService.toFormGroup(this.controls);

    periodSets.forEach(grp => {
      this.form.addControl(grp.groupName, this.controlService.toFormGroup(grp.controls));
    });
  }

  onSubmit() {
    const formData: DiscountForm = this.form.value;

    const reqData: DiscountReq = buildDiscountReq(formData, this.timezone);

    this.submitting = true;
    this.create(reqData);
  }

  private create(reqData: DiscountReq) {
    console.log(reqData);

    this.created.emit(genDiscount(reqData));
  }
}
