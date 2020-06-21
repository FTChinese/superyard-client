import { Component, OnInit } from '@angular/core';
import { BaseProduct, Plan } from 'src/app/data/schema/product';

type ListAction = 'product' | 'plan';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  product: BaseProduct;

  yearlyPlan: Plan;

  monthlyPlan: Plan;

  action: ListAction = 'product';

  get hasMonthPlan(): boolean {
    if (!this.product) {
      return false;
    }

    return this.product.tier === 'standard';
  }

  get hasYearPlan(): boolean {
    if (!this.product) {
      return false;
    }

    return true;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onListProduct() {
    this.action = 'product';
  }

  onListPlan() {
    this.action = 'plan';
  }
}
