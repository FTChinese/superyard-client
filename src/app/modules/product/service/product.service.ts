import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CreateProductForm, EditProductForm } from '../schema/ProductForm';
import { Observable, of } from 'rxjs';
import { PricedProduct, BaseProduct } from 'src/app/data/schema/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  createProduct(prod: CreateProductForm): Observable<BaseProduct> {
    return this.http.post<BaseProduct>(
      '/api/products',
      prod,
    );
  }

  listPricedProducts(): Observable<PricedProduct[]> {
    return this.http.get<PricedProduct[]>(
      '/api/products'
    );
  }

  loadProduct(id: string): Observable<BaseProduct> {
    return this.http.get<BaseProduct>(
      `/api/products/${id}`
    );
  }

  updateProduct(id: string, prod: EditProductForm): Observable<BaseProduct> {
    return this.http.patch<BaseProduct>(
      `/api/products/${id}`,
      prod,
    );
  }

  activateProduct(id: string): Observable<BaseProduct> {
    return this.http.put<BaseProduct>(
      `/api/products/${id}`,
      null
    );
  }
}
