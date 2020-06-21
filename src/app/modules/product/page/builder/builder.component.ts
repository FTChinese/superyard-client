import { Component, OnInit } from '@angular/core';
import { BaseProduct, Plan, Product } from 'src/app/data/schema/product';
import { Cycle } from 'src/app/data/schema/enum';


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  product: BaseProduct;

  private plans: Map<Cycle, Plan> = new Map();

  get yearlyPlan(): Plan | undefined {
    return this.plans.get('year');
  }

  get monthlyPlan(): Plan | undefined {
    return this.plans.get('month');
  };

  get hasYearPlan(): boolean {
    return !!this.product;
  }

  get hasMonthPlan(): boolean {
    return this.product && this.product.tier === 'standard';
  }

  constructor() { }

  ngOnInit(): void {
    const buildOn: Product | undefined = history.state.buildOn;
    console.log(buildOn);

    if (buildOn) {
      this.product = {
        id: buildOn.id,
        tier: buildOn.tier,
        heading: buildOn.heading,
        description: buildOn.description,
        smallPrint: buildOn.smallPrint,
        createdUtc: buildOn.createdUtc,
        createdBy: buildOn.createdBy,
      };

      buildOn.plans.forEach(plan => {
        this.plans.set(plan.cycle, plan);
      });
    }
  }


}
