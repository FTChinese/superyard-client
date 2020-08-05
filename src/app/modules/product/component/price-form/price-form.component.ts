import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { buildPlanControls } from '../../control-builder';
import { Button } from 'src/app/shared/widget/button';
import { FormService } from 'src/app/shared/service/form.service';
import { PlanForm, PlanReq } from 'src/app/data/schema/form-data';
import { Product, Plan } from 'src/app/data/schema/product';
import { genPlan } from 'src/app/data/schema/mocker';

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

  controls = buildPlanControls();
  button = Button.primary().setName('Save');

  constructor(
    private formService: FormService
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

    console.log(reqData);

    this.created.emit(genPlan(reqData));
  }
}
