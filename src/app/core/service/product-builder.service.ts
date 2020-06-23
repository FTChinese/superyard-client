import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Plan, BaseProduct } from 'src/app/data/schema/product';

@Injectable({
  providedIn: 'root'
})
export class ProductBuilderService {

  private prodSelectedSource = new Subject<BaseProduct>();
  private planSelectedSource = new Subject<Plan>();
  private prodCreatedSource = new Subject<BaseProduct>();
  private planCreatedSource = new Subject<Plan>();

  productSelected$ = this.prodSelectedSource.asObservable();
  planSelected$ = this.planSelectedSource.asObservable();
  productCreated$ = this.prodCreatedSource.asObservable();
  planCreated$ = this.planCreatedSource.asObservable();

  constructor() { }

  selectProduct(p: BaseProduct) {
    this.prodSelectedSource.next(p);
  }

  createProduct(p: BaseProduct) {
    this.prodCreatedSource.next(p);
    this.prodSelectedSource.next(p);
  }

  selectPlan(p: Plan) {
    this.planSelectedSource.next(p);
  }

  createPlan(p: Plan) {
    this.planCreatedSource.next(p);
    this.planSelectedSource.next(p);
  }
}
