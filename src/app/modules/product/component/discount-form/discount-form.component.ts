import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Plan, Discount } from 'src/app/data/schema/product';
import { Button } from 'src/app/shared/widget/button';
import { DiscountForm, buildDiscountControls, DiscountReq, buildDiscountReq } from "../../schema/DiscountForm";
import { FormGroup } from '@angular/forms';
import { isoOffset } from 'src/app/data/formatter/datetime';
import { DynamicControl } from 'src/app/shared/widget/control';
import { FormService } from 'src/app/shared/service/form.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.scss'],
  providers: [FormService]
})
export class DiscountFormComponent implements OnInit {

  @Input() plan: Plan;
  @Output() created = new EventEmitter<Discount>();

  timezone = isoOffset(new Date());

  controls: DynamicControl[];
  form: FormGroup;
  button = Button.primary().setName('Create and apply to this plan');

  constructor(
    private formService: FormService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.controls = buildDiscountControls(this.plan.price);

    this.formService.formSubmitted$.subscribe(data => {
      const formData: DiscountForm = JSON.parse(data);

      const reqData: DiscountReq = buildDiscountReq(formData, this.timezone);

      this.create(reqData);
    });
  }

  private create(reqData: DiscountReq) {
    console.log(reqData);

    this.created.emit(genDiscount(reqData));
  }
}
