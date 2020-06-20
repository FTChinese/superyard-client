import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/data/schema/product';

enum Action {
  NewProduct = 'newProduct',
  NewPlan = 'newPlan',
  ListPlan = 'listPlan',
  B2bDiscount = 'b2bDiscount',
};

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  isEditing = false;

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }
}
