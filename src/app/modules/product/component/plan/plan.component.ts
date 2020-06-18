import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  @Input() plan: Plan;

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
