import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.scss']
})
export class PlanItemComponent implements OnInit {

  @Input() plan: Plan;
  @Input() showHeader = false;

  // Only yearly edition is allowed to enjoy discount.
  get permitDiscount(): boolean {
    return this.plan && this.plan.cycle === 'year';
  }

  get hasRetailDiscount(): boolean {
    return this.plan && this.plan.retailDiscount.priceOff > 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
