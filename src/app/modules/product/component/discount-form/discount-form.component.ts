import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ExpandedPlan, Discount } from 'src/app/data/schema/product';
import { Button } from 'src/app/shared/widget/button';
import { DiscountForm, buildDiscountControls, DiscountReq, buildDiscountReq } from '../../schema/DiscountForm';
import { FormGroup } from '@angular/forms';
import { isoOffset } from 'src/app/data/formatter/datetime';
import { DynamicControl } from 'src/app/shared/widget/control';
import { FormService } from 'src/app/shared/service/form.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ProductService } from '../../service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.scss'],
  providers: [FormService]
})
export class DiscountFormComponent implements OnInit {

  @Input() plan: ExpandedPlan;
  @Output() created = new EventEmitter<Discount>();

  timezone = isoOffset(new Date());

  controls: DynamicControl[];
  form: FormGroup;
  button = Button.primary().setName('Create and apply to this plan');

  constructor(
    private formService: FormService,
    private toast: ToastService,
    private productService: ProductService
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

    this.productService.createDiscount(
      this.plan.id,
      reqData
    ).subscribe({
      next: discount => {
        this.toast.info('Discount created successfully');

        this.created.emit(discount);
      },
      error: (err: HttpErrorResponse) => {
        const reqErr = new RequestError(err);
        this.formService.sendError(reqErr);
      }
    });
  }
}
