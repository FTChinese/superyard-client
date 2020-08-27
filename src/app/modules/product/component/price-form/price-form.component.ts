import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanForm, buildPlanControls, PlanReq } from "../../schema/PlanForm";
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { PricedProduct, Plan } from 'src/app/data/schema/product';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss'],
  providers: [FormService],
})
export class PriceFormComponent implements OnInit {

  // For which product this price is made.
  @Input() product: PricedProduct;
  @Output() created = new EventEmitter<Plan>();

  controls = buildPlanControls();
  button = Button.primary().setName('Create');

  constructor(
    private formService: FormService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    if (this.product.tier === 'premium') {
      this.controls = buildPlanControls(this.product.tier);
    }

    this.formService.formSubmitted$.subscribe(data => {
      const formData: PlanForm = JSON.parse(data);

      this.create(formData);
    });
  }

  private create(formData: PlanForm) {
    const reqData: PlanReq = {
      productId: this.product.id,
      price: formData.price,
      tier: this.product.tier,
      cycle: formData.cycle,
      description: formData.description,
    };

    console.log('Plan request: %o', reqData);

    this.created.emit(genPlan(reqData));
    this.toast.info('New pricing plan created!');
  }
}
