import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Plan, BaseProduct } from 'src/app/data/schema/product';

@Injectable({
  providedIn: 'root'
})
export class ProductBuilderService {

  private productSource = new Subject<BaseProduct>();
  private planSource = new Subject<Plan>();

  productSelected$ = this.productSource.asObservable();
  planSelected$ = this.planSource.asObservable();

  constructor() { }

  selectProduct(p: BaseProduct) {
    this.productSource.next(p);
  }

  selectPlan(p: Plan) {
    this.planSource.next(p);
  }
}
