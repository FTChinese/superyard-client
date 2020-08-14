import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Plan, BaseProduct, PricedProduct } from 'src/app/data/schema/product';
import { Cycle, Tier } from 'src/app/data/schema/enum';

@Injectable({
  providedIn: 'root'
})
export class ProductBuilderService {

  // A flag to ensure data consistence.
  // It indicates which tier of product we are building.
  private currentTier: Tier;

  private _touched = false;
  get touched(): boolean {
    return this._touched;
  }

  // We divided a product into 3 components:
  // * Product description
  // * Yearly price
  // * Monthly price (only exists for standard tier)
  // User could assemble a Product by clicking the
  // Select from... button to select each components
  // from a list of existing templates.
  private _product: BaseProduct;
  private _plans: Map<Cycle, Plan> = new Map();

  get product(): BaseProduct {
    return this._product;
  }

  get plans(): Map<Cycle, Plan> {
    return this._plans;
  }

  get yearlyPlan(): Plan | undefined {
    return this.plans.get('year');
  }

  get monthlyPlan(): Plan | undefined {
    return this.plans.get('month');
  };

  get permitMonthPlan(): boolean {
    if (this.currentTier) {
      return this.currentTier === 'standard';
    }

    return true;
  }

  get isValid(): boolean {
    if (!this.product) {
      return false;
    }

    if (!this.yearlyPlan) {
      return false;
    }

    switch (this.currentTier) {
      case 'standard':
        if (!this.monthlyPlan) {
          return false;
        }
        break;

      case 'premium':
        if (this.monthlyPlan) {
          return false;
        }
    }

    return true;
  }

  private prodCreatedSource = new Subject<BaseProduct>();
  private planCreatedSource = new Subject<Plan>();

  productCreated$ = this.prodCreatedSource.asObservable();
  planCreated$ = this.planCreatedSource.asObservable();

  constructor() { }

  // There are chances user might mix the description,
  // yearly price and monthly price from different tiers,
  // we use this method to ensure the three components
  // are in sync so that they cannot build a Premium product
  // with price for standard edition, or vice versus.
  //
  // A product comes from serveral sources:
  // The default product currently in use;
  // A new one created by duplicating a current one;
  // A new one created from scratch.
  setProduct(p: BaseProduct, {touched = true} ={}) {
    this._touched = touched;

    // No components selected.
    if (!this.currentTier || this.currentTier === p.tier) {
      this.currentTier = p.tier;
      this._product = p;
      return;
    }

    // User is trying to switch product from one tier to
    // another, we should clear any pricing plans.
    // this.currentTier && this.currentTier !== p.tier
    this.currentTier = p.tier;
    this._plans.clear();
    this._product = p;
  }

  setPlan(p: Plan, {touched = true}={}) {
    this._touched = touched;

    if (!this.currentTier || this.currentTier === p.tier) {
      this.currentTier = p.tier;
      this._plans.set(p.cycle, p);
      return;
    }

    // this.currentTier && this.currentTier !== p.tier
    this._product = null;
    this._plans.clear();
    this.currentTier = p.tier;
    this._plans.set(p.cycle, p);
    return;
  }

  clear() {
    this.currentTier = null;
    this._product = null;
    this._plans.clear();
  }

  // Used by ProductItemComponent when a new product is created
  // by duplicating an existing one.
  // It update current Product and notify other components of this event.
  createProduct(p: BaseProduct) {
    this.setProduct(p);
    this.prodCreatedSource.next(p);
  }

  createPlan(p: Plan) {
    this.setPlan(p);
    this.planCreatedSource.next(p);
  }

  // Call isValid before build the product.
  build(): PricedProduct {
    const prod: PricedProduct = {
      ...this.product,
      plans: [
        this.yearlyPlan,
      ],
    };

    if (this.product.tier === 'standard') {
      prod.plans.push(this.monthlyPlan);
    }

    return prod;
  }
}
