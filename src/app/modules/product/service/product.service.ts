import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductCreationForm, ProductForm } from '../schema/ProductForm';
import { Observable, of } from 'rxjs';
import { Product, PricedProduct, ExpandedPlan, Plan, Discount } from 'src/app/data/schema/product';
import { PlanReq } from '../schema/PlanForm';
import { DiscountReq } from '../schema/DiscountForm';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  createProduct(prod: ProductCreationForm): Observable<Product> {
    return this.http.post<Product>(
      '/api/products',
      prod,
    );
  }

  listProducts(): Observable<PricedProduct[]> {
    return this.http.get<PricedProduct[]>(
      '/api/products'
    );
  }

  activateProduct(id: string): Observable<Product> {
    return this.http.put<Product>(
      `/api/products/${id}`,
      null
    );
  }

  loadProduct(id: string): Observable<Product> {
    return this.http.get<Product>(
      `/api/products/${id}`
    );
  }

  updateProduct(id: string, prod: ProductForm): Observable<Product> {
    return this.http.patch<Product>(
      `/api/products/${id}`,
      prod,
    );
  }

  createPlan(plan: PlanReq): Observable<Plan> {
    return this.http.post<Plan>(
      '/api/plans',
      plan,
    );
  }

  listPlans(productId: string): Observable<ExpandedPlan[]> {
    return this.http.get<ExpandedPlan[]>(
      '/api/plans',
      {
        params: {
          product_id: productId,
        }
      }
    );
  }

  activatePlan(planID: string): Observable<Plan> {
    return this.http.put<Plan>(`/api/plans/${planID}`, null);
  }

  createDiscount(planID: string, reqData: DiscountReq): Observable<Discount> {
    return this.http.post<Discount>(
      `/api/plans/${planID}/discount`,
      reqData
    );
  }

  /**
   * Drop a discount from a plan. The discount itself
   * won't be modified.
   */
  dropDiscount(planID: string): Observable<boolean> {
    return this.http.delete<boolean>(`/api/plans/${planID}/discount`, {
      observe: 'response'
    })
    .pipe(
      switchMap(resp => of(resp.status === 204))
    );
  }
}
