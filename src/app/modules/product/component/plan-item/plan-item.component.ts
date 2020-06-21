import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.scss']
})
export class PlanItemComponent implements OnInit {

  @Input() plan: Plan;

  // Only yearly edition is allowed to enjoy discount.
  get permitDiscount(): boolean {
    if (!this.plan) {
      return false;
    }
    return this.plan.cycle === 'year';
  }

  get hasRetailDiscount(): boolean {
    if (!this.plan) {
      return false;
    }
    return this.plan.retailDiscount.priceOff > 0;
  }

  get hasB2bDiscount(): boolean {
    if (!this.plan) {
      return false;
    }
    return this.plan.b2bDiscounts.length > 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
