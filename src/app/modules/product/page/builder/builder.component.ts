import { Component, OnInit } from '@angular/core';
import { BaseProduct, Plan, Product } from 'src/app/data/schema/product';
import { Cycle, Tier } from 'src/app/data/schema/enum';
import { Alert } from 'src/app/shared/widget/alert';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  touched = false;
  // We divided a product into 3 components:
  // * Product description
  // * Yearly price
  // * Monthly price (only exists for standard tier)
  // User could assemble a Product by clicking the
  // Select from... button to select each components
  // from a list of existing templates.
  product: BaseProduct;
  private plans: Map<Cycle, Plan> = new Map();

  // A flag to ensure data consistence.
  // It indicates which tier of product we are building.
  private currentTier: Tier;

  // There are chances user might mix the description,
  // yearly price and monthly price from different tiers,
  // we use this method to ensure the three components
  // are in sync so that they cannot build a Premium product
  // with price for standard edition, or vice versus.
  private setProduct(p: BaseProduct) {
    // No components selected.
    if (!this.currentTier || this.currentTier === p.tier) {
      this.currentTier = p.tier;
      this.product = p;
      return;
    }

    // User is trying to switch product from one tier to
    // another, we should clear any pricing plans.
    // this.currentTier && this.currentTier !== p.tier
    this.currentTier = p.tier;
    this.plans.clear();
    this.product = p;
  }

  private setPlan(p: Plan) {
    if (!this.currentTier || this.currentTier === p.tier) {
      this.currentTier = p.tier;
      this.plans.set(p.cycle, p);
      return;
    }

    // this.currentTier && this.currentTier !== p.tier
    this.product = null;
    this.plans.clear();
    this.currentTier = p.tier;
    this.plans.set(p.cycle, p);
    return;
  }

  get isValid(): boolean {
    if (!this.product) {
      return false;
    }

    if (!this.yearlyPlan) {
      return false;
    }

    if (this.currentTier === 'standard' && !this.monthlyPlan) {
      return false;
    }

    return true;
  }

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

  constructor(
    private builderService: ProductBuilderService
  ) { }

  ngOnInit(): void {
    const buildOn: Product | undefined = history.state.buildOn;
    console.log(buildOn);

    if (buildOn) {
      this.setProduct({
        id: buildOn.id,
        tier: buildOn.tier,
        heading: buildOn.heading,
        description: buildOn.description,
        smallPrint: buildOn.smallPrint,
        createdUtc: buildOn.createdUtc,
        createdBy: buildOn.createdBy,
      });

      buildOn.plans.forEach(plan => {
        this.setPlan(plan);
      });
    }

    this.builderService.productSelected$
      .subscribe(product => {
        this.setProduct(product);
        this.touched = true;
      });

    this.builderService.planSelected$
      .subscribe(plan => {
        this.setPlan(plan);
        this.touched = true;
      });
  }

  clear() {
    this.currentTier = null;
    this.product = null;
    this.plans.clear();
  }

  save() {
    const prod: Product = {
      ...this.product,
      plans: [
        this.yearlyPlan,
      ],
    };

    if (this.hasMonthPlan) {
      prod.plans.push(this.monthlyPlan);
    }

    console.log('Build new product: %o', prod);
  }
}
