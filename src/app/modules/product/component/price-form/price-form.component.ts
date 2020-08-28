import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanForm, buildPlanControls, PlanReq, planFormToReq } from '../../schema/PlanForm';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { Product, Plan } from 'src/app/data/schema/product';
import { ToastService } from 'src/app/shared/service/toast.service';
import { ProgressService } from 'src/app/shared/service/progress.service';
import { ProductService } from '../../service/product.service';
import { DynamicControl } from 'src/app/shared/widget/control';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestError } from 'src/app/data/schema/request-result';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss'],
  providers: [FormService],
})
export class PriceFormComponent implements OnInit {

  // For which product this price is made.
  @Input() product: Product;
  @Output() created = new EventEmitter<Plan>();

  controls: DynamicControl[];
  button = Button.primary().setName('Create');

  constructor(
    private formService: FormService,
    private toast: ToastService,
    readonly progress: ProgressService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.controls = buildPlanControls(this.product.tier);

    this.formService.formSubmitted$.subscribe(data => {
      const formData: PlanForm = JSON.parse(data);

      this.create(formData);
    });
  }

  /**
   * @description Create a new pricing plan.
   * Pay attention to the price which should be a number but the form submitted is a string.
   */
  private create(formData: PlanForm) {
    const reqData: PlanReq = planFormToReq(this.product, formData);

    console.log('Plan request: %o', reqData);

    this.productService.createPlan(reqData)
      .subscribe({
        next: p => {
          this.toast.info('New pricing plan created!');
          this.created.emit(p);
        },
        error: (err: HttpErrorResponse) => {
          const reqErr = new RequestError(err);
          this.formService.sendError(reqErr);
        }
      });

  }
}
