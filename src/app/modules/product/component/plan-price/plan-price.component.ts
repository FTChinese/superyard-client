import { Component, OnInit, Input } from '@angular/core';
import { ExpandedPlan } from 'src/app/data/schema/product';

@Component({
  selector: 'app-plan-price',
  templateUrl: './plan-price.component.html',
  styleUrls: ['./plan-price.component.scss']
})
export class PlanPriceComponent implements OnInit {
  @Input() plan: ExpandedPlan;

  constructor() { }

  ngOnInit(): void {
  }

}
