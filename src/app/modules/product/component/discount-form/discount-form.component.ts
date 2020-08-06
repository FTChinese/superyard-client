import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Plan, Discount } from 'src/app/data/schema/product';
import { Button } from 'src/app/shared/widget/button';
import { buildDiscountControls, DiscountControls } from '../../control-builder';
import { FormService } from 'src/app/shared/service/form.service';
import { DiscountForm, buildDiscountReq } from 'src/app/data/schema/form-data';
import { FormGroup } from '@angular/forms';
import { DynamicControlService } from 'src/app/shared/service/dynamic-control.service';
import { isoOffset } from 'src/app/data/formatter/datetime';
import { genDiscount } from 'src/app/data/schema/mocker';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.scss'],
  providers: [FormService],
})
export class DiscountFormComponent implements OnInit {

  @Input() plan: Plan;
  @Output() created = new EventEmitter<Discount>();

  timezone = isoOffset(new Date());

  controls: DiscountControls;
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
    readonly formService: FormService,
    private controlService: DynamicControlService
  ) { }

  ngOnInit(): void {
    this.controls = buildDiscountControls(this.plan.price);

    this.form = this.controlService.toFormGroup([
      this.controls.priceOff,
      ...this.controls.startTimeRow,
      ...this.controls.endTimeRow
    ]);

    this.formService.formSubmitted$.subscribe(data => {
      const formData: DiscountForm = JSON.parse(data);

      this.create(formData);
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.submitting = true;
  }

  private create(formData: DiscountForm) {
    console.log(formData);

    const reqData = buildDiscountReq(formData, this.timezone);

    this.created.emit(genDiscount(reqData));
  }
}
