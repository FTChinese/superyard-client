import { Component, OnInit, Input } from '@angular/core';
import { Discount } from 'src/app/data/schema/product';

@Component({
  selector: 'app-price-off',
  templateUrl: './price-off.component.html',
  styleUrls: ['./price-off.component.scss']
})
export class PriceOffComponent implements OnInit {
  @Input() discount: Discount;

  constructor() { }

  ngOnInit(): void {
  }

}
