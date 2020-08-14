import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BannerForm, PromoForm } from '../schema/control-builder';
import { Observable, of } from 'rxjs';
import { Banner, Promo } from 'src/app/data/schema/paywall';
import { switchMap } from 'rxjs/operators';
import { PricedProduct } from 'src/app/data/schema/product';

@Injectable({
  providedIn: 'root'
})
export class PaywallService {

  constructor(
    private http: HttpClient
  ) { }


  createBanner(b: BannerForm): Observable<Banner> {
    return this.http.post<Banner>(
      '/api/paywall/banner',
      b,
    );
  }

  loadBanner(): Observable<Banner> {
    return this.http.get<Banner>('/api/paywall/banner');
  }

  updateBanner(b: BannerForm): Observable<Banner> {
    return this.http.patch<Banner>(
      '/api/paywall/banner',
      b
    );
  }

  dropPromo(): Observable<boolean> {
    return this.http.delete(
      '/api/paywall/banner/promo',
      {
        observe: 'response'
      }
    )
    .pipe(switchMap(resp => of(resp.status === 204)));
  }

  createPromo(p: PromoForm): Observable<Promo> {
    return this.http.post<Promo>(
      '/api/paywall/promo',
      p,
    );
  }

  loadPromo(id: string): Observable<Promo> {
    return this.http.get<Promo>(`/api/paywall/promo/${id}`);
  }

  loadProducts(): Observable<PricedProduct[]> {
    return this.http.get<PricedProduct[]>('/api/paywall/products');
  }
}
