import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.component.html',
  styleUrls: ['./new-plan.component.scss']
})
export class NewPlanComponent implements OnInit {
  plan: Plan;

  constructor(
    private builderService: ProductBuilderService
  ) { }

  ngOnInit(): void {
  }

  // When host PlanFormComponent emitted `created` event,
  // update ui to preview it and aslo updte the builder serive.
  onCreated(p: Plan) {
    console.log('A new plan is created: %o', p);
    this.plan = p;
    this.builderService.setPlan(p);
  }
}
