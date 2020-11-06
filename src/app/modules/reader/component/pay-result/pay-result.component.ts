import { Component, Input, OnInit } from '@angular/core';
import { PaymentResult } from 'src/app/data/schema/order';

@Component({
  selector: 'app-pay-result',
  templateUrl: './pay-result.component.html',
  styleUrls: ['./pay-result.component.scss']
})
export class PayResultComponent implements OnInit {

  @Input() result: PaymentResult;

  constructor() { }

  ngOnInit(): void {
  }

}
