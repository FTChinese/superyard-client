import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';
import { planStdMonth, planStdYear, planPrmYear } from 'src/app/data/schema/mocker';
import { ProductBuilderService } from 'src/app/core/service/product-builder.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  plans: Plan[] = [
    planStdMonth,
    planStdYear,
    planPrmYear,
  ];

  constructor(
    private builderService: ProductBuilderService,
  ) { }

  ngOnInit(): void {
    this.builderService.planCreated$
      .subscribe(plan => {
        this.plans.unshift(plan);
      });
  }

}
