import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.scss']
})
export class PlanItemComponent implements OnInit {

  @Input() plan: Plan;
  @Input() showHeader = true; // False when used under Preview section of BuilderComponent.
  @Input() showFooter = true; // False when used as Preview inside NewPlanComponent.

  isEditing = false;
  get duplicateBtn(): string {
    return this.isEditing
      ? 'Cancel'
      : 'Duplicate'
  }

  constructor(
    private builder: ProductBuilderService
  ) { }

  ngOnInit(): void {
  }

  // When user clicked `Use` button.
  select() {
    this.builder.setPlan(this.plan);
  }

  // Show/hide PlanFormComponent.
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // When the hosted PlanFormComponents emit `created` event,
  // update plan in ProductBuilderService and emit the Plan
  // via the planCreated$ channel.
  onCreated(p: Plan) {
    // Host could subscribe to the planCreated$
    this.builder.createPlan(p);
    this.toggleEdit();
  }
}
