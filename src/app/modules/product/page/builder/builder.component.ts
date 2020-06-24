import { Component, OnInit } from '@angular/core';
import { BaseProduct, Plan, Product } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';
import { Button } from 'src/app/shared/widget/button';
import { Link } from 'src/app/shared/widget/link';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  dropBtn: Button = Button.primary().setName('Menu');
  dropItems: Link[] = [
    {
      href: 'new-product',
      name: 'Create a New Product'
    },
    {
      href: 'new-plan',
      name: 'Create a New Plan'
    }
  ];

  get enableSave(): boolean {
    return this.builderService.touched && this.builderService.isValid;
  }

  // We divided a product into 3 components:
  // * Product description
  // * Yearly price
  // * Monthly price (only exists for standard tier)
  // User could assemble a Product by clicking the
  // Select from... button to select each components
  // from a list of existing templates.
  get product(): BaseProduct {
    return this.builderService.product;
  }

  get yearlyPlan(): Plan | undefined {
    return this.builderService.yearlyPlan;
  }

  get monthlyPlan(): Plan | undefined {
    return this.builderService.monthlyPlan;
  };

  get permitMonthPlan(): boolean {
    return this.builderService.permitMonthPlan;
  }

  constructor(
    private builderService: ProductBuilderService
  ) { }

  ngOnInit(): void {
    const buildOn: Product | undefined = history.state.buildOn;
    console.log(buildOn);

    if (buildOn) {
      this.builderService.setProduct({
        id: buildOn.id,
        tier: buildOn.tier,
        heading: buildOn.heading,
        description: buildOn.description,
        smallPrint: buildOn.smallPrint,
        createdUtc: buildOn.createdUtc,
        createdBy: buildOn.createdBy,
      }, {touched: false});

      buildOn.plans.forEach(plan => {
        this.builderService.setPlan(plan, {touched: false});
      });
    }
  }

  clear() {
    this.builderService.clear();
  }

  save() {
    const prod = this.builderService.build();

    console.log(prod);
  }
}
