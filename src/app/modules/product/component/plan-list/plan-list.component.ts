import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/data/schema/product';
import { planStdMonth, planStdYear, planPrmYear } from 'src/app/data/schema/mocker';

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

  constructor() { }

  ngOnInit(): void {
  }

}
