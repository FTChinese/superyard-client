import { Component, OnInit, Input } from '@angular/core';
import { Plan, RetailDiscount, B2BDiscount } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.scss']
})
export class PlanItemComponent implements OnInit {

  @Input() plan: Plan;
  @Input() showHeader = true;
  isEditing: false;

  constructor(
    private builder: ProductBuilderService
  ) { }

  ngOnInit(): void {
  }

  select() {
    this.builder.selectPlan(this.plan);
  }

  // Returing false indicates duplicate threshold field.
  private addB2BDiscount(discount: B2BDiscount): boolean {
    console.log('Add a new discount: %o', discount);

    const index = this.plan.b2bDiscounts.findIndex(item => item.threshold >= discount.threshold);

    console.log('B2B discounts found: %s', index);

    if (index === -1) {
      this.plan.b2bDiscounts.push(discount);
      return true;
    }

    const foundElem = this.plan.b2bDiscounts[index];

    console.log('Found element: %o', foundElem);

    // The threshhold field should be unique in the whole array.
    if (foundElem.threshold === discount.threshold) {
      return false;
    }
    // Insert before index.

    this.plan.b2bDiscounts.splice(index, 0, discount);
    return true
  }

  toggleEdit() {

  }
}
